// This is a plain interface for now (in-memory storage).
// When you connect Postgres + TypeORM, this file becomes an @Entity()
// class instead — the shape stays almost the same, so nothing else
// you build today gets wasted.
export interface Customer {
  id: string;
  phone: string;
  name: string;
  language: 'ta' | 'en';
  whatsappOptIn: boolean;
  createdAt: Date;
}
