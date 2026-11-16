import { defineStore } from 'pinia'
import { koreaCars, koreaShipping } from '~/data/korea'
import { customsCost } from '~/utils/estimate'
import type { KoreaCar, Option } from '~/types'

export interface KoreaPrice {
  shipping: number
  customs: number
  total: number
}

export const useKoreaStore = defineStore('korea', {
  state: () => ({
    items: koreaCars,
    country: 'az',
    make: '',
    model: '',
  }),

  getters: {
    makeOptions(state): Option[] {
      const makes = [...new Set(state.items.map((car) => car.make))]
      return makes.map((make) => ({ label: make, value: make }))
    },

    modelOptions(state): Option[] {
      const models = state.items.filter((car) => car.make === state.make).map((car) => car.model)
      return [...new Set(models)].map((model) => ({ label: model, value: model }))
    },

    filteredCars(state): KoreaCar[] {
      return state.items.filter((car) => {
        if (state.make && car.make !== state.make) return false
        if (state.model && car.model !== state.model) return false
        return true
      })
    },

    priceOf:
      (state) =>
      (car: KoreaCar): KoreaPrice => {
        const shipping = koreaShipping[state.country] || 0
        const customs = Math.round(
          customsCost({
            country: state.country,
            price: car.price,
            transport: shipping,
            engineCc: car.engineCc,
            fuel: car.fuel,
            year: car.year,
          }).usd,
        )

        return { shipping, customs, total: car.price + shipping + customs }
      },
  },

  actions: {
    applyQuery(query: Record<string, unknown>) {
      this.make = query.makes ? String(query.makes) : ''
      this.model = query.models ? String(query.models) : ''
    },

    setMake(value: string) {
      this.make = value
      this.model = ''
    },
  },
})
