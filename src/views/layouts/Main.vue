<template>
  <main class="layout-wrapper">
    <HeaderMain />
    <div class="layout-main">
      <div class="content">
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="bodyMain" />
        </router-view>
      </div>
    </div>
    <FooterMain />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderMain from '@/components/header/HeaderMain.vue'
import FooterMain from '@/components/footer/FooterMain.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderMain,
    FooterMain
  }
})
</script>
