<template>
  <div v-if="service" class="container">
    <PageHeader
      :title="service.title"
      :subtitle="service.short"
      :crumbs="[{ label: 'Xidmətlər', to: '/services' }, { label: service.title }]"
    />

    <div class="two-col">
      <div class="service-page__main">
        <div class="card service-page__media">
          <i :class="['bi', service.icon]" />
          <span>Foto və video tezliklə əlavə olunacaq</span>
        </div>

        <div class="card">
          <h2 class="panel__title">
            <i class="bi bi-info-circle" />
            Xidmət haqqında
          </h2>
          <div class="panel__body">
            <p v-for="(text, index) in service.description" :key="index">{{ text }}</p>
          </div>
        </div>

        <div class="card">
          <h2 class="panel__title">
            <i class="bi bi-list-ol" />
            Necə işləyir
          </h2>
          <ol class="service-page__steps">
            <li v-for="(step, index) in service.steps" :key="step">
              <span>{{ index + 1 }}</span>
              {{ step }}
            </li>
          </ol>
        </div>
      </div>

      <RequestForm :subject="service.title" title="Bu xidmət üçün müraciət" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useContentStore } from '~/stores/content'
import type { Service } from '~/types'

export default defineComponent({
  name: 'ServicePage',

  setup() {
    const route = useRoute()
    const service = useContentStore().serviceBySlug(String(route.params.slug))

    if (!service) {
      throw createError({ statusCode: 404, statusMessage: 'Xidmət tapılmadı', fatal: true })
    }

    useSeoMeta({ title: `${service.title} — GLB Logistics`, description: service.short })
  },

  computed: {
    ...mapState(useContentStore, ['serviceBySlug']),

    service(): Service | undefined {
      return this.serviceBySlug(String(this.$route.params.slug))
    },
  },
})
</script>

<style lang="scss" scoped>
.service-page {
  &__main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__media {
    @include flex-center;
    flex-direction: column;
    gap: 12px;
    min-height: 220px;
    color: $accent-text;
    background: linear-gradient(135deg, $accent-soft, $white);

    i {
      font-size: 56px;
      color: $accent;
    }

    span {
      font-size: 0.875rem;
      color: $text-soft;
    }
  }

  &__steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;

    li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 500;
      color: $ink;
    }

    span {
      @include flex-center;
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      font-size: 0.875rem;
      color: $white;
      background-color: $accent;
      border-radius: 50%;
    }
  }
}
</style>
