import { CPF } from "./cpf";
import { Order } from "./order";
import { Coupon, CouponType } from "./coupon";
import { Item } from "./item";

let expirationDate: Date;
beforeEach(() => expirationDate = new Date())

test("Orders with invalid cpf are not allowed", () => {
    const cpf_input = "0000";
    expect(() => new Order(new CPF(cpf_input))).toThrow();
});

test("Should allow orders with valid cpf", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input));
    expect(order).toBeDefined();
});

test("Should correctly calculate total for orders with 3 different items and amounts", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(88);
});

test("Should correctly calculate a percentage discount", () => {
    const cpf_input = "558.155.780-29";
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Percentage, 50, expirationDate));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(44);
});

test("Should correctly calculate a fixed discount", () => {
    const cpf_input = "558.155.780-29";
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fixed, 50, expirationDate));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(38);
});


test("Should not end up with a negative total by applying a fix discount higher than the total", () => {
    const cpf_input = "558.155.780-29";
    expirationDate.setMonth(expirationDate.getMonth() + 1);
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fixed, 100, expirationDate));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(0);
});

test("Should give discount for an expired percentage discount coupon", () => {
    const cpf_input = "558.155.780-29";
    expirationDate.setFullYear(expirationDate.getFullYear() - 1);
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Percentage, 50, expirationDate));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(88);
});

test("Should give discount for an expired fixed discount coupon", () => {
    const cpf_input = "558.155.780-29";
    expirationDate.setFullYear(expirationDate.getFullYear() - 1);
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fixed, 50, expirationDate));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(88);
});