import type { Directive } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  onOutside?: (event: Event) => void
}

const clickOutside: Directive<ClickOutsideElement, () => void> = {
  mounted(el, binding) {
    el.onOutside = (event: Event) => {
      if (!el.contains(event.target as Node)) binding.value()
    }
    document.addEventListener('click', el.onOutside)
  },

  unmounted(el) {
    if (el.onOutside) document.removeEventListener('click', el.onOutside)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', clickOutside)
})
