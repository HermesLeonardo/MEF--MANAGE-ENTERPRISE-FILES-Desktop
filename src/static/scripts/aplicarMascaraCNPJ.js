function aplicarMascaraCNPJ(input) {
    const cnpj = input.value.replace(/\D/g, '');
    const tamanho = cnpj.length;

    if (tamanho <= 2) {
        input.value = cnpj;
    } else if (tamanho <= 5) {
        input.value = cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5);
    } else if (tamanho <= 8) {
        input.value = cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5) + '.' + cnpj.slice(5, 8);
    } else if (tamanho <= 12) {
        input.value = cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5) + '.' + cnpj.slice(5, 8) + '/' + cnpj.slice(8, 12);
    } else {
        input.value = cnpj.slice(0, 2) + '.' + cnpj.slice(2, 5) + '.' + cnpj.slice(5, 8) + '/' + cnpj.slice(8, 12) + '-' + cnpj.slice(12, 14);
    }
}
