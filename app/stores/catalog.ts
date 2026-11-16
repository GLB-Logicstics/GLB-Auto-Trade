import { defineStore } from 'pinia'
import { catalog } from '~/data/catalog'
import type { CatalogItem, Option } from '~/types'

function unique(values: string[]): Option[] {
  return [...new Set(values)].map((value) => ({ label: value, value }))
}

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    items: catalog,
    make: '',
    model: '',
    year: '',
  }),

  getters: {
    makeOptions: (state): Option[] => unique(state.items.map((item) => item.make)),

    modelOptions: (state): Option[] =>
      unique(state.items.filter((item) => item.make === state.make).map((item) => item.model)),

    yearOptions: (state): Option[] =>
      unique(
        state.items
          .filter((item) => item.make === state.make && item.model === state.model)
          .map((item) => String(item.year)),
      ),

    selected: (state): CatalogItem | undefined =>
      state.items.find(
        (item) => item.make === state.make && item.model === state.model && String(item.year) === state.year,
      ),
  },

  actions: {
    applyQuery(query: Record<string, unknown>) {
      this.make = query.make ? String(query.make) : ''
      this.model = query.model ? String(query.model) : ''
      this.year = query.year ? String(query.year) : ''
    },

    setMake(value: string) {
      this.make = value
      this.model = ''
      this.year = ''
    },

    setModel(value: string) {
      this.model = value
      this.year = ''
    },
  },
})
