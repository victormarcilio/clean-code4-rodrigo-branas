import { CPF } from "./cpf";
import { Item } from "./item";
import { Coupon, CouponType } from "./coupon";

export class Order {
    private cpf: CPF;
    private items: [Item, number][];
    private coupon?: Coupon;
    constructor(cpf: CPF, coupon?: Coupon) {
        this.cpf = cpf;
        this.items = [];
        this.coupon = coupon;
    }

    addItem(item: Item, amount: number = 1) {
        this.items.push([item, amount]);
    }

    getTotal() {
        const total = this.getTotalBeforeDiscount();
        const discount = this.calculateDiscount(total);
        return total - discount;
    }

    getTotalBeforeDiscount() {
        let total = 0;
        for (let [item, amount] of this.items)
            total += item.price * amount;
        return total;
    }

    calculateDiscount(price: number) {
        if (!this.coupon)
            return 0;
        const currentDate = new Date();
        if (currentDate > this.coupon.expirationDate)
            return 0;
        if (this.coupon.couponType === CouponType.Fixed)
            return Math.min(price, this.coupon.value);
        if (this.coupon.couponType === CouponType.Percentage)
            return price * (100 - this.coupon?.value) / 100;
        return 0;
    }
    
    calculateShipping() {
        let total = 0;
        const MINIMUM_SHIPPING_FEE = 10;
        for (const [item, amount] of this.items) {
            total += item.shippingCost();
        }
        return Math.max(total, MINIMUM_SHIPPING_FEE);
    }
}