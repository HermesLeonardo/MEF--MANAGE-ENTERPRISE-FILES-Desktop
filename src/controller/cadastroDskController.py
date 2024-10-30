from repository.cadastroDskRepository import CadastroDskRepository

class CadastroDskController:
    def __init__(self):
        self.repository = CadastroDskRepository()

    def create_register(self, cnpj, email, senha):
        # Montando os dados a serem enviados
        data = {
            'cnpj': cnpj,
            'email': email,
            'senha': senha
        }
        print(f'Dados a serem enviados ao Firestore: {data}')  # Print para verificar os dados
        
        # Chamando a função de criação no repositório
        success, doc_ref = self.repository.create(data)
        
        if success and doc_ref:  # Verifica se o doc_ref não é None
            print(f"Documento adicionado com ID: {doc_ref.id}")  # Sucesso na adição
            return doc_ref  # Retorna o doc_ref, que possui o ID
        else:
            print("Erro ao cadastrar")
            return None  # Retorna None em caso de erro
        
        

    def get_registers(self):
        # Chamando a função para ler todos os documentos
        return self.repository.read_all()

    def update_register(self, doc_id, data):
        # Chamando a função de atualização no repositório
        self.repository.update(doc_id, data)

    def delete_register(self, doc_id):
        # Chamando a função de exclusão no repositório
        self.repository.delete(doc_id)
