<template>
  <article class="part-card">
    <span class="part-card__icon"><i :class="['bi', type ? type.icon : 'bi-tools']" /></span>

    <div class="part-card__body">
      <span class="part-card__type">{{ type ? type.label : '' }}</span>
      <h3 class="part-card__title">{{ part.title }}</h3>
      <p class="part-card__fit">{{ part.make }} {{ part.model }} · {{ part.yearFrom }}–{{ part.yearTo }}</p>

      <div class="part-card__meta">
        <span :class="{ 'is-new': part.condition === 'Yeni' }">{{ part.condition }}</span>
        <span><i class="bi bi-geo-alt" /> {{ part.location }}</span>
      </div>

      <div class="part-card__footer">
        <strong>{{ formatUsd(part.price) }}</strong>
        <a :href="whatsapp" class="btn btn--whatsapp btn--sm" target="_blank" rel="noopener">
          <i class="bi bi-whatsapp" />
          Sorğu
        </a>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapState } from 'pinia'
import { usePartsStore } from '~/stores/parts'
import { useSiteStore } from '~/stores/site'
import { formatUsd } from '~/utils/format'
import type { Part, PartType } from '~/types'

export default defineComponent({
  name: 'PartCard',

  props: {
    part: { type: Object as PropType<Part>, required: true },
  },

  computed: {
    ...mapState(usePartsStore, ['typeOf']),
    ...mapState(useSiteStore, ['whatsappHref']),

    type(): PartType | undefined {
      return this.typeOf(this.part.type)
    },

    whatsapp(): string {
      return this.whatsappHref(
        `${this.part.make} ${this.part.model} üçün "${this.part.title}" hissəsi ilə maraqlanıram.`,
      )
    },
  },

  methods: {
    formatUsd,
  },
})
</script>

<style lang="scss" scoped>
.part-card {
  display: flex;
  gap: 14px;
  padding: 16px;
  background-color: $white;
  border: 1px solid $line;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;

  &__icon {
    @include flex-center;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    font-size: 24px;
    color: $accent;
    background-color: $accent-soft;
    border-radius: $radius;
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  &__type {
    font-size: 0.75rem;
    font-weight: 500;
    color: $muted;
    text-transform: uppercase;
  }

  &__title {
    font-size: 1rem;
  }

  &__fit {
    font-size: 0.8125rem;
    color: $text-soft;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    font-size: 0.75rem;
    color: $text-soft;

    .is-new {
      font-weight: 600;
      color: #1f9d55;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: auto;
    padding-top: 6px;

    strong {
      font-size: 1.0625rem;
      color: $ink;
    }
  }
}
</style>
