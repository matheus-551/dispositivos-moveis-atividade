# Atividade 5 — Galeria de Imagens

Aplicativo React Native/Expo com login e cadastro Firebase Authentication, sessão persistente, galeria Cloudinary em duas colunas, paginação, atualização, confirmação de exclusão e logout. Layout inspirado no protótipo.

Gerado com `npx create-expo-app@latest --template bare-minimum`. `create-react-app` é voltado a aplicações web. O modelo gerou Expo SDK 58 e os projetos android/ e ios/.

## Configurar

1. No Firebase Console, registre um aplicativo Web para obter a configuração do SDK JavaScript. Habilite Authentication → Email/Password.
2. Copie `.env.example` para `.env` na raiz e preencha os quatro campos Firebase.
3. No Cloudinary, crie a pasta `atividade-5` e envie suas imagens pelo painel. A API usa pastas dinâmicas (`asset_folder`).
4. Em `server`, copie `.env.example` para `.env`. Preencha as credenciais Cloudinary e a pasta exata. No Firebase → Configurações → Contas de serviço, gere uma chave privada para o mesmo projeto e informe o caminho do JSON em GOOGLE_APPLICATION_CREDENTIALS. Guarde esse arquivo fora do repositório.
5. Na raiz, configure EXPO_PUBLIC_API_URL com o IP local do computador e porta 3001. No emulador Android, use `http://10.0.2.2:3001`. No celular físico, use o IP da rede, não localhost, e mantenha computador/celular na mesma rede.

## Executar

Terminal da API:

```sh
cd server
npm install
npm start
```

Outro terminal, na raiz do aplicativo:

```sh
npm install
npm run android
```

Android exige Android Studio/SDK. iOS exige macOS/Xcode. Após instalar o app, use `npm start` para iniciar o Metro. Reinicie o Metro ao alterar o .env.

## Comportamento

O cadastro confere campos obrigatórios, igualdade das senhas e mínimo de seis caracteres. Salva o nome no perfil Firebase. O Firebase autentica automaticamente a conta recém-criada e abre a galeria. Erros e mensagens aparecem na tela.

A galeria é compartilhada entre os usuários cadastrados. Todos podem listar e excluir imagens exclusivamente da pasta configurada. O aplicativo usa Axios e envia um token Firebase à API. A API valida o token e mantém a chave secreta Cloudinary fora do aplicativo. Puxe para atualizar e use Carregar mais para paginar. Não há upload, pois não foi solicitado.

Não publique .env nem a conta de serviço. Em produção use HTTPS para a API.

## Conferir

```sh
npm run lint
npm run typecheck
npx expo export --platform android
```

Com as credenciais configuradas, teste: campos vazios, senhas diferentes, cadastro válido, saída, login inválido/correto, reabertura com sessão persistente, listagem, cancelamento de exclusão, exclusão confirmada e saída. As operações remotas dependem das suas contas e credenciais.
