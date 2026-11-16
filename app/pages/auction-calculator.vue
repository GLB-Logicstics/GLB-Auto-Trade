<template>
  <div class="container">
    <PageHeader
      title="Hərrac kalkulyatoru"
      subtitle="Hərracdan Azərbaycana və ya Gürcüstana qədər bütün xərcləri bir yerdə hesablayın."
      :crumbs="[{ label: 'Hərrac kalkulyatoru' }]"
    />

    <CalculatorTabs />

    <div class="two-col">
      <form class="card" @submit.prevent>
        <h2 class="panel__title">
          <i class="bi bi-calculator" />
          Avtomobil və hərrac məlumatları
        </h2>

        <div class="panel__body">
          <div class="form-grid">
            <div class="form-field">
              <span>Auksion</span>
              <BaseSelect v-model="form.auction" :options="auctions" :clearable="false" />
            </div>

            <div class="form-field">
              <span>Hərrac meydançası</span>
              <BaseSelect v-model="form.location" :options="locationOptions" placeholder="Şəhər seçin" searchable />
            </div>

            <label class="form-field">
              <span>Təklif məbləği (USD)</span>
              <input v-model="form.bid" type="number" min="0" class="form-input" placeholder="0">
            </label>

            <div class="form-field">
              <span>Sənəd növü</span>
              <BaseSelect v-model="form.document" :options="documentOptions" :clearable="false" />
            </div>

            <label class="form-field">
              <span>Mühərrik həcmi (sm³)</span>
              <input v-model="form.engineCc" type="number" min="0" class="form-input" placeholder="2000">
            </label>

            <div class="form-field">
              <span>Buraxılış ili</span>
              <BaseSelect v-model="form.year" :options="years" :clearable="false" />
            </div>

            <div class="form-field">
              <span>Yanacaq növü</span>
              <BaseSelect v-model="form.fuel" :options="fuelOptions" :clearable="false" />
            </div>

            <div class="form-field">
              <span>Çatdırılma ölkəsi</span>
              <BaseSelect v-model="form.country" :options="countries" :clearable="false" />
            </div>

            <div class="form-field is-wide">
              <span>Əlavə xərclər</span>
              <label v-for="item in extraCosts" :key="item.id" class="checkbox">
                <input v-model="form.extras" type="checkbox" :value="item.id">
                {{ item.label }} (+${{ item.price }})
              </label>
            </div>
          </div>

          <button type="button" class="btn btn--outline" @click="reset">Sıfırla</button>
        </div>
      </form>

      <div class="card auction-calc__result">
        <CostResult :result="result" :country="form.country" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { countries, documentOptions, extraCosts, fuelOptions } from '~/data/calculator'
import { shippingPrices } from '~/data/shipping'
import { auctions, years } from '~/data/filters'
import { estimate, type DocumentType, type EstimateResult } from '~/utils/estimate'
import type { Option } from '~/types'

function emptyForm() {
  return {
    auction: 'Copart',
    location: '',
    bid: '',
    document: 'clean' as DocumentType,
    engineCc: '2000',
    year: String(new Date().getFullYear() - 3),
    fuel: 'Benzin',
    country: 'az',
    extras: [] as string[],
  }
}

export default defineComponent({
  name: 'AuctionCalculatorPage',

  setup() {
    useSeoMeta({
      title: 'Hərrac kalkulyatoru — GLB Logistics',
      description:
        'Copart, IAAI və Manheim hərraclarından avtomobilin Azərbaycana və Gürcüstana gətirilmə xərcini hesablayın.',
    })
  },

  data() {
    return {
      form: emptyForm(),
      auctions,
      years,
      countries,
      documentOptions,
      extraCosts,
      fuelOptions,
    }
  },

  computed: {
    locationOptions(): Option[] {
      return Object.keys(shippingPrices[this.form.auction] || {}).map((name) => ({ label: name, value: name }))
    },

    result(): EstimateResult {
      return estimate({
        bid: Number(this.form.bid) || 0,
        document: this.form.document,
        auction: this.form.auction,
        location: this.form.location,
        country: this.form.country,
        engineCc: Number(this.form.engineCc) || 0,
        fuel: this.form.fuel,
        year: Number(this.form.year),
        extras: this.form.extras,
      })
    },
  },

  watch: {
    'form.auction'() {
      this.form.location = ''
    },
  },

  methods: {
    reset() {
      this.form = emptyForm()
    },
  },
})
</script>

<style lang="scss" scoped>
.auction-calc__result {
  padding: 16px;

  @include up(lg) {
    position: sticky;
    top: 96px;
  }
}
</style>
