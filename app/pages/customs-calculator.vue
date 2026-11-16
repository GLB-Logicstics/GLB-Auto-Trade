<template>
  <div class="container">
    <PageHeader
      title="Gömrük kalkulyatoru"
      subtitle="Avtomobilin Azərbaycanda və ya Gürcüstanda gömrük ödənişlərini özünüz hesablayın."
      :crumbs="[{ label: 'Gömrük kalkulyatoru' }]"
    />

    <CalculatorTabs />

    <div class="two-col">
      <form class="card" @submit.prevent>
        <h2 class="panel__title">
          <i class="bi bi-bank" />
          Nəqliyyat vasitəsinin məlumatları
        </h2>

        <div class="panel__body">
          <div class="customs-calc__switch">
            <button
              v-for="item in countries"
              :key="item.value"
              type="button"
              :class="{ 'is-active': form.country === item.value }"
              @click="form.country = item.value"
            >
              {{ item.label }}
            </button>
          </div>

          <div class="form-grid">
            <label v-if="isAzerbaijan" class="form-field">
              <span>Avtomobilin qiyməti (USD)</span>
              <input v-model="form.price" type="number" min="0" class="form-input" placeholder="0">
            </label>

            <label v-if="isAzerbaijan" class="form-field">
              <span>Nəqliyyat xərcləri (USD)</span>
              <input v-model="form.transport" type="number" min="0" class="form-input" placeholder="0">
            </label>

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

            <label v-if="!isAzerbaijan" class="checkbox customs-calc__check">
              <input v-model="form.rightHand" type="checkbox">
              Sağ sükan
            </label>
          </div>
        </div>
      </form>

      <div class="card">
        <h2 class="panel__title">
          <i class="bi bi-receipt" />
          Nəticə
        </h2>

        <div class="panel__body">
          <dl class="info-list">
            <div v-for="line in lines" :key="line.label">
              <dt>{{ line.label }}</dt>
              <dd>{{ money(line.value) }}</dd>
            </div>
          </dl>

          <p class="customs-calc__total">
            <span>Cəmi gömrük ödənişi</span>
            <strong>{{ money(total) }}</strong>
            <small>≈ {{ formatMoney(totalUsd) }}</small>
          </p>

          <p class="customs-calc__note">
            {{
              isAzerbaijan
                ? 'Dövlət Gömrük Komitəsinin dərəcələrinə əsasən.'
                : 'Gürcüstan Gəlirlər Xidmətinin (rs.ge) 2026 dərəcələrinə əsasən.'
            }}
            Hesablama təxminidir, məzənnə: {{ isAzerbaijan ? `1 USD = ${aznRate} AZN` : `1 GEL = ${gelToUsd} USD` }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AZN_RATE, countries, fuelOptions, GEL_TO_USD } from '~/data/calculator'
import { years } from '~/data/filters'
import { calculateCustoms } from '~/utils/customs'
import { calculateGeCustoms } from '~/utils/customsGe'
import { formatAzn, formatGel, formatMoney } from '~/utils/format'
import type { CostLine } from '~/types'

export default defineComponent({
  name: 'CustomsCalculatorPage',

  setup() {
    useSeoMeta({
      title: 'Gömrük kalkulyatoru — GLB Logistics',
      description: 'Azərbaycan və Gürcüstan üçün avtomobil gömrük rüsumu, aksiz, ƏDV və yığımların hesablanması.',
    })
  },

  data() {
    return {
      form: {
        country: 'az',
        price: '',
        transport: '',
        engineCc: '2000',
        year: String(new Date().getFullYear() - 3),
        fuel: 'Benzin',
        rightHand: false,
      },
      countries,
      fuelOptions,
      years,
      aznRate: AZN_RATE,
      gelToUsd: GEL_TO_USD,
    }
  },

  computed: {
    isAzerbaijan(): boolean {
      return this.form.country === 'az'
    },

    currency(): string {
      return this.isAzerbaijan ? 'AZN' : 'GEL'
    },

    lines(): CostLine[] {
      const engineCc = Number(this.form.engineCc) || 0
      const year = Number(this.form.year)

      if (!this.isAzerbaijan) {
        const result = calculateGeCustoms({ engineCc, fuel: this.form.fuel, year, rightHand: this.form.rightHand })
        return [
          { label: 'Aksiz vergisi', value: result.excise },
          { label: 'İdxal vergisi', value: result.importTax },
          { label: 'Rəsmiləşdirmə, qeydiyyat və nömrə', value: result.fixedFees },
        ]
      }

      const result = calculateCustoms({
        price: Number(this.form.price) || 0,
        transport: Number(this.form.transport) || 0,
        engineCc,
        fuel: this.form.fuel,
        year,
      })

      return [
        { label: 'Gömrük dəyəri', value: result.customsValue },
        { label: 'İdxal gömrük rüsumu', value: result.importDuty },
        { label: 'Aksiz vergisi', value: result.excise },
        { label: 'ƏDV (18%)', value: result.vat },
        { label: 'Gömrük yığımı', value: result.clearanceFee },
        { label: 'Utilizasiya haqqı', value: result.recyclingFee },
        { label: 'Digər yığımlar', value: result.fixedFees },
      ]
    },

    total(): number {
      const payments = this.isAzerbaijan ? this.lines.slice(1) : this.lines
      return Math.round(payments.reduce((sum, line) => sum + line.value, 0) * 100) / 100
    },

    totalUsd(): number {
      return this.isAzerbaijan ? this.total / AZN_RATE : this.total * GEL_TO_USD
    },
  },

  methods: {
    formatMoney,

    money(value: number): string {
      return this.isAzerbaijan ? formatAzn(value) : formatGel(value)
    },
  },
})
</script>

<style lang="scss" scoped>
.customs-calc {
  &__switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 4px;
    background-color: $page-bg;
    border-radius: $radius;

    button {
      height: 40px;
      font-weight: 500;
      color: $text-soft;
      border-radius: $radius-sm;

      &.is-active {
        color: $white;
        background-color: $accent;
      }
    }
  }

  &__check {
    align-self: end;
    height: 44px;
  }

  &__total {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2px 12px;
    padding: 12px;
    background-color: $accent-soft;
    border-radius: $radius-sm;

    span,
    strong {
      font-weight: 700;
      color: $accent-text;
    }

    small {
      grid-column: 2;
      font-size: 0.8125rem;
      color: $accent-text;
      text-align: right;
    }
  }

  &__note {
    font-size: 0.75rem;
    color: $muted;
  }
}
</style>
