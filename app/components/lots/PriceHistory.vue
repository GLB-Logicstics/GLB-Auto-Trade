<template>
  <div class="card price-history">
    <h2 class="price-history__title">
      <i class="bi bi-bar-chart-line" />
      GLB Helper — orta satış qiyməti
    </h2>

    <div class="price-history__body">
      <p class="price-history__text">
        Son 6 ayda {{ name }} üçün hərraclarda orta satış qiyməti. Orta:
        <strong>{{ formatUsd(average) }}</strong>
      </p>

      <ul class="price-history__chart">
        <li v-for="point in points" :key="point.label" class="price-history__item">
          <span class="price-history__value">{{ short(point.price) }}</span>
          <span class="price-history__bar" :style="{ height: `${(point.price / max) * 100}%` }" />
          <span class="price-history__label">{{ point.label }}</span>
        </li>
      </ul>

      <p class="price-history__note">Nümunə məlumatdır. Real qrafik GLB Helper inteqrasiyasından sonra göstəriləcək.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { priceHistory } from '~/data/priceHistory'
import { formatUsd } from '~/utils/format'
import type { Lot, PricePoint } from '~/types'

export default defineComponent({
  name: 'PriceHistory',

  props: {
    lot: { type: Object as PropType<Lot>, required: true },
  },

  computed: {
    name(): string {
      return `${this.lot.make} ${this.lot.model}`
    },

    points(): PricePoint[] {
      return priceHistory[this.name] || priceHistory[this.lot.make] || []
    },

    max(): number {
      return Math.max(...this.points.map((point) => point.price), 1)
    },

    average(): number {
      if (!this.points.length) return 0
      const sum = this.points.reduce((total, point) => total + point.price, 0)
      return Math.round(sum / this.points.length)
    },
  },

  methods: {
    formatUsd,

    short(value: number): string {
      return `$${(value / 1000).toFixed(1)}k`
    },
  },
})
</script>

<style lang="scss" scoped>
.price-history {
  &__title {
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

  &__body {
    padding: 20px;
  }

  &__text {
    font-size: 0.875rem;
    color: $text-soft;

    strong {
      color: $ink;
    }
  }

  &__chart {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    height: 200px;
    padding-top: 24px;
    margin-top: 12px;
    border-bottom: 1px solid $line;
  }

  &__item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
  }

  &__value {
    margin-bottom: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    color: $ink;
  }

  &__bar {
    width: 100%;
    max-width: 44px;
    min-height: 4px;
    background-color: $accent;
    border-radius: $radius-sm $radius-sm 0 0;
  }

  &__label {
    position: relative;
    top: 22px;
    height: 0;
    font-size: 0.75rem;
    color: $muted;
  }

  &__note {
    margin-top: 32px;
    font-size: 0.75rem;
    color: $muted;
  }
}
</style>
