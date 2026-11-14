const messages = {
  'auth/invalid-credential': 'E-mail ou senha inválidos.',
  'auth/email-already-in-use': 'E-mail já cadastrado.',
  'auth/weak-password': 'Use pelo menos 6 caracteres.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/network-request-failed': 'Verifique sua conexão.',
};

export function getAuthErrorMessage(error) {
  return messages[error.code] || 'Não foi possível concluir. Tente novamente.';
}
