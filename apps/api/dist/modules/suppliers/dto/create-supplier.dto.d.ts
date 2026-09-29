export declare class CreateSupplierDto {
    name: string;
    plan?: 'starter' | 'growth' | 'network';
    acceptanceWindowMinutes?: number;
    refillEnabled?: boolean;
}
