# GLB Logistics — Nuxt 4

```bash
npm install
npm run dev
```

## Səhifələr

| Səhifə | Ünvan |
|---|---|
| Ana səhifə | `/` |
| Hərrac lotları (filtr, sıralama, səhifələmə) | `/auction-lots` |
| Lotun daxili səhifəsi (qalereya, kalkulyator) | `/auction-lots/:slug` |
| Satışda olan avtomobillər (Azərbaycan / Çin) | `/search?country=az` |
| Azərbaycandakı avtomobil | `/cars/:slug` |
| Seçilmişlər (giriş tələb edir) | `/favourite` |

Qalan bütün linklər "Bu səhifə hazırlanır" səhifəsinə gedir.

## Nümunə data

- 2 marka: **BMW** (X5, X3, 330I) və **HYUNDAI** (TUCSON, SANTA FE, ELANTRA, IONIQ)
- 21 lot — `app/data/lots.ts`
- Filtr seçimləri — `app/data/filters.ts`

## Store-lar

| Store | Nə edir |
|---|---|
| `lots` | filtrlər, sıralama, səhifələmə, URL ilə sinxron |
| `search` | ana səhifə filtri və header axtarışı |
| `calculator` | lot səhifəsindəki qiymət hesablaması |
| `cars` | Azərbaycandakı avtomobillər |
| `favourites` | seçilmişlər (cookie-də saxlanılır) |
| `home`, `site`, `ui` | ana səhifə, header/footer, menyu |

## Texnologiyalar

Nuxt 4 (Options API), Pinia, SCSS, Swiper 11

## Kalkulyator

- Hərrac rüsumu, ABŞ–Poti daşınması və Poti–Bakı qiyməti — `app/data/calculator.ts`
- Gömrük ödənişləri (rüsum, aksiz, ƏDV, yığımlar, utilizasiya) — `app/utils/customs.ts`
- Gömrük manatla hesablanır, nəticə 1.7 məzənnə ilə dollara çevrilir

## Rənglər

`app/assets/scss/abstracts/_variables.scss` — əsas rəng `#00B8FB`, yumşaq qırmızı `#E57373`
