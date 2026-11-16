<template>
  <div class="container">
    <PageHeader
      title="Diler və partnyorlar üçün"
      subtitle="Hazır avtomobillərinizi, xidmətlərinizi və ehtiyat hissələrinizi platformada təqdim edin, yeni müştərilər qazanın."
      :crumbs="[{ label: 'Diler ol' }]"
    />

    <div class="dealers-page__benefits">
      <div v-for="item in benefits" :key="item.title" class="card dealers-page__benefit">
        <i :class="['bi', item.icon]" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </div>
    </div>

    <div class="card">
      <h2 class="panel__title">
        <i class="bi bi-briefcase" />
        Qoşulmaq üçün müraciət
      </h2>

      <div class="panel__body">
        <p v-if="sent" class="form-success">
          <i class="bi bi-check-circle" />
          Müraciətiniz qəbul edildi. Partnyorluq üzrə menecerimiz sizinlə əlaqə saxlayacaq.
        </p>

        <form v-else class="dealers-page__form" novalidate @submit.prevent="submit">
          <div class="form-grid">
            <label class="form-field" :class="{ 'has-error': errors.company }">
              <span>Şirkətin adı *</span>
              <input v-model.trim="form.company" type="text" class="form-input">
              <small v-if="errors.company" class="form-error">{{ errors.company }}</small>
            </label>

            <label class="form-field" :class="{ 'has-error': errors.name }">
              <span>Əlaqədar şəxs *</span>
              <input v-model.trim="form.name" type="text" class="form-input">
              <small v-if="errors.name" class="form-error">{{ errors.name }}</small>
            </label>

            <label class="form-field" :class="{ 'has-error': errors.phone }">
              <span>Telefon *</span>
              <input v-model.trim="form.phone" type="tel" class="form-input" placeholder="+994 50 000 00 00">
              <small v-if="errors.phone" class="form-error">{{ errors.phone }}</small>
            </label>

            <label class="form-field">
              <span>E-poçt</span>
              <input v-model.trim="form.email" type="email" class="form-input">
            </label>

            <div class="form-field">
              <span>Ölkə</span>
              <BaseSelect v-model="form.country" :options="countries" :clearable="false" />
            </div>

            <div class="form-field">
              <span>Fəaliyyət növü</span>
              <BaseSelect v-model="form.type" :options="types" :clearable="false" />
            </div>

            <label class="form-field is-wide">
              <span>Əlavə məlumat</span>
              <textarea
                v-model.trim="form.message"
                class="form-input form-textarea"
                placeholder="Stok sayı, şəhər, xidmətlər"
              />
            </label>
          </div>

          <button type="submit" class="btn btn--accent">
            <i class="bi bi-send" />
            Müraciət göndər
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'pinia'
import { countries } from '~/data/filters'
import { useRequestsStore } from '~/stores/requests'

export default defineComponent({
  name: 'DealersPage',

  setup() {
    useSeoMeta({
      title: 'Diler ol — GLB Logistics',
      description: 'Dilerlər, servislər və ehtiyat hissəsi satıcıları üçün GLB platformasına qoşulma.',
    })
  },

  data() {
    return {
      countries,
      types: [
        { label: 'Avtomobil dileri', value: 'Avtomobil dileri' },
        { label: 'Ehtiyat hissələri', value: 'Ehtiyat hissələri' },
        { label: 'Servis xidməti', value: 'Servis xidməti' },
        { label: 'Logistika partnyoru', value: 'Logistika partnyoru' },
      ],
      benefits: [
        {
          icon: 'bi-megaphone',
          title: 'Yeni müştərilər',
          text: 'Elanlarınız Azərbaycan və Gürcüstandakı alıcılara göstərilir.',
        },
        { icon: 'bi-whatsapp', title: 'Birbaşa əlaqə', text: 'Hər elanın altında sizin WhatsApp və telefonunuz olur.' },
        { icon: 'bi-graph-up', title: 'Statistika', text: 'Baxış və WhatsApp kliklərinin sayını izləyirsiniz.' },
      ],
      form: { company: '', name: '', phone: '', email: '', country: 'aze', type: 'Avtomobil dileri', message: '' },
      errors: { company: '', name: '', phone: '' },
      sent: false,
    }
  },

  methods: {
    ...mapActions(useRequestsStore, ['send']),

    submit() {
      this.errors.company = this.form.company ? '' : 'Şirkətin adını yazın'
      this.errors.name = this.form.name ? '' : 'Adınızı yazın'
      this.errors.phone = this.form.phone.replace(/\D/g, '').length < 9 ? 'Telefon nömrəsini düzgün yazın' : ''
      if (this.errors.company || this.errors.name || this.errors.phone) return

      this.send({
        subject: `Diler müraciəti: ${this.form.company} (${this.form.type})`,
        name: this.form.name,
        phone: this.form.phone,
        message: this.form.message,
      })
      this.sent = true
    },
  },
})
</script>

<style lang="scss" scoped>
.dealers-page {
  &__benefits {
    display: grid;
    gap: 16px;
    margin-bottom: 20px;

    @include up(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__benefit {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;

    i {
      font-size: 26px;
      color: $accent;
    }

    h3 {
      font-size: 1.0625rem;
    }

    p {
      font-size: 0.875rem;
      color: $text-soft;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
