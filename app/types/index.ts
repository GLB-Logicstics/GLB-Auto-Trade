export interface NavLink {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to?: string
  children?: NavLink[]
}

export interface SocialLink {
  name: string
  label: string
  icon: string
  href: string
}

export interface Language {
  code: string
  label: string
}

export interface BottomNavItem {
  label: string
  icon: string
  to?: string
  action?: 'search'
}

export interface Notification {
  id: number
  title: string
  date: string
}

export interface ContactInfo {
  phone: string
  phoneDisplay: string
  whatsapp: string
  email: string
  address: string
  workingHours: string
}

export interface SiteInfo {
  name: string
  logo: string
  logoDark: string
  about: string
  contact: ContactInfo
}

export interface HeroSlide {
  id: number
  title: string
  description: string
}

export interface Brand {
  name: string
  logo: string
}

export interface Make {
  name: string
  models: string[]
}

export interface Option {
  label: string
  value: string
}

export interface SaleStatus {
  label: string
  color: string
  icon: string
}

export interface Lot {
  id: number
  slug: string
  lotNumber: string
  vin: string
  title: string
  make: string
  model: string
  year: number
  odometer: number
  odometerType: string
  retailValue: number
  status: string
  saleDate: string
  location: string
  auction: string
  addedAt: string
  document: string
  primaryDamage: string
  secondaryDamage: string
  hasKeys: boolean
  fuel: string
  transmission: string
  drive: string
  color: string
  bodyType: string
  engine: string
  currentBid: number
  buyNowPrice: number
  condition: string
  popular: boolean
  images: string[]
}

export interface LocalCar {
  id: number
  slug: string
  title: string
  version: string
  make: string
  model: string
  year: number
  vin: string
  bodyType: string
  color: string
  image: string
  images: string[]
  sold: boolean
  price: number
  oldPrice: number
  fuel: string
  mileage: string
  odometer: number
  country: string
  engine: string
  power: number
  transmission: string
  drive: string
  location: string
  features: string[]
  description: string[]
}

export interface CarSection {
  id: string
  type: 'auction' | 'local'
  title: string
  highlight: string
  subtitle: string
  moreLink: string
  items: Lot[] | LocalCar[]
}

export interface Suggestion {
  title: string
  subtitle: string
  to: string
}

export interface LotFilters {
  q: string
  added: string[]
  locations: string[]
  makes: string[]
  models: string[]
  engines: string[]
  fuels: string[]
  colors: string[]
  damages: string[]
  secondaryDamages: string[]
  transmissions: string[]
  cylinders: string[]
  bodies: string[]
  vehicleTypes: string[]
  drives: string[]
  documents: string[]
  saleFrom: string
  saleTo: string
  yearFrom: string
  yearTo: string
  mileageFrom: string
  mileageTo: string
  buyNow: boolean
  runs: boolean
  cleanTitle: boolean
  today: boolean
  tomorrow: boolean
}

export interface CarFilters {
  country: string
  makes: string[]
  models: string[]
  engines: string[]
  transmissions: string[]
  fuels: string[]
  bodies: string[]
  colors: string[]
  drives: string[]
  locations: string[]
  yearFrom: string
  yearTo: string
  mileageFrom: string
  mileageTo: string
  priceFrom: string
  priceTo: string
}
