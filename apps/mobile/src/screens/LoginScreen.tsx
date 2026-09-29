import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { UserRole } from '@wow/shared-types';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const ROLES: { key: UserRole; label: string }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'supplier', label: 'Supplier / Owner' },
  { key: 'rider', label: 'Rider' },
];

export default function LoginScreen() {
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('customer');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSendOtp() {
    setError('');
    if (!phone.trim()) {
      setError('Enter a mobile number first.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.requestOtp(phone.trim(), role);
      setDevOtp(res.devOtp ?? null);
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Could not send OTP. Is the API running?');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setError('');
    if (code.trim().length !== 6) {
      setError('Enter the 6-digit code.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.verifyOtp(phone.trim(), code.trim(), role);
      await login(res.user, res.accessToken);
    } catch (err: any) {
      setError(err.message || 'Incorrect code.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AquaRoute</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <View style={styles.roleRow}>
        {ROLES.map((r) => (
          <Pressable
            key={r.key}
            onPress={() => {
              setRole(r.key);
              setStep('phone');
              setError('');
            }}
            style={[styles.roleBtn, role === r.key && styles.roleBtnActive]}
          >
            <Text style={[styles.roleBtnText, role === r.key && styles.roleBtnTextActive]}>
              {r.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      {step === 'phone' ? (
        <>
          <Text style={styles.label}>Mobile number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 9876543210"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Pressable style={styles.button} onPress={handleSendOtp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP</Text>}
          </Pressable>
        </>
      ) : (
        <>
          {devOtp && (
            <Text style={styles.devHint}>Dev mode — your OTP is {devOtp}</Text>
          )}
          <Text style={styles.label}>Enter the 6-digit code</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
          <Pressable style={styles.button} onPress={handleVerifyOtp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify & Log in</Text>}
          </Pressable>
          <Pressable onPress={() => setStep('phone')} style={{ marginTop: 12 }}>
            <Text style={styles.linkText}>Use a different number</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F8FA', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#073A4E', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#5C7580', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  roleRow: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 999, padding: 5, marginBottom: 22 },
  roleBtn: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  roleBtnActive: { backgroundColor: '#0B5C7A' },
  roleBtnText: { fontSize: 12, fontWeight: '600', color: '#5C7580' },
  roleBtnTextActive: { color: '#fff' },
  label: { fontSize: 12, fontWeight: '600', color: '#5C7580', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CFE9EF',
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
  },
  button: { backgroundColor: '#0B5C7A', borderRadius: 12, padding: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  error: { backgroundColor: '#FDF1E4', color: '#F2994A', padding: 10, borderRadius: 10, marginBottom: 14, fontSize: 12.5 },
  devHint: { backgroundColor: '#E4F4F8', color: '#073A4E', padding: 10, borderRadius: 10, marginBottom: 14, textAlign: 'center', fontSize: 12.5 },
  linkText: { color: '#00B6D6', fontWeight: '600', textAlign: 'center', fontSize: 12.5 },
});
