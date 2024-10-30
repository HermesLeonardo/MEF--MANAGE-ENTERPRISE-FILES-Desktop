// Função para abrir/fechar a barra lateral
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');

    sidebar.classList.toggle('open');
    
    // Mudar a cor do botão para branco quando a barra lateral estiver aberta
    if (sidebar.classList.contains('open')) {
        toggleBtn.style.color = '#fff';
    } else {
        toggleBtn.style.color = '#333';
    }
}

// Funções de navegação para as opções da barra lateral
function irParaInicio() {
    alert("Indo para a página Início");
}

function irParaNotificacoes() {
    alert("Indo para a página Notificações");
}

function irParaPerfil() {
    alert("Indo para a página Perfil");
}

function irParaConfiguracoes() {
    alert("Indo para a página Configurações");
}

// Variáveis de controle de paginação
let offset = 0;
const limit = 3; // Número de empresas por página (ajuste conforme necessário)

// Função para carregar empresas
function carregarEmpresas() {
    fetch(`/api/empresas?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            atualizarEmpresasNoFront(data);
        });
}

// Função para atualizar o conteúdo das empresas
function atualizarEmpresasNoFront(empresas) {
    const empresasContainer = document.getElementById("empresas-container");
    empresasContainer.innerHTML = ''; // Limpa o conteúdo existente

    empresas.forEach(empresa => {
        const empresaDiv = document.createElement("div");
        empresaDiv.className = "card";
        empresaDiv.innerHTML = `
            <h3>${empresa.nome}</h3>
            <p>${empresa.data}</p>
            <p>Funcionários: ${empresa.funcionarios}</p>
        `;
        empresasContainer.appendChild(empresaDiv);
    });
}

// Funções de navegação para a paginação
function proximaPagina() {
    offset += limit;
    carregarEmpresas();
}

function paginaAnterior() {
    if (offset >= limit) offset -= limit;
    carregarEmpresas();
}

// Carregar as empresas iniciais
carregarEmpresas();
