<template>
  <div class="car-filters">
    <div class="car-filters__head">
      <span class="car-filters__title">
        <i class="bi bi-sliders" />
        Filtrlər
      </span>
    </div>

    <div v-if="filters.country || activeCount" class="car-filters__active">
      <button v-if="filters.country" type="button" class="car-filters__chip" @click="setCountry('')">
        {{ countryLabel }}
        <i class="bi bi-x" />
      </button>
      <button type="button" class="car-filters__clear" @click="resetFilters">Bütün filtrləri sil</button>
    </div>

    <FilterGroup title="Marka" :count="filters.makes.length" opened>
      <CheckboxList :options="optionsOf('makes')" :selected="filters.makes" @apply="setList('makes', $event)" />
    </FilterGroup>

    <FilterGroup title="Model" :count="filters.models.length">
      <CheckboxList
        :options="filters.makes.length ? optionsOf('models') : []"
        :selected="filters.models"
        empty-text="Əvvəlcə marka seçin"
        @apply="setList('models', $event)"
      />
    </FilterGroup>

    <FilterGroup title="İl" :count="filters.yearFrom || filters.yearTo ? 1 : 0">
      <RangeFilter
        :from="filters.yearFrom"
        :to="filters.yearTo"
        :hint="filters.makes.length ? rangeOf('year') : 'İl seçmək üçün əvvəlcə marka seçin'"
        :disabled="!filters.makes.length"
        @apply="(from, to) => setRange('yearFrom', 'yearTo', from, to)"
      />
    </FilterGroup>

    <FilterGroup title="Yürüş" :count="filters.mileageFrom || filters.mileageTo ? 1 : 0">
      <RangeFilter
        :from="filters.mileageFrom"
        :to="filters.mileageTo"
        :hint="rangeOf('odometer')"
        @apply="(from, to) => setRange('mileageFrom', 'mileageTo', from, to)"
      />
    </FilterGroup>

    <FilterGroup title="Qiymət" :count="filters.priceFrom || filters.priceTo ? 1 : 0">
      <RangeFilter
        :from="filters.priceFrom"
        :to="filters.priceTo"
        :hint="rangeOf('price')"
        @apply="(from, to) => setRange('priceFrom', 'priceTo', from, to)"
      />
    </FilterGroup>

    <FilterGroup v-for="group in groups" :key="group.key" :title="group.title" :count="filters[group.key].length">
      <CheckboxList :options="optionsOf(group.key)" :selected="filters[group.key]" @apply="setList(group.key, $event)" />
    </FilterGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useCarsStore, type CarListKey } from '~/stores/cars'

export default defineComponent({
  name: 'CarFilters',

  data() {
    const groups: { key: CarListKey; title: string }[] = [
      { key: 'engines', title: 'Mühərrik' },
      { key: 'transmissions', title: 'Sürət qutusu' },
      { key: 'fuels', title: 'Yanacaq növü' },
      { key: 'bodies', title: 'Ban növü' },
      { key: 'colors', title: 'Rəng' },
      { key: 'drives', title: 'Ötürücü' },
      { key: 'locations', title: 'Yeri' },
    ]

    return { groups }
  },

  computed: {
    ...mapState(useCarsStore, ['filters', 'optionsOf', 'rangeOf', 'activeCount', 'countryLabel']),
  },

  methods: {
    ...mapActions(useCarsStore, ['setList', 'setRange', 'setCountry', 'resetFilters']),
  },
})
</script>

<style lang="scss" scoped>
.car-filters {
  &__head {
    padding-bottom: 14px;
    margin-bottom: 4px;
    border-bottom: 1px solid $line;
  }

  &__title {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 1.125rem;
    font-weight: 600;
    color: $ink;

    i {
      color: $accent;
    }
  }

  &__active {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 0;
    border-bottom: 1px solid $line-soft;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 30px;
    padding: 0 6px 0 12px;
    font-size: 0.8125rem;
    font-weight: 500;
    color: $white;
    background-color: $dark;
    border-radius: 15px;

    i {
      font-size: 16px;
    }
  }

  &__clear {
    font-size: 0.8125rem;
    font-weight: 500;
    color: $danger;
  }
}
</style>
