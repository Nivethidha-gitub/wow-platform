import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function CustomerHomeScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Hi 👋</Text>
          <Text style={styles.phone}>{user?.phone}</Text>
        </View>
        <Pressable onPress={logout}>
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your water usually runs out in 2 days</Text>
        <Text style={styles.cardBody}>Based on your last few orders.</Text>
        <Pressable style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Reorder now</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Quick order</Text>
      <View style={styles.productCard}>
        <Text style={styles.productName}>🪣 20L Can</Text>
        <Text style={styles.productPrice}>₹40 / can</Text>
      </View>

      <Text style={styles.note}>
        This is a starter screen — order placement will connect to the Orders API once Member 1's
        endpoints are ready.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F8FA' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#073A4E' },
  phone: { fontSize: 12, color: '#5C7580', marginTop: 2 },
  logout: { color: '#F2994A', fontWeight: '600', fontSize: 12.5 },
  card: { backgroundColor: '#0B5C7A', borderRadius: 18, padding: 18, marginBottom: 20 },
  cardTitle: { color: '#fff', fontWeight: '700', fontSize: 15, marginBottom: 6 },
  cardBody: { color: '#fff', opacity: 0.85, fontSize: 12, marginBottom: 12 },
  cardButton: { backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 10, padding: 10, alignItems: 'center' },
  cardButtonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  sectionTitle: { fontWeight: '700', fontSize: 14, color: '#073A4E', marginBottom: 10 },
  productCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 20 },
  productName: { fontSize: 14, marginBottom: 4 },
  productPrice: { fontSize: 12, color: '#5C7580' },
  note: { fontSize: 11.5, color: '#93A8AF', textAlign: 'center', marginTop: 10, lineHeight: 16 },
});
