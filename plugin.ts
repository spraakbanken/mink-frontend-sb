import type { Plugin } from "vue";
import SbMinkLogo from "./components/SbMinkLogo.vue";

export default function createPlugin(): Plugin {
  return (app) => {
    app.provide("MinkLogo", SbMinkLogo);
  };
}
