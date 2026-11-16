<template>
  <div class="container">
    <PageHeader
      title="Əlaqə"
      subtitle="Suallarınız üçün zəng edin, WhatsApp-a yazın və ya formu doldurun."
      :crumbs="[{ label: 'Əlaqə' }]"
    />

    <div class="contact-page__cards">
      <a :href="phoneHref" class="card contact-page__card">
        <i class="bi bi-telephone" />
        <span>Telefon</span>
        <strong>{{ contact.phoneDisplay }}</strong>
      </a>
      <a :href="contact.whatsapp" class="card contact-page__card" target="_blank" rel="noopener">
        <i class="bi bi-whatsapp" />
        <span>WhatsApp</span>
        <strong>Bizə yazın</strong>
      </a>
      <a :href="emailHref" class="card contact-page__card">
        <i class="bi bi-envelope" />
        <span>E-poçt</span>
        <strong>{{ contact.email }}</strong>
      </a>
      <div class="card contact-page__card">
        <i class="bi bi-clock" />
        <span>İş saatları</span>
        <strong>{{ contact.workingHours }}</strong>
      </div>
    </div>

    <div class="two-col">
      <RequestForm />

      <div class="card contact-page__map">
        <h2 class="panel__title">
          <i class="bi bi-geo-alt" />
          {{ contact.address }}
        </h2>
        <iframe :src="mapUrl" title="Xəritə" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'

export default defineComponent({
  name: 'ContactPage',

  setup() {
    useSeoMeta({
      title: 'Əlaqə — GLB Logistics',
      description: 'GLB Logistics ilə əlaqə: telefon, WhatsApp, e-poçt, ünvan və müraciət forması.',
    })
  },

  computed: {
    ...mapState(useSiteStore, ['contact', 'phoneHref', 'emailHref']),

    mapUrl(): string {
      return `https://maps.google.com/maps?q=${encodeURIComponent(this.contact.address)}&z=15&output=embed`
    },
  },
})
</script>

<style lang="scss" scoped>
.contact-page {
  &__cards {
    display: grid;
    gap: 16px;
    margin-bottom: 20px;

    @include up(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include up(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px;
    transition: border-color $transition;

    &:hover {
      border-color: $accent;
    }

    i {
      margin-bottom: 6px;
      font-size: 24px;
      color: $accent;
    }

    span {
      font-size: 0.8125rem;
      color: $text-soft;
    }

    strong {
      font-size: 0.9375rem;
      color: $ink;
      word-break: break-word;
    }
  }

  &__map {
    overflow: hidden;

    iframe {
      display: block;
      width: 100%;
      height: 360px;
      border: 0;
    }
  }
}
</style>
