import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import SessionProvider from '../context/SessionProvider';
export default function Layout() {
  return (
    <SessionProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f8faff' } }} />
    </SessionProvider>
  );
}
