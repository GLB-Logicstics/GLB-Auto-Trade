<template>
  <div class="container">
    <PageHeader
      title="Xidmətlərimiz"
      subtitle="Hərracdan alışdan ehtiyat hissələrinə qədər — avtomobillə bağlı bütün işləri bir yerdən həll edin."
      :crumbs="[{ label: 'Xidmətlər' }]"
    />

    <div class="services-page__grid">
      <ServiceCard v-for="service in services" :key="service.slug" :service="service" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useContentStore } from '~/stores/content'

export default defineComponent({
  name: 'ServicesPage',

  setup() {
    useSeoMeta({
      title: 'Xidmətlər — GLB Logistics',
      description: 'Avtomobil auksionu və gətirilməsi, daşınma, sökülmə və ABŞ-dan ehtiyat hissələrinin gətirilməsi.',
    })
  },

  computed: {
    ...mapState(useContentStore, ['services']),
  },
})
</script>

<style lang="scss" scoped>
.services-page__grid {
  display: grid;
  gap: 20px;

  @include up(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include up(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
