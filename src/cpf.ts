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

export function validate(str: string) {
    if (!hasValidFormat(str))
        return false;
    str = removeSymbols(str);
    if (str.split("").every(c => c === str[0]))
        return false;
    const digit1 = calculateDigit(str.substr(0, 9));
    const digit2 = calculateDigit(str.substr(0, 10));
    return digit1 + digit2 == str.substr(str.length - 2);
}
