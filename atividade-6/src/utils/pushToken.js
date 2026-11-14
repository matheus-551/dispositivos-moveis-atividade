export const isValidPushToken = (token) =>
  /^(ExponentPushToken|ExpoPushToken)\[[^\]]+\]$/.test(token || '');
