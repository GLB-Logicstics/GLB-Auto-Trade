<template>
  <section class="section">
    <div class="container home-cta">
      <div class="home-cta__box home-cta__box--main">
        <h2>Hesab yaradın</h2>
        <p>Bəyəndiyiniz avtomobilləri yadda saxlayın, müraciətlərinizi izləyin.</p>
        <NuxtLink :to="loggedIn ? '/profile' : '/register'" class="btn home-cta__button">
          {{ loggedIn ? 'Profilə keç' : 'Qeydiyyatdan keç' }}
        </NuxtLink>
      </div>

      <div class="home-cta__box">
        <h2>Diler və ya partnyorsunuz?</h2>
        <p>Avtomobillərinizi, xidmətlərinizi və ehtiyat hissələrinizi platformada təqdim edin.</p>
        <NuxtLink to="/dealers" class="btn btn--accent">Diler ol</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export default defineComponent({
  name: 'HomeCta',

  computed: {
    ...mapState(useAuthStore, ['loggedIn']),
  },
})
</script>

<style lang="scss" scoped>
.home-cta {
  display: grid;
  gap: 20px;

  @include up(lg) {
    grid-template-columns: 1fr 1fr;
  }

  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 28px 24px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius-lg;

    h2 {
      font-size: 1.5rem;
    }

    p {
      color: $text-soft;
    }

    &--main {
      color: $white;
      background: linear-gradient(135deg, $accent, $accent-dark);
      border: 0;

      h2,
      p {
        color: $white;
      }
    }
  }

  &__button {
    color: $accent-text;
    background-color: $white;

    &:hover {
      background-color: $accent-soft;
    }
  }
}
</style>
