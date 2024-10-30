from flask import Flask, request, redirect, url_for, render_template
from repository.cadastroDskRepository import CadastroDskRepository
from controller.cadastroDskController import CadastroDskController 

app = Flask(__name__)

@app.route('/index.html')  # Rota para a página inicial

def index():
    return render_template('cadastro.html') 

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    print(request.form)  # Adicione isso para ver os dados recebidos

    cnpj = request.form['CNPJ']  
    email = request.form['email']
    senha = request.form['password']
    confirmar_senha = request.form['confirm_password']

    # Validações simples
    if senha != confirmar_senha:
        return "As senhas não correspondem!", 400

    controller = CadastroDskController()
    
    try:
        doc_id = controller.create_register(cnpj, email, senha)

        if doc_id:
            return redirect(url_for('index'))  # Redireciona para a nova rota

        else:
            return "Erro ao cadastrar", 500  # Retorna um erro genérico
    except Exception as e:
        return f"Erro ao cadastrar: {str(e)}", 500  # Retorna um erro genérico
    



if __name__ == '__main__':
    app.run(debug=True)
