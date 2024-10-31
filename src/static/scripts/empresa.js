// Inicializar Firebase
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";
import firebaseConfig from "./firebaseConfig.js"; // Verifique se o arquivo firebaseConfig.js tem as configurações do Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
    const empresaCardsContainer = document.querySelector('.empresa-cards');

    // Função para criar nova empresa
    function criarEmpresa(nomeEmpresa) {
        const empresaRef = ref(storage, `CadastroDsk/${nomeEmpresa}/`);

        // Aqui criamos uma "pasta" no Storage
        uploadString(empresaRef, "").then((snapshot) => {
            console.log('Pasta criada para', nomeEmpresa);
            adicionarEmpresaAoDom(nomeEmpresa);
        }).catch((error) => {
            console.error("Erro ao criar pasta no Storage:", error);
        });
    }

    // Adicionar empresa ao DOM
    function adicionarEmpresaAoDom(nomeEmpresa) {
        const empresaCard = document.createElement('div');
        empresaCard.classList.add('empresa-card');
        empresaCard.textContent = nomeEmpresa;
        empresaCard.addEventListener('click', () => {
            alert(`Entrando na empresa ${nomeEmpresa}`);
            // Aqui você pode implementar a lógica para abrir uma nova aba sem redirecionamento
        });
        empresaCardsContainer.appendChild(empresaCard);
    }

    // Simulação de criação de empresa
    criarEmpresa('Empresa Teste'); // Teste inicial, substitua pelo nome da empresa real quando necessário
});
