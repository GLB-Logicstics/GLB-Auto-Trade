<template>
  <section class="search-filter">
    <div class="container">
      <form class="search-filter__card" @submit.prevent="submit">
        <BaseSelect
          :model-value="make"
          :options="makeOptions"
          placeholder="Marka seçin"
          searchable
          @update:model-value="setMake"
        />
        <BaseSelect v-model="model" :options="modelOptions" :disabled="!make" placeholder="Model seçin" searchable />
        <BaseSelect v-model="place" :options="places" :clearable="false" placeholder="Yer" />
        <BaseSelect
          :model-value="yearFrom"
          :options="years"
          :disabled="!make"
          placeholder="İl (min.)"
          @update:model-value="setYearFrom"
        />
        <BaseSelect v-model="yearTo" :options="yearToOptions" :disabled="!make" placeholder="İl (maks.)" />
        <button type="submit" class="btn btn--accent search-filter__submit">
          <i class="bi bi-search" />
          Axtar
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useSearchStore } from '~/stores/search'

export default defineComponent({
  name: 'SearchFilter',

  computed: {
    ...mapState(useSearchStore, ['makeOptions', 'modelOptions', 'places', 'years', 'yearToOptions', 'filterQuery', 'filterPath']),
    ...mapWritableState(useSearchStore, ['make', 'model', 'place', 'yearFrom', 'yearTo']),
  },

  methods: {
    ...mapActions(useSearchStore, ['setMake', 'setYearFrom']),

    submit() {
      this.$router.push({ path: this.filterPath, query: this.filterQuery })
    },
  },
})
</script>

<style lang="scss" scoped>
.search-filter {
  position: relative;
  z-index: 10;
  padding-top: 24px;

  @include up(md) {
    padding-top: 32px;
  }

  &__card {
    display: grid;
    gap: 12px;
    padding: 16px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius-md;
    box-shadow: $shadow-card;

    @include up(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include up(md) {
      gap: 16px;
      padding: 24px;
    }

    @include up(lg) {
      grid-template-columns: repeat(3, 1fr);
      max-width: $container-narrow;
      margin: 0 auto;
    }
  }

  &__submit {
    @include up(sm) {
      grid-column: 1 / -1;
    }

    @include up(lg) {
      grid-column: auto;
    }
  }
}
</style>
