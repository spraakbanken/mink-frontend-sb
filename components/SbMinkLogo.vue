<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import logoSlogan from "@instance/img/mink-slogan.svg";
import logoSloganEn from "@instance/img/mink-slogan-en.svg";
import logoLightSlogan from "@instance/img/mink-light-slogan.svg";
import logoLightSloganEn from "@instance/img/mink-light-slogan-en.svg";
import logoLight from "@/assets/mink-light.svg";
import logo from "@/assets/mink.svg";

const props = defineProps<{
  large: boolean;
}>();

const { locale } = useI18n();

const src = computed(() =>
  props.large ? (locale.value == "en" ? logoSloganEn : logoSlogan) : logo,
);
const srcLight = computed(() =>
  props.large
    ? locale.value == "en"
      ? logoLightSloganEn
      : logoLightSlogan
    : logoLight,
);
</script>

<template>
  <!-- Wrap img with picutre+source to select file depending on light/dark mode -->
  <picture>
    <source media="(prefers-color-scheme: dark)" :srcset="srcLight" />
    <!-- Nudge the large version down a bit to compensate for the descender of the letter p in the slogan -->
    <img
      :src="src"
      :alt="$t('logo.alt')"
      :class="[large ? 'h-24 relative top-1' : 'h-16']"
    />
  </picture>
</template>
