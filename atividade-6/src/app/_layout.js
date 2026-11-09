import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SessionContext } from '../session';
export default function Layout() {
  const [user, setUser] = useState(null);
  return <SessionContext.Provider value={{ user, setUser }}><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f8faff' } }} /></SessionContext.Provider>;
}
