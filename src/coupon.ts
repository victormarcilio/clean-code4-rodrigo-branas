export enum CouponType {
    Fixed,
    Percentage
};

export class Coupon {
    constructor(readonly description: string, readonly couponType: CouponType, readonly value: number, readonly expirationDate: Date) { }
};