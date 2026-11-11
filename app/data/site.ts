import type { BottomNavItem, Language, NavItem, NavLink, Notification, SiteInfo, SocialLink } from '~/types'

export const siteInfo: SiteInfo = {
  name: 'GLB Logistics',
  logo: '/images/logo.png',
  logoDark: '/images/logo-dark.png',
  about:
    'GLB Logistics ABŞ hərraclarından avtomobillərin alışı, daşınması və gömrük rəsmiləşdirilməsini bir yerdən idarə edir. Sürətli, etibarlı və əlavə ödənişsiz xidmətlə avtomobilinizi açarı təhvil şəklində Azərbaycanda alın.',
  contact: {
    phone: '+994773084838',
    phoneDisplay: '+994 (77) 308 48 38',
    whatsapp: 'https://wa.me/994773084838',
    email: 'info@glblogs.az',
    address: 'Aşıq Molla Cümə 42b, Bakı, Azərbaycan',
    workingHours: 'B.e.–Cümə, 09:00–18:00',
  },
}

export const socialLinks: SocialLink[] = [
  { name: 'instagram', label: 'Instagram', icon: 'bi-instagram', href: '#' },
  { name: 'facebook', label: 'Facebook', icon: 'bi-facebook', href: '#' },
  { name: 'youtube', label: 'YouTube', icon: 'bi-youtube', href: '#' },
  { name: 'whatsapp', label: 'WhatsApp', icon: 'bi-whatsapp', href: 'https://wa.me/994773084838' },
]

export const mainNav: NavItem[] = [
  { label: 'Əsas səhifə', to: '/' },
  {
    label: 'Auksion',
    children: [
      { label: 'Aktiv Lotlar', to: '/auction-lots' },
      { label: 'Auksion Tarixçəsi', to: '/auction-history' },
      { label: 'Kalkulyator', to: '/auction-calculator' },
      { label: 'Gömrük Kalkulyatoru', to: '/customs-calculator' },
    ],
  },
  {
    label: 'Çatdırılma',
    children: [
      { label: 'Daşınma Kalkulyatoru', to: '/shipping-calculator' },
      { label: 'İzləmə', to: '/tracking' },
    ],
  },
  { label: 'Hibrid Avtomobillər', to: '/auction-lots?fuels=Hibrid' },
  {
    label: 'Avtomobil İdxalı',
    children: [
      { label: 'ABŞ', to: '/search?country=usa' },
      { label: 'Azərbaycan', to: '/search?country=aze' },
      { label: 'Çin', to: '/search?country=china' },
    ],
  },
  {
    label: 'Digər',
    children: [
      { label: 'Əlaqə', to: '/contact' },
      { label: 'Xəbərlər', to: '/information' },
    ],
  },
]

export const footerLinks: NavLink[] = [
  { label: 'Əsas Səhifə', to: '/' },
  { label: 'Auksion', to: '/auction-lots' },
  { label: 'Çatdırılma', to: '/shipping-calculator' },
  { label: 'Hibrid Avtomobillər', to: '/auction-lots?fuels=Hibrid' },
  { label: 'Avtomobil İdxalı', to: '/search?country=az' },
]

export const languages: Language[] = [
  { code: 'az', label: 'AZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

export const bottomNav: BottomNavItem[] = [
  { label: 'Əsas Səhifə', icon: 'bi-house', to: '/' },
  { label: 'Kalkulyator', icon: 'bi-calculator', to: '/auction-calculator' },
  { label: 'Axtarış', icon: 'bi-search', action: 'search' },
  { label: 'Xəbərlər', icon: 'bi-bell', to: '/information' },
  { label: 'Profil', icon: 'bi-person', to: '/login' },
]

export const notifications: Notification[] = [
  { id: 3, title: '🚗 Hibrid avtomobillər: 2026-cı ilə qədər alaq, ya gözləyək', date: '02.03.2026' },
  { id: 2, title: 'Çindən necə yeni avtomobil idxal etmək olar', date: '27.02.2026' },
  { id: 1, title: '🔋 BYD necə Tesla-nı məğlub etdi? Çin elektrik avtomobillərinin yüksəlişi', date: '26.02.2026' },
]
