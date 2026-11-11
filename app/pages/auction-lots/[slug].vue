<template>
  <div v-if="lot">
    <div class="container lot-page">
      <Breadcrumbs :items="breadcrumbs" />

      <div class="lot-page__head">
        <div>
          <h1 class="lot-page__title">{{ lot.title }}</h1>
          <p class="lot-page__meta">
            <span>Lot #{{ lot.lotNumber }}</span>
            <span>Yer: <b>{{ lot.location }}</b></span>
            <span>Hərrac tarixi: {{ formatDate(lot.saleDate) }}</span>
          </p>
        </div>

        <button type="button" class="lot-page__favourite" :class="{ 'is-active': isFavourite }" @click="toggle(favouriteId)">
          <i :class="['bi', isFavourite ? 'bi-heart-fill' : 'bi-heart']" />
          {{ isFavourite ? 'Seçilmişlərdədir' : 'Seçilmişlərə əlavə et' }}
        </button>
      </div>

      <div class="lot-page__top">
        <LotGallery :images="lot.images" :title="lot.title" :status="status" />

        <div class="card lot-page__box">
          <h2 class="lot-page__box-title">
            <i class="bi bi-card-list" />
            Lot #{{ lot.lotNumber }} detalları
          </h2>
          <dl class="lot-page__list">
            <div><dt>VIN:</dt><dd>{{ lot.vin }}</dd></div>
            <div><dt>Yürüş:</dt><dd>{{ formatMiles(lot.odometer, lot.odometerType) }}</dd></div>
            <div><dt>Sənəd:</dt><dd>{{ lot.document }}</dd></div>
            <div><dt>Əsas zədə:</dt><dd>{{ lot.primaryDamage }}</dd></div>
            <div><dt>Əlavə zədə:</dt><dd>{{ lot.secondaryDamage }}</dd></div>
            <div><dt>Ban növü:</dt><dd>{{ lot.bodyType }}</dd></div>
            <div><dt>Rəng:</dt><dd>{{ lot.color }}</dd></div>
            <div><dt>Mühərrik:</dt><dd>{{ lot.engine }}</dd></div>
            <div><dt>Sürət qutusu:</dt><dd>{{ lot.transmission }}</dd></div>
            <div><dt>Ötürücü:</dt><dd>{{ lot.drive }}</dd></div>
            <div><dt>Yanacaq:</dt><dd>{{ lot.fuel }}</dd></div>
            <div><dt>Açarlar:</dt><dd>{{ lot.hasKeys ? 'Var' : 'Yoxdur' }}</dd></div>
            <div><dt>Vəziyyət:</dt><dd>{{ lot.condition }}</dd></div>
          </dl>
        </div>
      </div>

      <div class="lot-page__middle">
        <LotCalculator :lot="lot" />

        <div class="card lot-page__box">
          <h2 class="lot-page__box-title">
            <i class="bi bi-receipt" />
            Satış məlumatı
          </h2>
          <dl class="lot-page__list">
            <div><dt>Hazırkı təklif:</dt><dd>{{ formatUsd(lot.currentBid) }}</dd></div>
            <div>
              <dt class="lot-page__green">İndi al:</dt>
              <dd class="lot-page__green">{{ lot.buyNowPrice ? formatUsd(lot.buyNowPrice) : '—' }}</dd>
            </div>
            <div><dt>Yer:</dt><dd>{{ lot.location }}</dd></div>
            <div><dt>Hərrac tarixi:</dt><dd class="lot-page__blue">{{ formatDate(lot.saleDate) }}</dd></div>
            <div><dt class="lot-page__red">Qalan vaxt:</dt><dd class="lot-page__red">{{ timeLeft }}</dd></div>
            <div><dt>Satış statusu:</dt><dd>{{ status.label }}</dd></div>
            <div><dt>Təx. bazar dəyəri:</dt><dd>{{ formatUsd(lot.retailValue) }}</dd></div>
          </dl>
        </div>
      </div>

      <div class="card lot-page__about">
        <h2 class="lot-page__box-title">
          <i class="bi bi-info-circle" />
          Əlavə məlumat
        </h2>
        <div class="lot-page__about-text">
          <p>
            {{ lot.title }} avtomobili {{ formatDate(lot.saleDate) }} tarixində {{ lot.auction }} hərracına
            çıxarılacaq. Avtomobil hazırda {{ lot.location }} ərazisindədir.
          </p>
          <p>
            Kalkulyatorda təklif etmək istədiyiniz məbləği yazın — hərrac rüsumu, Amerikadan Azərbaycana daşınma və
            gömrük xərcləri ilə birlikdə yekun qiyməti dərhal görəcəksiniz.
          </p>
          <p>
            Hərracda iştirak etmək üçün bizimlə əlaqə saxlayın. Mütəxəssislərimiz bütün mərhələlər üzrə sizə kömək
            edəcək.
          </p>
        </div>
      </div>
    </div>

    <CarSection v-if="similarSection.items.length" :section="similarSection" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { saleStatuses } from '~/data/filters'
