import { CPF } from "./cpf";
import { Order } from "./order";
import { Coupon, CouponType } from "./coupon";
import { Item } from "./item";

let unexpiredDate: Date;
let expiredDate: Date;
const validCPF: CPF = new CPF("558.155.780-29");
const PRODUCT_1_COSTING_15 = new Item("Product 1", 1, 15, 1);
const PRODUCT_2_COSTING_8 = new Item("Product 2", 2, 8, 3);
const PRODUCT_3_COSTING_10 = new Item("Product 3", 3, 10, 40);

beforeAll(() => {
    unexpiredDate = new Date();
    unexpiredDate.setMonth(unexpiredDate.getMonth() + 1);
    expiredDate = new Date();
    expiredDate.setMonth(unexpiredDate.getMonth() - 1);
});

test("Orders with invalid cpf are not allowed", () => {
    const invalidCPFInput = "313.543.312-43";
    expect(() => new Order(new CPF(invalidCPFInput))).toThrow();
});

test("Should allow orders with valid cpf", () => {
    const order = new Order(validCPF);
    expect(order).toBeDefined();
});

test("Should correctly calculate total for orders with 3 different items and amounts", () => {
    const order = new Order(validCPF);
    order.addItem(PRODUCT_1_COSTING_15, 2);
    order.addItem(PRODUCT_2_COSTING_8);
    order.addItem(PRODUCT_3_COSTING_10, 5);
    expect(order.getTotal()).toBe(88);
});

test("Should correctly calculate a percentage discount", () => {
    const order = new Order(validCPF, new Coupon("Black Friday", CouponType.Percentage, 50, unexpiredDate));
    order.addItem(PRODUCT_1_COSTING_15, 2);
    order.addItem(PRODUCT_2_COSTING_8);
    order.addItem(PRODUCT_3_COSTING_10, 5);
    expect(order.getTotal()).toBe(44);
});

test("Should correctly calculate a fixed discount", () => {
    const order = new Order(validCPF, new Coupon("Black Friday", CouponType.Fixed, 50, unexpiredDate));
    order.addItem(PRODUCT_1_COSTING_15, 2);
    order.addItem(PRODUCT_2_COSTING_8);
    order.addItem(PRODUCT_3_COSTING_10, 5);
    expect(order.getTotal()).toBe(38);
});

test("Should not end up with a negative total by applying a fix discount higher than the total", () => {
    const order = new Order(validCPF, new Coupon("Black Friday", CouponType.Fixed, 100, unexpiredDate));
    order.addItem(PRODUCT_1_COSTING_15, 2);
    order.addItem(PRODUCT_2_COSTING_8);
    order.addItem(PRODUCT_3_COSTING_10, 5);
    expect(order.getTotal()).toBe(0);
});

test("Should give discount for an expired percentage discount coupon", () => {
    const order = new Order(validCPF, new Coupon("Black Friday", CouponType.Percentage, 50, expiredDate));
    order.addItem(PRODUCT_1_COSTING_15, 2);
    order.addItem(PRODUCT_2_COSTING_8);
    order.addItem(PRODUCT_3_COSTING_10, 5);
    expect(order.getTotal()).toBe(88);
});

test("Should give discount for an expired fixed discount coupon", () => {
    const order = new Order(validCPF, new Coupon("Black Friday", CouponType.Fixed, 50, expiredDate));
    order.addItem(PRODUCT_1_COSTING_15, 2);
    order.addItem(PRODUCT_2_COSTING_8);
    order.addItem(PRODUCT_3_COSTING_10, 5);
    expect(order.getTotal()).toBe(88);
});

test("Should calculate correctly shipping price for one product", () => {
    const order = new Order(validCPF);
    order.addItem(new Item("Product 1", 1, 15, 1), 2);   
    const shippingCost = order.calculateShipping();
    expect(shippingCost).toBe(10);
});
