import firebase_admin
from firebase_admin import credentials, firestore, storage

# Inicializando as credenciais e a aplicação Firebase
cred = credentials.Certificate('D:/drive/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'testeleo-593ef.appspot.com'  # Defina o nome do bucket do Storage
})

# Conectando ao Firestore
db = firestore.client()

# Conectando ao Storage
bucket = storage.bucket()

# Função para upload de arquivos ao Storage
def upload_file_to_storage(file_path, destination_blob_name):
    try:
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename(file_path)
        print(f'Arquivo {file_path} enviado para o Firebase Storage em {destination_blob_name}')
        return True
    except Exception as e:
        print(f'Erro ao enviar arquivo: {e}')
        return False
