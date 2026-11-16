import { GE_FIXED_FEES } from '~/data/calculator'

export interface GeCustomsInput {
  engineCc: number
  fuel: string
  year: number
  rightHand?: boolean
}

export interface GeCustomsResult {
  importTax: number
  excise: number
  fixedFees: number
  total: number
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

function excisePerCc(age: number, fuel: string, rightHand: boolean) {
  if (fuel === 'Elektrik') return 0

  let rate = age <= 6 ? 1.5 : 4.5
  if (fuel === 'Hibrid' && age <= 6 && !rightHand) rate = 0.6
  if (rightHand) rate = rate * 3

  return rate
}

export function calculateGeCustoms(input: GeCustomsInput): GeCustomsResult {
  const age = Math.max(0, new Date().getFullYear() - input.year)
  const rightHand = Boolean(input.rightHand)

  const excise = input.engineCc * excisePerCc(age, input.fuel, rightHand)

  let importTax = 0
  if (input.fuel !== 'Elektrik') importTax = input.engineCc * 0.05 * (1 + age * 0.05)

  return {
    importTax: round(importTax),
    excise: round(excise),
    fixedFees: GE_FIXED_FEES,
    total: round(importTax + excise + GE_FIXED_FEES),
  }
}
