import type { InfoPage, Service, TrackingStep } from '~/types'

export const services: Service[] = [
  {
    slug: 'auction-import',
    title: 'Avtomobil auksionu və gətirilməsi',
    icon: 'bi-hammer',
    short: 'Copart, IAAI və Manheim hərraclarında sizin adınıza təklif verir, avtomobili alırıq.',
    description: [
      'Seçdiyiniz avtomobili hərracdan əvvəl yoxlayır, tarixçəsini və zədələrini analiz edirik.',
      'Büdcənizə uyğun maksimum təklifi birlikdə müəyyən edir, hərracda sizin adınıza iştirak edirik.',
      'Alışdan sonra ödəniş, sənədləşmə və daşınma prosesini tam idarə edirik.',
    ],
    steps: ['Avtomobil seçimi', 'Xərclərin hesablanması', 'Hərracda təklif', 'Ödəniş və sənədlər', 'Daşınma və təhvil'],
  },
  {
    slug: 'shipping',
    title: 'Avtomobilin daşınması',
    icon: 'bi-truck',
    short: 'ABŞ və Koreyadan Poti limanına, oradan Bakıya sığortalı daşınma.',
    description: [
      'Hərrac meydançasından limana yerüstü daşınma, konteynerə yükləmə və dəniz daşınmasını təşkil edirik.',
      'Poti limanından Bakıya və ya Gürcüstan daxilində istənilən ünvana çatdırırıq.',
      'Hər mərhələdə avtomobilin harada olduğunu izləmə səhifəsində görə bilərsiniz.',
    ],
    steps: ['Meydançadan götürmə', 'Konteynerə yükləmə', 'Dəniz daşınması', 'Poti limanı', 'Bakıya çatdırılma'],
  },
  {
    slug: 'dismantling',
    title: 'Avtomobilin sökülməsi',
    icon: 'bi-wrench-adjustable',
    short: 'Bərpası sərfəli olmayan avtomobillərin sökülməsi və hissələrin satışı.',
    description: [
      'Ağır zədəli avtomobilləri hissələrə ayırır, işlək hissələri yoxlayıb kataloqa əlavə edirik.',
      'Hissələr ehtiyat hissələri bölməsində satışa çıxarılır.',
    ],
    steps: ['Qiymətləndirmə', 'Sökülmə', 'Hissələrin yoxlanması', 'Kataloqa əlavə'],
  },
  {
    slug: 'parts-import',
    title: 'ABŞ-dan ehtiyat hissələrinin gətirilməsi',
    icon: 'bi-box-seam',
    short: 'Lazım olan orijinal və ya işlənmiş hissəni ABŞ-da tapıb gətiririk.',
    description: [
      'VIN kod və ya hissə nömrəsi ilə ABŞ bazarında ən uyğun təklifi tapırıq.',
      'Hissəni yoxlayır, qablaşdırır və digər yüklərlə birgə sərfəli şəkildə gətiririk.',
    ],
    steps: ['Sorğu', 'Axtarış və qiymət', 'Ödəniş', 'Çatdırılma'],
  },
]

export const infoPages: InfoPage[] = [
  {
    slug: 'about',
    title: 'Haqqımızda',
    subtitle: 'GLB Logistics — hərracdan qapınıza qədər bir komanda.',
    sections: [
      {
        title: 'Biz kimik',
        text: [
          'GLB Logistics ABŞ və Koreyadan avtomobil alışı, daşınması və gömrük rəsmiləşdirilməsi ilə məşğul olur.',
          'Məqsədimiz avtomobil idxalını şəffaf, sürətli və hər kəs üçün başa düşülən etməkdir.',
        ],
      },
      {
        title: 'Nə edirik',
        text: [
          'Copart, IAAI və Manheim hərraclarından avtomobil seçimi və alışı.',
          'Azərbaycana və Gürcüstana daşınma, gömrük və sənədləşmə.',
          'Ehtiyat hissələrinin tapılması və gətirilməsi, dilerlər üçün B2B xidmətlər.',
        ],
      },
      {
        title: 'Niyə biz',
        text: [
          'Bütün xərcləri əvvəlcədən kalkulyatorda görürsünüz — gizli ödəniş yoxdur.',
          'Hər mərhələdə şəxsi menecer və izləmə imkanı təqdim edirik.',
        ],
      },
    ],
  },
  {
    slug: 'risks',
    title: 'Risklər barədə xəbərdarlıq',
    subtitle: 'Hərracdan avtomobil alışında nəzərə alınmalı məqamlar.',
    sections: [
      {
        title: 'Avtomobilin vəziyyəti',
        text: [
          'Hərrac avtomobilləri adətən "olduğu kimi" satılır. Fotolarda görünməyən gizli zədələr ola bilər.',
          'Zədə növü və "İşləyir və sürülür" statusu satıcının məlumatıdır və tam zəmanət deyil.',
        ],
      },
      {
        title: 'Qiymətlər',
        text: [
          'Kalkulyatordakı nəticələr təxminidir. Daşınma tarifləri, gömrük dərəcələri və məzənnə dəyişə bilər.',
          'Hərrac rüsumları auksion şirkətinin qaydalarına görə dəyişə bilər.',
        ],
      },
      {
        title: 'Hərracda iştirak',
        text: [
          'Sayt hazırda avtomobilləri göstərmək və qiyməti hesablamaq üçündür. Real təklif yalnız menecerlə razılaşmadan sonra verilir.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'İstifadə şərtləri',
    subtitle: 'Saytdan istifadə qaydaları.',
    sections: [
      {
        title: 'Ümumi müddəalar',
        text: [
          'Saytdan istifadə etməklə bu şərtlərlə razılaşmış olursunuz.',
          'Saytdakı məlumatlar informativ xarakter daşıyır və ictimai təklif deyil.',
        ],
      },
      {
        title: 'Məsuliyyət',
        text: [
          'Hərrac məlumatları mənbələrdən alınır. Məlumatların düzgünlüyünə görə yekun məsuliyyəti mənbə daşıyır.',
          'Müqavilə bağlanmadan heç bir öhdəlik yaranmır.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: 'Məxfilik siyasəti',
    subtitle: 'Şəxsi məlumatlarınızı necə qoruyuruq.',
    sections: [
      {
        title: 'Hansı məlumatları toplayırıq',
        text: ['Müraciət formalarında yazdığınız ad, telefon və e-poçt ünvanı.', 'Seçilmişlər siyahısı brauzerinizdə saxlanılır.'],
      },
      {
        title: 'Məlumatlardan istifadə',
        text: [
          'Məlumatlar yalnız müraciətinizə cavab vermək üçün istifadə olunur və üçüncü şəxslərə ötürülmür.',
          'Məlumatlarınızın silinməsi üçün info@glblogs.az ünvanına yazın.',
        ],
      },
    ],
  },
]

export const trackingSample: { code: string; title: string; steps: TrackingStep[] } = {
  code: '5UXJU4C05M9F12366',
  title: '2021 BMW X5',
  steps: [
    { title: 'Hərracda alındı', date: '02.11.2026', done: true },
    { title: 'Meydançadan götürüldü', date: '05.11.2026', done: true },
    { title: 'Konteynerə yükləndi', date: '09.11.2026', done: true },
    { title: 'Dəniz yolunda', date: '12.11.2026', done: false },
    { title: 'Poti limanı', date: 'Gözlənilir', done: false },
    { title: 'Bakıya çatdırıldı', date: 'Gözlənilir', done: false },
  ],
}