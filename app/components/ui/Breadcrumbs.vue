<template>
  <nav class="breadcrumbs">
    <template v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="item.to" :to="item.to" class="breadcrumbs__link">{{ item.label }}</NuxtLink>
      <span v-else class="breadcrumbs__current">{{ item.label }}</span>
      <span v-if="index < items.length - 1" class="breadcrumbs__divider">/</span>
    </template>
  </nav>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'Breadcrumbs',

  props: {
    items: { type: Array as PropType<{ label: string; to?: string }[]>, required: true },
  },
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 20px 0;
  font-size: 0.875rem;

  &__link {
    color: $accent-text;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &__current {
    color: $text-soft;
  }

  &__divider {
    color: $muted;
  }
}
</style>
