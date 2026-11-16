<template>
  <AuthCard
    title="Daxil ol"
    text="Seçilmişlər və müraciətlərinizi görmək üçün hesabınıza daxil olun."
    icon="bi-box-arrow-in-right"
  >
    <form class="auth-form" novalidate @submit.prevent="submit">
      <label class="form-field" :class="{ 'has-error': errors.email }">
        <span>E-poçt</span>
        <input v-model.trim="email" type="email" class="form-input" placeholder="mail@example.com">
        <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
      </label>

      <label class="form-field" :class="{ 'has-error': errors.password }">
        <span>Şifrə</span>
        <input v-model="password" type="password" class="form-input" placeholder="••••••">
        <small v-if="errors.password" class="form-error">{{ errors.password }}</small>
      </label>

      <button type="submit" class="btn btn--accent btn--block">Daxil ol</button>

      <p class="auth-form__switch">
        Hesabınız yoxdur?
        <NuxtLink to="/register">Qeydiyyatdan keçin</NuxtLink>
      </p>
    </form>
  </AuthCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    useSeoMeta({ title: 'Daxil ol — GLB Logistics', robots: 'noindex' })
  },

  data() {
    return {
      email: '',
      password: '',
      errors: { email: '', password: '' },
    }
  },

  methods: {
    ...mapActions(useAuthStore, ['login']),

    submit() {
      this.errors.email = /\S+@\S+\.\S+/.test(this.email) ? '' : 'E-poçt ünvanını düzgün yazın'
      this.errors.password = this.password.length >= 6 ? '' : 'Şifrə ən azı 6 simvol olmalıdır'
      if (this.errors.email || this.errors.password) return

      this.login(this.email)
      this.$router.push(String(this.$route.query.redirect || '/profile'))
    },
  },
})
</script>
