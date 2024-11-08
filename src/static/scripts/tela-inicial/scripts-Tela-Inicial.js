// Funções de navegação para as opções da barra lateral
function irParaInicio() {
    alert("Indo para a página Início");
}

function irParaNotificacoes() {
    alert("Indo para a página Notificações");
}

function irParaPerfil() {
    alert("Indo para o perfil do usuário");
}

function abrirPopupConfiguracoes() {
    document.getElementById("popupConfiguracoes").style.display = "flex";
}

function fecharPopupConfiguracoes() {
    document.getElementById("popupConfiguracoes").style.display = "none";
}

// Função de pesquisa
function pesquisarEmpresas() {
    const termoPesquisa = document.querySelector('.search-bar').value.toLowerCase();
    const empresasFiltradas = todasEmpresas.filter(empresa =>
        empresa.name.toLowerCase().includes(termoPesquisa)
    );

    empresas = empresasFiltradas;
    atualizarInterfaceEmpresas();
}

// Função para alternar o modo escuro
function alternarModoEscuro() {
    const modoEscuroAtivado = document.getElementById("modoEscuroCheckbox").checked;
    if (modoEscuroAtivado) {
        document.body.classList.add("modo-escuro");
    } else {
        document.body.classList.remove("modo-escuro");
    }
}
// Array de empresas e empresas recentes
let empresas = [];
let todasEmpresas = [];
let empresasRecentes = [];
let offset = 0;
const limit = 6;

// Funções principais
async function carregarEmpresas() {
    try {
        const response = await fetch('/empresas', { method: 'GET' });
        const data = await response.json();
        todasEmpresas = data.empresas;
        empresas = todasEmpresas.map((empresa) => ({
            id: empresa.id,
            name: empresa.name || "Nome não disponível",
            employees: empresa.employees || 0,
            tamanhoArquivos: 0, // Adicione lógica para recuperar o tamanho dos arquivos
            ultimaAtualizacao: 'Nunca' // Adicione lógica para recuperar a data da última atualização
        }));
        atualizarInterfaceEmpresas();
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
    }
}

function atualizarInterfaceEmpresas() {
    const empresasContainer = document.getElementById("empresas-container");
    empresasContainer.innerHTML = "";
    const empresasPaginadas = empresas.slice(offset, offset + limit);

    empresasPaginadas.forEach((empresa) => {
        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => mostrarDetalhesEmpresa(empresa);
        card.innerHTML = `
            <h3>${empresa.name || "Nome não disponível"}</h3>
        `;

        empresasContainer.appendChild(card);
    });
}

function mostrarDetalhesEmpresa(empresa) {
    const detalhesContainer = document.getElementById("detalhesEmpresa");
    detalhesContainer.innerHTML = `
    <p><strong>Nome:</strong> ${empresa.name || "Nome não disponível"}</p>
    <p><strong>Funcionários:</strong> ${empresa.employees || 0}</p>
    <p><strong>Tamanho dos Arquivos:</strong> ${empresa.tamanhoArquivos || 0} MB</p>
    <p><strong>Última Atualização:</strong> ${empresa.ultimaAtualizacao || 'Nunca'}</p>
`;

    const excluirButton = document.createElement("button");
    excluirButton.className = "botao";
    excluirButton.textContent = "Excluir";
    excluirButton.addEventListener("click", () => abrirPopupExcluirEmpresa(empresa));

    const editarButton = document.createElement("button");
    editarButton.className = "botao";
    editarButton.textContent = "Editar";
    editarButton.addEventListener("click", () => abrirPopupEditarEmpresa(empresa));

    detalhesContainer.appendChild(excluirButton);
    detalhesContainer.appendChild(editarButton);

    document.getElementById("popupDetalhes").style.display = "flex";

    adicionarEmpresaRecente(empresa);
}

function fecharPopupDetalhes() {
    document.getElementById("popupDetalhes").style.display = "none";
}

function atualizarEmpresasRecentes() {
    const recentFilesContainer = document.getElementById("recent-files-container");
    recentFilesContainer.innerHTML = "";

    empresasRecentes.forEach((empresa) => {
        const row = document.createElement("div");
        row.className = "recent-file-row";
        row.innerHTML = `
            <span>${empresa.name}</span>
            <span>${empresa.employees} funcionários</span>
            <span>${empresa.tamanhoArquivos} MB</span>
            <span>${empresa.ultimaAtualizacao}</span>
        `;
        recentFilesContainer.appendChild(row);
    });
}

// Inicializa as empresas exibidas e todas as empresas
carregarEmpresas();
atualizarEmpresasRecentes();