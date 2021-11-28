import { CPF } from "./cpf";
import { Order } from "./order";
import { Coupon, CouponTYpe } from "./coupon";

test("Orders with invalid cpf are not allowed", () => {
    const cpf_input = "0000";
    expect(() => new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponTYpe.Fix, 20))).toThrow();
});

test("Should allow orders with valid cpf", () => {
    const cpf_input = "558.155.780-29";
    const order = new Order(new CPF(cpf_input), new Coupon("Black Friday", CouponTYpe.Fix, 20));
    expect(order).toBeDefined();
});