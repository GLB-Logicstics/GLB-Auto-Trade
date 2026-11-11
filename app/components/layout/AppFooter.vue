<template>
  <footer class="app-footer">
    <div class="container app-footer__grid">
      <div class="app-footer__col app-footer__col--about">
        <NuxtLink to="/" class="app-footer__logo" :aria-label="info.name">
          <img :src="info.logoDark" :alt="info.name" width="361" height="160" loading="lazy">
        </NuxtLink>
        <p class="app-footer__about">{{ info.about }}</p>
        <div class="app-footer__socials">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            :aria-label="social.label"
            class="app-footer__social"
                      >
            <i :class="['bi', social.icon]" />
          </a>
        </div>
      </div>

      <nav class="app-footer__col">
        <h3 class="app-footer__title">Faydalı Linklər</h3>
        <ul class="app-footer__links">
          <li v-for="link in footerLinks" :key="link.to">
            <NuxtLink :to="link.to" class="app-footer__link">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="app-footer__col">
        <h3 class="app-footer__title">Bizimlə Əlaqə</h3>
        <ul class="app-footer__contacts">
          <li>
            <i class="bi bi-geo-alt-fill" />
            <span>{{ contact.address }}</span>
          </li>
          <li>
            <i class="bi bi-clock-fill" />
            <span>{{ contact.workingHours }}</span>
          </li>
          <li>
            <i class="bi bi-telephone-fill" />
            <a :href="phoneHref">{{ contact.phoneDisplay }}</a>
          </li>
          <li>
            <i class="bi bi-envelope-fill" />
            <a :href="emailHref">{{ contact.email }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="app-footer__skyline">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path d="M60 90V20h6v70zM40 20h90v5H40zM66 25l40 30v4L66 30zM100 25h4v20h-4z" />
          <rect x="150" y="62" width="70" height="28" rx="2" />
          <rect x="224" y="62" width="70" height="28" rx="2" />
          <rect x="186" y="32" width="70" height="28" rx="2" />
          <path d="M330 58h110v24h-110zM444 64h28l12 12v6h-40z" />
          <circle cx="350" cy="84" r="6" /><circle cx="420" cy="84" r="6" /><circle cx="466" cy="84" r="6" />
          <path d="M520 80c0-6 4-9 10-10l14-10h34l14 10c6 1 10 4 10 10v4h-82z" />
          <circle cx="540" cy="86" r="5" /><circle cx="586" cy="86" r="5" />
          <path d="M640 70h260l-24 20H664z" />
          <rect x="680" y="48" width="40" height="20" rx="2" />
          <rect x="724" y="48" width="40" height="20" rx="2" />
          <rect x="768" y="48" width="40" height="20" rx="2" />
          <rect x="812" y="36" width="40" height="32" rx="2" />
          <rect x="950" y="62" width="70" height="28" rx="2" />
          <rect x="1024" y="62" width="70" height="28" rx="2" />
          <rect x="986" y="32" width="70" height="28" rx="2" />
          <path d="M1130 58h110v24h-110zM1244 64h28l12 12v6h-40z" />
          <circle cx="1150" cy="84" r="6" /><circle cx="1220" cy="84" r="6" /><circle cx="1266" cy="84" r="6" />
          <path d="M1370 90V20h6v70zM1310 20h90v5h-90zM1370 25l-40 30v4l40-29zM1336 25h4v20h-4z" />
        </g>
      </svg>
    </div>

    <div class="app-footer__bottom">
      <div class="container app-footer__bottom-inner">
        <span>{{ copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useSiteStore } from '~/stores/site'

export default defineComponent({
  name: 'AppFooter',

  computed: {
    ...mapState(useSiteStore, [
      'info',
      'contact',
      'footerLinks',
      'socialLinks',
      'phoneHref',
      'emailHref',
      'copyright',
    ]),
  },
})
</script>

<style lang="scss" scoped>
.app-footer {
  margin-top: 64px;
  color: rgba($white, 0.75);
  background-color: $dark;

  @include up(lg) {
    margin-top: 80px;
  }

  &__grid {
    display: grid;
    gap: 36px;
    padding-block: 48px 32px;

    @include up(md) {
      grid-template-columns: 1fr 1fr;
    }

    @include up(lg) {
      grid-template-columns: 1.2fr 1fr 1.2fr;
      gap: 48px;
      padding-block: 56px 40px;
    }
  }

  &__col--about {
    @include up(md) {
      grid-column: 1 / -1;
    }

    @include up(lg) {
      grid-column: auto;
    }
  }

  &__logo img {
    width: auto;
    height: 64px;
  }

  &__about {
    max-width: 420px;
    margin-top: 18px;
    font-size: 0.875rem;
    line-height: 1.7;
    color: rgba($white, 0.7);
  }

  &__socials {
    display: flex;
    gap: 8px;
    margin-top: 20px;
  }

  &__social {
    @include flex-center;
    width: 36px;
    height: 36px;
    font-size: 15px;
    color: $white;
    background-color: rgba($white, 0.08);
    border-radius: $radius;
    transition:
      background-color $transition,
      color $transition,
      transform $transition;

    &:hover {
      color: $white;
      background-color: $accent;
      transform: translateY(-2px);
    }
  }

  &__title {
    margin-bottom: 18px;
    font-size: 1.25rem;
    font-weight: 600;
    color: $white;
  }

  &__links {
    display: grid;
    gap: 12px;
  }

  &__link {
    position: relative;
    font-size: 0.875rem;
    color: rgba($white, 0.75);
    transition:
      color $transition,
      padding $transition;

    &:hover {
      padding-left: 6px;
      color: $accent;
    }
  }

  &__contacts {
    display: grid;
    gap: 14px;

    li {
      display: flex;
      gap: 12px;
      font-size: 0.875rem;
      line-height: 1.6;
      color: rgba($white, 0.75);
    }

    i {
      flex-shrink: 0;
      margin-top: 1px;
      color: $accent;
    }

    a {
      transition: color $transition;

      &:hover {
        color: $accent;
      }
    }
  }

  &__skyline {
    height: 70px;
    overflow: hidden;
    color: rgba($white, 0.05);

    @include up(md) {
      height: 90px;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__bottom {
    color: $white;
    background-color: $primary-dark;
  }

  &__bottom-inner {
    display: flex;
    justify-content: center;
    padding-block: 14px;
    font-size: 0.875rem;
    text-align: center;
  }
}
</style>
