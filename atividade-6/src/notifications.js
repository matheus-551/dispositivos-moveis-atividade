import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const validToken = token => /^(ExponentPushToken|ExpoPushToken)\[[^\]]+\]$/.test(token || '');
export async function getPushToken() {
  if (Platform.OS === 'web') throw new Error('Abra o app instalado no celular para obter o token push.');
  if (Constants.appOwnership === 'expo') throw new Error('Use uma versão de desenvolvimento do aplicativo. Push não funciona no Expo Go.');
  const Notifications = await import('expo-notifications');
  Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }) });
  if (Platform.OS === 'android') await Notifications.setNotificationChannelAsync('default', { name: 'Notificações', importance: Notifications.AndroidImportance.MAX });
  let permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) throw new Error('Permita notificações nas configurações do celular e tente novamente.');
  const projectId = Constants.easConfig?.projectId || Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) throw new Error('Configure EXPO_PUBLIC_EAS_PROJECT_ID para obter o token.');
  return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
}
export async function sendPush(token, title, body) {
  if (Platform.OS === 'web') throw new Error('Envie a notificação pelo aplicativo instalado no celular.');
  if (!validToken(token)) throw new Error('Este usuário não possui um token Expo válido.');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ to: token, title, body, sound: 'default', channelId: 'default' }),
    });
    const result = await response.json();
    const ticket = Array.isArray(result.data) ? result.data[0] : result.data;
    if (!response.ok || ticket?.status !== 'ok') throw new Error(ticket?.message || result.errors?.[0]?.message || 'Não foi possível enviar a notificação.');
    return ticket.id;
  } finally { clearTimeout(timer); }
}
