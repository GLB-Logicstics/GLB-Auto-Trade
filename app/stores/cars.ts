import { defineStore } from 'pinia'
import { countries } from '~/data/filters'
import { localCars } from '~/data/homepage'
import type { CarFilters, LocalCar, Option } from '~/types'

export const CAR_LIST_KEYS = [
  'makes',
  'models',
  'engines',
  'transmissions',
  'fuels',
  'bodies',
  'colors',
  'drives',
  'locations',
] as const

export const CAR_TEXT_KEYS = [
  'country',
  'yearFrom',
  'yearTo',
  'mileageFrom',
  'mileageTo',
  'priceFrom',
  'priceTo',
] as const

export type CarListKey = (typeof CAR_LIST_KEYS)[number]
export type CarTextKey = (typeof CAR_TEXT_KEYS)[number]

function emptyFilters(): CarFilters {
  return {
    country: '',
    makes: [],
    models: [],
    engines: [],
    transmissions: [],
    fuels: [],
    bodies: [],
    colors: [],
    drives: [],
    locations: [],
    yearFrom: '',
    yearTo: '',
    mileageFrom: '',
    mileageTo: '',
    priceFrom: '',
    priceTo: '',
  }
}

export function carValue(car: LocalCar, key: CarListKey): string {
  if (key === 'makes') return car.make
  if (key === 'models') return car.model
  if (key === 'engines') return car.engine
  if (key === 'transmissions') return car.transmission
  if (key === 'fuels') return car.fuel
  if (key === 'bodies') return car.bodyType
  if (key === 'colors') return car.color
  if (key === 'drives') return car.drive
  if (key === 'locations') return car.location
  return ''
}

export const useCarsStore = defineStore('cars', {
  state: () => ({
    items: localCars,
    filters: emptyFilters(),
    sort: 'date',
    order: 'desc',
    page: 1,
    perPage: 6,
  }),

  getters: {
    carBySlug: (state) => (slug: string) => state.items.find((car) => car.slug === slug),

    similarCars: (state) => (car: LocalCar) => state.items.filter((item) => item.id !== car.id),

    countryLabel(state): string {
      const country = countries.find((item) => item.value === state.filters.country)
      return country ? country.label : ''
    },

    filteredCars(state): LocalCar[] {
      const f = state.filters

      return state.items.filter((car) => {
        if (f.country && car.country !== f.country) return false

        for (const key of CAR_LIST_KEYS) {
          if (f[key].length && !f[key].includes(carValue(car, key))) return false
        }

        if (f.yearFrom && car.year < Number(f.yearFrom)) return false
        if (f.yearTo && car.year > Number(f.yearTo)) return false
        if (f.mileageFrom && car.odometer < Number(f.mileageFrom)) return false
        if (f.mileageTo && car.odometer > Number(f.mileageTo)) return false
        if (f.priceFrom && car.price < Number(f.priceFrom)) return false
        if (f.priceTo && car.price > Number(f.priceTo)) return false
        return true
      })
    },

    sortedCars(): LocalCar[] {
      const list = [...this.filteredCars]
      const direction = this.order === 'asc' ? 1 : -1

      list.sort((a, b) => {
        if (this.sort === 'price') return (a.price - b.price) * direction
        if (this.sort === 'year') return (a.year - b.year) * direction
        if (this.sort === 'mileage') return (a.odometer - b.odometer) * direction
        return (a.id - b.id) * direction
      })

      return list
    },

    total(): number {
      return this.filteredCars.length
    },

    totalPages(): number {
      return Math.max(1, Math.ceil(this.total / this.perPage))
    },

    pagedCars(): LocalCar[] {
      const start = (this.page - 1) * this.perPage
      return this.sortedCars.slice(start, start + this.perPage)
    },

    rangeText(): string {
      if (!this.total) return '0 nəticə'
      const start = (this.page - 1) * this.perPage + 1
      const end = Math.min(this.page * this.perPage, this.total)
      return `${start}-${end} / ${this.total} nəticə göstərilir`
    },

    optionsOf: (state) => (key: CarListKey): Option[] => {
      let source = state.items
      if (key === 'models' && state.filters.makes.length) {
        source = source.filter((car) => state.filters.makes.includes(car.make))
      }

      const values: string[] = []
      for (const car of source) {
        const value = carValue(car, key)
        if (value && !values.includes(value)) values.push(value)
      }

      values.sort()
      return values.map((value) => ({ label: value, value }))
    },

    rangeOf: (state) => (field: 'year' | 'odometer' | 'price'): string => {
      const values = state.items.map((car) => car[field])
      if (!values.length) return ''
      return `${Math.min(...values).toLocaleString('en-US')} - ${Math.max(...values).toLocaleString('en-US')}`
    },

    activeCount(state): number {
      const f = state.filters
      let count = 0
      for (const key of CAR_LIST_KEYS) count += f[key].length
      for (const key of CAR_TEXT_KEYS) if (f[key]) count++
      return count
    },

    query(state) {
      const result: Record<string, string> = {}
      const f = state.filters
      for (const key of CAR_LIST_KEYS) if (f[key].length) result[key] = f[key].join(',')
      for (const key of CAR_TEXT_KEYS) if (f[key]) result[key] = f[key]
      if (state.sort !== 'date') result.sort = state.sort
      if (state.order !== 'desc') result.order = state.order
      if (state.page > 1) result.page = String(state.page)
      return result
    },
  },

  actions: {
    applyQuery(query: Record<string, unknown>) {
      const f = emptyFilters()
      for (const key of CAR_LIST_KEYS) f[key] = query[key] ? String(query[key]).split(',') : []
      for (const key of CAR_TEXT_KEYS) f[key] = query[key] ? String(query[key]) : ''

      this.filters = f
      this.sort = query.sort ? String(query.sort) : 'date'
      this.order = query.order === 'asc' ? 'asc' : 'desc'
      this.page = query.page ? Number(query.page) : 1
    },

    setList(key: CarListKey, values: string[]) {
      this.filters[key] = values

      if (key === 'makes') {
        const allowed = this.optionsOf('models').map((option) => option.value)
        this.filters.models = this.filters.models.filter((model) => allowed.includes(model))
        if (!values.length) {
          this.filters.yearFrom = ''
          this.filters.yearTo = ''
        }
      }

      this.page = 1
    },

    setRange(fromKey: CarTextKey, toKey: CarTextKey, from: string, to: string) {
      this.filters[fromKey] = from
      this.filters[toKey] = to
      this.page = 1
    },

    setCountry(value: string) {
      this.filters.country = value
      this.page = 1
    },

    setSort(value: string) {
      this.sort = value
      this.page = 1
    },

    toggleOrder() {
      this.order = this.order === 'asc' ? 'desc' : 'asc'
    },

    setPage(page: number) {
      this.page = page
    },

    resetFilters() {
      this.filters = emptyFilters()
      this.page = 1
    },
  },
})
