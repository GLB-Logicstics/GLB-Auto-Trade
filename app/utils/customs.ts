export interface CustomsInput {
  price: number
  transport: number
  engineCc: number
  fuel: string
  year: number
}

export interface CustomsResult {
  customsValue: number
  importDuty: number
  excise: number
  vat: number
  clearanceFee: number
  recyclingFee: number
  fixedFees: number
  total: number
}

const USD_TO_AZN = 1.7

function round(value: number) {
  return Math.round(value * 100) / 100
}

function clearanceFee(customsValue: number) {
  if (customsValue <= 1000) return 15
  if (customsValue <= 10000) return 60
  if (customsValue <= 50000) return 120
  if (customsValue <= 100000) return 200
  if (customsValue <= 500000) return 300
  if (customsValue <= 1000000) return 600
  return 1000
}

function baseExcise(engineCc: number, olderThanThreeYears: boolean) {
  if (engineCc <= 2000) return engineCc * 0.3
  if (engineCc <= 3000) return 600 + (engineCc - 2000) * 5

  if (olderThanThreeYears) {
    if (engineCc <= 4000) return 5600 + (engineCc - 3000) * 15
    if (engineCc <= 5000) return 20600 + (engineCc - 4000) * 40
    return 60600 + (engineCc - 5000) * 80
  }

  if (engineCc <= 4000) return 5600 + (engineCc - 3000) * 13
  if (engineCc <= 5000) return 18600 + (engineCc - 4000) * 35
  return 53600 + (engineCc - 5000) * 70
}

export function calculateCustoms(input: CustomsInput): CustomsResult {
  const now = new Date()
  const ageInMonths = (now.getFullYear() - input.year) * 12 + now.getMonth()
  const ageInYears = now.getFullYear() - input.year

  const isNew = ageInMonths < 12
  const isElectric = input.fuel === 'Elektrik'
  const isDiesel = input.fuel === 'Dizel'

  const customsValue = round((input.price + input.transport) * USD_TO_AZN)

  let importDuty = 0
  if (isElectric) {
    importDuty = isNew ? 0 : customsValue * 0.15
  } else {
    const smallEngine = input.engineCc <= 1500
    let dollarsPerCc = smallEngine ? 0.7 : 1.2
    if (isNew) dollarsPerCc = smallEngine ? 0.4 : 0.7
    importDuty = input.engineCc * dollarsPerCc * USD_TO_AZN
  }

  let excise = 0
  if (!isElectric) {
    excise = baseExcise(input.engineCc, ageInMonths > 36)
    if (ageInMonths >= 84) excise = excise * (isDiesel ? 2 : 1.5)
  }

  let recyclingFee = 0
  if (ageInYears >= 7) recyclingFee = 700
  else if (ageInYears >= 4) recyclingFee = 400

  const vat = (customsValue + importDuty + excise + 30) * 0.18
  const fee = clearanceFee(customsValue)
  const fixedFees = 30 + 30 + 5.4 + 30 + 30

  const total = importDuty + excise + vat + fee + recyclingFee + fixedFees

  return {
    customsValue,
    importDuty: round(importDuty),
    excise: round(excise),
    vat: round(vat),
    clearanceFee: fee,
    recyclingFee,
    fixedFees,
    total: round(total),
  }
}
