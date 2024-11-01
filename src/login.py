from flask import Flask, render_template,  request, redirect, url_for, flash, jsonify
from controller.loginDskController import loginDskController

import firebase_admin
from firebase_admin import credentials, firestore, storage

app = Flask(__name__)

app.secret_key = "C:/UNIFIO-INTEGRADOR/pintregador/pi-6T/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json"

# Inicialização do Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate("C:/UNIFIO-INTEGRADOR/pintregador/pi-6T/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json")
    firebase_admin.initialize_app(cred, {
        'storageBucket': 'testeleo-593ef.appspot.com'  # Insira o bucket do Firebase Storage
    })

# Conectando ao Firestore e Storage
db = firestore.client()
bucket = storage.bucket()

login_controller = loginDskController()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/telainicial')
def tela_inicial():
    return render_template('telainicial.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        cnpj = request.form['cnpj']
        senha = request.form['senha']

        # Autentica o usuário com o controlador
        result = login_controller.authenticate_user(cnpj, senha)

        if isinstance(result, dict):  # Sucesso no login
            return redirect(url_for('tela_inicial'))  # Redireciona para a página inicial
        else:
            flash(result)  # Exibe a mensagem de erro

    return render_template('index.html')  # Exibe a página de login em caso de GET

if __name__ == '__main__':
    app.run()