<template>
  <div>
    <i18n-t keypath="home.hero.sb" scope="global" tag="p" class="my-2">
      <strong>Språkbanken Text</strong>
    </i18n-t>
    <i18n-t keypath="home.hero.mink" scope="global" tag="p" class="my-2">
      <strong>Mink</strong>
    </i18n-t>
    <i18n-t keypath="home.hero.privacy" scope="global" tag="p" class="my-2">
      <a :href="$t('home.hero.privacy.link.url')">
        {{ $t("home.hero.privacy.link.label") }}
      </a>
    </i18n-t>
    <i18n-t keypath="home.hero.readmore" scope="global" tag="p" class="my-2">
      <a :href="$t('docs.url')" target="_blank">
        {{ $t("home.hero.readmore.link.label") }}
      </a>
    </i18n-t>
  </div>
</template>
