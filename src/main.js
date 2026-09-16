import sdk from "@playabl/sdk";
import assetsManifest from "./assets.json";
import { createGame } from "./game/game.js";
import { createTranslator, getInitialLocale } from "./game/i18n.js";
import tweaksManifest from "./tweaks.json";
import "./styles.css";

const app = document.querySelector("#app");

function localTweaks(manifest) {
  return {
    get(key) { return manifest[key]?.value; },
    subscribe() { return () => {}; },
  };
}

try {
  let ready = null;
  let tweaks = localTweaks(tweaksManifest);
  let assets;
  try {
    ready = await sdk.ready();
    tweaks = await sdk.tweaks.init(tweaksManifest);
    assets = Object.keys(assetsManifest).length > 0
      ? await sdk.assets.register(assetsManifest)
      : undefined;
  } catch {
    // Booth gameplay remains available when the host runtime is unavailable.
  }

  const game = createGame({ mount: app, sdk, ready, tweaks, assets });
  game.start();
} catch {
  const locale = getInitialLocale();
  const t = createTranslator(locale);
  document.documentElement.lang = locale;
  app.innerHTML = `
    <section class="startup-recovery" role="alert">
      <strong>${t("startup.title")}</strong>
      <p>${t("startup.body")}</p>
      <button type="button" onclick="location.reload()">${t("startup.retry")}</button>
    </section>`;
}
