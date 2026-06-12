<template>
  <div>
    <h2 class="mb-4 text-2xl font-heading">
      {{ $t("home.hero.subtitle") }}
    </h2>

    <i18n-t keypath="home.hero.sb" scope="global" tag="p" class="my-2">
      <a :href="$t('links.sbx.url')" target="_blank">Språkbanken</a>
    </i18n-t>

    <i18n-t keypath="home.hero.mink" scope="global" tag="p" class="my-2">
      <strong>Mink</strong>
    </i18n-t>

    <p>{{ $t("home.hero.workflow") }}</p>

    <ul class="list-disc my-2 ms-6">
      <li>
        <i18n-t keypath="home.hero.workflow.create" scope="global">
          <template #corpora>
            <strong>{{ $t("home.hero.workflow.create.corpora") }}</strong>
          </template>
          <template #lexicons>
            <strong>{{ $t("home.hero.workflow.create.lexicons") }}</strong>
          </template>
        </i18n-t>
      </li>
      <li>{{ $t("home.hero.workflow.run") }}</li>
      <li>{{ $t("home.hero.workflow.download") }}</li>
      <li>{{ $t("home.hero.workflow.install") }}</li>
      <li>{{ $t("home.hero.workflow.invite") }}</li>
    </ul>
  </div>
</template>
