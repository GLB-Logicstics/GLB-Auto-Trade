import type { Make, Option, SaleStatus } from '~/types'

export const makes: Make[] = [
  { name: 'BMW', models: ['X5', 'X3', '330I'] },
  { name: 'HYUNDAI', models: ['TUCSON', 'SANTA FE', 'ELANTRA', 'IONIQ'] },
]

export const saleStatuses: Record<string, SaleStatus> = {
  minBid: { label: 'Minimum təklif əsasında', color: '#16202c', icon: 'bi-hammer' },
  pure: { label: 'Şərtsiz satış', color: '#0096cc', icon: 'bi-check-circle-fill' },
  approval: { label: 'Satıcı təsdiqi ilə', color: '#e57373', icon: 'bi-hourglass-split' },
}

export const places: Option[] = [
  { label: 'Hərrac', value: 'auction' },
  { label: 'Azərbaycan', value: 'az' },
  { label: 'Çin', value: 'cn' },
]

export const countries: Option[] = [
  { label: 'Azərbaycan', value: 'aze' },
  { label: 'Çin', value: 'china' },
  { label: 'ABŞ', value: 'usa' },
]

export const addedOptions: Option[] = [
  { label: 'Son 24 saat', value: '1' },
  { label: 'Son 30 gün', value: '30' },
  { label: 'Son 7 gün', value: '7' },
]

export const sortOptions: Option[] = [
  { label: 'Satış tarixi', value: 'date' },
  { label: 'Qiymətə görə', value: 'price' },
  { label: 'Buraxılış ili', value: 'year' },
  { label: 'Yürüşə görə', value: 'mileage' },
]

export const years: Option[] = []
for (let year = 2026; year >= 2010; year--) {
  years.push({ label: String(year), value: String(year) })
}
