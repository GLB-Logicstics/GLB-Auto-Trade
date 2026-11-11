<template>
  <article class="local-card" :class="{ 'is-sold': car.sold }">
    <div class="local-card__media">
      <NuxtLink :to="link" class="local-card__image-link">
        <img
          :src="car.image"
          :alt="car.title"
          class="local-card__image"
          width="400"
          height="300"
          loading="lazy"
          @error="onImageError"
        >
      </NuxtLink>

      <span class="local-card__status">{{ car.sold ? 'Satılıb' : 'Satılır' }}</span>

      <FavouriteButton :id="`car-${car.id}`" class="local-card__fav" />
    </div>

    <div class="local-card__body">
      <span class="local-card__type">{{ car.bodyType }}</span>

      <div class="local-card__head">
        <h3 class="local-card__title">
          <NuxtLink :to="link">{{ car.title }}</NuxtLink>
        </h3>
        <span class="local-card__year">{{ car.year }}</span>
      </div>

      <p class="local-card__price">
        {{ formatUsd(car.price) }}
        <s v-if="car.oldPrice" class="local-card__old-price">{{ formatUsd(car.oldPrice) }}</s>
      </p>

      <ul class="local-card__specs">
        <li>
          <i class="bi bi-fuel-pump" />
          <span>Yanacaq</span>
          <strong>{{ car.fuel }}</strong>
        </li>
        <li>
          <i class="bi bi-speedometer2" />
          <span>Yürüş</span>
          <strong>{{ car.mileage }}</strong>
        </li>
        <li>
          <i class="bi bi-gear-wide-connected" />
          <span>Mühərrik</span>
          <strong>{{ car.engine }}</strong>
        </li>
      </ul>

      <NuxtLink :to="link" class="link-arrow local-card__more">
        Ətraflı bax
        <i class="bi bi-arrow-right" />
      </NuxtLink>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { formatUsd, onImageError } from '~/utils/format'
import type { LocalCar } from '~/types'

export default defineComponent({
  name: 'LocalCarCard',

  props: {
    car: { type: Object as PropType<LocalCar>, required: true },
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
.local-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: $white;
  border: 1px solid $line;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-4px);
  }

  &__media {
    position: relative;
    margin: 8px 8px 0;
    overflow: hidden;
    background-color: $surface;
    border-radius: $radius-md;
  }

  &__image-link {
    display: block;
    aspect-ratio: 4 / 3;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.is-sold &__image {
    opacity: 0.75;
    filter: grayscale(35%);
  }

  &__status {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 5px 11px;
    font-size: 0.75rem;
    font-weight: 700;
    color: $white;
    background-color: $accent;
    border-radius: $radius-sm;
  }

  &.is-sold &__status {
    background-color: $dark;
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
    gap: 6px;
    padding: 14px 18px 18px;
  }

  &__type {
    font-size: 0.75rem;
    font-weight: 600;
    color: $accent-text;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-family: $font-body;
    font-size: 1.0625rem;
    font-weight: 500;
    @include truncate;

    a:hover {
      color: $accent-text;
    }
  }

  &__year {
    flex-shrink: 0;
    padding: 3px 10px;
    font-size: 0.875rem;
    color: $accent-text;
    border: 1px dashed rgba($primary, 0.5);
    border-radius: $radius-sm;
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 1.25rem;
    font-weight: 700;
    color: $accent-text;
  }

  &__old-price {
    font-size: 0.875rem;
    font-weight: 500;
    color: $muted;
  }

  &__specs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 12px 0;
    margin-top: 6px;
    border-top: 1px solid $line-soft;
    border-bottom: 1px solid $line-soft;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      min-width: 0;
      text-align: center;
    }

    li + li {
      border-left: 1px solid $line-soft;
    }

    i {
      margin-bottom: 4px;
      font-size: 18px;
      color: $accent-text;
    }

    span {
      font-size: 0.75rem;
      color: $muted;
    }

    strong {
      max-width: 100%;
      font-size: 0.8125rem;
      font-weight: 600;
      color: $ink;
      @include truncate;
    }
  }

  &__more {
    margin-top: 10px;
  }
}
</style>
