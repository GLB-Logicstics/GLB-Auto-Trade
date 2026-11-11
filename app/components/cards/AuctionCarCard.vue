<template>
  <article class="auction-card">
    <div class="auction-card__media">
      <UiSwiper :items="car.images" :options="galleryOptions" variant="gallery" navigation pagination>
        <template #default="{ item, index }">
          <NuxtLink :to="link" class="auction-card__image-link">
            <img
              :src="item"
              :alt="car.title"
              class="auction-card__image"
              width="400"
              height="300"
              :loading="index === 0 ? 'eager' : 'lazy'"
              @error="onImageError"
            >
          </NuxtLink>
        </template>
      </UiSwiper>

      <span class="auction-card__status" :style="{ backgroundColor: status.color }">
        <i :class="['bi', status.icon]" />
        {{ status.label }}
      </span>

      <FavouriteButton :id="`lot-${car.id}`" class="auction-card__fav" />
    </div>

    <div class="auction-card__body">
      <h3 class="auction-card__title">
        <NuxtLink :to="link">{{ car.title }}</NuxtLink>
      </h3>

      <ul class="auction-card__specs">
        <li>
          <span><i class="bi bi-speedometer2" /> Yürüş:</span>
          <strong>{{ formatMiles(car.odometer, car.odometerType) }}</strong>
        </li>
        <li>
          <span><i class="bi bi-exclamation-triangle" /> Əsas zədə:</span>
          <strong>{{ car.primaryDamage }}</strong>
        </li>
        <li>
          <span><i class="bi bi-exclamation-diamond" /> Əlavə zədə:</span>
          <strong>{{ car.secondaryDamage }}</strong>
        </li>
        <li>
          <span><i class="bi bi-calendar-event" /> Hərrac tarixi:</span>
          <strong>{{ formatDate(car.saleDate) }}</strong>
        </li>
      </ul>

      <div class="auction-card__footer">
        <p class="auction-card__price">
          İndi al:
          <strong>{{ car.buyNowPrice ? formatUsd(car.buyNowPrice) : 'Təklif ilə' }}</strong>
        </p>
        <NuxtLink :to="link" class="link-arrow">
          Ətraflı bax
          <i class="bi bi-arrow-up-right" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { saleStatuses } from '~/data/filters'
import { formatDate, formatMiles, formatUsd, onImageError } from '~/utils/format'
import type { Lot, SaleStatus } from '~/types'

export default defineComponent({
  name: 'AuctionCarCard',

  props: {
    car: { type: Object as PropType<Lot>, required: true },
  },

  data() {
    return {
      galleryOptions: { nested: true },
    }
  },

  computed: {
    link(): string {
      return `/auction-lots/${this.car.slug}`
    },

    status(): SaleStatus {
      return saleStatuses[this.car.status] || saleStatuses.minBid!
    },
  },

  methods: {
    formatDate,
    formatMiles,
    formatUsd,
    onImageError,
  },
})
</script>

<style lang="scss" scoped>
.auction-card {
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

  &__status {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 6;
    display: inline-flex;
    gap: 6px;
    max-width: calc(100% - 70px);
    padding: 5px 9px;
    font-size: 11px;
    font-weight: 600;
    color: $white;
    border-radius: $radius-sm;
    @include truncate;
  }

  &__fav {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 6;
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    padding: 16px 18px 18px;
  }

  &__title {
    font-family: $font-body;
    font-size: 0.9375rem;
    font-weight: 600;
    text-transform: uppercase;
    @include truncate;

    a:hover {
      color: $accent-text;
    }
  }

  &__specs {
    display: grid;
    gap: 9px;
    font-size: 0.8125rem;

    li {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    span {
      flex-shrink: 0;
      color: $text-soft;
    }

    i {
      margin-right: 4px;
      color: $muted;
    }

    strong {
      font-weight: 600;
      color: $ink;
      @include truncate;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 14px;
    margin-top: auto;
    border-top: 1px solid $line-soft;
  }

  &__price {
    font-size: 0.875rem;
    font-weight: 600;
    color: $ink;

    strong {
      font-size: 1rem;
      color: $accent-text;
    }
  }
}
</style>
