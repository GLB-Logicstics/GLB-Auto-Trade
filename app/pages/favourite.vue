<template>
  <div class="container">
    <Breadcrumbs :items="[{ label: 'Əsas səhifə', to: '/' }, { label: 'Seçilmişlər' }]" />

    <div class="card login-required">
      <span class="login-required__icon"><i class="bi bi-lock" /></span>
      <h1 class="login-required__title">Seçilmişlərə baxmaq üçün daxil olun</h1>
      <p class="login-required__text">
        Bəyəndiyiniz avtomobillər yadda saxlanılıb. Onların siyahısını görmək üçün hesabınıza daxil olun.
      </p>
      <div class="login-required__actions">
        <NuxtLink to="/login" class="btn btn--accent">
          <i class="bi bi-box-arrow-in-right" />
          Daxil ol
        </NuxtLink>
        <NuxtLink to="/auction-lots" class="login-required__link">Hərrac lotlarına bax</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FavouritePage',

  setup() {
    useSeoMeta({ title: 'Seçilmişlər — GLB Logistics', robots: 'noindex' })
  },
})
</script>

<style lang="scss" scoped>
.login-required {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 560px;
  padding: 48px 24px;
  margin: 20px auto 0;
  text-align: center;

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
    font-size: 1.375rem;
  }

  &__text {
    color: $text-soft;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
  }

  &__link {
    font-weight: 500;
    color: $accent-text;
  }
}
</style>
