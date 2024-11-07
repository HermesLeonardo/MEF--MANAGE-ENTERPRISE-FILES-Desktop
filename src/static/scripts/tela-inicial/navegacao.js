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
