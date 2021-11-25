export class CPF {
    private readonly digits: string;

    constructor(cpf_input: string) {
        this.digits = this.removeSymbols(cpf_input);
    }
    hasValidFormat(str: string) {
        return /^((\d{3}\.\d{3}\.\d{3}-\d\d)|\d{11})$/.exec(str);
    }

    removeSymbols(str: string) {
        return str.replace(/\D/g, '');
    }

    calculateDigit(cpf: string) {
        let acc = 0;
        for (let i = cpf.length - 1, multiply = 2; i >= 0; multiply++, i--)
            acc += multiply * parseInt(cpf[i]);
        const remainder = acc % 11;
        return remainder < 2 ? '0' : `${11 - remainder}`;
    }

    checkVerifierDigits(cpf: string) {
        const digit1 = this.calculateDigit(cpf.substr(0, 9));
        const digit2 = this.calculateDigit(cpf.substr(0, 10));
        return digit1 + digit2 == cpf.substr(cpf.length - 2);
    }

    hasDifferentChars(str: string) {
        return str.split("").some(c => c !== str[0]);
    }

    validate(str: string) {
        if (!this.hasValidFormat(str))
            return false;
        str = this.removeSymbols(str);
        return this.hasDifferentChars(str) && this.checkVerifierDigits(str);
    }
}
