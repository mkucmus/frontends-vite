import { createApp, ref } from "vue";
import "./style.css";
import App from "./App.vue";
import { createInstance } from "@shopware-pwa/api-client";
import Cookies from "js-cookie";

import { createShopwareContext } from "@shopware-pwa/composables-next";

const app = createApp(App);

const cookieContextToken = Cookies.get("sw-context-token");

const contextToken = ref(cookieContextToken);

const apiInstance = createInstance({
  endpoint: import.meta.env.VITE_DEMO_API_URL,
  accessToken: import.meta.env.VITE_DEMO_API_ACCESS_TOKEN,
  contextToken: contextToken.value,
});

apiInstance.onConfigChange(({ config }) => {
  try {
    Cookies.set("sw-context-token", config.contextToken || "", {
      expires: 365,
      sameSite: "Lax",
      path: "/",
    });

    contextToken.value = config.contextToken;
  } catch (e) {
    // Sometimes cookie is set on server after request is send, it can fail silently
  }
});

const shopwareContext = createShopwareContext(app, { apiInstance });

// register the plugin
app.use(shopwareContext);

app.mount("#app");
