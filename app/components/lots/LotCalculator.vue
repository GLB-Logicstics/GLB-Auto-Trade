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

        <div class="calculator__field">
          <span>Əlavə xərclər</span>
          <label v-for="item in extraCosts" :key="item.id" class="checkbox">
            <input v-model="extras" type="checkbox" :value="item.id">
            {{ item.label }} (+${{ item.price }})
          </label>
        </div>

        <div class="calculator__buttons">
          <button type="submit" class="btn btn--accent">Hesabla</button>
          <button type="button" class="calculator__reset" @click="reset">Sıfırla</button>
        </div>
      </form>

      <CostResult :result="result" :country="country" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { countries, extraCosts } from '~/data/calculator'
import { useCalculatorStore } from '~/stores/calculator'
import type { Lot } from '~/types'

export default defineComponent({
  name: 'LotCalculator',

  props: {
    lot: { type: Object as PropType<Lot>, required: true },
  },

  data() {
    return { countries, extraCosts }
  },

  computed: {
    ...mapWritableState(useCalculatorStore, ['bid', 'country', 'extras']),
    ...mapState(useCalculatorStore, ['result']),
  },

  watch: {
    country() {
      if (this.result.bid) this.calculate(this.lot)
    },

    extras() {
      if (this.result.bid) this.calculate(this.lot)
    },
  },

  created() {
    this.reset()
  },

  methods: {
    ...mapActions(useCalculatorStore, ['calculate', 'reset']),
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
}
</style>