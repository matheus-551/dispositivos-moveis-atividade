# Weather App (React Native / Expo)

App de previsão do tempo desenvolvido seguindo o mock fornecido, com dois
temas visuais (gradiente escuro para chuva/nublado e gradiente claro para
sol/tempo limpo).

## APIs utilizadas

- **[HG Brasil Weather](https://hgbrasil.com/status/weather)** — clima atual
  e previsão para os próximos dias (seção "Next Forecast").
  Endpoint usado:
  `https://api.hgbrasil.com/weather?key=SUA_CHAVE&city_name=Recife,PE`
- **[Open-Meteo](https://open-meteo.com/)** — previsão horária (seção
  "Today"), gratuita e sem necessidade de chave. Usada porque o plano
  gratuito da HG Brasil não retorna dados por hora, apenas por dia.

Se preferir usar só a HG Brasil, remova as chamadas à Open-Meteo em
`src/api/weatherApi.js` e adapte `HourlyForecast` para usar dados diários.

## Estrutura do projeto

```
weather-app/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── api/
    │   └── weatherApi.js       # chamadas HTTP às APIs de clima
    ├── components/
    │   ├── WeatherHeader.js    # localização + notificação
    │   ├── CurrentWeather.js   # ícone grande + temperatura atual
    │   ├── StatsRow.js         # nuvens / umidade / vento
    │   ├── HourlyForecast.js   # card "Today"
    │   └── NextForecast.js     # card "Next Forecast"
    ├── screens/
    │   └── HomeScreen.js       # orquestra fetch + layout + troca de cidade
    ├── theme/
    │   └── colors.js           # paletas de gradiente (chuva/sol)
    └── utils/
        └── weatherIcons.js     # mapeamento condição -> ícone
```

## Como rodar

1. Crie o projeto Expo (ou use este código dentro de um projeto já criado):
   ```
   npx create-expo-app meuapp --template bare-minimum@sdk-54
   ```
2. Copie os arquivos deste repositório para dentro do projeto criado
   (substituindo o `App.js` gerado).
3. Instale as dependências:
   ```
   npm install
   ```
4. Rode o projeto:
   ```
   npx expo start
   ```
5. Abra no Expo Go (Android/iOS) escaneando o QR code, ou pressione `w`
   para abrir no navegador.

## Funcionalidades

- Busca o clima atual e a previsão diária na HG Brasil.
- Busca a previsão horária (próximas 4 horas) na Open-Meteo.
- Troca de cidade via modal (toque no nome da cidade no topo).
- Pull-to-refresh para atualizar os dados.
- Tema visual muda automaticamente conforme a condição do tempo
  (chuvoso/nublado vs. ensolarado), replicando os dois estados do mock.
- Tratamento de erro com botão de "Tentar novamente".

## Possíveis melhorias futuras

- Trocar os ícones do MaterialCommunityIcons por animações Lottie para
  ficar ainda mais próximo do estilo 3D do mock.
- Cache local (AsyncStorage) para funcionar offline com o último dado.
- Geolocalização automática (expo-location) em vez de lista fixa de cidades.
