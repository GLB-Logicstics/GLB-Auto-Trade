import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    loggedIn: (state) => !!state.user,
    firstName: (state) => (state.user ? state.user.name.split(' ')[0] : ''),
  },

  actions: {
    login(email: string) {
      const name = email.split('@')[0] || 'İstifadəçi'
      this.user = { name, email, phone: '' }
    },

    register(user: User) {
      this.user = { ...user }
    },

    logout() {
      this.user = null
    },
  },
})
