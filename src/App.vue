<template>
  <a-config-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
// import { watchEffect } from "vue";
// import { useRoute } from "vue-router";
// import { transformI18n } from "./hooks/useI18n";
// import { useLocale } from "@/locales/useLocale";

// const route = useRoute();
// const { getAntdLocale } = useLocale();

// watchEffect(() => {
//   if (route.meta?.title) {
//     // 翻译网页标题
//     // document.title = transformI18n(route.meta.title);
//   }
// });
</script>
<style lang="less"></style>
