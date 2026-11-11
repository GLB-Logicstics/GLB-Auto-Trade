<template>
  <article class="car-row" :class="{ 'is-sold': car.sold }">
    <div class="car-row__main">
      <NuxtLink :to="link" class="car-row__image">
        <img :src="car.image" :alt="car.title" width="240" height="180" loading="lazy" @error="onImageError">
        <span class="car-row__status">{{ car.sold ? 'Satılıb' : 'Satılır' }}</span>
      </NuxtLink>

      <div class="car-row__info">
        <h3 class="car-row__title">
          <NuxtLink :to="link">{{ car.year }} {{ car.title }}</NuxtLink>
        </h3>
        <p><span>Gücü:</span> {{ car.power }} a.g.</p>
        <p><span>Mühərrik:</span> {{ car.engine }}</p>
      </div>

      <div class="car-row__col">
        <p><span>Yürüş:</span> <strong>{{ car.mileage }}</strong></p>
        <p><span>Yanacaq:</span> {{ car.fuel }}</p>
      </div>

      <div class="car-row__price">
        <p><span>Qiymət:</span> <strong>{{ formatUsd(car.price) }}</strong></p>
        <p><span>Yeri:</span> {{ car.location }}</p>
        <div class="car-row__actions">
          <NuxtLink :to="link" class="btn btn--accent car-row__button">Ətraflı</NuxtLink>
          <FavouriteButton :id="`car-${car.id}`" />
        </div>
      </div>
    </div>

    <dl v-show="expanded" class="car-row__more">
      <div><dt>Ban növü</dt><dd>{{ car.bodyType }}</dd></div>
      <div><dt>Rəng</dt><dd>{{ car.color }}</dd></div>
      <div><dt>Sürət qutusu</dt><dd>{{ car.transmission }}</dd></div>
      <div><dt>Ötürücü</dt><dd>{{ car.drive }}</dd></div>
      <div><dt>VIN</dt><dd>{{ car.vin }}</dd></div>
    </dl>

    <button type="button" class="car-row__toggle" @click="expanded = !expanded">
      {{ expanded ? 'Daha az −' : 'Daha çox +' }}
    </button>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { formatUsd, onImageError } from '~/utils/format'
import type { LocalCar } from '~/types'

export default defineComponent({
  name: 'CarRow',

  props: {
    car: { type: Object as PropType<LocalCar>, required: true },
  },

  data() {
    return { expanded: false }
  },

  computed: {
    link(): string {
      return `/cars/${this.car.slug}`
    },
  },

  methods: {
    formatUsd,
    onImageError,
  },
})
</script>

<style lang="scss" scoped>
.car-row {
  overflow: hidden;
  background-color: $white;
  border: 1px solid $line;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;

  & + & {
    margin-top: 14px;
  }

  &__main {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 12px 14px;
    padding: 12px;

    @include up(md) {
      grid-template-columns: 200px 1fr 1fr;
      padding: 14px;
    }

    @include up(xl) {
      grid-template-columns: 180px 1.3fr 1fr 1.2fr;
      align-items: start;
    }
  }

  &__image {
    position: relative;
    display: block;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    background-color: $surface;
    border-radius: $radius;
    grid-row: span 2;

    @include up(xl) {
      grid-row: auto;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.is-sold &__image img {
    opacity: 0.75;
  }

  &__status {
    position: absolute;
    top: 6px;
    left: 6px;
    padding: 2px 8px;
    font-size: 0.6875rem;
    font-weight: 600;
    color: $white;
    background-color: $primary;
    border-radius: 4px;
  }

  &.is-sold &__status {
    background-color: $danger;
  }

  &__info,
  &__col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    font-size: 0.8125rem;
    color: $ink;

    @include up(md) {
      font-size: 0.875rem;
    }

    span {
      color: $text-soft;
    }
  }

  &__col {
    display: none;

    @include up(md) {
      display: flex;
    }
  }

  &__title {
    font-family: $font-body;
    font-size: 1rem;
    font-weight: 600;

    a:hover {
      color: $accent-text;
    }
  }

  &__price {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 16px;
    padding-top: 12px;
    font-size: 0.875rem;
    border-top: 1px solid $line-soft;
    grid-column: 1 / -1;

    @include up(md) {
      grid-column: 2 / -1;
    }

    @include up(xl) {
      flex-direction: column;
      align-items: flex-start;
      padding-top: 0;
      border-top: 0;
      grid-column: auto;
    }

    span {
      color: $text-soft;
    }

    strong {
      font-size: 1rem;
      color: $accent-text;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;

    @include up(xl) {
      margin-left: 0;
    }
  }

  &__button {
    height: 36px;
    padding: 0 18px;
    font-size: 0.875rem;
  }

  &__more {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 16px;
    padding: 12px 14px;
    font-size: 0.8125rem;
    background-color: $page-bg;
    border-top: 1px solid $line-soft;

    @include up(md) {
      grid-template-columns: repeat(5, 1fr);
    }

    dt {
      color: $text-soft;
    }

    dd {
      font-weight: 600;
      color: $ink;
      word-break: break-word;
    }
  }

  &__toggle {
    width: 100%;
    padding: 8px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: $accent-text;
    background-color: $accent-soft;
  }
}
</style>
