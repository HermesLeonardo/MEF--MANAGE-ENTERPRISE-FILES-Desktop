// Funções de controle do popup de adicionar empresa
function abrirPopupAdicionarEmpresa() {
    document.getElementById("popupAdicionarEmpresa").style.display = "flex";
}

function fecharPopupAdicionarEmpresa() {
    document.getElementById("popupAdicionarEmpresa").style.display = "none";
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