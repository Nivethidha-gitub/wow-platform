import { Supplier } from '@wow/shared-types';
import { GetServerSideProps } from 'next';
import { apiFetch, API_BASE } from '../lib/api';

interface Props {
  suppliers: Supplier[];
  error?: string;
}

export default function SuppliersPage({ suppliers, error }: Props) {
  return (
    <main style={{ fontFamily: 'system-ui', padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ color: '#073A4E' }}>WoW Ops — Suppliers</h1>
      <p style={{ color: '#5C7580', fontSize: 13 }}>
        Internal tool for the WoW operations team. Connects to {API_BASE}.
      </p>

      {error && (
        <p style={{ background: '#FDF1E4', color: '#F2994A', padding: 12, borderRadius: 10, marginTop: 16 }}>
          {error}
        </p>
      )}

      <table style={{ width: '100%', marginTop: 24, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #CFE9EF' }}>
            <th style={{ padding: '8px 0' }}>Name</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Reliability</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #F3F7F8' }}>
              <td style={{ padding: '10px 0' }}>{s.name}</td>
              <td>{s.plan}</td>
              <td>{s.status}</td>
              <td>{s.reliabilityScore}</td>
            </tr>
          ))}
          {suppliers.length === 0 && !error && (
            <tr>
              <td colSpan={4} style={{ padding: '16px 0', color: '#93A8AF' }}>
                No suppliers yet — create one via POST /suppliers on the API.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}

// Runs on the server each time the page loads — fetches fresh data from
// your NestJS API before rendering. Swap for a client-side fetch + real
// staff login once the ops console needs authentication.
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const suppliers = await apiFetch<Supplier[]>('/suppliers');
    return { props: { suppliers } };
  } catch (err: any) {
    return { props: { suppliers: [], error: `Could not reach API: ${err.message}` } };
  }
};
