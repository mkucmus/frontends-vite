import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createInstance } from "@shopware-pwa/api-client";

import { createShopwareContext } from "@shopware-pwa/composables-next"

const app = createApp(App);


const shopwareContext = createShopwareContext(app, { apiInstance: createInstance({
  endpoint: import.meta.env.VITE_DEMO_API_URL,
  accessToken: import.meta.env.VITE_DEMO_API_ACCESS_TOKEN,
})})

// register the plugin
app.use(shopwareContext);

app.mount("#app");
