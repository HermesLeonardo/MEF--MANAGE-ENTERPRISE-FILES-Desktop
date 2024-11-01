from repository.loginDskRepository import LoginDskRepository

class loginDskController:
    def __init__(self):
        self.repository = LoginDskRepository()
    
    def authenticate_user(self, cnpj, senha):
        """
        Tenta autenticar um usuário com base no CNPJ e senha fornecidos.
        Retorna o dicionário de dados do usuário se autenticado com sucesso,
        ou uma mensagem de erro caso contrário.
        """
        user_data = self.repository.login(cnpj, senha)
        if user_data:
            return user_data  # Usuário autenticado com sucesso
        else:
            return "CNPJ ou senha incorretos(Controller)"  # Caso o CNPJ ou senha esteja errado