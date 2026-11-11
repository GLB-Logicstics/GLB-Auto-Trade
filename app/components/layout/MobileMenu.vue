<template>
  <div class="mobile-menu-wrap">
    <Transition name="fade">
      <div v-if="mobileMenuOpen" class="mobile-menu-backdrop" @click="toggleMobileMenu" />
    </Transition>

    <Transition name="slide">
      <nav v-if="mobileMenuOpen" class="mobile-menu">
        <ul class="mobile-menu__list">
          <li v-for="(item, index) in mainNav" :key="item.label" class="mobile-menu__item">
            <NuxtLink v-if="item.to" :to="item.to" class="mobile-menu__link">{{ item.label }}</NuxtLink>

            <template v-else>
              <button type="button" class="mobile-menu__link" @click="toggle(index)">
                {{ item.label }}
                <i class="bi bi-caret-down-fill mobile-menu__caret" :class="{ 'is-open': openIndex === index }" />
              </button>
              <ul v-show="openIndex === index" class="mobile-menu__sub">
                <li v-for="child in item.children" :key="child.to">
                  <NuxtLink :to="child.to" class="mobile-menu__sublink">{{ child.label }}</NuxtLink>
                </li>
              </ul>
            </template>
          </li>
        </ul>

        <div class="mobile-menu__footer">
          <NuxtLink to="/favourite" class="mobile-menu__contact">
            <i class="bi bi-heart" />
            Seçilmişlər
          </NuxtLink>
          <a :href="phoneHref" class="mobile-menu__contact">
            <i class="bi bi-telephone" />
            {{ contact.phoneDisplay }}
          </a>
          <a :href="emailHref" class="mobile-menu__contact">
            <i class="bi bi-envelope" />
            {{ contact.email }}
          </a>
          <div class="mobile-menu__socials">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.label"
              class="mobile-menu__social"
            >
              <i :class="['bi', social.icon]" />
            </a>
          </div>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'
import { useUiStore } from '~/stores/ui'

export default defineComponent({
  name: 'MobileMenu',

  data() {
    return { openIndex: -1 }
  },

  computed: {
    ...mapState(useUiStore, ['mobileMenuOpen']),
    ...mapState(useSiteStore, ['mainNav', 'socialLinks', 'contact', 'phoneHref', 'emailHref']),
  },

  watch: {
    mobileMenuOpen(open: boolean) {
      document.body.style.overflow = open ? 'hidden' : ''
      if (!open) this.openIndex = -1
    },
  },

  methods: {
    ...mapActions(useUiStore, ['toggleMobileMenu']),

    toggle(index: number) {
      this.openIndex = this.openIndex === index ? -1 : index
    },
  },
})
</script>

<style lang="scss" scoped>
.mobile-menu-wrap {
  @include up(xl) {
    display: none;
  }
}

.mobile-menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: 119;
  background-color: rgba(10, 20, 40, 0.45);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 120;
  max-height: calc(100vh - #{$header-mobile});
  padding: 12px 16px 20px;
  overflow-y: auto;
  color: $white;
  background-color: $dark;

  @include up(md) {
    max-height: calc(100vh - #{$header-mobile + $header-top});
    padding: 12px 24px 20px;
  }

  &__item + &__item {
    border-top: 1px solid rgba($white, 0.08);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 4px;
    font-weight: 500;
    color: $white;
    text-align: left;

    &.router-link-exact-active {
      color: $accent;
    }
  }

  &__caret {
    font-size: 11px;
    transition: transform $transition;

    &.is-open {
      transform: rotate(180deg);
    }
  }

  &__sub {
    padding-bottom: 12px;
  }

  &__sublink {
    display: block;
    padding: 10px 16px;
    font-size: 0.875rem;
    color: rgba($white, 0.75);
    border-left: 2px solid rgba($white, 0.15);

    &:hover,
    &.router-link-exact-active {
      color: $accent;
      border-left-color: $accent;
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 20px;
    margin-top: 12px;
    border-top: 1px solid rgba($white, 0.12);
  }

  &__contact {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.875rem;
    color: rgba($white, 0.85);

    i {
      color: $accent;
    }
  }

  &__socials {
    display: flex;
    gap: 8px;
  }

  &__social {
    @include flex-center;
    width: 36px;
    height: 36px;
    background-color: rgba($white, 0.1);
    border-radius: $radius;

    &:hover {
      background-color: $accent;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
