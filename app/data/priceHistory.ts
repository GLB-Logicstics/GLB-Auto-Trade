import type { PricePoint } from '~/types'

export const priceHistory: Record<string, PricePoint[]> = {
  'BMW X5': [
    { label: 'İyun', price: 21400 },
    { label: 'İyul', price: 22100 },
    { label: 'Avq', price: 20800 },
    { label: 'Sen', price: 19900 },
    { label: 'Okt', price: 20600 },
    { label: 'Noy', price: 21200 },
  ],
  'BMW X3': [
    { label: 'İyun', price: 14200 },
    { label: 'İyul', price: 13800 },
    { label: 'Avq', price: 13100 },
    { label: 'Sen', price: 12900 },
    { label: 'Okt', price: 13500 },
    { label: 'Noy', price: 13900 },
  ],
  'BMW 330I': [
    { label: 'İyun', price: 11800 },
    { label: 'İyul', price: 12300 },
    { label: 'Avq', price: 11600 },
    { label: 'Sen', price: 11200 },
    { label: 'Okt', price: 11900 },
    { label: 'Noy', price: 12400 },
  ],
  HYUNDAI: [
    { label: 'İyun', price: 8900 },
    { label: 'İyul', price: 9300 },
    { label: 'Avq', price: 8700 },
    { label: 'Sen', price: 8400 },
    { label: 'Okt', price: 8800 },
    { label: 'Noy', price: 9100 },
  ],
}
