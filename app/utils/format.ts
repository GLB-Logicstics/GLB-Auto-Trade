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

export const PLACEHOLDER_IMAGE = '/images/placeholder-car.svg'

export function onImageError(event: Event) {
  const img = event.target as HTMLImageElement
  if (!img.src.endsWith(PLACEHOLDER_IMAGE)) img.src = PLACEHOLDER_IMAGE
}
