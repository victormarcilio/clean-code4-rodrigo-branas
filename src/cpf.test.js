const {validate} = require("./cpf");
test("Must return false when parameter is null", () => {
    const cpf = null;
    const isValid = validate(cpf);
    expect(isValid).toBeFalsy();
})