import { useFavouritesStore } from '~/stores/favourites'

export default defineNuxtPlugin(() => {
  const cookie = useCookie<string[]>('favourites', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365,
  })

  const favourites = useFavouritesStore()
  favourites.ids = cookie.value || []

  favourites.$subscribe(() => {
    cookie.value = favourites.ids
  })
})
