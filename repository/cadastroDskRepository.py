import firebase_admin
import firebase_admin

from firebase_admin import firestore


class CadastroDskRepository:
    def __init__(self):
        self.db = firestore.client()
        self.collection_ref = self.db.collection('CadastroDsk')

    
    def create(self, data):
        try:
            # Use o CNPJ como ID do documento
            cnpj = data.get('cnpj')
            doc_ref = self.collection_ref.document(cnpj).set(data)
            return True, cnpj
        except Exception as e:
            print(f"Erro ao adicionar documento: {e}")
            return False, None


    def read_all(self):
        try:
            # Buscar todos os documentos da coleção 'CadastroDsk'
            docs = self.collection_ref.stream()
            return [{doc.id: doc.to_dict()} for doc in docs]
        except Exception as e:
            print(f"Erro ao ler documentos: {e}")
            return []

    def update(self, doc_id, data):
        try:
            # Atualizar documento pelo ID
            doc_ref = self.collection_ref.document(doc_id)
            doc_ref.update(data)
            print(f"Documento {doc_id} atualizado com sucesso")
        except Exception as e:
            print(f"Erro ao atualizar documento: {e}")

    def delete(self, doc_id):
        try:
            # Excluir documento pelo ID
            self.collection_ref.document(doc_id).delete()
            print(f"Documento {doc_id} excluído com sucesso")
        except Exception as e:
            print(f"Erro ao excluir documento: {e}")
