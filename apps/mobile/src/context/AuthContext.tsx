import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser } from '@wow/shared-types';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean; // true while checking AsyncStorage on app start
  login: (user: AuthUser, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'wow_auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On app start, check if we already have a saved session
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          setUser(saved.user);
          setToken(saved.token);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function login(newUser: AuthUser, newToken: string) {
    setUser(newUser);
    setToken(newToken);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: newUser, token: newToken }));
  }

  async function logout() {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
