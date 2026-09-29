export interface Address {
    id: string;
    customerId: string;
    latitude: number;
    longitude: number;
    flatNumber?: string;
    floor?: string;
    liftAvailable?: boolean;
    gateNotes?: string;
    createdAt: Date;
}
