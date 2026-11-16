<template>
  <AuthCard
    v-if="!user"
    title="Profil"
    text="Profilinizi görmək üçün daxil olun və ya qeydiyyatdan keçin."
    icon="bi-person"
  >
    <NuxtLink to="/login" class="btn btn--accent btn--block">Daxil ol</NuxtLink>
    <NuxtLink to="/register" class="btn btn--outline btn--block">Qeydiyyat</NuxtLink>
  </AuthCard>

  <div v-else class="container">
    <PageHeader
      :title="`Salam, ${firstName}!`"
      subtitle="Hesab məlumatlarınız və müraciətləriniz."
      :crumbs="[{ label: 'Profil' }]"
    />

    <div class="two-col">
      <div class="profile-page__main">
        <div class="card">
          <h2 class="panel__title">
            <i class="bi bi-person-vcard" />
            Hesab məlumatları
          </h2>
          <div class="panel__body">
            <dl class="info-list">
              <div>
                <dt>Ad</dt>
                <dd>{{ user.name }}</dd>
              </div>
              <div>
                <dt>E-poçt</dt>
                <dd>{{ user.email }}</dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>{{ user.phone || '—' }}</dd>
              </div>
            </dl>
            <button type="button" class="btn btn--outline btn--sm" @click="signOut">
              <i class="bi bi-box-arrow-right" />
              Çıxış
            </button>
          </div>
        </div>

        <div class="card">
          <h2 class="panel__title">
            <i class="bi bi-send" />
            Müraciətlərim
          </h2>
          <div class="panel__body">
            <p v-if="!requests.length" class="profile-page__empty">Hələ müraciət göndərməmisiniz.</p>
            <ul v-else class="profile-page__requests">
              <li v-for="item in requests" :key="item.id">
                <strong>{{ item.subject }}</strong>
                <span>{{ item.date }} · Gözləmədə</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="panel__title">
          <i class="bi bi-grid" />
          Qısa keçidlər
        </h2>
        <div class="panel__body">
          <NuxtLink to="/favourite" class="profile-page__link">
            <i class="bi bi-heart" />
            Seçilmişlər
            <b>{{ ids.length }}</b>
          </NuxtLink>
          <NuxtLink to="/auction-calculator" class="profile-page__link">
            <i class="bi bi-calculator" />
            Hərrac kalkulyatoru
          </NuxtLink>
          <NuxtLink to="/tracking" class="profile-page__link">
            <i class="bi bi-geo" />
            Avtomobil izləmə
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useFavouritesStore } from '~/stores/favourites'
import { useRequestsStore } from '~/stores/requests'

export default defineComponent({
  name: 'ProfilePage',

  setup() {
    useSeoMeta({ title: 'Profil — GLB Logistics', robots: 'noindex' })
  },

  computed: {
    ...mapState(useAuthStore, ['user', 'firstName']),
    ...mapState(useFavouritesStore, ['ids']),
    ...mapState(useRequestsStore, { requests: 'items' }),
  },

  methods: {
    ...mapActions(useAuthStore, ['logout']),

    signOut() {
      this.logout()
      this.$router.push('/')
    },
  },
})
</script>

<style lang="scss" scoped>
.profile-page {
  &__main {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__empty {
    font-size: 0.875rem;
    color: $text-soft;
  }

  &__requests li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 0;
    font-size: 0.875rem;
    border-bottom: 1px solid $line-soft;

    span {
      font-size: 0.75rem;
      color: $muted;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    font-weight: 500;
    color: $ink;
    border: 1px solid $line;
    border-radius: $radius;
    transition: border-color $transition;

    &:hover {
      border-color: $accent;
    }

    i {
      color: $accent;
    }

    b {
      margin-left: auto;
      color: $accent-text;
    }
  }
}
</style>
