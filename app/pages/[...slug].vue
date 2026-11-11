<template>
  <section class="coming-soon">
    <div class="container coming-soon__inner">
      <span class="coming-soon__icon"><i class="bi bi-tools" /></span>
      <h1 class="coming-soon__title">Bu səhifə hazırlanır</h1>
      <p class="coming-soon__text">{{ $route.path }}</p>
      <NuxtLink to="/" class="btn btn--accent">
        <i class="bi bi-house" />
        Əsas səhifəyə qayıt
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComingSoonPage',

  setup() {
    useSeoMeta({ title: 'Tezliklə — GLB Logistics', robots: 'noindex' })
  },
})
</script>

<style lang="scss" scoped>
.coming-soon {
  padding: 80px 0 40px;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
  }

  &__icon {
    @include flex-center;
    width: 72px;
    height: 72px;
    font-size: 30px;
    color: $accent;
    background-color: $accent-soft;
    border-radius: 50%;
  }

  &__title {
    font-size: 1.5rem;

    @include up(md) {
      font-size: 2rem;
    }
  }

  &__text {
    color: $text-soft;
  }
}
</style>
