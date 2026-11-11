<template>
  <header class="header">
    <div class="header__top">
      <div class="container header__top-inner">
        <div class="header__group">
          <a :href="phoneHref" class="header__top-link">
            <i class="bi bi-telephone" />
            {{ contact.phoneDisplay }}
          </a>
          <span class="header__divider" />
          <a :href="emailHref" class="header__top-link">
            <i class="bi bi-envelope" />
            {{ contact.email }}
          </a>
        </div>

        <div class="header__group">
          <NuxtLink to="/favourite" class="header__top-link">
            <i class="bi bi-heart" />
            Seçilmişlər
          </NuxtLink>
          <span class="header__divider" />
          <NuxtLink to="/login" class="header__top-link">
            <i class="bi bi-person-badge" />
            Daxil ol
          </NuxtLink>
          <div class="header__socials">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              :aria-label="social.label"
              class="header__social"
            >
              <i :class="['bi', social.icon]" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="header__main">
      <div class="container header__main-inner">
        <NuxtLink to="/" class="header__logo">
          <img :src="info.logo" :alt="info.name" width="361" height="160">
        </NuxtLink>

        <nav class="header__nav">
          <ul class="nav">
            <li v-for="item in mainNav" :key="item.label" class="nav__item">
              <NuxtLink v-if="item.to" :to="item.to" class="nav__link">{{ item.label }}</NuxtLink>

              <template v-else>
                <button type="button" class="nav__link">
                  {{ item.label }}
                  <i class="bi bi-caret-down-fill nav__caret" />
                </button>
                <ul class="nav__submenu">
                  <li v-for="child in item.children" :key="child.to">
                    <NuxtLink :to="child.to" class="nav__sublink">{{ child.label }}</NuxtLink>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </nav>

        <div class="header__tools">
          <button type="button" class="header__icon" aria-label="Axtarış" @click="openSearch">
            <i class="bi bi-search" />
          </button>
          <NotificationDropdown class="header__icon--desktop" />
          <span class="header__divider header__divider--desktop" />
          <LanguageSwitcher />
          <button
            type="button"
            class="header__burger"
            :class="{ 'is-open': mobileMenuOpen }"
            aria-label="Menyu"
            @click="toggleMobileMenu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'
import { useUiStore } from '~/stores/ui'

export default defineComponent({
  name: 'AppHeader',

  computed: {
    ...mapState(useSiteStore, ['info', 'contact', 'mainNav', 'socialLinks', 'phoneHref', 'emailHref']),
    ...mapState(useUiStore, ['mobileMenuOpen']),
  },

  watch: {
    $route() {
      this.closeAll()
      const active = document.activeElement as HTMLElement | null
      if (active) active.blur()
    },
  },

  methods: {
    ...mapActions(useUiStore, ['toggleMobileMenu', 'openSearch', 'closeAll']),
  },
})
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: $white;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);

  &__top {
    display: none;
    font-size: 0.875rem;
    background-color: $page-bg;
    border-bottom: 1px solid $line-soft;

    @include up(md) {
      display: block;
    }
  }

  &__top-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-top;
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__top-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: color $transition;

    i {
      color: $accent-text;
    }

    &:hover {
      color: $accent-text;
    }
  }

  &__divider {
    width: 1px;
    height: 18px;
    background-color: $line;

    &--desktop {
      display: none;

      @include up(xl) {
        display: block;
      }
    }
  }

  &__socials {
    display: flex;
    gap: 6px;
  }

  &__social {
    @include flex-center;
    width: 28px;
    height: 28px;
    font-size: 13px;
    color: $white;
    background-color: $primary;
    border-radius: $radius-sm;
    transition: background-color $transition;

    &:hover {
      background-color: $primary-dark;
    }
  }

  &__main {
    position: relative;
  }

  &__main-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: $header-mobile;

    @include up(xl) {
      height: $header-main;
    }
  }

  &__logo img {
    width: auto;
    height: 46px;

    @include up(xl) {
      height: 54px;
    }
  }

  &__nav {
    display: none;

    @include up(xl) {
      display: block;
    }
  }

  &__tools {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__icon {
    @include flex-center;
    width: 40px;
    height: 40px;
    font-size: 18px;
    color: $ink;
    border-radius: 50%;
    transition: background-color $transition;

    &:hover {
      background-color: $surface;
    }

    &--desktop {
      display: none;

      @include up(xl) {
        display: flex;
      }
    }
  }

  &__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 0 12px;
    border: 1px solid $line;
    border-radius: $radius;

    @include up(xl) {
      display: none;
    }

    span {
      height: 2px;
      background-color: $ink;
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.2s ease;
    }

    &.is-open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    &.is-open span:nth-child(2) {
      opacity: 0;
    }

    &.is-open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 22px;

  @include up(xxl) {
    gap: 32px;
  }

  &__item {
    position: relative;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 0;
    font-size: 0.875rem;
    font-weight: 500;
    color: $ink;
    white-space: nowrap;
    transition: color $transition;

    @include up(xxl) {
      font-size: 0.9375rem;
    }

    &:hover,
    &.router-link-exact-active {
      color: $accent-text;
    }
  }

  &__caret {
    font-size: 10px;
  }

  &__submenu {
    position: absolute;
    top: 100%;
    left: -16px;
    z-index: 110;
    min-width: 220px;
    padding: 8px;
    margin-top: 8px;
    background-color: $white;
    border: 1px solid $line;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;

    &::before {
      position: absolute;
      top: -10px;
      right: 0;
      left: 0;
      height: 10px;
      content: '';
    }
  }

  &__item:hover &__submenu,
  &__item:focus-within &__submenu {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }

  &__item:hover &__link {
    color: $accent-text;
  }

  &__sublink {
    display: block;
    padding: 10px 12px;
    font-size: 0.875rem;
    border-radius: $radius-sm;
    transition: background-color $transition;

    &:hover {
      color: $accent-text;
      background-color: $surface;
    }
  }
}
</style>
