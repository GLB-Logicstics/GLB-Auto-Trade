<template>
  <div class="container lots-page">
    <Breadcrumbs :items="[{ label: 'Əsas səhifə', to: '/' }, { label: 'Hərrac lotları' }]" />

    <div class="card lots-page__chips">
      <span class="lots-page__chips-title">Populyar filtrlər:</span>
      <button
        v-for="chip in chips"
        :key="chip.key"
        type="button"
        class="chip"
        :class="{ 'is-active': filters[chip.key] }"
        @click="toggleFlag(chip.key)"
      >
        {{ chip.label }}
      </button>
    </div>

    <div class="lots-page__layout">
      <div v-if="filtersOpen" class="lots-page__backdrop" @click="filtersOpen = false" />

      <aside class="card lots-page__sidebar" :class="{ 'is-open': filtersOpen }">
        <button type="button" class="lots-page__close" aria-label="Bağla" @click="filtersOpen = false">
          <i class="bi bi-x-lg" />
        </button>

        <LotFilters />

        <button type="button" class="btn btn--accent lots-page__apply" @click="filtersOpen = false">
          {{ total }} nəticəni göstər
        </button>
      </aside>

      <div class="lots-page__content">
        <div class="card lots-page__toolbar">
          <button type="button" class="lots-page__filter-button" @click="filtersOpen = true">
            <i class="bi bi-sliders" />
            Filtrlər
            <span v-if="activeCount" class="lots-page__filter-count">{{ activeCount }}</span>
          </button>

          <p class="lots-page__range">{{ rangeText }}</p>

          <div class="lots-page__sort">
            <span>Sırala:</span>
            <BaseSelect
              :model-value="sort"
              :options="sortOptions"
              :clearable="false"
              class="lots-page__sort-select"
              @update:model-value="setSort"
            />
            <button
              type="button"
              class="lots-page__order"
              :aria-label="order === 'asc' ? 'Artan' : 'Azalan'"
              @click="toggleOrder"
            >
              <i :class="['bi', order === 'asc' ? 'bi-sort-down-alt' : 'bi-sort-down']" />
            </button>
          </div>
        </div>

        <div v-if="filters.q" class="lots-page__query">
          "{{ filters.q }}" üzrə axtarış
          <button type="button" @click="setText('q', '')"><i class="bi bi-x" /></button>
        </div>

        <template v-if="pagedLots.length">
          <LotRow v-for="lot in pagedLots" :key="lot.id" :lot="lot" />
          <Pagination :page="page" :total-pages="totalPages" @change="setPage" />
        </template>

        <div v-else class="card lots-page__empty">
          <i class="bi bi-search" />
          <h2>Nəticə tapılmadı</h2>
          <p>Seçdiyiniz filtrlərə uyğun avtomobil yoxdur.</p>
          <button type="button" class="btn btn--accent" @click="resetFilters">Filtrləri təmizlə</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { sortOptions } from '~/data/filters'
import { useLotsStore, type FlagKey } from '~/stores/lots'

export default defineComponent({
  name: 'AuctionLotsPage',

  setup() {
    useSeoMeta({
      title: 'Hərrac lotları — GLB Logistics',
      description: 'Copart və IAAI hərraclarından BMW və Hyundai avtomobilləri. Filtr, sıralama və tam qiymət hesablaması.',
    })
  },

  data() {
    const chips: { key: FlagKey; label: string }[] = [
      { key: 'buyNow', label: 'İndi al' },
      { key: 'runs', label: 'İşləyir və sürülür' },
      { key: 'cleanTitle', label: 'Təmiz sənəd' },
      { key: 'today', label: 'Bugünkü hərrac' },
      { key: 'tomorrow', label: 'Sabahkı hərrac' },
    ]

    return {
      sortOptions,
      chips,
      filtersOpen: false,
    }
  },

  computed: {
    ...mapState(useLotsStore, [
      'filters',
      'sort',
      'order',
      'page',
      'totalPages',
      'pagedLots',
      'total',
      'rangeText',
      'activeCount',
      'query',
    ]),

    queryKey(): string {
      return JSON.stringify(this.query)
    },
  },

  watch: {
    '$route.query'(value) {
      if (JSON.stringify(value) !== this.queryKey) this.applyQuery(value)
    },

    queryKey(value: string) {
      if (value !== JSON.stringify(this.$route.query)) {
        this.$router.replace({ query: this.query })
      }
    },

    filtersOpen(open: boolean) {
      document.body.style.overflow = open ? 'hidden' : ''
    },
  },

  created() {
    this.applyQuery(this.$route.query)
  },

  beforeUnmount() {
    document.body.style.overflow = ''
  },

  methods: {
    ...mapActions(useLotsStore, [
      'applyQuery',
      'setSort',
      'toggleOrder',
      'toggleFlag',
      'setText',
      'setPage',
      'resetFilters',
    ]),
  },
})
</script>

