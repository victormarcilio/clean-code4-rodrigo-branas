const { validate } = require("./cpf");

test("Must return false when parameter is null", () => {
    const cpf = null;
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});

test("Must return false when parameter is undefined", () => {
    const isValid = validate();
    expect(isValid).toBeFalsy();
});

test("Must return false when cpf has less than 11 characters", () => {
    const cpf = "0000";
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});

test("Must return false when cpf has more than 14 characters", () => {
    const cpf = "0000000000000000";
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});

test("Must return false when all digits are the same", () => {
    const cpf = "000.000.000-00";
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});

test("Must return true for a valid CPF", () => {
    const cpf = "628.763.840-00";
    const cpf2 = "558.155.780-29";
    const isValid = validate(cpf);
    const isValid2 = validate(cpf2);
    expect(isValid).toBeTruthy();
    expect(isValid2).toBeTruthy();
});

test("Must return false when symbols are misplaced", () => {
    const cpf = "-..62876384000";
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
});