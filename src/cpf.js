function validate(str) {
    if (str === null)
        return false;
    if (str === undefined)
        return false;
    if (str.length < 11 || str.length > 14)
        return false;
    str = str
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
        .replace(" ", "");
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
    const nDigResult = "" + dg1 + "" + dg2;
    return nDigVerific == nDigResult;

}

module.exports = { validate };
