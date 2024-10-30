from repository.cadastroDskRepository import CadastroDskRepository


class CadastroDskController:

    def __init__(self):
        self.repository = CadastroDskRepository()

    def create_register(self, data):
        # Chamando a função de criação no repository
        self.repository.create(data)

    def get_registers(self):
        # Chamando a função para ler todos os documentos
        return self.repository.read_all()

    def update_register(self, doc_id, data):
        # Chamando a função de atualização no repository
        self.repository.update(doc_id, data)

    def delete_register(self, doc_id):
        # Chamando a função de exclusão no repository
        self.repository.delete(doc_id)

