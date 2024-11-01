import firebase_admin
from firebase_admin import credentials, firestore, storage

class LoginDskRepository:
    def __init__(self, ):

        if not firebase_admin._apps:
            cred = credentials.Certificate("C:/UNIFIO-INTEGRADOR/pintregador/pi-6T/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json")
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'testeleo-593ef.appspot.com'  # Insira o bucket do Firebase Storage
            })
        self.db = firestore.client()
        self.collection_ref = self.db.collection('CadastroDsk')

    def login(self, cnpj, senha):
        try:
            # Realiza uma consulta para buscar o documento com o CNPJ e senha correspondentes
            query = self.collection_ref.where('cnpj', '==', cnpj).where('senha', '==', senha).stream()
            
            # Verifica se algum documento foi encontrado
            for doc in query:
                print(f"Usuário {doc.id} autenticado com sucesso")
                return doc.to_dict()  # Retorna os dados do usuário encontrado
            
            print(f"CNPJ recebido: {cnpj}")
            print(f"Senha recebida: {senha}")
            # Se não encontrou nenhum documento, retorna uma mensagem
            print("CNPJ ou senha incorretos(Repository)")
            return None

        except Exception as e:
            print(f"Erro ao realizar login: {e}")
            return None