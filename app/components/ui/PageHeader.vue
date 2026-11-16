<template>
  <div class="page-header">
    <Breadcrumbs :items="[{ label: 'Əsas səhifə', to: '/' }, ...crumbs]" />
    <h1 class="page-header__title">{{ title }}</h1>
    <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'PageHeader',

  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    crumbs: { type: Array as PropType<{ label: string; to?: string }[]>, default: () => [] },
  },
})
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 24px;

  &__title {
    font-size: 1.625rem;

    @include up(md) {
      font-size: 2rem;
    }
  }

  &__subtitle {
    max-width: 720px;
    margin-top: 8px;
    color: $text-soft;
  }
}
</style>
