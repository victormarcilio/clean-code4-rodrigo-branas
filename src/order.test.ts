import { CPF } from "./cpf";
import { Order } from "./order";
import { Coupon, CouponTYpe } from "./coupon";
import { Item } from "./item";

test("Orders with invalid cpf are not allowed", () => {
    const cpf_input = "0000";
    expect(() => new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponTYpe.Fix, 20))).toThrow();
});

test("Should allow orders with valid cpf", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponTYpe.Fix, 20));
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