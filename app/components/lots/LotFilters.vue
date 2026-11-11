<template>
  <div class="lot-filters">
    <div class="lot-filters__head">
      <span class="lot-filters__title">
        <i class="bi bi-sliders" />
        Filtrlər
      </span>
      <button v-if="activeCount" type="button" class="lot-filters__reset" @click="resetFilters">
        Təmizlə ({{ activeCount }})
      </button>
    </div>

    <p class="lot-filters__section">Hərrac filtrləri</p>

    <FilterGroup title="Yeni əlavə olunan" :count="filters.added.length">
      <CheckboxList :options="addedOptions" :selected="filters.added" @apply="setList('added', $event)" />
    </FilterGroup>

    <FilterGroup title="Satış tarixi" :count="filters.saleFrom || filters.saleTo ? 1 : 0">
      <RangeFilter
        type="date"
        from-label="Başlanğıc"
        to-label="Son"
        :from="filters.saleFrom"
        :to="filters.saleTo"
        @apply="(from, to) => setRange('saleFrom', 'saleTo', from, to)"
      />
    </FilterGroup>

    <FilterGroup title="Yer" :count="filters.locations.length">
      <CheckboxList
        :options="optionsOf('locations')"
        :selected="filters.locations"
        @apply="setList('locations', $event)"
      />
    </FilterGroup>

    <p class="lot-filters__section">Filtrlər</p>

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
        :hint="filters.makes.length ? yearRange : 'İl seçmək üçün əvvəlcə marka seçin'"
        :disabled="!filters.makes.length"
        @apply="(from, to) => setRange('yearFrom', 'yearTo', from, to)"
      />
    </FilterGroup>

    <FilterGroup title="Yürüş" :count="filters.mileageFrom || filters.mileageTo ? 1 : 0">
      <RangeFilter
        :from="filters.mileageFrom"
        :to="filters.mileageTo"
        :hint="mileageRange"
        @apply="(from, to) => setRange('mileageFrom', 'mileageTo', from, to)"
      />
    </FilterGroup>

    <FilterGroup v-for="group in carGroups" :key="group.key" :title="group.title" :count="filters[group.key].length">
      <CheckboxList :options="optionsOf(group.key)" :selected="filters[group.key]" @apply="setList(group.key, $event)" />
    </FilterGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { addedOptions } from '~/data/filters'
import { useLotsStore, type ListKey } from '~/stores/lots'

export default defineComponent({
  name: 'LotFilters',

  data() {
    const carGroups: { key: ListKey; title: string }[] = [
      { key: 'engines', title: 'Mühərrik' },
      { key: 'fuels', title: 'Yanacaq növü' },
      { key: 'colors', title: 'Rəng' },
      { key: 'damages', title: 'Əsas zədə' },
      { key: 'secondaryDamages', title: 'Əlavə zədə' },
      { key: 'transmissions', title: 'Sürət qutusu' },
      { key: 'cylinders', title: 'Silindr' },
      { key: 'bodies', title: 'Ban növü' },
      { key: 'vehicleTypes', title: 'Nəqliyyat növü' },
      { key: 'drives', title: 'Ötürücü' },
      { key: 'documents', title: 'Sənəd' },
    ]

    return { addedOptions, carGroups }
  },

  computed: {
    ...mapState(useLotsStore, ['filters', 'optionsOf', 'activeCount', 'yearRange', 'mileageRange']),
  },

  methods: {
    ...mapActions(useLotsStore, ['setList', 'setRange', 'resetFilters']),
  },
})
</script>

<style lang="scss" scoped>
.lot-filters {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  &__reset {
    font-size: 0.875rem;
    font-weight: 500;
    color: $danger;
  }

  &__section {
    padding: 10px 12px;
    margin-top: 14px;
    font-size: 0.875rem;
    font-weight: 600;
    color: $white;
    background-color: $dark;
    border-radius: $radius-sm;
  }
}
</style>
