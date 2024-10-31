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

function irParaConfiguracoes() {
    alert("Indo para as configurações");
}

// Funções de controle do popup de adicionar empresa
function abrirPopupAdicionarEmpresa() {
    document.getElementById("popupAdicionarEmpresa").style.display = "flex";
}

function fecharPopupAdicionarEmpresa() {
    document.getElementById("popupAdicionarEmpresa").style.display = "none";
}

// Array de empresas e empresas recentes
let empresas = []; // array exibido atualmente
let todasEmpresas = []; // array que mantém todas as empresas para restaurar após pesquisa
let empresasRecentes = [];
let offset = 0;
const limit = 6;

// Funções principais
function carregarEmpresas() {
    const empresasContainer = document.getElementById("empresas-container");
    empresasContainer.innerHTML = ""; // Limpa o container antes de renderizar
    const empresasPaginadas = empresas.slice(offset, offset + limit);
    
    empresasPaginadas.forEach((empresa) => {
        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => mostrarDetalhesEmpresa(empresa);
        card.innerHTML = `<h3>${empresa.nome}</h3><p>Funcionários: ${empresa.funcionarios}</p>`;
        empresasContainer.appendChild(card);
    });
}

function pesquisarEmpresas() {
    const query = document.querySelector(".search-bar").value.toLowerCase();

    if (query) {
        empresas = todasEmpresas.filter((empresa) => empresa.nome.toLowerCase().includes(query));
    } else {
        empresas = [...todasEmpresas]; // Restaura todas as empresas se o campo de busca estiver vazio
    }

    offset = 0;
    carregarEmpresas();
}

function adicionarNovaEmpresa() {
    const nomeEmpresa = document.getElementById("nomeEmpresa").value;
    const quantidadeFuncionarios = document.getElementById("quantidadeFuncionarios").value;
    
    if (nomeEmpresa && quantidadeFuncionarios) {
        const novaEmpresa = { 
            nome: nomeEmpresa, 
            funcionarios: quantidadeFuncionarios,
            tamanhoArquivos: 0, // Inicializa o tamanho dos arquivos em 0
            ultimaAtualizacao: "Nunca"
        };
        
        todasEmpresas.push(novaEmpresa); // Adiciona à lista completa de empresas
        empresas.push(novaEmpresa); // Adiciona à lista atual exibida
        adicionarEmpresaRecente(novaEmpresa); // Atualiza a lista de recentes
        fecharPopupAdicionarEmpresa();
        carregarEmpresas();
    }
}

// Função para simular o envio de arquivo
function enviarArquivo(empresa) {
    const tamanhoArquivo = Math.floor(Math.random() * 100) + 1; // Simula um tamanho de arquivo aleatório
    empresa.tamanhoArquivos += tamanhoArquivo; // Atualiza o tamanho total dos arquivos
    empresa.ultimaAtualizacao = new Date().toLocaleDateString("pt-BR"); // Atualiza a data de envio

    alert(`Arquivo de ${tamanhoArquivo}MB enviado para ${empresa.nome}`);
    atualizarEmpresasRecentes();
    mostrarDetalhesEmpresa(empresa);
}

// Paginação
function paginaAnterior() {
    if (offset > 0) {
        offset -= limit;
        carregarEmpresas();
    }
}

function proximaPagina() {
    if (offset + limit < empresas.length) {
        offset += limit;
        carregarEmpresas();
    }
}

// Funções para detalhes e empresas recentes
function mostrarDetalhesEmpresa(empresa) {
    const detalhesContainer = document.getElementById("detalhesEmpresa");
    detalhesContainer.innerHTML = `
        <p><strong>Nome:</strong> ${empresa.nome}</p>
        <p><strong>Funcionários:</strong> ${empresa.funcionarios}</p>
        <p><strong>Tamanho dos Arquivos:</strong> ${empresa.tamanhoArquivos} MB</p>
        <p><strong>Última Atualização:</strong> ${empresa.ultimaAtualizacao}</p>
        <button onclick="enviarArquivo(empresas.find(e => e.nome === '${empresa.nome}'))">Enviar Arquivo</button>
    `;
    document.getElementById("popupDetalhes").style.display = "flex";

    adicionarEmpresaRecente(empresa); // Atualiza a lista de recentes ao visualizar os detalhes
}

function fecharPopupDetalhes() {
    document.getElementById("popupDetalhes").style.display = "none";
}

function adicionarDocumento() {
    alert("Documento adicionado!");
}

// Função para adicionar uma empresa à lista de recentes
function adicionarEmpresaRecente(empresa) {
    const empresaRecente = {
        nome: empresa.nome,
        funcionarios: empresa.funcionarios,
        tamanhoArquivos: empresa.tamanhoArquivos,
        ultimaAtualizacao: empresa.ultimaAtualizacao
    };

    empresasRecentes.unshift(empresaRecente);
    if (empresasRecentes.length > 5) {
        empresasRecentes.pop();
    }
    atualizarEmpresasRecentes();
}

// Função para atualizar a interface de empresas recentes
function atualizarEmpresasRecentes() {
    const recentFilesContainer = document.getElementById("recent-files-container");
    recentFilesContainer.innerHTML = ""; // Limpa o container antes de renderizar
    
    empresasRecentes.forEach((empresa) => {
        const row = document.createElement("div");
        row.className = "recent-file-row";
        row.innerHTML = `
            <span>${empresa.nome}</span>
            <span>${empresa.funcionarios} funcionários</span>
            <span>${empresa.tamanhoArquivos} MB</span>
            <span>${empresa.ultimaAtualizacao}</span>
        `;
        recentFilesContainer.appendChild(row);
    });
}

// Inicializa as empresas exibidas e todas as empresas
carregarEmpresas();
atualizarEmpresasRecentes();
