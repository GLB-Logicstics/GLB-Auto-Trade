<template>
  <div class="container">
    <PageHeader
      title="Avtomobil kataloqu"
      subtitle="Marka, model və ili seçin — avtomobilin Azərbaycana və Gürcüstana gətirilmə xərcini yerli bazar qiyməti ilə müqayisə edin."
      :crumbs="[{ label: 'Avtomobil kataloqu' }]"
    />

    <div class="card catalog-page__form">
      <BaseSelect :model-value="make" :options="makeOptions" placeholder="Marka seçin" @update:model-value="setMake" />
      <BaseSelect
        :model-value="model"
        :options="modelOptions"
        :disabled="!make"
        placeholder="Model seçin"
        @update:model-value="setModel"
      />
      <BaseSelect v-model="year" :options="yearOptions" :disabled="!model" placeholder="İl seçin" />
    </div>

    <div v-if="selected" class="catalog-page__result">
      <div v-for="country in countries" :key="country.value" class="card">
        <h2 class="panel__title">
          <i class="bi bi-geo-alt" />
          {{ country.label }}
        </h2>

        <div class="panel__body">
          <CostResult :result="estimates[country.value]!" :country="country.value" />

          <dl class="info-list">
            <div>
              <dt>Yerli bazar qiyməti</dt>
              <dd>{{ formatUsd(selected.marketPrices[country.value] || 0) }}</dd>
            </div>
            <div>
              <dt>Qənaət</dt>
              <dd class="catalog-page__saving">{{ savingText(country.value) }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <div v-else class="card empty-state">
      <i class="bi bi-journal-text" />
      <h2>Avtomobil seçin</h2>
      <p>Nəticəni görmək üçün marka, model və il seçin.</p>
    </div>

    <p class="catalog-page__note">
      Hərrac qiyməti son satışların orta göstəricisidir. Yerli bazar qiymətləri nümunədir və icazəli inteqrasiyadan
      sonra avtomatik yenilənəcək.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { countries } from '~/data/calculator'
import { useCatalogStore } from '~/stores/catalog'
import { estimate, type EstimateResult } from '~/utils/estimate'
import { formatUsd } from '~/utils/format'

export default defineComponent({
  name: 'CatalogPage',

  setup() {
    useSeoMeta({
      title: 'Avtomobil kataloqu — GLB Logistics',
      description: 'Avtomobilin Azərbaycana və Gürcüstana gətirilmə xərci və yerli bazar qiyməti ilə müqayisəsi.',
    })
  },

  data() {
    return { countries }
  },

  computed: {
    ...mapState(useCatalogStore, ['makeOptions', 'modelOptions', 'yearOptions', 'selected']),
    ...mapWritableState(useCatalogStore, ['make', 'model', 'year']),

    estimates(): Record<string, EstimateResult> {
      const result: Record<string, EstimateResult> = {}
      const item = this.selected
      if (!item) return result

      for (const country of countries) {
        result[country.value] = estimate({
          bid: item.auctionPrice,
          document: 'nonClean',
          auction: 'Copart',
          location: item.location,
          country: country.value,
          engineCc: item.engineCc,
          fuel: item.fuel,
          year: item.year,
          extras: [],
        })
      }

      return result
    },
  },

  created() {
    this.applyQuery(this.$route.query)
  },

  methods: {
    ...mapActions(useCatalogStore, ['applyQuery', 'setMake', 'setModel']),
    formatUsd,

    savingText(country: string): string {
      const market = this.selected!.marketPrices[country] || 0
      const saving = market - this.estimates[country]!.total
      return saving > 0 ? `+${formatUsd(saving)}` : '—'
    },
  },
})
</script>

<style lang="scss" scoped>
.catalog-page {
  &__form {
    display: grid;
    gap: 12px;
    padding: 16px;
    margin-bottom: 20px;

    @include up(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__result {
    display: grid;
    gap: 20px;

    @include up(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__saving {
    color: #1f9d55 !important;
  }

  &__note {
    margin-top: 16px;
    font-size: 0.75rem;
    color: $muted;
  }
}
</style>
