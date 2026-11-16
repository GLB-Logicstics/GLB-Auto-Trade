import type { Part, PartType } from '~/types'

export const partTypes: PartType[] = [
  { label: 'Mühərrik', value: 'engine', icon: 'bi-gear-wide-connected' },
  { label: 'Kuzov hissələri', value: 'body', icon: 'bi-car-front' },
  { label: 'Optika', value: 'lights', icon: 'bi-lightbulb' },
  { label: 'Asma', value: 'suspension', icon: 'bi-bezier2' },
  { label: 'Əyləc sistemi', value: 'brakes', icon: 'bi-disc' },
  { label: 'Elektrik', value: 'electric', icon: 'bi-lightning-charge' },
  { label: 'Salon', value: 'interior', icon: 'bi-grid-3x3-gap' },
  { label: 'Təkər və disk', value: 'wheels', icon: 'bi-circle' },
]

export const parts: Part[] = [
  { id: 1, title: 'Ön fara (LED)', make: 'BMW', model: 'X5', yearFrom: 2019, yearTo: 2023, type: 'lights', condition: 'İşlənmiş', price: 650, location: 'Bakı' },
  { id: 2, title: 'Ön bamper', make: 'BMW', model: 'X5', yearFrom: 2019, yearTo: 2023, type: 'body', condition: 'Yeni', price: 480, location: 'Bakı' },
  { id: 3, title: 'Mühərrik yağ nasosu', make: 'BMW', model: 'X5', yearFrom: 2019, yearTo: 2022, type: 'engine', condition: 'Yeni', price: 210, location: 'ABŞ-dan sifariş' },
  { id: 4, title: 'Əyləc diski dəsti', make: 'BMW', model: 'X3', yearFrom: 2018, yearTo: 2024, type: 'brakes', condition: 'Yeni', price: 190, location: 'Bakı' },
  { id: 5, title: 'Pnevmatik amortizator', make: 'BMW', model: 'X5', yearFrom: 2019, yearTo: 2023, type: 'suspension', condition: 'İşlənmiş', price: 520, location: 'Tbilisi' },
  { id: 6, title: 'Arxa stop', make: 'BMW', model: '330I', yearFrom: 2019, yearTo: 2024, type: 'lights', condition: 'İşlənmiş', price: 240, location: 'Bakı' },
  { id: 7, title: 'Generator', make: 'HYUNDAI', model: 'TUCSON', yearFrom: 2016, yearTo: 2021, type: 'electric', condition: 'İşlənmiş', price: 160, location: 'Bakı' },
  { id: 8, title: 'Kapot', make: 'HYUNDAI', model: 'ELANTRA', yearFrom: 2021, yearTo: 2024, type: 'body', condition: 'Yeni', price: 290, location: 'ABŞ-dan sifariş' },
  { id: 9, title: 'Ön oturacaq dəsti', make: 'HYUNDAI', model: 'SANTA FE', yearFrom: 2019, yearTo: 2023, type: 'interior', condition: 'İşlənmiş', price: 420, location: 'Tbilisi' },
  { id: 10, title: 'Orijinal disk 18"', make: 'HYUNDAI', model: 'SANTA FE', yearFrom: 2021, yearTo: 2025, type: 'wheels', condition: 'İşlənmiş', price: 380, location: 'Bakı' },
  { id: 11, title: 'Hibrid batareya bloku', make: 'HYUNDAI', model: 'IONIQ', yearFrom: 2017, yearTo: 2022, type: 'electric', condition: 'Bərpa edilmiş', price: 1450, location: 'ABŞ-dan sifariş' },
  { id: 12, title: 'Ön asma qolu', make: 'HYUNDAI', model: 'TUCSON', yearFrom: 2016, yearTo: 2021, type: 'suspension', condition: 'Yeni', price: 85, location: 'Bakı' },
]
