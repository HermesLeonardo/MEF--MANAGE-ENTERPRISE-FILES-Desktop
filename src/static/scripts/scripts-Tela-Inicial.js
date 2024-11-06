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

// Funções de controle do popup de editar empresa
function abrirPopupEditarEmpresa(empresa) {
    const editarContainer = document.getElementById("detalhesEmpresa");
    document.getElementById("popupDetalhes").style.display = "flex";
    document.getElementById("nomeEmpresaEditar").value = empresa.name || ""; // Evita 'undefined'
    document.getElementById("quantidadeFuncionariosEditar").value = empresa.employees || ""; // Evita 'undefined'
    document.getElementById("empresaIdEditar").value = empresa.id || ""; // Adiciona ID para edição
    document.getElementById("popupEditarEmpresa").style.display = "flex";
    editarContainer.innerHTML = `
        <p><strong>Nome:</strong> ${empresa.name || "Nome não disponível"}</p>
        <p><strong>Funcionários:</strong> ${empresa.employees || 0}</p>
        
    `;

}

function fecharPopupEditarEmpresa() {
    document.getElementById("popupEditarEmpresa").style.display = "none";
}

// Funções de controle do popup de excluir empresa
function abrirPopupExcluirEmpresa(empresa) {
    document.getElementById("empresaNomeExcluir").innerText = empresa.name || "Nome não disponível"; // Evita 'undefined'
    document.getElementById("empresaIdExcluir").value = empresa.id || ""; // Adiciona ID para exclusão
    document.getElementById("popupExcluirEmpresa").style.display = "flex";
}

function fecharPopupExcluirEmpresa() {
    document.getElementById("popupExcluirEmpresa").style.display = "none";
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
            <p>Funcionários: ${empresa.employees || 0}</p>
            <button class="botao" onclick="abrirPopupExcluirEmpresa(empresa); event.stopPropagation();">Excluir</button>
            <button class="botao" onclick="abrirPopupEditarEmpresa(empresa); event.stopPropagation();">Editar</button>
        `;
        empresasContainer.appendChild(card);
    });
}

async function adicionarNovaEmpresa() {
    const nomeEmpresa = document.getElementById("nomeEmpresa").value;
    const quantidadeFuncionarios = document.getElementById("quantidadeFuncionarios").value;

    if (nomeEmpresa && quantidadeFuncionarios) {
        const novaEmpresa = {
            name: nomeEmpresa,
            employees: quantidadeFuncionarios,
        };

        try {
            const response = await fetch('/create-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaEmpresa),
            });

            if (response.ok) {
                const empresaCriada = await response.json();
                todasEmpresas.push(empresaCriada.empresa);
                empresas.push(empresaCriada.empresa);
                adicionarEmpresaRecente(empresaCriada.empresa);
                fecharPopupAdicionarEmpresa();
                atualizarInterfaceEmpresas();
            } else {
                alert('Erro ao cadastrar nova empresa');
            }
        } catch (error) {
            console.error('Erro ao cadastrar empresa:', error);
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

async function excluirEmpresa() {
    const empresaId = document.getElementById("empresaIdExcluir").value;

    try {
        const response = await fetch('/delete-company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: empresaId, password: 'senha123' }),
        });

        if (response.ok) {
            empresas = empresas.filter((empresa) => empresa.id !== empresaId);
            todasEmpresas = todasEmpresas.filter((empresa) => empresa.id !== empresaId);
            fecharPopupExcluirEmpresa();
            atualizarInterfaceEmpresas();
        } else {
            alert('Erro ao excluir empresa');
        }
    } catch (error) {
        console.error('Erro ao excluir empresa:', error);
    }
}

async function editarEmpresa() {
    const empresaId = document.getElementById("empresaIdEditar").value;
    const nomeEmpresa = document.getElementById("nomeEmpresaEditar").value;
    const quantidadeFuncionarios = document.getElementById("quantidadeFuncionariosEditar").value;

    if (nomeEmpresa && quantidadeFuncionarios) {
        try {
            const response = await fetch('/edit-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: empresaId, name: nomeEmpresa, employees: quantidadeFuncionarios }),
            });

            if (response.ok) {
                const empresaAtualizada = await response.json();
                const empresaIndex = empresas.findIndex((e) => e.id === empresaId);
                empresas[empresaIndex] = empresaAtualizada.empresa;
                fecharPopupEditarEmpresa();
                atualizarInterfaceEmpresas();
            } else {
                alert('Erro ao editar empresa');
            }
        } catch (error) {
            console.error('Erro ao editar empresa:', error);
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function mostrarDetalhesEmpresa(empresa) {
    const detalhesContainer = document.getElementById("detalhesEmpresa");
    detalhesContainer.innerHTML = `
        <p><strong>Nome:</strong> ${empresa.name || "Nome não disponível"}</p>
        <p><strong>Funcionários:</strong> ${empresa.employees || 0}</p>
        <p><strong>Tamanho dos Arquivos:</strong> ${empresa.tamanhoArquivos || 0} MB</p>
        <p><strong>Última Atualização:</strong> ${empresa.ultimaAtualizacao || 'Nunca'}</p>
        <button class="botao" onclick="abrirPopupExcluirEmpresa(empresa)">Excluir</button>
        <button class="botao" onclick="abrirPopupEditarEmpresa(empresa)">Editar</button>
    `;
    document.getElementById("popupDetalhes").style.display = "flex";

    adicionarEmpresaRecente(empresa);
}

function fecharPopupDetalhes() {
    document.getElementById("popupDetalhes").style.display = "none";
}

function adicionarEmpresaRecente(empresa) {
    const empresaRecente = {
        name: empresa.name || "Nome não disponível",
        employees: empresa.employees || 0,
        tamanhoArquivos: empresa.tamanhoArquivos || 0,
        ultimaAtualizacao: empresa.ultimaAtualizacao || 'Nunca'
    };

    empresasRecentes.unshift(empresaRecente);
    if (empresasRecentes.length > 5) {
        empresasRecentes.pop();
    }
    atualizarEmpresasRecentes();
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

// var max_index = 1 + (offset + limit);
var max_index = 5;

// Função para exibir os numeros as paginas, conforme precisar
function displayPagesButtons() {
    $('.pages_buttons button').remove();
    //$(".pages_buttons").append("<button>Previous</button>");
    for (var i = 1; i <= max_index; i++) {
        $('.pages_buttons').append('<button onclick="pages(' + i + ')" index"' + i + '">' + i + '</button>')
    }
}

displayPagesButtons();

// Funções de navegação entre as páginas
function proximo() {
    if (offset + limit < empresas.length) {
        offset += limit;
        atualizarInterfaceEmpresas();
    }
}

function anterior() {
    if (offset > 0) {
        offset -= limit;
        atualizarInterfaceEmpresas();
    }
}

// Função para pular as paginas
function pages(page) {
    offset = page
    if (offset + limit < empresas.length) {
        offset += limit;
        atualizarInterfaceEmpresas();
    }
}

// Inicializa as empresas exibidas e todas as empresas
carregarEmpresas();
atualizarEmpresasRecentes();
