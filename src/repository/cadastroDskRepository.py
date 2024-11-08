import firebase_admin
from firebase_admin import credentials, firestore, storage

class CadastroDskRepository:
    def __init__(self):
        if not firebase_admin._apps:
            cred = credentials.Certificate('./key/testeleo-593ef-firebase-adminsdk-hfnz1-bbcec932a2.json')
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'testeleo-593ef.appspot.com'  # Insira o bucket do Firebase Storage
            })
        
        self.db = firestore.client()
        self.collection_ref = self.db.collection('CadastroDsk')
        self.bucket = storage.bucket()  # Referência ao bucket do Firebase Storage

    def create(self, data):
        try:
            doc_ref = self.collection_ref.add(data)
            return doc_ref  
        except Exception as e:
            print(f'Erro ao adicionar documento: {e}')
            return None

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

    def create_subdirectory(self, parent_directory, subdirectory_name):
        try:
            # Cria uma referência ao novo subdiretório
            path = f"{parent_directory}/{subdirectory_name}/"
            blob = self.bucket.blob(path)
            blob.upload_from_string('')  # Cria o diretório vazio
            print(f"Subdiretório '{subdirectory_name}' criado com sucesso em '{parent_directory}'")
        except Exception as e:
            print(f"Erro ao criar subdiretório: {e}")

    def delete_subdirectory(self, parent_directory, subdirectory_name):
        try:
            path = f"{parent_directory}/{subdirectory_name}/"
            blobs = self.bucket.list_blobs(prefix=path)
            
            for blob in blobs:
                blob.delete()  # Exclui cada arquivo/pasta dentro do subdiretório
            
            print(f"Subdiretório '{subdirectory_name}' excluído com sucesso em '{parent_directory}'")
        except Exception as e:
            print(f"Erro ao excluir subdiretório: {e}")

