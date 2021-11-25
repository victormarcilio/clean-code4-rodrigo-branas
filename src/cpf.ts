function hasValidFormat(str: string) {
    return /^((\d{3}\.\d{3}\.\d{3}-\d\d)|\d{11})$/.exec(str);
}

function removeSymbols(str: string) {
    return str.replace(/\D/g, '');
}

export function validate(str: string) {
    if (!hasValidFormat(str))
        return false;
    str = removeSymbols(str);
    if (str.split("").every(c => c === str[0]))
        return false;
    let [d1, d2] = [0, 0];
    for (let nCount = 1; nCount < str.length - 1; nCount++) {
        const digito = parseInt(str[nCount - 1]);
        d1 = d1 + (11 - nCount) * digito;
        d2 = d2 + (12 - nCount) * digito;
    }
    let rest = d1 % 11;
    const dg1 = (rest < 2) ? 0 : 11 - rest;
    d2 += 2 * dg1;
    rest = d2 % 11;
    const dg2 = rest < 2 ? 0 : 11 - rest;
    const nDigVerific = str.substring(str.length - 2, str.length);
    const nDigResult = `${dg1}${dg2}`;
    return nDigVerific == nDigResult;
}
