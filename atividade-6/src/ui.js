import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
export function Page({ children }) {
  return <SafeAreaView style={s.page}><KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled"><View style={s.card}>{children}</View></ScrollView></KeyboardAvoidingView></SafeAreaView>;
}
export function Heading({ title, subtitle }) { return <View style={s.heading}><View style={s.logo}><Feather name="bell" size={32} color="white" /></View><Text style={s.title}>{title}</Text><Text style={s.muted}>{subtitle}</Text></View>; }
export function Field({ label, icon, password, ...props }) {
  const [visible, setVisible] = useState(false);
  return <View style={s.group}><Text style={s.label}>{label}</Text><View style={[s.inputRow, props.multiline && { alignItems: 'flex-start' }]}><Feather name={icon} size={18} color="#7d879a" style={{ marginTop: props.multiline ? 3 : 0 }} /><TextInput accessibilityLabel={label} placeholderTextColor="#8992a3" style={[s.input, props.multiline && { minHeight: 88, textAlignVertical: 'top' }]} secureTextEntry={password && !visible} {...props} />{password && <Pressable accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'} onPress={() => setVisible(!visible)} hitSlop={10}><Feather name={visible ? 'eye-off' : 'eye'} size={18} color="#7d879a" /></Pressable>}</View></View>;
}
export function Button({ title, onPress, busy, disabled }) { return <Pressable accessibilityRole="button" disabled={busy || disabled} onPress={onPress} style={({ pressed }) => [s.button, (busy || disabled || pressed) && { opacity: 0.6 }]}>{busy ? <ActivityIndicator color="white" /> : <Text style={s.buttonText}>{title}</Text>}</Pressable>; }
export function Notice({ text, success }) { return text ? <Text accessibilityRole="alert" style={[s.notice, success && { backgroundColor: '#e8f7ee', color: '#207744' }]}>{text}</Text> : null; }
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8faff' }, scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 }, card: { width: '100%', maxWidth: 420, alignSelf: 'center', paddingVertical: 24 },
  heading: { alignItems: 'center', marginBottom: 30 }, logo: { backgroundColor: '#1468ef', borderRadius: 15, padding: 12, marginBottom: 16 }, title: { fontSize: 27, fontWeight: '700', color: '#101727', marginBottom: 5 }, muted: { color: '#788295', fontSize: 13, lineHeight: 20 },
  group: { marginBottom: 17 }, label: { fontSize: 13, fontWeight: '600', color: '#202838', marginBottom: 7 }, inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#dce1e9', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 12, backgroundColor: '#fff' }, input: { flex: 1, fontSize: 14, color: '#202838', padding: 0, minHeight: 22 },
  button: { backgroundColor: '#1468ef', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 }, buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 }, footer: { flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 24 }, link: { color: '#1468ef', fontWeight: '600', fontSize: 13 }, notice: { color: '#a32d32', backgroundColor: '#fff0f0', padding: 12, borderRadius: 8, lineHeight: 20, marginBottom: 14 }, info: { backgroundColor: '#e8f1ff', borderRadius: 7, padding: 12, marginVertical: 12 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, option: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#edf0f5' },
});
