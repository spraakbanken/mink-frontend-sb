<script setup lang="ts">
import LayoutSection from "@/components/LayoutSection.vue";
</script>

<template>
  <div>
    <div
      class="flex flex-col 2xl:flex-row my-20 gap-20 md:w-4/5 lg:w-2/3 2xl:w-full mx-auto"
    >
      <div
        class="flex-1 flex flex-col md:flex-row 2xl:flex-col items-center gap-6"
      >
        <figure
          class="md:w-1/2 2xl:w-4/5 shadow-lg hover:scale-110 transition-transform"
        >
          <img
            src="@/assets/sparv-screen.png"
            :alt="$t('home.features.sparv.alt')"
          />
        </figure>

        <LayoutSection
          :title="$t('home.features.sparv.title')"
          class="flex-1 my-0 text-center"
        >
          <i18n-t keypath="home.features.sparv.body" scope="global" tag="p">
            <template #sparv>
              <a :href="$t('sparv.url')"><strong>Sparv</strong></a>
            </template>
          </i18n-t>
        </LayoutSection>
      </div>

      <div
        class="flex-1 flex flex-col md:flex-row-reverse 2xl:flex-col items-center gap-6"
      >
        <figure
          class="md:w-1/2 2xl:w-4/5 shadow-lg hover:scale-110 transition-transform"
        >
          <img src="@/assets/texts.png" :alt="$t('home.features.upload.alt')" />
        </figure>

        <LayoutSection
          :title="$t('home.features.upload.title')"
          class="flex-1 my-0 text-center"
        >
          <i18n-t keypath="home.features.upload.body" scope="global" tag="p" />

          <i18n-t keypath="home.features.upload.xml" scope="global" tag="p">
            <template #link>
              <a
                :href="$t('home.features.upload.xml.link.url')"
                target="_blank"
              >
                {{ $t("home.features.upload.xml.link.label") }}
              </a>
            </template>
          </i18n-t>
        </LayoutSection>
      </div>

      <div
        class="flex-1 flex flex-col md:flex-row 2xl:flex-col items-center gap-6"
      >
        <figure
          class="md:w-1/2 2xl:w-4/5 shadow-lg hover:scale-110 transition-transform"
        >
          <img
            src="@/assets/korp-screen.png"
            :alt="$t('home.features.explore.alt')"
          />
        </figure>

        <LayoutSection
          :title="$t('home.features.explore.title')"
          class="flex-1 my-0 text-center"
        >
          <i18n-t keypath="home.features.explore.body" scope="global" tag="p">
            <template #korp>
              <a
                href="https://spraakbanken.gu.se/en/tools/korp"
                title="About the Korp tool"
              >
                <strong>Korp</strong>
              </a>
            </template>
            <template #strix>
              <a href="https://spraakbanken.gu.se/strix/">
                <strong>Strix</strong></a
              >
            </template>
          </i18n-t>
        </LayoutSection>
      </div>

      <div
        class="flex-1 flex flex-col md:flex-row-reverse 2xl:flex-col items-center gap-6"
      >
        <figure
          class="md:w-1/2 2xl:w-4/5 shadow-lg hover:scale-110 transition-transform"
        >
          <img src="@/assets/share.png" :alt="$t('home.features.share.alt')" />
        </figure>

        <LayoutSection
          :title="$t('home.features.share.title')"
          class="flex-1 my-0 text-center"
        >
          <p>{{ $t("home.features.share.body") }}</p>
        </LayoutSection>
      </div>
    </div>

    <div>
      <p class="max-w-2xl mx-auto mb-2">
        <strong>{{ $t("home.otherdata.title") }}</strong>
        {{ " " }}
        <i18n-t keypath="home.otherdata.body" scope="global">
          <a
            :href="$t('home.otherdata.sbdata.url')"
            :title="$t('home.otherdata.sbdata.title')"
            >Data</a
          >
          <a
            href="https://vlo.clarin.eu/"
            title="CLARIN Virtual Language Observatory"
            >Virtual Language Observatory</a
          >
        </i18n-t>
      </p>
    </div>
  </div>
</template>
