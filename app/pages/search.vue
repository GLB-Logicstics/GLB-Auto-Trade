<template>
  <div class="container search-page">
    <Breadcrumbs :items="breadcrumbs" />

    <div class="search-page__layout">
      <div v-if="filtersOpen" class="search-page__backdrop" @click="filtersOpen = false" />

      <aside class="card search-page__sidebar" :class="{ 'is-open': filtersOpen }">
        <button type="button" class="search-page__close" aria-label="Bağla" @click="filtersOpen = false">
          <i class="bi bi-x-lg" />
        </button>

        <CarFilters />

        <button type="button" class="btn btn--accent search-page__apply" @click="filtersOpen = false">
          {{ total }} nəticəni göstər
        </button>
      </aside>

      <div class="search-page__content">
        <div class="card search-page__toolbar">
          <button type="button" class="search-page__filter-button" @click="filtersOpen = true">
            <i class="bi bi-sliders" />
            Filtrlər
            <span v-if="activeCount" class="search-page__filter-count">{{ activeCount }}</span>
          </button>

          <p class="search-page__range">{{ rangeText }}</p>

          <div class="search-page__sort">
            <span>Sırala:</span>
            <BaseSelect
              :model-value="sort"
              :options="sortOptions"
              :clearable="false"
              class="search-page__sort-select"
              @update:model-value="setSort"
            />
            <button
              type="button"
              class="search-page__order"
              :aria-label="order === 'asc' ? 'Artan' : 'Azalan'"
              @click="toggleOrder"
            >
              <i :class="['bi', order === 'asc' ? 'bi-sort-down-alt' : 'bi-sort-down']" />
            </button>
          </div>
        </div>

        <template v-if="pagedCars.length">
          <CarRow v-for="car in pagedCars" :key="car.id" :car="car" />
          <Pagination :page="page" :total-pages="totalPages" @change="setPage" />
        </template>

        <div v-else class="card search-page__empty">
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
import { useCarsStore } from '~/stores/cars'

export default defineComponent({
  name: 'SearchPage',

  setup() {
    useSeoMeta({
      title: 'Satışda olan avtomobillər — GLB Logistics',
      description: 'Azərbaycanda və Çində satışda olan hazır avtomobillər. Marka, il, yürüş və qiymətə görə filtr.',
    })
  },

  data() {
    return {
      sortOptions,
      filtersOpen: false,
    }
  },

  computed: {
    ...mapState(useCarsStore, [
      'sort',
      'order',
      'page',
      'totalPages',
      'pagedCars',
      'total',
      'rangeText',
      'activeCount',
      'countryLabel',
      'query',
    ]),

    queryKey(): string {
      return JSON.stringify(this.query)
    },

    breadcrumbs() {
      const title = this.countryLabel ? `${this.countryLabel} — satışda olan avtomobillər` : 'Axtarış nəticələri'
      return [{ label: 'Əsas səhifə', to: '/' }, { label: title }]
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
    ...mapActions(useCarsStore, ['applyQuery', 'setSort', 'toggleOrder', 'setPage', 'resetFilters']),
  },
})
</script>

<style lang="scss" scoped>
.search-page {
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

</style>
