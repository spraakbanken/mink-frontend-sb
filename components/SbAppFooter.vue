<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>

<template>
  <footer class="mt-10 shadow-sm bg-zinc-800 text-zinc-200">
    <div class="container py-20 grid lg:grid-cols-3 gap-12 text-center">
      <!-- Left -->
      <div class="lg:text-start">
        <div>
          <a :href="$t('links.sbx.url')" target="_blank">
            <img
              src="@/assets/sprakbankentext-light.svg"
              alt="Språkbanken Text"
              class="inline-block mb-2 h-8"
            />
          </a>
        </div>
        <ul>
          <li>
            <a :href="$t('links.about.url')" target="_blank">
              {{ $t("links.about.label") }}
            </a>
          </li>
          <li>
            <a :href="$t('links.news.url')" target="_blank">
              {{ $t("links.news.label") }}
            </a>
          </li>
          <li>
            <a :href="$t('links.platforms.url')" target="_blank">
              {{ $t("links.platforms.label") }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Center -->
      <div>
        <ul>
          <li>
            <a :href="$t('links.contact.url')" target="_blank">
              {{ $t("links.contact.label") }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Right -->
      <div class="lg:text-end">
        <a :href="$t('links.gu.url')" target="_blank">
          <img
            v-if="locale == 'sv'"
            src="@/assets/gu-logo-white-sv.svg"
            alt="Göteborgs universitet"
            class="inline-block mb-2"
          />
          <img
            v-else
            src="@/assets/gu-logo-white-en.svg"
            alt="University of Gothenburg"
            class="inline-block mb-2"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
