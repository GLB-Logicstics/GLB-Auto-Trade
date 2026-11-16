<template>
  <div class="container">
    <PageHeader
      title="Avtomobil izləmə"
      subtitle="VIN kodu və ya lot nömrəsi ilə avtomobilinizin harada olduğunu öyrənin."
      :crumbs="[{ label: 'İzləmə' }]"
    />

    <form class="card tracking-page__form" @submit.prevent="search">
      <input v-model.trim="code" type="text" class="form-input" placeholder="VIN və ya lot nömrəsi">
      <button type="submit" class="btn btn--accent">
        <i class="bi bi-search" />
        Yoxla
      </button>
    </form>

    <p class="tracking-page__hint">
      Nümunə üçün yoxlayın:
      <button type="button" @click="trySample">{{ trackingSample.code }}</button>
    </p>

    <div v-if="searched && found" class="card">
      <h2 class="panel__title">
        <i class="bi bi-geo" />
        {{ trackingSample.title }} — {{ trackingSample.code }}
      </h2>
      <ol class="tracking-page__steps">
        <li v-for="step in trackingSample.steps" :key="step.title" :class="{ 'is-done': step.done }">
          <span class="tracking-page__dot"><i :class="['bi', step.done ? 'bi-check-lg' : 'bi-clock']" /></span>
          <div>
            <strong>{{ step.title }}</strong>
            <small>{{ step.date }}</small>
          </div>
        </li>
      </ol>
    </div>

    <div v-else-if="searched" class="card empty-state">
      <i class="bi bi-question-circle" />
      <h2>Məlumat tapılmadı</h2>
      <p>Kodu yoxlayın və ya menecerinizlə əlaqə saxlayın.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useContentStore } from '~/stores/content'

export default defineComponent({
  name: 'TrackingPage',

  setup() {
    useSeoMeta({ title: 'Avtomobil izləmə — GLB Logistics', description: 'VIN və ya lot nömrəsi ilə daşınma statusu.' })
  },

  data() {
    return {
      code: '',
      searched: false,
    }
  },

  computed: {
    ...mapState(useContentStore, ['trackingSample']),

    found(): boolean {
      return this.code.toUpperCase() === this.trackingSample.code || this.code === '72166236'
    },
  },

  methods: {
    search() {
      this.searched = !!this.code
    },

    trySample() {
      this.code = this.trackingSample.code
      this.searched = true
    },
  },
})
</script>

<style lang="scss" scoped>
.tracking-page {
  &__form {
    display: flex;
    gap: 10px;
    padding: 16px;

    .btn {
      flex-shrink: 0;
      height: 44px;
    }
  }

  &__hint {
    margin: 12px 0 20px;
    font-size: 0.875rem;
    color: $text-soft;

    button {
      font-weight: 500;
      color: $accent-text;
      text-decoration: underline;
    }
  }

  &__steps {
    display: flex;
    flex-direction: column;
    padding: 20px;

    li {
      position: relative;
      display: flex;
      gap: 14px;
      padding-bottom: 22px;

      &:not(:last-child)::before {
        position: absolute;
        top: 32px;
        bottom: 0;
        left: 15px;
        width: 2px;
        background-color: $line;
        content: '';
      }

      &.is-done::before {
        background-color: $accent;
      }
    }

    div {
      display: flex;
      flex-direction: column;
    }

    strong {
      color: $ink;
    }

    small {
      font-size: 0.8125rem;
      color: $muted;
    }
  }

  &__dot {
    @include flex-center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    color: $muted;
    background-color: $page-bg;
    border: 2px solid $line;
    border-radius: 50%;

    .is-done & {
      color: $white;
      background-color: $accent;
      border-color: $accent;
    }
  }
}
</style>
