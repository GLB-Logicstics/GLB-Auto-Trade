import type { Option } from '~/types'

export const AZN_RATE = 1.7

export const POTI_BAKU_PRICE = 540

export const countries: Option[] = [
  { label: 'Azərbaycan', value: 'az' },
  { label: 'Gürcüstan', value: 'ge' },
]

export const shippingPrices: Record<string, number> = {
  'AL - TANNER': 1525,
  'CA - ANDERSON': 2750,
  'FL - CLEWISTON': 1475,
  'FL - OCALA': 1500,
  'FL - OPA LOCKA': 1325,
  'LA - SULPHUR': 1850,
  'MA - WEST WARREN': 1725,
  'MI - WOODHAVEN': 1775,
  'NJ - WINDSOR': 1350,
  'NY - BROOKHAVEN': 1450,
  'OH - COLUMBIA STATION': 1650,
  'OH - COLUMBUS': 1650,
  'OR - EUGENE': 2250,
  'TN - MEMPHIS': 1600,
  'TX - TEMPLE': 1675,
  'WA - ARLINGTON': 1950,
}

export const salvageFees: number[][] = [
  [100, 205],
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

export const cleanTitleFees: number[][] = [
  [100, 188],
  [200, 213],
  [300, 238],
  [400, 273],
  [500, 298],
  [600, 313],
  [700, 328],
  [800, 343],
  [900, 358],
  [1000, 393],
  [1200, 418],
  [1300, 433],
  [1400, 443],
  [1500, 463],
  [1600, 478],
  [1700, 488],
  [1800, 503],
  [2000, 538],
  [2400, 548],
  [2500, 563],
  [3000, 613],
  [3500, 668],
  [4000, 823],
  [4500, 848],
  [6000, 928],
  [7500, 943],
  [8000, 978],
  [10000, 983],
]

export const HIGH_BID_FROM = 15000

export const salvageHighBid = { percent: 0.06, fixed: 290 }

export const cleanTitleHighBid = { percent: 0.055, fixed: 263 }
