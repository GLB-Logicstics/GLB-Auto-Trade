<template>
  <NuxtLayout>
    <section class="error-page">
      <div class="container error-page__inner">
        <span class="error-page__code">{{ error.statusCode }}</span>
        <h1 class="error-page__title">
          {{ error.statusCode === 404 ? 'Səhifə tapılmadı' : 'Xəta baş verdi' }}
        </h1>
        <p class="error-page__text">{{ error.statusMessage || error.message }}</p>
        <button type="button" class="btn btn--accent" @click="goHome">
          <i class="bi bi-house" />
          Əsas səhifəyə qayıt
        </button>
      </div>
    </section>
  </NuxtLayout>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { NuxtError } from '#app'

export default defineComponent({
  name: 'ErrorPage',

  props: {
    error: { type: Object as PropType<NuxtError>, required: true },
  },

  methods: {
    goHome() {
      clearError({ redirect: '/' })
    },
  },
})
</script>

<style lang="scss" scoped>
.error-page {
  padding: 80px 0 40px;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  &__code {
    font-family: $font-heading;
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    color: $danger;
  }

  &__title {
    font-size: 1.5rem;
  }

  &__text {
    margin-bottom: 8px;
    color: $text-soft;
  }
}
</style>
