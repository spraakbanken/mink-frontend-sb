import type { Plugin } from "vue";
import SbMinkLogo from "./components/SbMinkLogo.vue";
import i18n, { languageNames } from "@/i18n/i18n";
import { injectionKeys } from "@/injection";

export default function createPlugin(): Plugin {
  return (app) => {
    // Override an overridable component
    app.provide(injectionKeys.component.MinkLogo, SbMinkLogo);

    // Prefer Swedish if it's among browser's preferred languages, even if English is ranked higher
    const isSvPreferred = navigator.languages.find((l) => /^sv\b/.test(l));
    i18n.global.locale.value = isSvPreferred ? "sv" : "en";

    // Modify a language
    import("@instance/locales/sv.yaml").then((module) => {
      i18n.global.mergeLocaleMessage("sv", module.default);
    });

    // Add a language
    import("@instance/locales/es.yaml").then((module) => {
      const messages = module.default as Record<string, string>;
      i18n.global.setLocaleMessage("es", messages);
      languageNames.es = "Español";
    });
  };
}
