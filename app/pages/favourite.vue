<template>
  <div class="container">
    <Breadcrumbs :items="[{ label: 'Əsas səhifə', to: '/' }, { label: 'Seçilmişlər' }]" />

    <template v-if="loggedIn">
      <h1 class="favourite-page__title">Seçilmişlər ({{ ids.length }})</h1>

      <div v-if="ids.length" class="card-grid">
        <AuctionCarCard v-for="lot in favouriteLots" :key="`lot-${lot.id}`" :car="lot" />
        <LocalCarCard v-for="car in favouriteCars" :key="`car-${car.id}`" :car="car" />
        <KoreaCarCard v-for="car in favouriteKorea" :key="`korea-${car.id}`" :car="car" />
      </div>

      <div v-else class="card empty-state">
        <i class="bi bi-heart" />
        <h2>Siyahı boşdur</h2>
        <p>Bəyəndiyiniz avtomobilləri ürək düyməsi ilə seçilmişlərə əlavə edin.</p>
        <NuxtLink to="/auction-lots" class="btn btn--accent">Hərrac lotlarına bax</NuxtLink>
      </div>
    </template>

    <div v-else class="card login-required">
      <span class="login-required__icon"><i class="bi bi-lock" /></span>
      <h1 class="login-required__title">Seçilmişlərə baxmaq üçün daxil olun</h1>
      <p class="login-required__text">
        Bəyəndiyiniz avtomobillər yadda saxlanılıb. Onların siyahısını görmək üçün hesabınıza daxil olun.
      </p>
      <div class="login-required__actions">
        <NuxtLink :to="{ path: '/login', query: { redirect: '/favourite' } }" class="btn btn--accent">
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
import { mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useCarsStore } from '~/stores/cars'
import { useFavouritesStore } from '~/stores/favourites'
import { useKoreaStore } from '~/stores/korea'
import { useLotsStore } from '~/stores/lots'
import type { KoreaCar, LocalCar, Lot } from '~/types'

export default defineComponent({
  name: 'FavouritePage',

  setup() {
    useSeoMeta({ title: 'Seçilmişlər — GLB Logistics', robots: 'noindex' })
  },

  computed: {
    ...mapState(useAuthStore, ['loggedIn']),
    ...mapState(useFavouritesStore, ['ids']),
    ...mapState(useLotsStore, { lotItems: 'items' }),
    ...mapState(useCarsStore, { carItems: 'items' }),
    ...mapState(useKoreaStore, { koreaItems: 'items' }),

    favouriteLots(): Lot[] {
      return this.lotItems.filter((lot) => this.ids.includes(`lot-${lot.id}`))
    },

    favouriteCars(): LocalCar[] {
      return this.carItems.filter((car) => this.ids.includes(`car-${car.id}`))
    },

    favouriteKorea(): KoreaCar[] {
      return this.koreaItems.filter((car) => this.ids.includes(`korea-${car.id}`))
    },
  },
})
</script>

<style lang="scss" scoped>
.favourite-page__title {
  margin-bottom: 20px;
  font-size: 1.625rem;
}

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
