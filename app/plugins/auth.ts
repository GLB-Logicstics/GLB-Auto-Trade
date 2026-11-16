import { useAuthStore } from '~/stores/auth'
import type { User } from '~/types'

export default defineNuxtPlugin(() => {
  const cookie = useCookie<User | null>('user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
  })

  const auth = useAuthStore()
  auth.user = cookie.value || null

  auth.$subscribe(() => {
    cookie.value = auth.user
  })
})
