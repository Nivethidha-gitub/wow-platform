import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface Delivery {
  id: string;
  address: string;
  note: string;
  cans: number;
  delivered: boolean;
}

const INITIAL_DELIVERIES: Delivery[] = [
  { id: '1', address: 'Green Meadows – Flat 4B', note: 'Priya · Gate hours 8am–9pm', cans: 2, delivered: false },
  { id: '2', address: 'Green Meadows – Flat 8A', note: 'Karthik · Leave at security if absent', cans: 1, delivered: false },
  { id: '3', address: 'Apartment XYZ', note: 'Sunrise Offices, Guindy', cans: 3, delivered: false },
];

export default function RiderDeliveriesScreen() {
  const { user, logout } = useAuth();
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES);

  const deliveredCount = deliveries.filter((d) => d.delivered).length;

  function markDelivered(id: string) {
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, delivered: true } : d)));
    // TODO: once the Deliveries API exists, POST /deliveries here instead of
    // only updating local state, and record container/money entries.
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Today's Deliveries</Text>
        <Pressable onPress={logout}>
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </View>
      <Text style={styles.phone}>{user?.phone}</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{deliveries.length}</Text>
          <Text style={styles.summaryLabel}>Assigned</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{deliveredCount}</Text>
          <Text style={styles.summaryLabel}>Delivered</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{deliveries.length - deliveredCount}</Text>
          <Text style={styles.summaryLabel}>Remaining</Text>
        </View>
      </View>

      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.deliveryCard}>
            <Text style={styles.deliveryTitle}>{item.address}</Text>
            <Text style={styles.deliveryNote}>{item.note}</Text>
            <Text style={styles.deliveryQty}>{item.cans} cans</Text>
            <Pressable
              style={[styles.deliverBtn, item.delivered && styles.deliverBtnDone]}
              onPress={() => markDelivered(item.id)}
              disabled={item.delivered}
            >
              <Text style={[styles.deliverBtnText, item.delivered && styles.deliverBtnTextDone]}>
                {item.delivered ? 'Delivered ✓' : 'Mark delivered'}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F8FA', padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: '#073A4E' },
  phone: { fontSize: 12, color: '#5C7580', marginBottom: 14 },
  logout: { color: '#F2994A', fontWeight: '600', fontSize: 12.5 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 12, alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '700', color: '#073A4E' },
  summaryLabel: { fontSize: 10.5, color: '#5C7580', marginTop: 4 },
  deliveryCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12 },
  deliveryTitle: { fontSize: 13.5, fontWeight: '600', color: '#0F2630' },
  deliveryNote: { fontSize: 11.5, color: '#5C7580', marginTop: 2 },
  deliveryQty: { fontSize: 11.5, color: '#073A4E', fontWeight: '600', marginTop: 6 },
  deliverBtn: { backgroundColor: '#0B5C7A', borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 10 },
  deliverBtnDone: { backgroundColor: '#E7F6EE' },
  deliverBtnText: { color: '#fff', fontWeight: '600', fontSize: 12.5 },
  deliverBtnTextDone: { color: '#2FA86B' },
});
