<template>
  <section class="section">
    <div class="container">
      <SectionHeading
        title="Bizim"
        highlight="xidmətlər"
        subtitle="Hərracdan qapınıza qədər bütün mərhələlər bir yerdə"
      />

      <div class="home-services">
        <ServiceCard v-for="service in services" :key="service.slug" :service="service" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useContentStore } from '~/stores/content'

export default defineComponent({
  name: 'HomeServices',

  computed: {
    ...mapState(useContentStore, ['services']),
  },
})
</script>

<style lang="scss" scoped>
.home-services {
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