<style lang="scss" scoped>
.lots-page {
  &__chips {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    margin-bottom: 20px;
  }

  &__chips-title {
    margin-right: 4px;
    font-size: 0.875rem;
    font-weight: 600;
    color: $ink;
  }

  &__layout {
    display: grid;
    gap: 20px;
    align-items: start;

    @include up(lg) {
      grid-template-columns: 280px 1fr;
    }
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: 140;
    background-color: rgba(10, 20, 40, 0.45);

    @include up(lg) {
      display: none;
    }
  }

  &__sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 150;
    width: 320px;
    max-width: 88vw;
    padding: 20px;
    overflow-y: auto;
    border-radius: 0;
    transform: translateX(-100%);
    transition: transform 0.25s ease;

    &.is-open {
      transform: translateX(0);
    }

    @include up(lg) {
      position: static;
      width: auto;
      max-width: none;
      overflow: visible;
      border-radius: $radius-md;
      transform: none;
    }
  }

  &__close {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 18px;
    color: $muted;

    @include up(lg) {
      display: none;
    }
  }

  &__apply {
    position: sticky;
    bottom: 0;
    width: 100%;
    margin-top: 16px;

    @include up(lg) {
      display: none;
    }
  }

  &__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    margin-bottom: 16px;
  }

  &__filter-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 14px;
    font-weight: 500;
    color: $ink;
    border: 1px solid $line;
    border-radius: $radius;

    i {
      color: $accent;
    }

    @include up(lg) {
      display: none;
    }
  }

  &__filter-count {
    min-width: 20px;
    padding: 0 6px;
    font-size: 0.75rem;
    line-height: 20px;
    color: $white;
    background-color: $accent;
    border-radius: 10px;
  }

  &__range {
    order: 3;
    width: 100%;
    font-size: 0.875rem;
    font-weight: 500;
    color: $ink;

    @include up(md) {
      order: 0;
      width: auto;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    color: $text-soft;
  }

  &__sort-select {
    width: 170px;

    :deep(.select__toggle) {
      height: 40px;
      font-size: 0.875rem;
    }
  }

  &__order {
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    color: $white;
    background-color: $accent;
    border-radius: $radius;
  }

  &__query {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px 6px 14px;
    margin-bottom: 14px;
    font-size: 0.875rem;
    color: $accent-text;
    background-color: $surface;
    border-radius: 20px;

    button {
      font-size: 18px;
      line-height: 1;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 48px 20px;
    text-align: center;

    > i {
      font-size: 36px;
      color: $muted;
    }

    h2 {
      font-size: 1.25rem;
    }

    p {
      margin-bottom: 8px;
      color: $text-soft;
    }
  }
}

.chip {
  height: 32px;
  padding: 0 14px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: $ink;
  border: 1px solid $line;
  border-radius: 16px;
  transition: background-color $transition, color $transition, border-color $transition;

  &:hover {
    border-color: $accent;
  }

  &.is-active {
    color: $white;
    background-color: $accent;
    border-color: $accent;
  }
}
</style>
