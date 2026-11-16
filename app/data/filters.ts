import type { Make, Option, SaleStatus } from '~/types'

export const makes: Make[] = [
  { name: 'BMW', models: ['X5', 'X3', '330I'] },
  { name: 'HYUNDAI', models: ['TUCSON', 'SANTA FE', 'ELANTRA', 'IONIQ'] },
]

export const saleStatuses: Record<string, SaleStatus> = {
  minBid: { label: 'Minimum təklif əsasında', reserve: 'Rezerv var (məbləğ açıqlanmır)', color: '#16202c', icon: 'bi-hammer' },
  pure: { label: 'Şərtsiz satış', reserve: 'Rezervsiz', color: '#0096cc', icon: 'bi-check-circle-fill' },
  approval: { label: 'Satıcı təsdiqi ilə', reserve: 'Satıcının təsdiqi ilə', color: '#e57373', icon: 'bi-hourglass-split' },
}

export const auctions: Option[] = [
  { label: 'Copart', value: 'Copart' },
  { label: 'IAAI', value: 'IAAI' },
  { label: 'Manheim', value: 'Manheim' },
]

export const auctionTypes: Option[] = [
  { label: 'Canlı hərrac', value: 'live' },
  { label: 'Vaxtlı hərrac (Timed)', value: 'timed' },
  { label: 'İndi al (Buy Now)', value: 'buyNow' },
]

export function optionLabel(options: Option[], value: string): string {
  const option = options.find((item) => item.value === value)
  return option ? option.label : value
}

export const places: Option[] = [
  { label: 'Hərrac (ABŞ)', value: 'auction' },
  { label: 'Azərbaycan', value: 'aze' },
  { label: 'Gürcüstan', value: 'geo' },
  { label: 'Koreya', value: 'korea' },
]

export const countries: Option[] = [
  { label: 'Azərbaycan', value: 'aze' },
  { label: 'Gürcüstan', value: 'geo' },
]

export const cities: Record<string, Option[]> = {
  aze: [
    { label: 'Bakı', value: 'Bakı' },
    { label: 'Gəncə', value: 'Gəncə' },
    { label: 'Sumqayıt', value: 'Sumqayıt' },
  ],
  geo: [
    { label: 'Tbilisi', value: 'Tbilisi' },
    { label: 'Batumi', value: 'Batumi' },
    { label: 'Poti', value: 'Poti' },
  ],
}

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