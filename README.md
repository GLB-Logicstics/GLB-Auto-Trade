# GLB Logistics — Nuxt 4

```bash
npm install
npm run dev
```

## Səhifələr

| Səhifə | Ünvan |
|---|---|
| Ana səhifə | `/` |
| Hərrac lotları (Copart / IAAI / Manheim, auksion növü, yaxın 10 gün) | `/auction-lots` |
| Lotun daxili səhifəsi (qalereya, kalkulyator, qiymət qrafiki) | `/auction-lots/:slug` |
| Satışda olan avtomobillər (ölkə, şəhər, bazar fərqi) | `/search?country=aze` |
| Satışda olan avtomobil | `/cars/:slug` |
| Koreyadan avtomobillər | `/korea-cars` |
| Ehtiyat hissələri | `/parts` |
| Avtomobil kataloqu | `/catalog` |
| Hərrac / gömrük / daşınma kalkulyatoru | `/auction-calculator`, `/customs-calculator`, `/shipping-calculator` |
| Xidmətlər | `/services`, `/services/:slug` |
| Avtomobil izləmə | `/tracking` |
| Xəbərlər | `/information`, `/information/:id` |
| Diler ol (B2B müraciət) | `/dealers` |
| Haqqımızda, Əlaqə, Risklər, Şərtlər, Məxfilik | `/about`, `/contact`, `/risks`, `/terms`, `/privacy` |
| Daxil ol, Qeydiyyat, Profil | `/login`, `/register`, `/profile` |
| Seçilmişlər (giriş tələb edir) | `/favourite` |

Qalan linklər (məs. `/auction-history`) "Bu səhifə hazırlanır" səhifəsinə gedir.

## Data

Bütün data statikdir — `app/data/*`. Backend yoxdur: giriş, müraciətlər və seçilmişlər brauzerdə saxlanılır.

## Store-lar

| Store | Nə edir |
|---|---|
| `lots` | hərrac filtrləri, sıralama, səhifələmə, URL ilə sinxron |
| `cars` | satışda olan avtomobillər (ölkə, şəhər) |
| `korea`, `parts`, `catalog` | Koreya, ehtiyat hissələri, kataloq |
| `calculator` | lot səhifəsindəki kalkulyator |
| `search` | ana səhifə filtri və header axtarışı |
| `auth`, `favourites`, `requests` | giriş, seçilmişlər, müraciətlər |
| `home`, `site`, `content`, `ui` | ana səhifə, menyu, xidmətlər və info səhifələri |

## Kalkulyator

- Hərrac rüsumu, ABŞ–Poti və Poti–Bakı qiymətləri, əlavə xərclər — `app/data/calculator.ts`
- Azərbaycan gömrüyü — `app/utils/customs.ts` (AZN, 1 USD = 1.7)
- Gürcüstan gömrüyü — `app/utils/customsGe.ts` (GEL, 1 USD = 2.7, 2026 aksiz dərəcələri)
- Ümumi hesablama — `app/utils/estimate.ts`

## Şəkillər

`public` qovluğundakı şəkillər `$asset('images/...')` ilə verilir — GitHub Pages-də `/GLB-Auto-Trade/` bazası ilə düzgün işləyir.

## Texnologiyalar

Nuxt 4 (Options API), Pinia, SCSS, Swiper 11
