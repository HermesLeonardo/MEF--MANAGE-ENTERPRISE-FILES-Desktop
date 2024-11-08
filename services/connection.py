import pyrebase
import firebase_admin
from firebase_admin import credentials
# from firebase_admin import firestore


cred = firebaseConfig = {
                        'apiKey': "AIzaSyBBcCTFtk892Y0KvaQoJtMdE33fhCFP-pU",
                        'authDomain': "testeleo-593ef.firebaseapp.com",
                        'databaseURL': "https://testeleo-593ef-default-rtdb.firebaseio.com",
                        'projectId': "testeleo-593ef",
                        'storageBucket': "testeleo-593ef.appspot.com",
                        'messagingSenderId': "215227786514",
                        'appId': "1:215227786514:web:e8f1eabba0c4f4e615bfcb"
}
firebase = pyrebase.initialize_app(cred)


# Inicializando as credenciais e a aplicação Firebase
def conexaofirebase():
    cred = credentials.Certificate('./key/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)

# Conectando ao Firestore
    # db = firestore.client()
    # return db

# Escrevendo no Firestore
# data = {
#     'nome': 'Exemplo',
#     'email': 'exemplo@email.com'
# }
# db.collection('usuarios').add(data)

# Lendo do Firestore
# docs = db.collection('usuarios').stream()
# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')
