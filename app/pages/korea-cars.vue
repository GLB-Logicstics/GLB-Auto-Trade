<template>
  <div class="container">
    <PageHeader
      title="Koreyadan gətirilən avtomobillər"
      subtitle="Koreyadakı qiymət, çatdırılma və seçdiyiniz ölkəyə düşən yekun qiymət bir kartda."
      :crumbs="[{ label: 'Koreyadan avtomobillər' }]"
    />

    <div class="card korea-page__toolbar">
      <div class="korea-page__switch">
        <button
          v-for="item in countries"
          :key="item.value"
          type="button"
          :class="{ 'is-active': country === item.value }"
          @click="country = item.value"
        >
          {{ item.label }}
        </button>
      </div>

      <BaseSelect :model-value="make" :options="makeOptions" placeholder="Marka" @update:model-value="setMake" />
      <BaseSelect v-model="model" :options="modelOptions" :disabled="!make" placeholder="Model" />
    </div>

    <div v-if="filteredCars.length" class="card-grid">
      <KoreaCarCard v-for="car in filteredCars" :key="car.id" :car="car" />
    </div>

    <div v-else class="card empty-state">
      <i class="bi bi-search" />
      <h2>Nəticə tapılmadı</h2>
      <p>Seçdiyiniz marka və modelə uyğun avtomobil yoxdur.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { countries } from '~/data/calculator'
import { useKoreaStore } from '~/stores/korea'

export default defineComponent({
  name: 'KoreaCarsPage',

  setup() {
    useSeoMeta({
      title: 'Koreyadan avtomobillər — GLB Logistics',
      description:
        'Koreyadan Azərbaycana və Gürcüstana avtomobil gətirilməsi: qiymət, çatdırılma və gömrük daxil yekun məbləğ.',
    })
  },

  data() {
    return { countries }
  },

  computed: {
    ...mapState(useKoreaStore, ['makeOptions', 'modelOptions', 'filteredCars']),
    ...mapWritableState(useKoreaStore, ['country', 'make', 'model']),
  },

  created() {
    this.applyQuery(this.$route.query)
  },

  methods: {
    ...mapActions(useKoreaStore, ['applyQuery', 'setMake']),
  },
})
</script>

<style lang="scss" scoped>
.korea-page {
  &__toolbar {
    display: grid;
    gap: 12px;
    padding: 16px;
    margin-bottom: 20px;

    @include up(md) {
      grid-template-columns: 1.2fr 1fr 1fr;
      align-items: center;
    }
  }

  &__switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 4px;
    background-color: $page-bg;
    border-radius: $radius;

    button {
      height: 38px;
      font-size: 0.875rem;
      font-weight: 500;
      color: $text-soft;
      border-radius: $radius-sm;

      &.is-active {
        color: $white;
        background-color: $accent;
      }
    }
  }
}
</style>
