// Validadores de CPF e CNPJ

/**
 * Valida CPF
 * @param {string} cpf - CPF para validar (com ou sem formatação)
 * @returns {boolean} - true se válido, false se inválido
 */
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
        return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
        return false;
    }

    return true;
}

/**
 * Valida CNPJ
 * @param {string} cnpj - CNPJ para validar (com ou sem formatação)
 * @returns {boolean} - true se válido, false se inválido
 */
function validarCNPJ(cnpj) {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // Verifica se tem 14 dígitos
    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
    }

    // Validação do segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(1))) {
        return false;
    }

    return true;
}

/**
 * Formata CPF (###.###.###-##)
 * @param {string} cpf - CPF sem formatação
 * @returns {string} - CPF formatado
 */
function formatarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata CNPJ (##.###.###/####-##)
 * @param {string} cnpj - CNPJ sem formatação
 * @returns {string} - CNPJ formatado
 */
function formatarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/**
 * Adiciona validação em tempo real a um campo de CPF
 * @param {string} inputId - ID do campo de input
 */
function adicionarValidacaoCPF(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('blur', function() {
        const cpf = this.value;
        if (cpf && !validarCPF(cpf)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');

            // Adiciona mensagem de erro se não existir
            let feedback = this.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = 'CPF inválido';
                this.parentNode.insertBefore(feedback, this.nextSibling);
            }
        } else if (cpf) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            // Formata o CPF
            this.value = formatarCPF(cpf);
        }
    });

    // Permite apenas números
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d.-]/g, '');
    });
}

/**
 * Adiciona validação em tempo real a um campo de CNPJ
 * @param {string} inputId - ID do campo de input
 */
function adicionarValidacaoCNPJ(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('blur', function() {
        const cnpj = this.value;
        if (cnpj && !validarCNPJ(cnpj)) {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');

            // Adiciona mensagem de erro se não existir
            let feedback = this.nextElementSibling;
            if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                feedback = document.createElement('div');
                feedback.className = 'invalid-feedback';
                feedback.textContent = 'CNPJ inválido';
                this.parentNode.insertBefore(feedback, this.nextSibling);
            }
        } else if (cnpj) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            // Formata o CNPJ
            this.value = formatarCNPJ(cnpj);
        }
    });

    // Permite apenas números
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^\d./-]/g, '');
    });
}