import { useFavouritesStore } from '~/stores/favourites'
import { useLotsStore } from '~/stores/lots'
import { formatDate, formatMiles, formatUsd } from '~/utils/format'
import type { CarSection, Lot, SaleStatus } from '~/types'

export default defineComponent({
  name: 'AuctionLotPage',

  setup() {
    const route = useRoute()
    const lot = useLotsStore().lotBySlug(String(route.params.slug))

    if (!lot) {
      throw createError({ statusCode: 404, statusMessage: 'Lot tapılmadı', fatal: true })
    }

    useSeoMeta({
      title: `${lot.title} — Amerikadan gətirmə qiyməti | GLB Logistics`,
      description: `${lot.title}, lot #${lot.lotNumber}. Yürüş, zədə, hərrac tarixi və Azərbaycana qədər yekun qiymət.`,
    })
  },

  data() {
    return {
      timeLeft: '—',
      timer: 0,
    }
  },

  computed: {
    ...mapState(useLotsStore, ['lotBySlug', 'similarLots']),
    ...mapState(useFavouritesStore, ['ids']),

    lot(): Lot | undefined {
      return this.lotBySlug(String(this.$route.params.slug))
    },

    status(): SaleStatus {
      return saleStatuses[this.lot!.status] || saleStatuses.minBid!
    },

    favouriteId(): string {
      return `lot-${this.lot!.id}`
    },

    isFavourite(): boolean {
      return this.ids.includes(this.favouriteId)
    },

    breadcrumbs() {
      const lot = this.lot!
      return [
        { label: 'Əsas səhifə', to: '/' },
        { label: 'Hərrac lotları', to: '/auction-lots' },
        { label: lot.make, to: `/auction-lots?makes=${lot.make}` },
        { label: lot.model, to: `/auction-lots?makes=${lot.make}&models=${lot.model}` },
        { label: lot.title },
      ]
    },

    similarSection(): CarSection {
      return {
        id: 'similar',
        type: 'auction',
        title: 'Oxşar',
        highlight: 'Avtomobillər',
        subtitle: 'Seçdiyiniz avtomobilə uyğun digər lotlar',
        moreLink: `/auction-lots?makes=${this.lot!.make}`,
        items: this.similarLots(this.lot!),
      }
    },
  },

  mounted() {
    this.updateTimeLeft()
    this.timer = window.setInterval(this.updateTimeLeft, 60000)
  },

  beforeUnmount() {
    window.clearInterval(this.timer)
  },

  methods: {
    ...mapActions(useFavouritesStore, ['toggle']),
    formatDate,
    formatMiles,
    formatUsd,

    updateTimeLeft() {
      const end = new Date(this.lot!.saleDate.replace(' ', 'T') + ':00Z').getTime()
      const diff = end - Date.now()

      if (diff <= 0) {
        this.timeLeft = 'Hərrac bitib'
        return
      }

      const minutes = Math.floor(diff / 60000)
      const days = Math.floor(minutes / 1440)
      const hours = Math.floor((minutes % 1440) / 60)
      const mins = minutes % 60
      this.timeLeft = days > 0 ? `${days} gün ${hours} saat` : `${hours} saat ${mins} dəq`
    },
  },
})
</script>

<style lang="scss" scoped>
.lot-page {
  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;

    @include up(md) {
      font-size: 2rem;
    }
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin-top: 6px;
    font-size: 0.875rem;
    color: $text-soft;

    b {
      font-weight: 500;
      color: $accent-text;
    }
  }

  &__favourite {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 42px;
    padding: 0 16px;
    font-size: 0.9375rem;
    font-weight: 500;
    color: $ink;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius;
    transition: border-color $transition, color $transition;

    i {
      color: $danger;
    }

    &:hover,
    &.is-active {
      border-color: $danger;
    }
  }

  &__top,
  &__middle {
    display: grid;
    gap: 20px;
    margin-bottom: 20px;

    @include up(lg) {
      grid-template-columns: 1.4fr 1fr;
      align-items: start;
    }
  }

  &__box-title {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    font-family: $font-body;
    font-size: 1.125rem;
    font-weight: 600;
    border-bottom: 1px solid $line;

    i {
      color: $accent;
    }
  }

  &__list {
    padding: 4px 20px 8px;

    div {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 11px 0;
      font-size: 0.875rem;
      border-bottom: 1px solid $line-soft;

      &:last-child {
        border-bottom: 0;
      }
    }

    dt {
      flex-shrink: 0;
      color: $text-soft;
    }

    dd {
      font-weight: 600;
      color: $ink;
      text-align: right;
      word-break: break-word;
    }
  }

  &__green {
    color: $accent-text !important;
  }

  &__blue {
    color: $logo-blue !important;
  }

  &__red {
    color: $danger !important;
  }

  &__about-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    font-size: 0.9375rem;
    line-height: 1.7;
  }
}
</style>
