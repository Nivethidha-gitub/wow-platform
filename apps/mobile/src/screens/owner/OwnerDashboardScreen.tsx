import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function OwnerDashboardScreen() {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Orders today', value: '86' },
    { label: 'Revenue today', value: '₹9,240' },
    { label: 'Riders online', value: '7 / 9' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Owner Dashboard</Text>
        <Pressable onPress={logout}>
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </View>
      <Text style={styles.phone}>{user?.phone}</Text>

      <View style={styles.statRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Live orders</Text>
      <View style={styles.orderRow}>
        <Text style={styles.orderText}>#10432 · Ayesha R. · 2 cans</Text>
        <Text style={styles.statusPill}>Out for delivery</Text>
      </View>

      <Text style={styles.note}>
        This connects to the real Orders/Dispatch API once Member 1's endpoints are ready — for now
        it shows placeholder data.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F8FA' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: '#073A4E' },
  phone: { fontSize: 12, color: '#5C7580', marginBottom: 16 },
  logout: { color: '#F2994A', fontWeight: '600', fontSize: 12.5 },
  statRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 12 },
  statValue: { fontSize: 18, fontWeight: '700', color: '#073A4E' },
  statLabel: { fontSize: 10.5, color: '#5C7580', marginTop: 4 },
  sectionTitle: { fontWeight: '700', fontSize: 14, color: '#073A4E', marginBottom: 10 },
  orderRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderText: { fontSize: 12.5 },
  statusPill: { fontSize: 10.5, color: '#F2994A', backgroundColor: '#FDF1E4', padding: 6, borderRadius: 999 },
  note: { fontSize: 11.5, color: '#93A8AF', textAlign: 'center', lineHeight: 16 },
});
