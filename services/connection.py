import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Inicializando as credenciais e a aplicação Firebase
cred = credentials.Certificate('L:/Drivers/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')
firebase_admin.initialize_app(cred)

# Conectando ao Firestore
db = firestore.client()


# Escrevendo no Firestore
data = {
    'nome': 'Exemplo',
    'email': 'exemplo@email.com'
}
db.collection('usuarios').add(data)

# Lendo do Firestore
docs = db.collection('usuarios').stream()
for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')
