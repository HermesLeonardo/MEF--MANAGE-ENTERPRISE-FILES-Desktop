document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const addCompanyButton = document.getElementById('add-company-button');
    const companyModal = document.getElementById('company-modal');
    const closeModal = document.getElementById('close-modal');
    const companyForm = document.getElementById('company-form');
    const companiesList = document.getElementById('companies');

    // Elementos do modal de detalhes da empresa
    const companyDetailsModal = document.getElementById('company-details-modal');
    const backButton = document.getElementById('back-button');
    const companyNameTitle = document.getElementById('company-name');
    const companyDetails = document.getElementById('company-details');

    // Elementos do modal de confirmação de exclusão
    const deleteConfirmationModal = document.getElementById('confirmation-modal');
    const confirmDeleteButton = document.getElementById('confirm-delete-button');
    const deletePasswordInput = document.getElementById('confirmation-password');
    let selectedCompanyName = null;

    // Elementos do modal para adicionar subpasta
    const addSubfolderModal = document.getElementById('add-subfolder-modal');
    const addSubfolderButton = document.getElementById('add-subfolder-button');
    const closeSubfolderModal = document.getElementById('close-add-subfolder-modal');
    const subfolderForm = document.getElementById('subfolder-form');

    // Abrir e fechar barra lateral
    toggleSidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Abrir modal de nova empresa
    addCompanyButton.addEventListener('click', () => {
        companyModal.style.display = 'block';
    });

    // Fechar modal de cadastro
    closeModal.addEventListener('click', () => {
        companyModal.style.display = 'none';
    });

    // Cadastro de nova empresa
    companyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('company-name').value;
        const employees = document.getElementById('company-employees').value;

        try {
            const response = await fetch('/create-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, employees })
            });
            const result = await response.json();

            if (result.success) {
                addCompanyToUI(name); // Atualiza a UI com a nova empresa
                companyModal.style.display = 'none'; // Fecha o modal
            } else {
                alert('Erro ao criar empresa: ' + result.error || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar empresa. Tente novamente.');
        }
    });

    // Função para abrir o modal de detalhes da empresa
    function openCompanyDetails(name) {
        companyNameTitle.innerText = `Detalhes de ${name}`;
        companyDetails.innerHTML = `<p>Informações da Empresa: ${name}</p>`;
        companyDetailsModal.style.display = 'block';
    }

    // Função para criar o cartão de empresa na UI
    function addCompanyToUI(name) {
        const companyCard = document.createElement('div');
        companyCard.classList.add('company-card');
        companyCard.innerHTML = `
            <h3>${name}</h3>
            <p>Funcionários: Indisponível</p>
            <p>Última atualização: ${new Date().toLocaleDateString()}</p>
            <button class="delete-company-button" data-company-name="${name}">Excluir</button>
        `;

        // Função para abrir o modal de confirmação de exclusão
        const deleteButton = companyCard.querySelector('.delete-company-button');
        deleteButton.onclick = () => openDeleteConfirmation(name);

        companyCard.onclick = () => openCompanyDetails(name);
        companiesList.appendChild(companyCard);
    }

    // Função para carregar empresas cadastradas
    async function loadCompanies() {
        try {
            const response = await fetch('/empresas');
            if (response.ok) {
                const result = await response.json();
                result.empresas.forEach(company => addCompanyToUI(company));
            } else {
                console.error('Erro ao recuperar as empresas');
                alert('Erro ao carregar empresas. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar ao servidor. Tente novamente.');
        }
    }

    // Fechar modal de detalhes ao clicar em "Voltar"
    backButton.addEventListener('click', () => {
        companyDetailsModal.style.display = 'none';
    });

    // Carregar as empresas ao carregar a página
    loadCompanies();

    // Função para abrir modal de confirmação de exclusão
    function openDeleteConfirmation(companyName) {
        selectedCompanyName = companyName;
        deleteConfirmationModal.style.display = 'block';
    }

    // Fechar o modal de exclusão ao clicar no "X"
    document.getElementById('close-confirmation-modal').addEventListener('click', () => {
        deleteConfirmationModal.style.display = 'none';
    });

    // Confirmação de exclusão com senha
    confirmDeleteButton.addEventListener('click', async () => {
        const password = deletePasswordInput.value;

        try {
            const response = await fetch('/delete-company', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: selectedCompanyName, password })
            });

            const result = await response.json();
            if (result.success) {
                alert('Diretório excluído com sucesso!');
                location.reload(); // Recarregar para atualizar a lista de empresas
            } else {
                alert('Falha na exclusão: ' + result.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao excluir empresa. Tente novamente.');
        }
        deleteConfirmationModal.style.display = 'none';
    });

    // Abrir modal para adicionar subpasta
    addSubfolderButton.addEventListener('click', () => {
        addSubfolderModal.style.display = 'block';
    });

    // Fechar modal de subpasta
    closeSubfolderModal.addEventListener('click', () => {
        addSubfolderModal.style.display = 'none';
    });

    // Criar subpasta
    subfolderForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const subfolderName = document.getElementById('subfolder-name').value;

        try {
            const response = await fetch('/create-subfolder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ companyName: selectedCompanyName, subfolderName })
            });

            const result = await response.json();
            if (result.success) {
                alert('Subpasta criada com sucesso!');
                addSubfolderModal.style.display = 'none'; // Fecha o modal
                // Aqui você pode atualizar a UI, se necessário
            } else {
                alert('Erro ao criar subpasta: ' + result.error);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao criar subpasta. Tente novamente.');
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const adicionarPastaBtn = document.getElementById('adicionarPastaBtn');
        const excluirEmpresaBtn = document.getElementById('excluirEmpresaBtn');

        if (adicionarPastaBtn) {
            adicionarPastaBtn.addEventListener('click', function () {
                // Lógica para adicionar pasta
                console.log("Botão 'Adicionar Pasta' clicado");
            });
        }

        if (excluirEmpresaBtn) {
            excluirEmpresaBtn.addEventListener('click', function () {
                // Lógica para excluir empresa
                console.log("Botão 'Excluir Empresa' clicado");
            });
        }
    });

    function openCompanyDetails(name) {
        companyNameTitle.innerText = `Detalhes de ${name}`;
        companyDetails.innerHTML = `<p>Informações da Empresa: ${name}</p>`;
        companyDetailsModal.style.display = 'block';
    }



});
