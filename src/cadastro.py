from flask import Flask, request, redirect, url_for, render_template, jsonify
from repository.cadastroDskRepository import CadastroDskRepository
from controller.cadastroDskController import CadastroDskController
import os
import firebase_admin
from firebase_admin import credentials, firestore, storage

app = Flask(__name__)

# Inicialização do Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate('L:/Drivers/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'testeleo-593ef.appspot.com'
    })

# Conectando ao Firestore e Storage
db = firestore.client()
bucket = storage.bucket()

# Função para fazer upload de arquivo para o Firebase Storage
def upload_file_to_storage(source_file_name, destination_blob_name):
    try:
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename(source_file_name)
        print(f"Arquivo {source_file_name} enviado para {destination_blob_name} no Firebase Storage.")
        return True
    except Exception as e:
        print(f"Erro ao enviar o arquivo: {str(e)}")
        return False

@app.route('/index')
def index():
    return render_template('telaInicial.html')

@app.route('/cadastrar')
def cadastrar_form():
    return render_template('cadastro.html')

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    cnpj = request.form.get('CNPJ')
    email = request.form.get('email')
    senha = request.form.get('password')
    confirmar_senha = request.form.get('confirm_password')

    if senha != confirmar_senha:
        return "As senhas não correspondem!", 400

    controller = CadastroDskController()

    try:
        doc_id = controller.create_register(cnpj, email, senha)

        if doc_id:
            return redirect(url_for('index'))
        else:
            return "Erro ao cadastrar", 500
    except Exception as e:
        return f"Erro ao cadastrar: {str(e)}", 500

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return "Nenhum arquivo foi selecionado", 400
    file = request.files['file']

    if file.filename == '':
        return "Nenhum arquivo selecionado", 400

    temp_path = os.path.join("/tmp", file.filename)
    file.save(temp_path)

    destination_blob_name = f"uploads/{file.filename}"
    success = upload_file_to_storage(temp_path, destination_blob_name)

    os.remove(temp_path)

    if success:
        return "Arquivo enviado com sucesso!"
    else:
        return "Erro ao enviar o arquivo", 500

@app.route('/create-company', methods=['POST'])
def create_company():
    data = request.json
    name = data.get('name')
    employees = data.get('employees')

    print("Tentando criar diretório para empresa:", name)

    try:
        blob = bucket.blob(f"{name}/")
        blob.upload_from_string('')  # Cria o diretório no Firebase Storage

        print("Diretório criado com sucesso para a empresa:", name)
        return jsonify(success=True)
    except Exception as e:
        print("Erro ao criar diretório:", str(e))
        return jsonify(success=False, error=str(e))

@app.route('/empresas', methods=['GET'])
def listar_empresas():
    try:
        blobs = bucket.list_blobs(prefix="")
        empresas = {blob.name.split("/")[0] for blob in blobs if "/" in blob.name}

        return jsonify(empresas=list(empresas)), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/delete-company', methods=['POST'])
def delete_company():
    data = request.json
    name = data.get('name')
    password = data.get('password')

    if password != 'senha123':
        return jsonify(success=False, error="Senha incorreta"), 403

    try:
        blobs = bucket.list_blobs(prefix=f"{name}/")
        for blob in blobs:
            blob.delete()

        print(f"Diretório '{name}' excluído com sucesso.")
        return jsonify(success=True)
    except Exception as e:
        print("Erro ao excluir diretório:", str(e))
        return jsonify(success=False, error=str(e))

@app.route('/criar-subdiretorio', methods=['POST'])
def criar_subdiretorio():
    data = request.get_json()
    nome_empresa = data['nomeEmpresa']
    nome_subdiretorio = data['nomeSubdiretorio']
    
    try:
        blob = bucket.blob(f"{nome_empresa}/{nome_subdiretorio}/")
        blob.upload_from_string('')  # Cria o subdiretório no Firebase Storage

        print(f"Subdiretório '{nome_subdiretorio}' criado dentro da empresa '{nome_empresa}'.")
        return jsonify(message='Subdiretório criado com sucesso!'), 200
    except Exception as e:
        print(f"Erro ao criar subdiretório: {str(e)}")
        return jsonify(message='Erro ao criar subdiretório', error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
