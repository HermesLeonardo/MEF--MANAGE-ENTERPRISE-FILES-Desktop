import firebase_admin
from firebase_admin import credentials, firestore

class CadastroDskRepository:
    def __init__(self):
        if not firebase_admin._apps:
            cred = credentials.Certificate("L:/Drivers/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json")
            firebase_admin.initialize_app(cred)
        
        self.db = firestore.client()
        self.collection_ref = self.db.collection('CadastroDsk')

    def create(self, data):
        try:
            # Adiciona o documento à coleção e retorna o doc_ref
            doc_ref = self.collection_ref.add(data)
            return doc_ref  
            
        except Exception as e:
            print(f'Erro ao adicionar documento: {e}')
            return None  # Retorna None em caso de erro


    def read_all(self):
        try:
            docs = self.collection_ref.stream()
            return [{doc.id: doc.to_dict()} for doc in docs]
        except Exception as e:
            print(f"Erro ao ler documentos: {e}")
            return []

    def update(self, doc_id, data):
        try:
            doc_ref = self.collection_ref.document(doc_id)
            doc_ref.update(data)
            print(f"Documento {doc_id} atualizado com sucesso")
        except Exception as e:
            print(f"Erro ao atualizar documento: {e}")

    def delete(self, doc_id):
        try:
            self.collection_ref.document(doc_id).delete()
            print(f"Documento {doc_id} excluído com sucesso")
        except Exception as e:
            print(f"Erro ao excluir documento: {e}")
