import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#087FF5',
  primaryDark: '#0066CC',
  background: '#F5F8FC',
  white: '#FFFFFF',
  text: '#1F2937',
  secondary: '#6B7280',
  border: '#D9E0E8',
  danger: '#EF4444',
  success: '#16A34A',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },

  subtitle: {
    color: colors.secondary,
    fontSize: 15,
    marginBottom: 25,
  },

  input: {
    height: 52,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 14,
    fontSize: 15,
  },

  button: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: colors.primary,
    fontWeight: '700',
  },

  dangerButton: {
    backgroundColor: colors.danger,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },

  cardText: {
    marginTop: 5,
    color: colors.secondary,
  },

  link: {
    color: colors.primary,
    fontWeight: '600',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
