import { defineStore } from 'pinia'
import { makes, places, years } from '~/data/filters'
import { localCars } from '~/data/homepage'
import { lots } from '~/data/lots'
import type { Option, Suggestion } from '~/types'

export const useSearchStore = defineStore('search', {
  state: () => ({
    make: '',
    model: '',
    place: 'auction',
    yearFrom: '',
    yearTo: '',
    places,
    years,

    text: '',
    inAuction: true,
    inOther: false,
  }),

  getters: {
    makeOptions(): Option[] {
      return makes.map((make) => ({ label: make.name, value: make.name }))
    },

    modelOptions(state): Option[] {
      const make = makes.find((item) => item.name === state.make)
      if (!make) return []
      return make.models.map((model) => ({ label: model, value: model }))
    },

    yearToOptions(state): Option[] {
      if (!state.yearFrom) return state.years
      return state.years.filter((year) => year.value >= state.yearFrom)
    },

    filterQuery(state) {
      const query: Record<string, string> = {}
      if (state.place !== 'auction') query.country = state.place
      if (state.make) query.makes = state.make
      if (state.model) query.models = state.model
      if (state.yearFrom) query.yearFrom = state.yearFrom
      if (state.yearTo) query.yearTo = state.yearTo
      return query
    },

    filterPath(state): string {
      return state.place === 'auction' ? '/auction-lots' : '/search'
    },

    suggestions(state): Suggestion[] {
      const text = state.text.trim().toLowerCase()
      if (text.length < 2) return []

      const result: Suggestion[] = []

      if (state.inAuction) {
        for (const make of makes) {
          if (make.name.toLowerCase().includes(text)) {
            result.push({ title: make.name, subtitle: 'Marka', to: `/auction-lots?makes=${make.name}` })
          }
          for (const model of make.models) {
            if (`${make.name} ${model}`.toLowerCase().includes(text)) {
              result.push({
                title: `${make.name} ${model}`,
                subtitle: 'Model',
                to: `/auction-lots?makes=${make.name}&models=${model}`,
              })
            }
          }
        }

        for (const lot of lots) {
          if (lot.lotNumber.includes(text) || lot.vin.toLowerCase().includes(text)) {
            result.push({ title: `Lot ${lot.lotNumber}`, subtitle: lot.title, to: `/auction-lots/${lot.slug}` })
          }
        }
      }

      if (state.inOther) {
        for (const car of localCars) {
          if (car.title.toLowerCase().includes(text)) {
            result.push({ title: car.title, subtitle: 'Azərbaycanda satışda', to: `/cars/${car.slug}` })
          }
        }
      }

      return result.slice(0, 8)
    },
  },

  actions: {
    setMake(value: string) {
      this.make = value
      this.model = ''
      if (!value) {
        this.yearFrom = ''
        this.yearTo = ''
      }
    },

    setYearFrom(value: string) {
      this.yearFrom = value
      if (this.yearTo && this.yearTo < value) this.yearTo = ''
    },

    clearText() {
      this.text = ''
    },
  },
})
