<template>
  <header class="layout-topbar">
    <InlineSvg :src="require('@/assets/moovie-time-logo.svg')" class="logo-header" />
    <div class="search-header">
      <div class="wrap-srch-input">
        <InlineSvg :src="require('@/assets/icon/video.svg')" class="left-ic" />
        <InputText v-model="inputVal" class="input-header" placeholder="Find movie" />
        <InlineSvg :src="require('@/assets/icon/search.svg')" class="right-ic" />
      </div>
    </div>
    <div class="menus-header flex gap-14 items-center">
      <div class="flex items-center gap-4" v-for="(menu, idx) in listMenus" :key="idx">
        <InlineSvg :src="menu.icon" v-if="menu.icon" />
        <p class=" font-semibold text-sm text-grey1">{{ menu.title }}</p>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InlineSvg from 'vue-inline-svg'
import InputText from 'primevue/inputtext'
import { IMenu } from '@/utils/interfaces/iMenu'

export default defineComponent({
  name: 'HeaderMain',
  components: {
    InlineSvg,
    InputText
  },
  setup() {
    const inputVal = ref<string | null>(null)
    const listMenus = ref<IMenu[]>([{
      title: 'CATEGORIES',
      namePath: 'categories',
      icon: require('@/assets/icon/categories.svg')
    },
    {
      title: 'MOVIES',
      namePath: 'categories',
    },
    {
      title: 'TV SHOWS',
      namePath: 'categories',
    },
    {
      title: 'LOGIN',
      namePath: 'categories',
    }])
    return {
      inputVal,
      listMenus
    }
  }
})

</script>
