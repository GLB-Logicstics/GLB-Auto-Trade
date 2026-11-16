import {
  AZN_RATE,
  copartCleanFees,
  copartHighBidPercent,
  copartNonCleanFees,
  extraCosts,
  FEDEX_FEE,
  GATE_FEE,
  GEL_TO_USD,
  HIGH_BID_FROM,
  liveBidFees,
  POTI_BAKU_PRICE,
  SERVICE_FEE,
  unknownDocFees,
  unknownDocHighBid,
} from '~/data/calculator'
import { shippingPrices } from '~/data/shipping'
import { calculateCustoms } from '~/utils/customs'
import { calculateGeCustoms } from '~/utils/customsGe'

export type DocumentType = 'clean' | 'nonClean' | 'unknown'

export interface EstimateInput {
  bid: number
  document: DocumentType
  auction: string
  location: string
  country: string
  engineCc: number
  fuel: string
  year: number
  extras: string[]
}

export interface EstimateResult {
  bid: number
  auctionFee: number
  usShipping: number
  potiShipping: number
  customs: number
  customsLocal: number
  currency: string
  extras: number
  total: number
  shippingUnknown: boolean
}

export function emptyEstimate(): EstimateResult {
  return {
    bid: 0,
    auctionFee: 0,
    usShipping: 0,
    potiShipping: 0,
    customs: 0,
    customsLocal: 0,
    currency: 'AZN',
    extras: 0,
    total: 0,
    shippingUnknown: false,
  }
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

function feeFromTable(table: number[][], bid: number) {
  let fee = 0
  for (const row of table) {
    if (bid >= row[0]!) fee = row[1]!
  }
  return fee
}

export function documentType(document: string): DocumentType {
  if (document === 'Standart sənəd') return 'clean'
  if (document === 'Qeyri-standart sənəd') return 'nonClean'
  return 'unknown'
}

export function auctionFee(bid: number, document: DocumentType) {
  if (bid <= 0) return 0

  if (document === 'unknown') {
    if (bid >= HIGH_BID_FROM) return Math.round(bid * unknownDocHighBid.percent + unknownDocHighBid.fixed)
    return feeFromTable(unknownDocFees, bid)
  }

  let securedFee = 0
  if (bid >= HIGH_BID_FROM) securedFee = Math.round(bid * copartHighBidPercent[document])
  else securedFee = feeFromTable(document === 'clean' ? copartCleanFees : copartNonCleanFees, bid)

  return securedFee + GATE_FEE[document] + feeFromTable(liveBidFees, bid) + FEDEX_FEE + SERVICE_FEE
}

export function shippingPrice(auction: string, location: string) {
  return shippingPrices[auction]?.[location] || 0
}

export function engineCc(engine: string) {
  return Math.round(parseFloat(engine) * 1000) || 0
}

export interface CustomsInput {
  country: string
  price: number
  transport: number
  engineCc: number
  fuel: string
  year: number
  rightHand?: boolean
}

export function customsCost(input: CustomsInput) {
  if (input.country === 'az') {
    const local = calculateCustoms(input).total
    return { local, usd: round(local / AZN_RATE), currency: 'AZN' }
  }

  const local = calculateGeCustoms(input).total
  return { local, usd: round(local * GEL_TO_USD), currency: 'GEL' }
}

export function estimate(input: EstimateInput): EstimateResult {
  if (input.bid <= 0) return emptyEstimate()

  const fee = auctionFee(input.bid, input.document)
  const usShipping = shippingPrice(input.auction, input.location)
  const potiShipping = input.country === 'az' ? POTI_BAKU_PRICE : 0

  const customs = customsCost({
    country: input.country,
    price: input.bid + fee,
    transport: usShipping + potiShipping,
    engineCc: input.engineCc,
    fuel: input.fuel,
    year: input.year,
  })

  const extras = extraCosts.filter((item) => input.extras.includes(item.id)).reduce((sum, item) => sum + item.price, 0)

  return {
    bid: input.bid,
    auctionFee: fee,
    usShipping,
    potiShipping,
    customs: customs.usd,
    customsLocal: customs.local,
    currency: customs.currency,
    extras,
    total: round(input.bid + fee + usShipping + potiShipping + customs.usd + extras),
    shippingUnknown: !usShipping,
  }
}
