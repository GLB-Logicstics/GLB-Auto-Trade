<template>
  <div v-if="car">
    <div class="container car-page">
      <Breadcrumbs :items="breadcrumbs" />

      <div class="car-page__head">
        <div>
          <h1 class="car-page__title">{{ car.year }} {{ car.title }}</h1>
          <p class="car-page__meta">
            <span>{{ car.bodyType }}</span>
            <span>{{ car.mileage }}</span>
            <span><i class="bi bi-geo-alt" /> {{ car.location }}</span>
          </p>
        </div>

        <button type="button" class="car-page__favourite" :class="{ 'is-active': isFavourite }" @click="toggle(favouriteId)">
          <i :class="['bi', isFavourite ? 'bi-heart-fill' : 'bi-heart']" />
          {{ isFavourite ? 'Seçilmişlərdədir' : 'Seçilmişlərə əlavə et' }}
        </button>
      </div>

      <div class="car-page__top">
        <LotGallery :images="car.images" :title="car.title" :status="status" />

        <div class="car-page__side">
          <div class="card car-page__price-card">
            <h2 class="car-page__box-title">
              <i class="bi bi-tag" />
              Satış məlumatı
            </h2>

            <div class="car-page__price-body">
              <s v-if="car.oldPrice" class="car-page__old-price">{{ formatUsd(car.oldPrice) }}</s>
              <p class="car-page__price">{{ formatUsd(car.price) }}</p>
              <p class="car-page__azn">≈ {{ formatAzn(car.price * aznRate) }}</p>

              <span class="car-page__status" :class="{ 'is-sold': car.sold }">
                <i :class="['bi', car.sold ? 'bi-x-circle' : 'bi-check-circle']" />
                {{ car.sold ? 'Satılıb' : 'Satışdadır' }}
              </span>

              <div class="car-page__actions">
                <a :href="whatsappLink" class="btn btn--accent" target="_blank" rel="noopener">
                  <i class="bi bi-whatsapp" />
                  WhatsApp ilə yaz
                </a>
                <a :href="phoneHref" class="btn car-page__call">
                  <i class="bi bi-telephone" />
                  {{ contact.phoneDisplay }}
                </a>
              </div>
            </div>
          </div>

          <div class="card">
            <h2 class="car-page__box-title">
              <i class="bi bi-card-list" />
              Ümumi məlumat
            </h2>
            <dl class="car-page__list">
              <div><dt>Marka:</dt><dd>{{ car.make }}</dd></div>
              <div><dt>Model:</dt><dd>{{ car.model }}</dd></div>
              <div><dt>Versiya:</dt><dd>{{ car.version }}</dd></div>
              <div><dt>İl:</dt><dd>{{ car.year }}</dd></div>
              <div><dt>Ban növü:</dt><dd>{{ car.bodyType }}</dd></div>
              <div><dt>Rəng:</dt><dd>{{ car.color }}</dd></div>
              <div><dt>Mühərrik:</dt><dd>{{ car.engine }} / {{ car.power }} a.g.</dd></div>
              <div><dt>Yanacaq:</dt><dd>{{ car.fuel }}</dd></div>
              <div><dt>Yürüş:</dt><dd>{{ car.mileage }}</dd></div>
              <div><dt>Sürət qutusu:</dt><dd>{{ car.transmission }}</dd></div>
              <div><dt>Ötürücü:</dt><dd>{{ car.drive }}</dd></div>
              <div><dt>VIN:</dt><dd>{{ car.vin }}</dd></div>
            </dl>
          </div>
        </div>
      </div>

      <div class="card car-page__about">
        <h2 class="car-page__box-title">
          <i class="bi bi-info-circle" />
          Ətraflı məlumat
        </h2>
        <div class="car-page__about-body">
          <p v-for="(text, index) in car.description" :key="index">{{ text }}</p>

          <ul class="car-page__features">
            <li v-for="feature in car.features" :key="feature">
              <i class="bi bi-check2" />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <CarSection v-if="similarSection.items.length" :section="similarSection" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { AZN_RATE } from '~/data/calculator'
import { useCarsStore } from '~/stores/cars'
import { useFavouritesStore } from '~/stores/favourites'
import { useSiteStore } from '~/stores/site'
import { formatAzn, formatUsd } from '~/utils/format'
import type { CarSection, LocalCar, SaleStatus } from '~/types'

