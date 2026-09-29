export type UserRole = 'customer' | 'supplier' | 'rider';
export declare class RequestOtpDto {
    phone: string;
    role: UserRole;
}
