<template>
  <NuxtLink :to="`/services/${service.slug}`" class="service-card">
    <span class="service-card__icon"><i :class="['bi', service.icon]" /></span>
    <h3 class="service-card__title">{{ service.title }}</h3>
    <p class="service-card__text">{{ service.short }}</p>
    <span class="link-arrow">
      Ətraflı
      <i class="bi bi-arrow-right" />
    </span>
  </NuxtLink>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Service } from '~/types'

export default defineComponent({
  name: 'ServiceCard',

  props: {
    service: { type: Object as PropType<Service>, required: true },
  },
})
</script>

<style lang="scss" scoped>
.service-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 24px;
  background-color: $white;
  border: 1px solid $line;
  border-radius: $radius-md;
  transition:
    border-color $transition,
    box-shadow $transition;

  &:hover {
    border-color: $accent;
    box-shadow: $shadow-card;
  }

  &__icon {
    @include flex-center;
    width: 56px;
    height: 56px;
    font-size: 24px;
    color: $white;
    background-color: $accent;
    border-radius: $radius;
  }

  &__title {
    font-size: 1.125rem;
  }

  &__text {
    flex: 1;
    font-size: 0.875rem;
    color: $text-soft;
  }
}
</style>
