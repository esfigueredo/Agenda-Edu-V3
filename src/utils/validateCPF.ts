export function validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais, o que é inválido para CPF
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf[i]) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) {
        digit1 = 0;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf[i]) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) {
        digit2 = 0;
    }

    // Verifica se os dígitos verificadores calculados são iguais aos fornecidos
    if (parseInt(cpf[9]) !== digit1 || parseInt(cpf[10]) !== digit2) {
        return false;
    }

    return true;
}
