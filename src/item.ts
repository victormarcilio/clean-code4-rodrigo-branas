export class Item {
    constructor(readonly description: string, readonly id: number, readonly price: number, readonly weight: number) { }

    shippingCost() {
        return 10 * this.weight;
    }
}