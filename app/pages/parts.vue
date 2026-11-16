<template>
  <div class="container">
    <PageHeader
      title="Ehtiyat hissələri"
      subtitle="Marka, model, il və hissə növünə görə axtarın. Tapmadığınız hissəni ABŞ-dan gətiririk."
      :crumbs="[{ label: 'Ehtiyat hissələri' }]"
    />

    <div class="card parts-page__search">
      <input v-model="text" type="search" class="form-input parts-page__text" placeholder="Hissənin adı (məs. fara)">
      <BaseSelect
        :model-value="make"
        :options="makeOptions"
        placeholder="Marka"
        searchable
        @update:model-value="setMake"
      />
      <BaseSelect v-model="model" :options="modelOptions" :disabled="!make" placeholder="Model" />
      <BaseSelect v-model="year" :options="years" placeholder="İl" />
      <BaseSelect v-model="type" :options="typeOptions" placeholder="Hissə növü" />
      <button type="button" class="btn btn--outline" @click="reset">Təmizlə</button>
    </div>

    <div class="parts-page__types">
      <button
        v-for="item in types"
        :key="item.value"
        type="button"
        class="parts-page__type"
        :class="{ 'is-active': type === item.value }"
        @click="type = type === item.value ? '' : item.value"
      >
        <i :class="['bi', item.icon]" />
        {{ item.label }}
      </button>
    </div>

    <p class="parts-page__count">{{ filteredParts.length }} hissə tapıldı</p>

    <div v-if="filteredParts.length" class="card-grid">
      <PartCard v-for="part in filteredParts" :key="part.id" :part="part" />
    </div>

    <div v-else class="card empty-state">
      <i class="bi bi-search" />
      <h2>Hissə tapılmadı</h2>
      <p>Aşağıdakı formu doldurun — hissəni ABŞ-dan tapıb gətirək.</p>
    </div>

    <RequestForm
      class="parts-page__request"
      title="Hissəni tapmadınız? Sorğu göndərin"
      subject="Ehtiyat hissəsi sorğusu"
      placeholder="Marka, model, il və lazım olan hissə"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { years } from '~/data/filters'
import { usePartsStore } from '~/stores/parts'

export default defineComponent({
  name: 'PartsPage',

  setup() {
    useSeoMeta({
      title: 'Ehtiyat hissələri — GLB Logistics',
      description: 'Avtomobil ehtiyat hissələrinin axtarışı və ABŞ-dan sifarişi: marka, model, il və hissə növü üzrə.',
    })
  },

  data() {
    return { years }
  },

  computed: {
    ...mapState(usePartsStore, ['types', 'makeOptions', 'modelOptions', 'typeOptions', 'filteredParts']),
    ...mapWritableState(usePartsStore, ['text', 'make', 'model', 'year', 'type']),
  },

  created() {
    this.applyQuery(this.$route.query)
  },

  methods: {
    ...mapActions(usePartsStore, ['applyQuery', 'setMake', 'reset']),
  },
})
</script>

<style lang="scss" scoped>
.parts-page {
  &__search {
    display: grid;
    gap: 12px;
    padding: 16px;

    @include up(sm) {
      grid-template-columns: 1fr 1fr;
    }

    @include up(lg) {
      grid-template-columns: 1.4fr repeat(4, 1fr) auto;
    }
  }

  &__text {
    @include up(sm) {
      grid-column: 1 / -1;
    }

    @include up(lg) {
      grid-column: auto;
    }
  }

  &__types {
    display: flex;
    gap: 8px;
    padding: 16px 0;
    overflow-x: auto;
  }

  &__type {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding: 0 14px;
    font-size: 0.875rem;
    color: $ink;
    background-color: $white;
    border: 1px solid $line;
    border-radius: 20px;

    i {
      color: $accent;
    }

    &.is-active {
      color: $white;
      background-color: $accent;
      border-color: $accent;

      i {
        color: $white;
      }
    }
  }

  &__count {
    margin-bottom: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    color: $ink;
  }

  &__request {
    margin-top: 28px;
  }
}
</style>
