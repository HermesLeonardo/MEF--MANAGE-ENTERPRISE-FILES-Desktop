// Funções de controle do popup de excluir empresa
function abrirPopupExcluirEmpresa(empresa) {
    fecharPopupDetalhes();
    document.getElementById("empresaNomeExcluir").innerText = empresa.name || "Nome não disponível";
    document.getElementById("empresaIdExcluir").value = empresa.id || "";
    document.getElementById("popupExcluirEmpresa").style.display = "flex";
}

function fecharPopupExcluirEmpresa() {
    document.getElementById("popupExcluirEmpresa").style.display = "none";
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