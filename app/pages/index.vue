<template>
  <div>
    <HeroSlider />
    <SearchFilter />
    <BrandSlider />
    <template v-for="section in topSections" :key="section.id">
      <CarSection v-if="section.items.length" :section="section" />
    </template>
    <LocalCarsSection />
    <template v-for="section in bottomSections" :key="section.id">
      <CarSection v-if="section.items.length" :section="section" />
    </template>
    <HomeTools />
    <HomeServices />
    <HomeCta />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useHomeStore } from '~/stores/home'

export default defineComponent({
  name: 'HomePage',

  setup() {
    useSeoMeta({
      title: 'GLB Logistics — Amerikadan avtomobil sifarişi və daşınması',
      description:
        'Copart, IAAI və Manheim hərraclarından avtomobil sifarişi, Azərbaycana və Gürcüstana daşınma, gömrük xərclərinin hesablanması.',
    })
  },

  computed: {
    ...mapState(useHomeStore, ['topSections', 'bottomSections']),
  },
})
</script>
