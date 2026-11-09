# Atividade 6 — Notificações push

Aplicativo didático React Native com Expo e Expo Router. Três telas inspiradas no protótipo: cadastro, login e envio de notificações. Código em `src/app`, serviços REST e notificações separados em `src`, como nas atividades anteriores. Projetos `android/` e `ios/` são gerados por `expo run`/prebuild, sem copiar identificadores de outra atividade.

## Configurar e executar

1. Instale Node.js compatível com o Expo SDK 58 e execute `npm install`.
2. Copie `.env.example` para `.env`. A URL e a chave pública fornecidas no enunciado já são usadas por padrão. Não utilize chaves secretas/service_role no app.
3. Execute `npx eas-cli login` e `npx eas-cli init`. Coloque o ID do projeto criado em `EXPO_PUBLIC_EAS_PROJECT_ID` no `.env`. O projeto pertence à sua conta Expo.
4. Android: registre `br.edu.ifpe.atividade6` no Firebase, obtenha `google-services.json` e preencha `GOOGLE_SERVICES_JSON` com o caminho desse arquivo. Configure a credencial FCM v1 no projeto Expo com `npx eas-cli credentials`. iOS: configure APNs e a conta Apple para `br.edu.ifpe.atividade6`.
5. Execute `npx eas-cli build --profile development --platform android`, instale o aplicativo gerado no celular e execute `npm start`. Alternativamente, com Android Studio/SDK configurado, use `npm run android`. Para iOS local é necessário macOS/Xcode.
6. Leia o QR code da versão de desenvolvimento. O Expo Go não oferece o suporte push necessário. `npm run web` serve para visualizar telas e testar consultas/login; captura e envio de push são destinados ao app nativo.

Reinicie o Metro após alterar `.env`. O aplicativo não inventa um token quando falta configuração ou permissão: apresenta o motivo e permite tentar novamente. Cadastro exige o token real do dispositivo.

## Fluxo e API

- Cadastro: nome obrigatório, e-mail válido, senha com pelo menos seis caracteres, token automático não editável; `POST /rest/v1/usuario` com `{ nome, email, senha, token }`. Após cadastrar, abre login.
- Login: consulta PostgREST filtrada por e-mail e senha, selecionando apenas nome/e-mail/token. E-mail é normalizado para minúsculas; senha preservada. Login válido abre envio; inválido informa o erro. Tenta atualizar o token atual por `PATCH`; se não conseguir, mostra aviso sem impedir login.
- Envio: rota protegida por sessão em memória, lista usuários por nome, inclui atualizar/repetir após falha, seleção com nome/e-mail, título e mensagem (até 200 caracteres). Usa automaticamente o token selecionado no Expo Push Service. Logout limpa sessão; reabrir o app exige login.
- Estados de carregamento, lista vazia, validação, falhas de rede/API e erros de ticket Expo aparecem nas telas. O sucesso indica aceitação pelo Expo, não confirmação de entrega no celular.

## Tabela do Supabase

A tabela `public.usuario` deve conter `nome`, `email`, `senha` e `token` (texto). Pode ter um `id` gerado automaticamente. Recomenda-se restrição UNIQUE em `email`. A chave pública precisa ter permissão para SELECT, INSERT e UPDATE nessa tabela; RLS/políticas devem ser configuradas pelo responsável pelo Supabase da disciplina. Não há criação de tabela, alteração de políticas ou inserção automática de usuários neste projeto.

Este exercício segue a autenticação simples do enunciado: senha em texto na tabela e filtros REST. **Use apenas contas e senhas fictícias de aula.** Para produção, substituir por Supabase Auth, autorização por usuário e envio em backend com controle de acesso. Uma chave pública e sessão em memória não protegem o acesso direto a essa API.

## Verificar

```sh
npm run lint
npm run typecheck
npx expo export --platform android
```

No celular configurado, testar: permissão recusada e nova tentativa; cadastro vazio/inválido/válido; e-mail duplicado (depende de UNIQUE); login inválido/válido; seleção e atualização da lista; campos vazios; envio para outro aparelho; recebimento em primeiro/segundo plano; erro de token; logout e tentativa de abrir `/enviar` sem sessão. Teste a entrega com dois usuários fictícios em aparelhos configurados. Nenhuma notificação é enviada durante a instalação/verificação do código.

Referências: [Configuração push Expo](https://docs.expo.dev/push-notifications/push-notifications-setup/), [Expo Push Service e recibos](https://docs.expo.dev/push-notifications/sending-notifications/).
