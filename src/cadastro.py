from flask import Flask, request, render_template, redirect, url_for
import re
from cadastroDskRepository import CadastroDskRepository

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('cadastro.html')

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    cnpj = request.form['CNPJ']
    email = request.form['email']
    senha = request.form['password']
    confirmar_senha = request.form['confirm_password']

    # Validação de senhas
    if senha != confirmar_senha:
        return "As senhas não correspondem!", 400

    # Validação de CNPJ (exemplo simples, você pode ajustar conforme necessário)
    if not re.match(r'\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}', cnpj):
        return "CNPJ inválido!", 400

    # Validação de e-mail
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        return "Email inválido!", 400

    data = {
        'cnpj': cnpj,
        'email': email,
        'senha': senha
    }

    # Usar o Controller para processar a inserção
    repository = CadastroDskRepository()
    success, doc_id = repository.create(data)

    if success:
        return redirect(url_for('index'))
    else:
        return "Erro ao cadastrar", 500
if __name__ == '__main__':
    app.run(debug=True)
