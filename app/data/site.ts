import type { BottomNavItem, Language, NavItem, NavLink, Notification, SiteInfo, SocialLink } from '~/types'

export const siteInfo: SiteInfo = {
  name: 'GLB Logistics',
  logo: 'images/logo.png',
  logoDark: 'images/logo-dark.png',
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
      { label: 'Aktiv lotlar', to: '/auction-lots' },
      { label: 'Yaxın 10 gündə', to: '/auction-lots?upcoming=1' },
      { label: 'İndi al (Buy Now)', to: '/auction-lots?buyNow=1' },
      { label: 'Hibrid avtomobillər', to: '/auction-lots?fuels=Hibrid' },
    ],
  },
  {
    label: 'Satışda',
    children: [
      { label: 'Azərbaycanda', to: '/search?country=aze' },
      { label: 'Gürcüstanda', to: '/search?country=geo' },
      { label: 'Koreyadan', to: '/korea-cars' },
    ],
  },
  {
    label: 'Kalkulyator',
    children: [
      { label: 'Hərrac kalkulyatoru', to: '/auction-calculator' },
      { label: 'Gömrük kalkulyatoru', to: '/customs-calculator' },
      { label: 'Daşınma kalkulyatoru', to: '/shipping-calculator' },
      { label: 'Avtomobil kataloqu', to: '/catalog' },
    ],
  },
  { label: 'Ehtiyat hissələri', to: '/parts' },
  {
    label: 'Xidmətlər',
    children: [
      { label: 'Bütün xidmətlər', to: '/services' },
      { label: 'Avtomobil izləmə', to: '/tracking' },
      { label: 'Diler ol', to: '/dealers' },
    ],
  },
  {
    label: 'Digər',
    children: [
      { label: 'Haqqımızda', to: '/about' },
      { label: 'Əlaqə', to: '/contact' },
      { label: 'Xəbərlər', to: '/information' },
      { label: 'Risklər barədə', to: '/risks' },
    ],
  },
]

export const footerLinks: NavLink[] = [
  { label: 'Hərrac lotları', to: '/auction-lots' },
  { label: 'Satışda olan avtomobillər', to: '/search?country=aze' },
  { label: 'Koreyadan avtomobillər', to: '/korea-cars' },
  { label: 'Ehtiyat hissələri', to: '/parts' },
  { label: 'Hərrac kalkulyatoru', to: '/auction-calculator' },
  { label: 'Xidmətlər', to: '/services' },
]

export const infoLinks: NavLink[] = [
  { label: 'Haqqımızda', to: '/about' },
  { label: 'Əlaqə', to: '/contact' },
  { label: 'Diler ol', to: '/dealers' },
  { label: 'Risklər barədə xəbərdarlıq', to: '/risks' },
  { label: 'İstifadə şərtləri', to: '/terms' },
  { label: 'Məxfilik siyasəti', to: '/privacy' },
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
  { label: 'Profil', icon: 'bi-person', to: '/profile' },
]

export const notifications: Notification[] = [
  {
    id: 3,
    title: '🚗 Hibrid avtomobillər: 2026-cı ilə qədər alaq, ya gözləyək',
    date: '02.03.2026',
    text: [
      'Hibrid avtomobillərə tələb son iki ildə xeyli artıb. Yanacağa qənaət və aşağı vergi dərəcələri alıcıların əsas səbəbidir.',
      'Hərraclarda hibrid modellərin qiyməti mövsümdən asılı olaraq dəyişir. Alışdan əvvəl kalkulyatorla yekun xərci hesablamağı tövsiyə edirik.',
    ],
  },
  {
    id: 2,
    title: 'Çindən necə yeni avtomobil idxal etmək olar',
    date: '27.02.2026',
    text: [
      'Çindən avtomobil idxalı üçün düzgün satıcı, sənədlər və logistika seçimi vacibdir.',
      'GLB komandası seçimdən gömrük rəsmiləşdirilməsinədək bütün mərhələlərdə dəstək verir.',
    ],
  },
  {
    id: 1,
    title: '🔋 BYD necə Tesla-nı məğlub etdi? Çin elektrik avtomobillərinin yüksəlişi',
    date: '26.02.2026',
    text: [
      'Çin istehsalçıları elektrik avtomobil bazarında sürətlə böyüyür.',
      'Elektrik avtomobillərinin idxalında gömrük güzəştləri xərci əhəmiyyətli dərəcədə azaldır.',
    ],
  },
]