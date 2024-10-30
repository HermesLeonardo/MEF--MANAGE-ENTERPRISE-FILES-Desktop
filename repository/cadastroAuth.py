import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

#from flask import Flask, request, render_template, redirect, url_for
from firebase_admin import auth
from services.connection import conexaofirebase
from services.connection import firebase

def cadastroAuth(email, password):
    conexaofirebase() 
    user = auth.create_user(
    email=email,
    password=password,
    )
    print("Cadastro com sucesso!".format(user.uid))

#cadastroAuth('leo@gmail.com', '654321')

#Auth = firebase.auth() 

def loginAuth():
    conexaofirebase()
    email = input("Email..:")
    password = input("Senha..:")
    print("Verificando...")
    try:
        login = Auth.sign_in_with_email_and_password(email,password)
        print("Sucesso")
    except:
         print("Erro")
    return

loginAuth()

#API_KEY = credentials.Certificate('C:/UNIFIO-INTEGRADOR/pintregador/pi-6T/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')

    # url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"

    # payload = {
    #     "email": email,
    #     "password": password,
    #     "returnSecureToken": True
    # }

    # response = requests.post(url, json=payload)

    # if response.status_code == 200:
    #     data = response.json()
    #     print("Sucesso! Usuário autenticado.")
    #     print("ID Token:", data['idToken'])
    # else:
    #     print("Erro na autenticação:", response.json().get("error", {}).get("message", "Erro desconhecido"))