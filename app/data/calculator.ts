import type { ExtraCost, Option } from '~/types'

export const AZN_RATE = 1.7

export const GEL_TO_USD = 0.3862

export const POTI_BAKU_PRICE = 540

export const countries: Option[] = [
  { label: 'Azərbaycan', value: 'az' },
  { label: 'Gürcüstan', value: 'ge' },
]

export const fuelOptions: Option[] = [
  { label: 'Benzin', value: 'Benzin' },
  { label: 'Dizel', value: 'Dizel' },
  { label: 'Hibrid', value: 'Hibrid' },
  { label: 'Elektrik', value: 'Elektrik' },
]

export const documentOptions: Option[] = [
  { label: 'Standart sənəd', value: 'clean' },
  { label: 'Qeyri-standart sənəd', value: 'nonClean' },
  { label: 'Məlumat yoxdur', value: 'unknown' },
]

export const extraCosts: ExtraCost[] = [
  { id: 'insurance', label: 'Daşınma sığortası', price: 150 },
  { id: 'documents', label: 'Sənədlərin hazırlanması', price: 100 },
  { id: 'broker', label: 'Gömrük brokeri xidməti', price: 120 },
]

export const GATE_FEE = { clean: 79, nonClean: 95 }

export const FEDEX_FEE = 20

export const SERVICE_FEE = 15

export const HIGH_BID_FROM = 15000

export const copartCleanFees: number[][] = [
  [0, 1],
  [100, 25],
  [200, 60],
  [300, 80],
  [350, 90],
  [400, 125],
  [450, 130],
  [500, 140],
  [550, 150],
  [600, 165],
  [700, 185],
  [800, 200],
  [900, 215],
  [1000, 230],
  [1200, 255],
  [1300, 275],
  [1400, 280],
  [1500, 290],
  [1600, 305],
  [1700, 315],
  [1800, 325],
  [2000, 355],
  [2400, 380],
  [2500, 400],
  [3000, 450],
  [3500, 500],
  [4000, 600],
  [4500, 625],
  [6000, 675],
  [7500, 690],
  [8000, 715],
  [10000, 720],
]

export const copartNonCleanFees: number[][] = [
  [0, 1],
  [100, 25],
  [200, 50],
  [300, 75],
  [400, 120],
  [450, 130],
  [500, 140],
  [550, 150],
  [600, 165],
  [700, 185],
  [800, 200],
  [900, 215],
  [1000, 230],
  [1200, 255],
  [1300, 275],
  [1400, 280],
  [1500, 290],
  [1600, 305],
  [1700, 315],
  [1800, 325],
  [2000, 355],
  [2400, 380],
  [2500, 400],
  [3000, 450],
  [3500, 500],
  [4000, 600],
  [4500, 625],
  [5000, 650],
  [6000, 675],
  [7000, 700],
  [8000, 725],
  [10000, 750],
  [11500, 760],
  [12000, 775],
  [12500, 790],
]

export const copartHighBidPercent = { clean: 0.0575, nonClean: 0.06 }

export const liveBidFees: number[][] = [
  [0, 0],
  [100, 49],
  [500, 59],
  [1000, 79],
  [1500, 89],
  [2000, 99],
  [4000, 109],
  [6000, 139],
  [8000, 149],
]

export const unknownDocFees: number[][] = [
  [0, 205],
  [200, 240],
  [300, 265],
  [400, 305],
  [500, 340],
  [600, 365],
  [700, 390],
  [800, 410],
  [900, 425],
  [1000, 465],
  [1200, 485],
  [1300, 500],
  [1400, 515],
  [1500, 540],
  [1600, 555],
  [1700, 575],
  [1800, 595],
  [2000, 630],
  [2400, 665],
  [2500, 700],
  [3000, 745],
  [3500, 795],
  [4000, 855],
  [4500, 880],
  [5000, 905],
  [5500, 930],
  [6000, 975],
  [6500, 995],
  [7000, 1030],
  [7500, 1050],
  [8000, 1090],
  [8500, 1110],
  [10000, 1140],
  [11500, 1150],
  [12000, 1165],
  [12500, 1180],
]

export const unknownDocHighBid = { percent: 0.06, fixed: 290 }

export const GE_FIXED_FEES = 480