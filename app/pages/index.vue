<template>
  <div>
    <HeroSlider />
    <SearchFilter />
    <BrandSlider />
    <CarSection v-for="section in sections" :key="section.id" :section="section" />
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
        'Copart və IAAI hərraclarından avtomobil sifarişi, ABŞ-dan Azərbaycana daşınma və gömrük xərclərinin hesablanması.',
    })
  },

  computed: {
    ...mapState(useHomeStore, ['sections']),
  },
})
</script>
