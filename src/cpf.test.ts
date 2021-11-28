import { CPF } from "./cpf";

test("Must return false when cpf has less than 11 characters", () => {
    const cpf_input = "0000";
    expect(() => new CPF(cpf_input)).toThrow();
});

test("Must return false when cpf has more than 14 characters", () => {
    const cpf_input = "0000000000000000";
    expect(() => new CPF(cpf_input)).toThrow();
});

test("Must throw when all digits are the same", () => {
    const cpf_input = "000.000.000-00";
    expect(() => new CPF(cpf_input)).toThrow();
});

test("Must return true for a valid CPF", () => {
    const cpf_input = "628.763.840-00";
    const cpf_input2 = "558.155.780-29";
    const cpf = new CPF(cpf_input);
    const cpf2 = new CPF(cpf_input2);
    const isValid = cpf.validate(cpf_input);
    const isValid2 = cpf.validate(cpf_input2);
    expect(isValid).toBeTruthy();
    expect(isValid2).toBeTruthy();
});

test("Must calculate correct digits", () => {
    const cpf_input = "55815578029";
    const cpf = new CPF(cpf_input);
    const digit1 = cpf.calculateDigit(cpf_input.substr(0, 9));
    expect(digit1).toBe('2');
    const digit2 = cpf.calculateDigit(cpf_input.substr(0, 10));
    expect(digit2).toBe('9');
});

test("Must throw when symbols are misplaced", () => {
    const cpf_input = "-..62876384000";
    expect(() => new CPF(cpf_input)).toThrow();
});