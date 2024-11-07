// Funções de controle do popup de editar empresa
function abrirPopupEditarEmpresa(empresa) {
    fecharPopupDetalhes();
    document.getElementById("nomeEmpresaEditar").textContent = empresa.name || ""; // Evita 'undefined'
    //document.getElementById("quantidadeFuncionariosEditar").value = empresa.employees || ""; // Evita 'undefined'
    document.getElementById("empresaIdEditar").value = empresa.id || ""; // Adiciona ID para edição
    document.getElementById("popupEditarEmpresa").style.display = "flex";
}

function fecharPopupEditarEmpresa() {
    document.getElementById("popupEditarEmpresa").style.display = "none";
}

async function editarEmpresa() {
    const empresaId = document.getElementById("empresaIdEditar").value;
    const nomeEmpresa = document.getElementById("nomeEmpresaEditar").value;
    //const quantidadeFuncionarios = document.getElementById("quantidadeFuncionariosEditar").value;

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

async function enviarArquivo(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            alert('Arquivo enviado com sucesso!');
        } else {
            alert('Erro ao enviar arquivo');
        }
    } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
    }
}