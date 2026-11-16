<template>
  <article class="korea-card">
    <div class="korea-card__media">
      <img
        :src="car.image || placeholder"
        :alt="car.title"
        class="korea-card__image"
        width="400"
        height="300"
        loading="lazy"
        @error="onImageError"
      >
      <span class="korea-card__flag">🇰🇷 {{ car.location }}</span>
      <FavouriteButton :id="`korea-${car.id}`" class="korea-card__fav" />
    </div>

    <div class="korea-card__body">
      <div class="korea-card__head">
        <h3 class="korea-card__title">{{ car.title }}</h3>
        <span class="korea-card__year">{{ car.year }}</span>
      </div>

      <p class="korea-card__specs">{{ car.fuel }} · {{ car.engine }} · {{ car.mileage }}</p>

      <dl class="korea-card__prices">
        <div>
          <dt>Koreyada qiymət</dt>
          <dd>{{ formatUsd(car.price) }}</dd>
        </div>
        <div>
          <dt>Çatdırılma ({{ countryLabel }})</dt>
          <dd>{{ formatUsd(price.shipping) }}</dd>
        </div>
        <div>
          <dt>Gömrük (təxmini)</dt>
          <dd>{{ formatUsd(price.customs) }}</dd>
        </div>
        <div class="korea-card__total">
          <dt>Yekun</dt>
          <dd>{{ formatUsd(price.total) }}</dd>
        </div>
      </dl>

      <a :href="whatsapp" class="btn btn--whatsapp btn--sm" target="_blank" rel="noopener">
        <i class="bi bi-whatsapp" />
        Sorğu göndər
      </a>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapState } from 'pinia'
import { countries } from '~/data/calculator'
import { optionLabel } from '~/data/filters'
import { useKoreaStore, type KoreaPrice } from '~/stores/korea'
import { useSiteStore } from '~/stores/site'
import { formatUsd, onImageError, PLACEHOLDER_IMAGE } from '~/utils/format'
import type { KoreaCar } from '~/types'

export default defineComponent({
  name: 'KoreaCarCard',

  props: {
    car: { type: Object as PropType<KoreaCar>, required: true },
  },

  data() {
    return { placeholder: PLACEHOLDER_IMAGE }
  },

  computed: {
    ...mapState(useKoreaStore, ['priceOf', 'country']),
    ...mapState(useSiteStore, ['whatsappHref']),

    price(): KoreaPrice {
      return this.priceOf(this.car)
    },

    countryLabel(): string {
      return optionLabel(countries, this.country)
    },

    whatsapp(): string {
      return this.whatsappHref(
        `Koreyadan ${this.car.year} ${this.car.title} sifariş etmək istəyirəm (${this.countryLabel}).`,
      )
    },
  },

  methods: {
    formatUsd,
    onImageError,
  },
})
</script>

<style lang="scss" scoped>
.korea-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: $white;
  border: 1px solid $line;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;

  &__media {
    position: relative;
    aspect-ratio: 4 / 3;
    background-color: $surface;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__flag {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    color: $ink;
    background-color: $white;
    border-radius: 20px;
  }

  &__fav {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  &__title {
    font-size: 1.0625rem;
  }

  &__year {
    font-weight: 600;
    color: $accent-text;
  }

  &__specs {
    font-size: 0.8125rem;
    color: $text-soft;
  }

  &__prices {
    flex: 1;
    font-size: 0.8125rem;

    div {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px dashed $line;
    }

    dt {
      color: $text-soft;
    }

    dd {
      margin: 0;
      font-weight: 600;
      color: $ink;
    }
  }

  &__total {
    border-bottom: 0 !important;

    dt,
    dd {
      font-size: 0.9375rem;
      font-weight: 700;
      color: $accent-text !important;
    }
  }
}
</style>
