const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const azn = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const number = new Intl.NumberFormat('en-US')

export function formatUsd(value: number): string {
  return usd.format(value)
}

export function formatMoney(value: number): string {
  return money.format(value)
}

export function formatAzn(value: number): string {
  return `${azn.format(value)} AZN`
}

export function formatMiles(value: number, type: string): string {
  return `${number.format(value)} mi (${type})`
}

export function formatDate(value: string): string {
  const [date, time] = value.split(' ')
  const [year, month, day] = (date || '').split('-')
  return `${day}.${month}.${year}, ${time}`
}

export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#eef2f8"/><g transform="translate(110 105)" fill="none" stroke="#9fb0c8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 60h140a10 10 0 0 0 10-10V38a10 10 0 0 0-7-9.5L140 21 122 3a10 10 0 0 0-7-3H60a10 10 0 0 0-8 4L38 21 16 27A10 10 0 0 0 10 37v13a10 10 0 0 0 10 10Z"/><circle cx="45" cy="62" r="14" fill="#eef2f8"/><circle cx="135" cy="62" r="14" fill="#eef2f8"/></g></svg>',
  )

export function onImageError(event: Event) {
  const img = event.target as HTMLImageElement
  if (img.src !== PLACEHOLDER_IMAGE) img.src = PLACEHOLDER_IMAGE
}

export function formatGel(value: number): string {
  return `${azn.format(value)} GEL`
}

export function whatsappLink(phone: string, text: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}
