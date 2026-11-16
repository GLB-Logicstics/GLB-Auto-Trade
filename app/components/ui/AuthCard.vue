<template>
  <div class="container auth-card">
    <div class="card auth-card__box">
      <span class="auth-card__icon"><i :class="['bi', icon]" /></span>
      <h1 class="auth-card__title">{{ title }}</h1>
      <p class="auth-card__text">{{ text }}</p>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthCard',

  props: {
    title: { type: String, required: true },
    text: { type: String, default: '' },
    icon: { type: String, default: 'bi-person' },
  },
})
</script>

<style lang="scss" scoped>
.auth-card {
  padding-top: 40px;

  &__box {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 440px;
    padding: 32px 24px;
    margin: 0 auto;
  }

  &__icon {
    @include flex-center;
    align-self: center;
    width: 64px;
    height: 64px;
    font-size: 28px;
    color: $accent;
    background-color: $accent-soft;
    border-radius: 50%;
  }

  &__title {
    font-size: 1.5rem;
    text-align: center;
  }

  &__text {
    font-size: 0.875rem;
    color: $text-soft;
    text-align: center;
  }
}
</style>
