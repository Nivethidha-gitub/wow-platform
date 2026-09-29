export interface Customer {
    id: string;
    phone: string;
    name: string;
    language: 'ta' | 'en';
    whatsappOptIn: boolean;
    createdAt: Date;
}
