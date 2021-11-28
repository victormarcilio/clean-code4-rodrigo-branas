import { CPF } from "./cpf";
import { Item } from "./item";
import { Coupon } from "./coupon";

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

    getTotal(){
        let total = 0;
        for(let [item, amount] of this.items )
            total += item.price * amount; 
        return total;
    }
}