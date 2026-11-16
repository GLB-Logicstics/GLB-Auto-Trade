import { defineStore } from 'pinia'
import { documentType, emptyEstimate, engineCc, estimate } from '~/utils/estimate'
import type { Lot } from '~/types'

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    bid: '',
    country: 'az',
    extras: [] as string[],
    result: emptyEstimate(),
  }),

  actions: {
    calculate(lot: Lot) {
      this.result = estimate({
        bid: Number(this.bid) || 0,
        document: documentType(lot.document),
        auction: lot.auction,
        location: lot.location,
        country: this.country,
        engineCc: engineCc(lot.engine),
        fuel: lot.fuel,
        year: lot.year,
        extras: this.extras,
      })
    },

    reset() {
      this.bid = ''
      this.country = 'az'
      this.extras = []
      this.result = emptyEstimate()
    },
  },
})
