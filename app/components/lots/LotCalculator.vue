<template>
  <div class="card calculator">
    <h2 class="calculator__title">
      <i class="bi bi-calculator" />
      Yekun qiyməti hesablayın
    </h2>

    <div class="calculator__body">
      <form class="calculator__form" @submit.prevent="calculate(lot)">
        <label class="calculator__field">
          <span>Təklif məbləği (USD)</span>
          <input v-model="bid" type="number" min="0" class="form-input" placeholder="$">
        </label>

        <div class="calculator__field">
          <span>Çatdırılma ölkəsi</span>
          <BaseSelect v-model="country" :options="countries" :clearable="false" />
        </div>

        <div class="calculator__buttons">
          <button type="submit" class="btn btn--accent">Hesabla</button>
          <button type="button" class="calculator__reset" @click="reset">Sıfırla</button>
        </div>
      </form>

      <div class="calculator__result">
        <p><span>Təklif məbləği</span> <strong>{{ formatMoney(result.bid) }}</strong></p>
        <p><span>Hərrac rüsumu</span> <strong>{{ formatMoney(result.auctionFee) }}</strong></p>
        <p>
          <span>Daşınma (ABŞ – Poti)</span>
          <strong v-if="result.shippingUnknown">Əlaqə saxlayın</strong>
          <strong v-else>{{ formatMoney(result.usShipping) }}</strong>
        </p>
        <p><span>Daşınma (Poti – Bakı)</span> <strong>{{ formatMoney(result.potiShipping) }}</strong></p>
        <p>
          <span>Gömrük rüsumu</span>
          <strong>
            {{ formatMoney(result.customs) }}
            <small v-if="result.customsAzn">({{ formatAzn(result.customsAzn) }})</small>
          </strong>
        </p>
        <p class="calculator__total"><span>Yekun qiymət</span> <strong>{{ formatMoney(result.total) }}</strong></p>

        <div class="calculator__contact">
          <a :href="phoneHref" class="btn btn--accent">Sorğu göndər</a>
          <a :href="contact.whatsapp" class="btn calculator__whatsapp" target="_blank" rel="noopener">
            <i class="bi bi-whatsapp" />
            Bizə yazın
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { countries } from '~/data/calculator'
import { useCalculatorStore } from '~/stores/calculator'
import { useSiteStore } from '~/stores/site'
import { formatAzn, formatMoney } from '~/utils/format'
import type { Lot } from '~/types'

export default defineComponent({
  name: 'LotCalculator',

  props: {
    lot: { type: Object as PropType<Lot>, required: true },
  },

  data() {
    return { countries }
  },

  computed: {
    ...mapWritableState(useCalculatorStore, ['bid', 'country']),
    ...mapState(useCalculatorStore, ['result']),
    ...mapState(useSiteStore, ['contact', 'phoneHref']),
  },

  created() {
    this.reset()
  },

  methods: {
    ...mapActions(useCalculatorStore, ['calculate', 'reset']),
    formatAzn,
    formatMoney,
  },
})
</script>

<style lang="scss" scoped>
.calculator {
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
    display: grid;
    gap: 20px;
    padding: 20px;

    @include up(md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    span {
      font-size: 0.875rem;
      font-weight: 500;
      color: $ink;
    }
  }

  &__buttons {
    display: flex;
    gap: 10px;

    .btn {
      flex: 1;
    }
  }

  &__reset {
    flex: 1;
    height: 48px;
    font-weight: 500;
    color: $ink;
    border: 1px solid $line;
    border-radius: $radius;

    &:hover {
      border-color: $primary;
    }
  }

  &__result {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    font-size: 0.875rem;
    background-color: $page-bg;
    border-radius: $radius;

    p {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    span {
      color: $text-soft;
    }

    strong {
      color: $ink;
      text-align: right;
    }

    small {
      display: block;
      font-size: 0.75rem;
      font-weight: 400;
      color: $muted;
    }
  }

  &__total {
    padding: 10px 12px;
    margin-top: 4px;
    background-color: $accent-soft;
    border-radius: $radius-sm;

    span,
    strong {
      font-weight: 700;
      color: $accent-text !important;
    }
  }

  &__contact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 6px;

    .btn {
      height: 42px;
      padding: 0 10px;
      font-size: 0.875rem;
    }
  }

  &__whatsapp {
    color: $ink;
    border: 1px solid $line;

    i {
      color: #25d366;
    }

    &:hover {
      border-color: $accent;
    }
  }
}
</style>
