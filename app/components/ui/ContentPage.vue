<template>
  <div v-if="page" class="container content-page">
    <PageHeader :title="page.title" :subtitle="page.subtitle" :crumbs="[{ label: page.title }]" />

    <div class="content-page__layout">
      <div class="card content-page__body">
        <section v-for="section in page.sections" :key="section.title" class="content-page__section">
          <h2>{{ section.title }}</h2>
          <p v-for="(text, index) in section.text" :key="index">{{ text }}</p>
        </section>
      </div>

      <aside class="card content-page__aside">
        <h2 class="panel__title">
          <i class="bi bi-headset" />
          Sualınız var?
        </h2>
        <div class="panel__body">
          <p>Mütəxəssislərimiz iş saatlarında sizə kömək etməyə hazırdır.</p>
          <a :href="phoneHref" class="btn btn--accent btn--sm">
            <i class="bi bi-telephone" />
            {{ contact.phoneDisplay }}
          </a>
          <a :href="contact.whatsapp" class="btn btn--whatsapp btn--sm" target="_blank" rel="noopener">
            <i class="bi bi-whatsapp" />
            WhatsApp
          </a>
          <NuxtLink to="/contact" class="link-arrow">
            Əlaqə səhifəsi
            <i class="bi bi-arrow-right" />
          </NuxtLink>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useContentStore } from '~/stores/content'
import { useSiteStore } from '~/stores/site'
import type { InfoPage } from '~/types'

export default defineComponent({
  name: 'ContentPage',

  props: {
    slug: { type: String, required: true },
  },

  setup(props) {
    const page = useContentStore().pageBySlug(props.slug)
    useSeoMeta({
      title: `${page ? page.title : 'Səhifə'} — GLB Logistics`,
      description: page ? page.subtitle : '',
    })
  },

  computed: {
    ...mapState(useContentStore, ['pageBySlug']),
    ...mapState(useSiteStore, ['contact', 'phoneHref']),

    page(): InfoPage | undefined {
      return this.pageBySlug(this.slug)
    },
  },
})
</script>

<style lang="scss" scoped>
.content-page {
  &__layout {
    display: grid;
    gap: 20px;
    align-items: start;

    @include up(lg) {
      grid-template-columns: 1fr 320px;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 28px;
    padding: 24px;

    @include up(md) {
      padding: 32px;
    }
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h2 {
      font-size: 1.25rem;
    }

    p {
      line-height: 1.7;
    }
  }

  &__aside p {
    font-size: 0.875rem;
    color: $text-soft;
  }
}
</style>
