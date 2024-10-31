async function criarSubdiretorio(nomeEmpresa, nomeSubdiretorio) {
    try {
        const response = await fetch(`/criar-subdiretorio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomeEmpresa, nomeSubdiretorio })
        });
        if (response.ok) {
            alert('Subdiretório criado com sucesso!');
        } else {
            alert('Erro ao criar subdiretório.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Event listener para o botão de criação de subdiretório
document.getElementById('botaoCriarSubdiretorio').addEventListener('click', () => {
    const nomeEmpresa = document.getElementById('company-name-title').innerText.replace('Detalhes de ', '');
    const nomeSubdiretorio = document.getElementById('nomeSubdiretorio').value;
    if (nomeSubdiretorio.trim()) {
        criarSubdiretorio(nomeEmpresa, nomeSubdiretorio);
    } else {
        alert("Por favor, insira um nome para o subdiretório.");
    }
});
