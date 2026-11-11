import { defineStore } from 'pinia'
import { lots } from '~/data/lots'
import type { Lot, LotFilters, Option } from '~/types'

export const LIST_KEYS = [
  'added',
  'locations',
  'makes',
  'models',
  'engines',
  'fuels',
  'colors',
  'damages',
  'secondaryDamages',
  'transmissions',
  'cylinders',
  'bodies',
  'vehicleTypes',
  'drives',
  'documents',
] as const

export const TEXT_KEYS = ['q', 'saleFrom', 'saleTo', 'yearFrom', 'yearTo', 'mileageFrom', 'mileageTo'] as const

export const FLAG_KEYS = ['buyNow', 'runs', 'cleanTitle', 'today', 'tomorrow'] as const

export type ListKey = (typeof LIST_KEYS)[number]
export type TextKey = (typeof TEXT_KEYS)[number]
export type FlagKey = (typeof FLAG_KEYS)[number]

function emptyFilters(): LotFilters {
  return {
    q: '',
    added: [],
    locations: [],
    makes: [],
    models: [],
    engines: [],
    fuels: [],
    colors: [],
    damages: [],
    secondaryDamages: [],
    transmissions: [],
    cylinders: [],
    bodies: [],
    vehicleTypes: [],
    drives: [],
    documents: [],
    saleFrom: '',
    saleTo: '',
    yearFrom: '',
    yearTo: '',
    mileageFrom: '',
    mileageTo: '',
    buyNow: false,
    runs: false,
    cleanTitle: false,
    today: false,
    tomorrow: false,
  }
}

function documentGroup(lot: Lot) {
  if (lot.document === 'Standart sənəd') return 'Standart sənəd'
  if (lot.document === 'Məlumat yoxdur') return 'Məlumat yoxdur'
  return 'Qeyri-standart sənəd'
}

export function lotValue(lot: Lot, key: ListKey): string {
  if (key === 'locations') return lot.location
  if (key === 'makes') return lot.make
  if (key === 'models') return lot.model
  if (key === 'engines') return lot.engine
  if (key === 'fuels') return lot.fuel
  if (key === 'colors') return lot.color
  if (key === 'damages') return lot.primaryDamage
  if (key === 'secondaryDamages') return lot.secondaryDamage || 'Məlumat yoxdur'
  if (key === 'transmissions') return lot.transmission
  if (key === 'cylinders') return lot.engine.split(' ')[1] || ''
  if (key === 'bodies') return lot.bodyType
  if (key === 'vehicleTypes') return 'Avtomobil'
  if (key === 'drives') return lot.drive
  if (key === 'documents') return documentGroup(lot)
  return ''
}

