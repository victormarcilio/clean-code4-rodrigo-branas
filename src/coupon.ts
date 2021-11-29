export enum CouponType {
    Fix,
    Percentage
};

export class Coupon {
    constructor(description: string, public couponType: CouponType, public value: number) { }
};