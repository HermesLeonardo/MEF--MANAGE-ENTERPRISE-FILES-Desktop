import firebase_admin
from firebase_admin import credentials, firestore

# Inicializando as credenciais e a aplicação Firebase
cred = credentials.Certificate('L:/Drivers/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')
firebase_admin.initialize_app(cred)

# Conectando ao Firestore
db = firestore.client()

# Dados de teste a serem adicionados ao Firestore
data = {
    'cnpj': '12.345.678/0001-95',
    'email': 'exemplo@email.com',
    'senha': 'minhaSenha'
}

# Escrevendo no Firestore
try:
    doc_ref = db.collection('CadastroDsk').add(data)
    print(f'Documento adicionado com ID: {doc_ref.id}')
except Exception as e:
    print(f'Erro ao adicionar documento: {e}')

# Lendo do Firestore
try:
    docs = db.collection('CadastroDsk').stream()
    for doc in docs:
        print(f'{doc.id} => {doc.to_dict()}')
except Exception as e:
    print(f'Erro ao ler documentos: {e}')
