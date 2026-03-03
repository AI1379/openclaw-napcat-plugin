import type { OpenClawPluginApi } from "openclaw/plugin-sdk";
import { emptyPluginConfigSchema } from "openclaw/plugin-sdk";
import { napcatPlugin } from "./src/channel.js";
import { handleNapCatWebhook } from "./src/webhook.js";
import { setNapCatRuntime } from "./src/runtime.js";

const plugin = {
  id: "napcat",
  name: "NapCatQQ",
  description: "QQ channel via NapCat (OneBot 11)",
  configSchema: emptyPluginConfigSchema(),
  register(api: OpenClawPluginApi) {
    setNapCatRuntime(api.runtime);
    api.registerChannel({ plugin: napcatPlugin as any });
    try {
      api.registerHttpHandler(handleNapCatWebhook);
    } catch (error) {
      api.logger.info("Failed to call api.registerHttpHandler, may be unsupported in this OpenClaw version:", error);
      api.registerHttpRoute({ path: "/napcat", handler: handleNapCatWebhook, auth: "gateway", match: "exact" });
    }
  },
};

export default plugin;
