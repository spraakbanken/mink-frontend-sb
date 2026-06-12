<script setup lang="ts">
import CardBox from "@/components/CardBox.vue";
import LayoutSection from "@/components/LayoutSection.vue";
import {
  PhBookOpenText,
  PhBracketsCurly,
  PhFolderOpen,
  PhListMagnifyingGlass,
  PhLockKeyOpen,
  PhMagicWand,
} from "@phosphor-icons/vue";
</script>

<template>
  <div>
    <!-- Features -->
    <h2 class="text-3xl text-center mb-8">{{ $t("home.features.title") }}</h2>
    <ul
      class="my-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-lg"
    >
      <CardBox tag="li" class="flex-1 flex gap-4 items-center">
        <PhFolderOpen class="w-6 h-6 shrink-0" />
        {{ $t("home.features.upload") }}
      </CardBox>
      <CardBox tag="li" class="flex-1 flex gap-4 items-center">
        <PhMagicWand class="w-6 h-6 shrink-0" />
        {{ $t("home.features.annotations") }}
      </CardBox>
      <CardBox tag="li" class="flex-1 flex gap-4 items-center">
        <PhListMagnifyingGlass class="w-6 h-6 shrink-0" />
        {{ $t("home.features.install") }}
      </CardBox>
      <CardBox tag="li" class="flex-1 flex gap-4 items-center">
        <PhBookOpenText class="w-6 h-6 shrink-0" />
        {{ $t("home.features.lexicons") }}
      </CardBox>
    </ul>

    <!-- Meta-features -->
    <ul
      class="my-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-lg"
    >
      <CardBox tag="li" class="flex-1">
        <div class="text-center mb-4">
          <PhLockKeyOpen class="inline w-8 h-8" />
        </div>
        {{ $t("home.features.privacy") }}
      </CardBox>

      <CardBox tag="li" class="flex-1">
        <div class="text-center mb-4">
          <PhBracketsCurly class="inline w-8 h-8" />
        </div>
        <i18n-t keypath="home.features.code" scope="global">
          <template #repos>
            <a href="https://github.com/spraakbanken/?q=mink" target="_blank">
              {{ $t("home.features.code.repos") }}
            </a>
          </template>
        </i18n-t>
      </CardBox>
    </ul>

    <!-- Links -->
    <h2 class="text-3xl text-center mb-8">{{ $t("home.links.title") }}</h2>
    <ul class="my-8 max-w-md mx-auto flex flex-col gap-4 text-lg">
      <li>
        <a :href="$t('home.links.tutorial.url')" target="_blank">
          <strong>{{ $t("home.links.tutorial.label") }}</strong>
        </a>
        – {{ $t("home.links.tutorial") }}
      </li>

      <li>
        <a
          href="https://spraakbanken.gu.se/en/tools/mink/manual"
          target="_blank"
        >
          <strong>{{ $t("home.links.manual.label") }}</strong>
        </a>
        – {{ $t("home.links.manual") }}
      </li>

      <li>
        <a
          href="https://spraakbanken.gu.se/en/tools/mink/data-policy"
          target="_blank"
        >
          <strong>{{ $t("home.links.privacy.label") }}</strong>
        </a>
      </li>

      <li>
        <a :href="$t('home.links.api.url')" target="_blank">
          <strong>{{ $t("home.links.api.label") }}</strong>
        </a>
        – {{ $t("home.links.api") }}
      </li>

      <li>
        <a :href="$t('home.links.resources.url')" target="_blank">
          <strong>{{ $t("home.links.resources.label") }}</strong>
        </a>
        – {{ $t("home.links.resources") }}
      </li>
    </ul>

    <!-- Mink or no Mink -->
    <div>
      <p class="max-w-2xl mx-auto mt-16">
        <strong>{{ $t("home.otherdata.title") }}</strong>
        {{}}
        <i18n-t keypath="home.otherdata.body" scope="global">
          <a
            :href="$t('home.otherdata.sbdata.url')"
            :title="$t('home.otherdata.sbdata.title')"
            target="_blank"
          >
            {{ $t("home.otherdata.sbdata.label") }}
          </a>
          <a
            href="https://vlo.clarin.eu/"
            title="CLARIN Virtual Language Observatory"
            target="_blank"
            >Virtual Language Observatory</a
          >
        </i18n-t>
      </p>
    </div>
  </div>
</template>
