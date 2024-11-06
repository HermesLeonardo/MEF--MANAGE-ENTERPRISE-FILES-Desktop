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

// Funções de controle do popup de adicionar empresa
function abrirPopupAdicionarEmpresa() {
    document.getElementById("popupAdicionarEmpresa").style.display = "flex";
}

function fecharPopupAdicionarEmpresa() {
    document.getElementById("popupAdicionarEmpresa").style.display = "none";
}

// Funções de controle do popup de editar empresa
function abrirPopupEditarEmpresa(empresa) {
    document.getElementById("nomeEmpresaEditar").value = empresa.name || ""; // Evita 'undefined'
    document.getElementById("empresaIdEditar").value = empresa.id || ""; // Adiciona ID para edição
    document.getElementById("popupEditarEmpresa").style.display = "flex";
}

function fecharPopupEditarEmpresa() {
    document.getElementById("popupEditarEmpresa").style.display = "none";
}

// Funções de controle do popup de excluir empresa
function abrirPopupExcluirEmpresa(empresa) {
    document.getElementById("empresaNomeExcluir").innerText = empresa.name || "Nome não disponível";
    document.getElementById("empresaIdExcluir").value = empresa.id || "";
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
            <button class="botao" onclick="abrirPopupExcluirEmpresa(empresa); event.stopPropagation();">Excluir</button>
            <button class="botao" onclick="abrirPopupEditarEmpresa(empresa); event.stopPropagation();">Editar</button>
        `;
        empresasContainer.appendChild(card);
    });
}
async function adicionarNovaEmpresa() {
    const nomeEmpresa = document.getElementById("nomeEmpresa").value;

    if (nomeEmpresa) {
        const novaEmpresa = { name: nomeEmpresa };

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

    if (nomeEmpresa) {
        try {
            const response = await fetch('/edit-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: empresaId, name: nomeEmpresa }),
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
        tamanhoArquivos: empresa.tamanhoArquivos || 0,
        ultimaAtualizacao: empresa.ultimaAtualizacao || 'Nunca',
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
            <span>${empresa.tamanhoArquivos} MB</span>
            <span>${empresa.ultimaAtualizacao}</span>
        `;
        recentFilesContainer.appendChild(row);
    });
}
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

// Inicializa as empresas exibidas e todas as empresas
carregarEmpresas();
atualizarEmpresasRecentes();
