import { CPF } from "./cpf";
import { Order } from "./order";
import { Coupon, CouponType } from "./coupon";
import { Item } from "./item";

test("Orders with invalid cpf are not allowed", () => {
    const cpf_input = "0000";
    expect(() => new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fix, 20))).toThrow();
});

test("Should allow orders with valid cpf", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fix, 20));
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
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Percentage, 50));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(44);
});

test("Should correctly calculate a fix discount", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fix, 50));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(38);
});


test("Should not end up with a negative total by applying a fix discount higher than the total", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponType.Fix, 100));
    order.addItem(new Item("gasolina", 666, 15), 2);
    order.addItem(new Item("arroz", 193, 8));
    order.addItem(new Item("feijao", 200, 10), 5);
    expect(order.getTotal()).toBe(0);
});