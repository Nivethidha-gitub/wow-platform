import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import CustomerHomeScreen from '../screens/customer/CustomerHomeScreen';
import OwnerDashboardScreen from '../screens/owner/OwnerDashboardScreen';
import RiderDeliveriesScreen from '../screens/rider/RiderDeliveriesScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Checking AsyncStorage for a saved session — show a blank loading state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0B5C7A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : user.role === 'customer' ? (
          <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
        ) : user.role === 'supplier' ? (
          <Stack.Screen name="OwnerDashboard" component={OwnerDashboardScreen} />
        ) : (
          <Stack.Screen name="RiderDeliveries" component={RiderDeliveriesScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
