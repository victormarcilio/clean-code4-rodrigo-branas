export enum CouponTYpe {
    Fix,
    Percentage
};

export class Coupon {
    constructor(description: string, couponType: CouponTYpe, value: number) { }
};