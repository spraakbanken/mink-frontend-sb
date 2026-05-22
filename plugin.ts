import type { Plugin } from "vue";
import appConfig from "./config.yaml";
import en from "./locales/en.yaml";
import sv from "./locales/sv.yaml";
import i18n from "@/i18n/i18n";
import { injectionKeys } from "@/injection";
import { SbAnalysisRegistryService } from "./services/SbAnalysisRegistryService";
import { SbNewsService } from "./services/news.service";

export default function createPlugin(): Plugin {
  return (app) => {
    // Use app config object from YAML file
    app.provide(injectionKeys.config, appConfig);

    // Provide services and components
    app.provide(
      injectionKeys.service.analysisRegistry,
      new SbAnalysisRegistryService(),
    );
    app.provide(injectionKeys.service.news, new SbNewsService());
    app.provide(
      injectionKeys.component.MinkLogo,
      () => import("./components/SbMinkLogo.vue"),
    );
    app.provide(
      injectionKeys.component.HomeIntro,
      () => import("./components/SbHomeIntro.vue"),
    );
    app.provide(
      injectionKeys.component.HomeSecondary,
      () => import("./components/SbHomeSecondary.vue"),
    );
    app.provide(
      injectionKeys.component.AppFooter,
      () => import("./components/SbAppFooter.vue"),
    );

    // Prefer Swedish if it's among browser's preferred languages, even if English is ranked higher
    const isSvPreferred = navigator.languages.find((l) => /^sv\b/.test(l));
    i18n.global.locale.value = isSvPreferred ? "sv" : "en";

    // Modify languages
    i18n.global.mergeLocaleMessage("sv", sv);
    i18n.global.mergeLocaleMessage("en", en);
  };
}
