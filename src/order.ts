import { CPF } from "./cpf";
import { Item } from "./item";
import { Coupon } from "./coupon";

export class Order {
    private cpf: CPF;
    private items: Item[];
    private coupon?: Coupon;
    constructor(cpf: CPF, coupon?: Coupon) {
        this.cpf = cpf;
        this.items = [];
        this.coupon = coupon;
    }

    addItem(item: Item) {
        this.items.push(item);
    }
}