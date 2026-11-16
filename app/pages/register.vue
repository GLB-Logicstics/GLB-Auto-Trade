<template>
  <AuthCard
    title="Qeydiyyat"
    text="Hesab yaradın — seçilmişləriniz və müraciətləriniz bir yerdə saxlanılsın."
    icon="bi-person-plus"
  >
    <form class="auth-form" novalidate @submit.prevent="submit">
      <label class="form-field" :class="{ 'has-error': errors.name }">
        <span>Ad, soyad</span>
        <input v-model.trim="form.name" type="text" class="form-input">
        <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
      </label>

      <label class="form-field" :class="{ 'has-error': errors.email }">
        <span>E-poçt</span>
        <input v-model.trim="form.email" type="email" class="form-input" placeholder="mail@example.com">
        <small v-if="errors.email" class="form-error">{{ errors.email }}</small>
      </label>

      <label class="form-field">
        <span>Telefon</span>
        <input v-model.trim="form.phone" type="tel" class="form-input" placeholder="+994 50 000 00 00">
      </label>

      <label class="form-field" :class="{ 'has-error': errors.password }">
        <span>Şifrə</span>
        <input v-model="password" type="password" class="form-input" placeholder="••••••">
        <small v-if="errors.password" class="form-error">{{ errors.password }}</small>
      </label>

      <label class="checkbox">
        <input v-model="agree" type="checkbox">
        <span> <NuxtLink to="/terms">İstifadə şərtləri</NuxtLink> ilə razıyam </span>
      </label>

      <button type="submit" class="btn btn--accent btn--block" :disabled="!agree">Qeydiyyatdan keç</button>

      <p class="auth-form__switch">
        Hesabınız var?
        <NuxtLink to="/login">Daxil olun</NuxtLink>
      </p>
    </form>
  </AuthCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { useAuthStore } from '~/stores/auth'

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    useSeoMeta({ title: 'Qeydiyyat — GLB Logistics', robots: 'noindex' })
  },

  data() {
    return {
      form: { name: '', email: '', phone: '' },
      password: '',
      agree: false,
      errors: { name: '', email: '', password: '' },
    }
  },

  methods: {
    ...mapActions(useAuthStore, ['register']),

    submit() {
      this.errors.name = this.form.name.length >= 2 ? '' : 'Adınızı yazın'
      this.errors.email = /\S+@\S+\.\S+/.test(this.form.email) ? '' : 'E-poçt ünvanını düzgün yazın'
      this.errors.password = this.password.length >= 6 ? '' : 'Şifrə ən azı 6 simvol olmalıdır'
      if (this.errors.name || this.errors.email || this.errors.password) return

      this.register(this.form)
      this.$router.push('/profile')
    },
  },
})
</script>
