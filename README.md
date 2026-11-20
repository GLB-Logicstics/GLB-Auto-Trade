# GLB Auto Trade — Front

The front-end-only version of the GLB Logistics website: a car import service that buys vehicles at US auctions (Copart, IAAI, Manheim), ships them to Azerbaijan and Georgia, and handles customs. Every page works on static data, with no backend, so the whole design and user flow can be reviewed on its own.

**Live:** https://glb-auto-trade-front.vercel.app

> The full version with an API and an admin panel lives in `GLB-Auto-Trade-Nuxt`, `GLB-Auto-Trade-Backend` and `GLB-Auto-Trade-Admin-Nuxt`.

## Features

- Auction lots with filters, sorting and pagination kept in sync with the URL
- Lot page with a gallery, a full cost calculator and a price-history chart
- Cars for sale in Azerbaijan and Georgia, with city filter and local market price comparison
- Cars from Korea, auto parts and a car catalog
- Auction, customs and shipping calculators
- Customs rules for Azerbaijan (AZN) and Georgia (GEL, 2026 excise rates)
- Services, news, vehicle tracking, dealer (B2B) application
- Sign in, registration, profile and favourites — stored in the browser
- Responsive layout with a mobile bottom navigation

## Tech stack

- [Nuxt 4](https://nuxt.com), Vue 3 Options API
- [Pinia](https://pinia.vuejs.org)
- SCSS
- [Swiper 11](https://swiperjs.com) for sliders
- Bootstrap Icons, Google Fonts (Poppins, Montserrat)

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server |
| `npm run build` | Production build |
| `npm run generate` | Static build into `.output/public` |
| `npm run preview` | Serves the production build locally |

## Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| Auction lots (Copart / IAAI / Manheim, auction type, next 10 days) | `/auction-lots` |
| Lot details (gallery, calculator, price history) | `/auction-lots/:slug` |
| Cars for sale (country, city, market difference) | `/search?country=aze` |
| Car for sale | `/cars/:slug` |
| Cars from Korea | `/korea-cars` |
| Auto parts | `/parts` |
| Car catalog | `/catalog` |
| Auction / customs / shipping calculators | `/auction-calculator`, `/customs-calculator`, `/shipping-calculator` |
| Services | `/services`, `/services/:slug` |
| Vehicle tracking | `/tracking` |
| News | `/information`, `/information/:id` |
| Become a dealer | `/dealers` |
| About, Contact, Risks, Terms, Privacy | `/about`, `/contact`, `/risks`, `/terms`, `/privacy` |
| Sign in, Register, Profile | `/login`, `/register`, `/profile` |
| Favourites (sign-in required) | `/favourite` |

Links to pages that are not built yet (for example `/auction-history`) open a "Coming soon" page.

## Project structure

```
app/
  pages/          one file per route
  components/     calculator, cards, cars, home, layout, lots, ui
  stores/         Pinia stores
  data/           static data for every page
  utils/          customs and cost calculations, formatting
  plugins/        $asset helper for files in public/
  assets/scss/    styles
public/           favicon and images
```

## Stores

| Store | Responsibility |
| --- | --- |
| `lots` | Auction filters, sorting, pagination, URL sync |
| `cars` | Cars for sale (country, city) |
| `korea`, `parts`, `catalog` | Korea cars, auto parts, catalog |
| `calculator` | Calculator on the lot page |
| `search` | Home page filter and header search |
| `auth`, `favourites`, `requests` | Sign in, favourites, requests |
| `home`, `site`, `content`, `ui` | Home page, menus, services and info pages |

## Calculations

| What | Where |
| --- | --- |
| Auction fees, US → Poti and Poti → Baku prices, extra costs | `app/data/calculator.ts` |
| Azerbaijan customs (AZN, 1 USD = 1.7) | `app/utils/customs.ts` |
| Georgia customs (GEL, 1 USD = 2.7, 2026 excise rates) | `app/utils/customsGe.ts` |
| Total estimate | `app/utils/estimate.ts` |

## Data

All data is static and lives in `app/data/*`. There is no backend: sign-in, requests and favourites are kept in the browser.

## Deployment

The project is deployed on [Vercel](https://vercel.com). Every push to `main` creates a production deployment; every other branch gets a preview URL. No environment variables are needed.
