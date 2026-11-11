<template>
  <article class="lot-row">
    <div class="lot-row__main">
      <NuxtLink :to="link" class="lot-row__image">
        <img :src="lot.images[0]" :alt="lot.title" width="240" height="180" loading="lazy" @error="onImageError">
        <span class="lot-row__auction">{{ lot.auction }}</span>
      </NuxtLink>

      <div class="lot-row__info">
        <h3 class="lot-row__title">
          <NuxtLink :to="link">{{ lot.title }}</NuxtLink>
        </h3>
        <span class="lot-row__lot">Lot #{{ lot.lotNumber }}</span>
        <span class="lot-row__status" :style="{ color: status.color }">
          <i :class="['bi', status.icon]"/>
          {{ status.label }}
        </span>
      </div>

      <div class="lot-row__col lot-row__col--main">
        <p><span>Yürüş:</span> <strong>{{ formatMiles(lot.odometer, lot.odometerType) }}</strong></p>
        <p><span>Təx. bazar dəyəri:</span> {{ formatUsd(lot.retailValue) }}</p>
      </div>

      <div class="lot-row__col lot-row__col--wide">
        <p><span>Sənəd:</span> {{ lot.document }}</p>
        <p><span>Zədə:</span> {{ lot.primaryDamage }}</p>
        <p><span>Açar:</span> <strong>{{ lot.hasKeys ? 'Var' : 'Yoxdur' }}</strong></p>
      </div>

      <div class="lot-row__col lot-row__col--wide">
        <p>{{ lot.location }}</p>
        <p class="lot-row__date">
          <span>Hərrac tarixi:</span>
          {{ formatDate(lot.saleDate) }}
        </p>
      </div>

      <div class="lot-row__price">
        <p><span>Hazırkı təklif:</span> <strong>{{ formatUsd(lot.currentBid) }}</strong></p>
        <p>
          <span>İndi al:</span>
          <strong class="lot-row__buy">{{ lot.buyNowPrice ? formatUsd(lot.buyNowPrice) : '—' }}</strong>
        </p>
        <div class="lot-row__actions">
          <NuxtLink :to="link" class="btn btn--accent lot-row__button">Ətraflı</NuxtLink>
          <FavouriteButton :id="`lot-${lot.id}`"/>
        </div>
      </div>
    </div>

    <dl v-show="expanded" class="lot-row__more">
      <div>
        <dt>Əlavə zədə:</dt>
        <dd>{{ lot.secondaryDamage || '-' }}</dd>
      </div>
      <div>
        <dt>Satış statusu:</dt>
        <dd>{{ status.label }}</dd>
      </div>
      <div>
        <dt>Sürət qutusu:</dt>
        <dd>{{ lot.transmission || '-' }}</dd>
      </div>
      <div>
        <dt>Ötürücü:</dt>
        <dd>{{ lot.drive || '-' }}</dd>
      </div>
      <div>
        <dt>Yanacaq növü:</dt>
        <dd>{{ lot.fuel || '-' }}</dd>
      </div>
      <div>
        <dt>Rəng:</dt>
        <dd>{{ lot.color || '-' }}</dd>
      </div>
    </dl>

    <button type="button" class="lot-row__toggle" @click="expanded = !expanded">
      {{ expanded ? 'Daha az −' : 'Daha çox +' }}
    </button>
  </article>
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import {saleStatuses} from '~/data/filters'
import {formatDate, formatMiles, formatUsd, onImageError} from '~/utils/format'
import type {Lot, SaleStatus} from '~/types'

export default defineComponent({
  name: 'LotRow',

  props: {
    lot: {type: Object as PropType<Lot>, required: true},
  },

  data() {
    return {expanded: false}
  },

  computed: {
    link(): string {
      return `/auction-lots/${this.lot.slug}`
    },

    status(): SaleStatus {
      return saleStatuses[this.lot.status] || saleStatuses.minBid!
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
.lot-row {
  overflow: hidden;
  background-color: $white;
  border: 1px solid $line;
  border-radius: $radius-md;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);

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
      grid-template-columns: 150px 1.2fr 1fr 1.1fr 1fr 150px;
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

  &__auction {
    position: absolute;
    bottom: 6px;
    left: 6px;
    padding: 2px 8px;
    font-size: 0.6875rem;
    font-weight: 600;
    color: $white;
    background-color: rgba($primary, 0.9);
    border-radius: 4px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    min-width: 0;
  }

  &__title {
    font-family: $font-body;
    font-size: 1rem;
    font-weight: 600;

    a:hover {
      color: $accent-text;
    }
  }

  &__lot {
    padding: 2px 8px;
    font-size: 0.75rem;
    font-weight: 600;
    color: $accent-text;
    background-color: $accent-soft;
    border-radius: 4px;
  }

  &__status {
    display: inline-flex;
    gap: 6px;
    font-size: 0.75rem;
    font-weight: 600;
  }

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

    &--wide {
      display: none;

      @include up(md) {
        display: flex;
      }
    }
  }


  &__date {
    color: $accent-text;

    span {
      display: block;
    }
  }

  &__price {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 16px;
    grid-column: 1 / -1;
    padding-top: 12px;
    font-size: 0.875rem;
    border-top: 1px solid $line-soft;

    @include up(md) {
      grid-column: 2 / -1;
    }

    @include up(xl) {
      flex-direction: column;
      align-items: stretch;
      grid-column: auto;
      padding-top: 0;
      border-top: 0;
    }

    span {
      color: $text-soft;
    }

    strong {
      color: $ink;
    }
  }

  &__buy {
    color: $accent-text !important;
  }

  &__actions {
    display: flex;
    gap: 8px;
    margin-left: auto;

    @include up(xl) {
      margin: 6px 0 0;
    }
  }

  &__button {
    height: 36px;
    padding: 0 18px;
    font-size: 0.875rem;

    @include up(xl) {
      flex: 1;
    }
  }

  &__more {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 16px;
    padding: 14px;
    background-color: $page-bg;
    border-top: 1px solid $line-soft;

    @include up(md) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include up(xl) {
      grid-template-columns: repeat(6, 1fr);
    }

    dt {
      font-size: 0.75rem;
      color: $muted;
    }

    dd {
      font-size: 0.875rem;
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
    transition: background-color $transition;

    &:hover {
      background-color: $accent-soft;
    }
  }

}
</style>
