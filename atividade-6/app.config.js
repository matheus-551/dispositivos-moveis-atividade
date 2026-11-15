module.exports = {
  expo: {
    name: 'Atividade 6',
    slug: 'atividade-6',
    version: '1.0.0',
    scheme: 'atividade6',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    plugins: ['expo-router', ['expo-notifications', { color: '#1468ef' }], 'expo-status-bar'],
    android: {
      package: 'br.edu.ifpe.atividade6',
      ...(process.env.GOOGLE_SERVICES_JSON
        ? { googleServicesFile: process.env.GOOGLE_SERVICES_JSON }
        : {}),
    },
    ios: { bundleIdentifier: 'br.edu.ifpe.atividade6', supportsTablet: true },
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || 'e174b676-de0e-4b5b-9c0a-46acaff82a97',
      },
    },
  },
};
