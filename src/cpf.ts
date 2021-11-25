function hasValidFormat(str: string) {
    return /^((\d{3}\.\d{3}\.\d{3}-\d\d)|\d{11})$/.exec(str);
}

function removeSymbols(str: string) {
    return str.replace(/\D/g, '');
}

export function calculateDigit(cpf: string) {
    let acc = 0;
    for (let i = cpf.length - 1, multiply = 2; i >= 0; multiply++, i--)
        acc += multiply * parseInt(cpf[i]);
    const remainder = acc % 11;
    return remainder < 2 ? '0' : `${11 - remainder}`;
}

function checkVerifierDigits(cpf: string) {
    const digit1 = calculateDigit(cpf.substr(0, 9));
    const digit2 = calculateDigit(cpf.substr(0, 10));
    return digit1 + digit2 == cpf.substr(cpf.length - 2);
}

function hasDifferentChars(str: string) {
    return str.split("").some(c => c !== str[0]);
}

export function validate(str: string) {
    if (!hasValidFormat(str))
        return false;
    str = removeSymbols(str);
    return hasDifferentChars(str) && checkVerifierDigits(str);
}
