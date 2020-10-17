import App from "./App.svelte"

Sentry.init({
  dsn: 'https://33441033b2d041338bd3b97dc046db7b@o433904.ingest.sentry.io/5467904'});

const app = new App({
  target: document.body,
})

export default app
