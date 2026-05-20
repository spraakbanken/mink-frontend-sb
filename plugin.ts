import type { Plugin } from "vue";
import SbMinkLogo from "./components/SbMinkLogo.vue";
import appConfig from "./config.yaml";
import i18n, { languageNames } from "@/i18n/i18n";
import { injectionKeys } from "@/injection";
import { SbAnalysisRegistryService } from "./services/SbAnalysisRegistryService";

export default function createPlugin(): Plugin {
  return (app) => {
    // Use app config object from YAML file
    app.provide(injectionKeys.config, appConfig);

    // Provide services and components
    app.provide(
      injectionKeys.service.analysisRegistry,
      new SbAnalysisRegistryService(),
    );
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