function dateText(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function daysAgo(dateString: string) {
  const today = new Date(dateText(new Date())).getTime()
  const date = new Date(dateString).getTime()
  return Math.round((today - date) / 86400000)
}

function lotPrice(lot: Lot) {
  return lot.buyNowPrice || lot.currentBid
}

export const useLotsStore = defineStore('lots', {
  state: () => ({
    items: lots,
    filters: emptyFilters(),
    sort: 'date',
    order: 'asc',
    page: 1,
    perPage: 6,
  }),

  getters: {
    filteredLots(state): Lot[] {
      const f = state.filters
      const text = f.q.trim().toLowerCase()
      const today = dateText(new Date())
      const tomorrowDate = new Date()
      tomorrowDate.setDate(tomorrowDate.getDate() + 1)
      const tomorrow = dateText(tomorrowDate)
      const addedDays = f.added.length ? Math.max(...f.added.map(Number)) : 0

      return state.items.filter((lot) => {
        if (text) {
          const found =
            lot.title.toLowerCase().includes(text) ||
            lot.vin.toLowerCase().includes(text) ||
            lot.lotNumber.includes(text)
          if (!found) return false
        }

        for (const key of LIST_KEYS) {
          if (key === 'added') continue
          if (f[key].length && !f[key].includes(lotValue(lot, key))) return false
        }

        const saleDay = lot.saleDate.slice(0, 10)
        if (addedDays && daysAgo(lot.addedAt) > addedDays) return false
        if (f.saleFrom && saleDay < f.saleFrom) return false
        if (f.saleTo && saleDay > f.saleTo) return false
        if (f.yearFrom && lot.year < Number(f.yearFrom)) return false
        if (f.yearTo && lot.year > Number(f.yearTo)) return false
        if (f.mileageFrom && lot.odometer < Number(f.mileageFrom)) return false
        if (f.mileageTo && lot.odometer > Number(f.mileageTo)) return false
        if (f.buyNow && !lot.buyNowPrice) return false
        if (f.runs && lot.condition !== 'İşləyir və sürülür') return false
        if (f.cleanTitle && documentGroup(lot) !== 'Standart sənəd') return false
        if (f.today && saleDay !== today) return false
        if (f.tomorrow && saleDay !== tomorrow) return false
        return true
      })
    },

    sortedLots(): Lot[] {
      const list = [...this.filteredLots]
      const direction = this.order === 'asc' ? 1 : -1

      list.sort((a, b) => {
        if (this.sort === 'price') return (lotPrice(a) - lotPrice(b)) * direction
        if (this.sort === 'year') return (a.year - b.year) * direction
        if (this.sort === 'mileage') return (a.odometer - b.odometer) * direction
        return a.saleDate.localeCompare(b.saleDate) * direction
      })

      return list
    },

    total(): number {
      return this.filteredLots.length
    },

    totalPages(): number {
      return Math.max(1, Math.ceil(this.total / this.perPage))
    },

    pagedLots(): Lot[] {
      const start = (this.page - 1) * this.perPage
      return this.sortedLots.slice(start, start + this.perPage)
    },

    rangeText(): string {
      if (!this.total) return '0 nəticə'
      const start = (this.page - 1) * this.perPage + 1
      const end = Math.min(this.page * this.perPage, this.total)
      return `${start}-${end} / ${this.total} nəticə göstərilir`
    },

    optionsOf: (state) => (key: ListKey): Option[] => {
      let source = state.items
      if (key === 'models' && state.filters.makes.length) {
        source = source.filter((lot) => state.filters.makes.includes(lot.make))
      }

      const values: string[] = []
      for (const lot of source) {
        const value = lotValue(lot, key)
        if (value && !values.includes(value)) values.push(value)
      }

      values.sort()
      return values.map((value) => ({ label: value, value }))
    },

    yearRange(state): string {
      const years = state.items.map((lot) => lot.year)
      return `${Math.min(...years)} - ${Math.max(...years)}`
    },

    mileageRange(state): string {
      const values = state.items.map((lot) => lot.odometer)
      return `${Math.min(...values).toLocaleString('en-US')} - ${Math.max(...values).toLocaleString('en-US')}`
    },

    activeCount(state): number {
      const f = state.filters
      let count = 0
      for (const key of LIST_KEYS) count += f[key].length
      for (const key of TEXT_KEYS) if (f[key]) count++
      for (const key of FLAG_KEYS) if (f[key]) count++
      return count
    },

    query(state) {
      const result: Record<string, string> = {}
      const f = state.filters
      for (const key of LIST_KEYS) if (f[key].length) result[key] = f[key].join(',')
      for (const key of TEXT_KEYS) if (f[key]) result[key] = f[key]
      for (const key of FLAG_KEYS) if (f[key]) result[key] = '1'
      if (state.sort !== 'date') result.sort = state.sort
      if (state.order !== 'asc') result.order = state.order
      if (state.page > 1) result.page = String(state.page)
      return result
    },

    lotBySlug: (state) => (slug: string) => state.items.find((lot) => lot.slug === slug),

    similarLots: (state) => (lot: Lot) =>
      state.items.filter((item) => item.make === lot.make && item.id !== lot.id).slice(0, 6),
  },

  actions: {
    applyQuery(query: Record<string, unknown>) {
      const f = emptyFilters()
      for (const key of LIST_KEYS) f[key] = query[key] ? String(query[key]).split(',') : []
      for (const key of TEXT_KEYS) f[key] = query[key] ? String(query[key]) : ''
      for (const key of FLAG_KEYS) f[key] = query[key] === '1'

      this.filters = f
      this.sort = query.sort ? String(query.sort) : 'date'
      this.order = query.order === 'desc' ? 'desc' : 'asc'
      this.page = query.page ? Number(query.page) : 1
    },

    setList(key: ListKey, values: string[]) {
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

    setRange(fromKey: TextKey, toKey: TextKey, from: string, to: string) {
      this.filters[fromKey] = from
      this.filters[toKey] = to
      this.page = 1
    },

    setText(key: TextKey, value: string) {
      this.filters[key] = value
      this.page = 1
    },

    toggleFlag(key: FlagKey) {
      this.filters[key] = !this.filters[key]
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
