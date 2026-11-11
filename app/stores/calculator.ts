import { defineStore } from 'pinia'
import {
  AZN_RATE,
  cleanTitleFees,
  cleanTitleHighBid,
  HIGH_BID_FROM,
  POTI_BAKU_PRICE,
  salvageFees,
  salvageHighBid,
  shippingPrices,
} from '~/data/calculator'
import { calculateCustoms } from '~/utils/customs'
import type { Lot } from '~/types'

function emptyResult() {
  return {
    bid: 0,
    auctionFee: 0,
    usShipping: 0,
    potiShipping: 0,
    customs: 0,
    customsAzn: 0,
    total: 0,
    shippingUnknown: false,
  }
}

function auctionFee(bid: number, cleanTitle: boolean) {
  if (bid <= 0) return 0

  if (bid >= HIGH_BID_FROM) {
    const rule = cleanTitle ? cleanTitleHighBid : salvageHighBid
    return Math.round(bid * rule.percent + rule.fixed)
  }

  const table = cleanTitle ? cleanTitleFees : salvageFees
  let fee = table[0]![1]!
  for (const [from, value] of table) {
    if (bid >= from!) fee = value!
  }
  return fee
}

function engineCc(engine: string) {
  return Math.round(parseFloat(engine) * 1000) || 0
}

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    bid: '',
    country: 'az',
    result: emptyResult(),
  }),

  actions: {
    calculate(lot: Lot) {
      const bid = Number(this.bid) || 0
      if (bid <= 0) {
        this.result = emptyResult()
        return
      }

      const fee = auctionFee(bid, lot.document === 'Certificate Of Title')
      const usShipping = shippingPrices[lot.location] || 0
      const potiShipping = this.country === 'az' ? POTI_BAKU_PRICE : 0

      const customs = calculateCustoms({
        price: bid + fee,
        transport: usShipping + potiShipping,
        engineCc: engineCc(lot.engine),
        fuel: lot.fuel,
        year: lot.year,
      })

      const customsUsd = Math.round((customs.total / AZN_RATE) * 100) / 100

      this.result = {
        bid,
        auctionFee: fee,
        usShipping,
        potiShipping,
        customs: customsUsd,
        customsAzn: customs.total,
        total: bid + fee + usShipping + potiShipping + customsUsd,
        shippingUnknown: !usShipping,
      }
    },

    reset() {
      this.bid = ''
      this.country = 'az'
      this.result = emptyResult()
    },
  },
})