export default defineComponent({
  name: 'CarPage',

  setup() {
    const route = useRoute()
    const car = useCarsStore().carBySlug(String(route.params.slug))

    if (!car) {
      throw createError({ statusCode: 404, statusMessage: 'Avtomobil tapılmadı', fatal: true })
    }

    useSeoMeta({
      title: `${car.year} ${car.title} — Bakıda satışda | GLB Logistics`,
      description: `${car.year} ${car.title}, ${car.mileage}, ${car.engine}. Qiymət: $${car.price}.`,
    })
  },

  data() {
    return { aznRate: AZN_RATE }
  },

  computed: {
    ...mapState(useCarsStore, ['carBySlug', 'similarCars']),
    ...mapState(useFavouritesStore, ['ids']),
    ...mapState(useSiteStore, ['contact', 'phoneHref']),

    car(): LocalCar | undefined {
      return this.carBySlug(String(this.$route.params.slug))
    },

    status(): SaleStatus {
      if (this.car!.sold) return { label: 'Satılıb', color: '#e57373', icon: 'bi-x-circle' }
      return { label: 'Satılır', color: '#0096cc', icon: 'bi-check-circle' }
    },

    favouriteId(): string {
      return `car-${this.car!.id}`
    },

    isFavourite(): boolean {
      return this.ids.includes(this.favouriteId)
    },

    whatsappLink(): string {
      const text = `Salam, ${this.car!.year} ${this.car!.title} (VIN: ${this.car!.vin}) haqqında məlumat almaq istəyirəm.`
      return `${this.contact.whatsapp}?text=${encodeURIComponent(text)}`
    },

    breadcrumbs() {
      const car = this.car!
      return [
        { label: 'Əsas səhifə', to: '/' },
        { label: 'Azərbaycandakı avtomobillər', to: '/search?country=az' },
        { label: `${car.year} ${car.title}` },
      ]
    },

    similarSection(): CarSection {
      return {
        id: 'similar-cars',
        type: 'local',
        title: 'Digər',
        highlight: 'Avtomobillər',
        subtitle: 'Azərbaycanda satışda olan digər avtomobillər',
        moreLink: '/search?country=az',
        items: this.similarCars(this.car!),
      }
    },
  },

  methods: {
    ...mapActions(useFavouritesStore, ['toggle']),
    formatAzn,
    formatUsd,
  },
})
</script>

<style lang="scss" scoped>
.car-page {
  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;

    @include up(md) {
      font-size: 2rem;
    }
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 6px;
    font-size: 0.875rem;
    color: $text-soft;
  }

  &__favourite {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 42px;
    padding: 0 16px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: $ink;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;
    transition: border-color $transition, color $transition;

    i {
      color: $danger;
    }

    &:hover,
    &.is-active {
      border-color: $danger;
    }
  }

  &__top {
    display: grid;
    gap: 20px;
    margin-bottom: 20px;

    @include up(lg) {
      grid-template-columns: 1.4fr 1fr;
      align-items: start;
    }
  }

  &__side {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__box-title {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    font-family: $font-body;
    font-size: 1.125rem;
    font-weight: 600;
    border-bottom: 1px solid $line;

    i {
      color: $accent;
    }
  }

  &__price-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 20px;
  }

  &__old-price {
    font-size: 0.9375rem;
    color: $muted;
  }

  &__price {
    font-family: $font-heading;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
    color: $ink;
  }

  &__azn {
    font-size: 0.875rem;
    color: $text-soft;
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    margin-top: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: $accent-text;
    background-color: $accent-soft;
    border-radius: 20px;

    &.is-sold {
      color: $danger;
      background-color: $danger-soft;
    }
  }

  &__actions {
    display: grid;
    gap: 10px;
    width: 100%;
    margin-top: 12px;

    @include up(sm) {
      grid-template-columns: 1fr 1fr;
    }

    .btn {
      width: 100%;
      padding: 0 12px;
      font-size: 0.9375rem;
    }
  }

  &__call {
    color: $ink;
    border: 1px solid $line;

    &:hover {
      border-color: $accent;
    }
  }

  &__list {
    padding: 4px 20px 8px;

    div {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 11px 0;
      font-size: 0.875rem;
      border-bottom: 1px solid $line-soft;

      &:last-child {
        border-bottom: 0;
      }
    }

    dt {
      flex-shrink: 0;
      color: $text-soft;
    }

    dd {
      font-weight: 600;
      color: $ink;
      text-align: right;
      word-break: break-word;
    }
  }

  &__about-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    font-size: 0.9375rem;
    line-height: 1.7;
  }

  &__features {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;

    li {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      font-size: 0.8125rem;
      color: $ink;
      background-color: $accent-soft;
      border-radius: 20px;
    }

    i {
      color: $accent-text;
    }
  }
}
</style>
