<template>
  <header class="layout-topbar">
    <router-link :to="{ name: 'home' }">
      <InlineSvg :src="require('@/assets/moovie-time-logo.svg')" class="logo-header" />
    </router-link>
    <div class="search-header">
      <div class="wrap-srch-input">
        <InlineSvg :src="require('@/assets/icon/video.svg')" class="left-ic" />
        <InputText v-model="inputVal" class="input-header" placeholder="Find movie" @input="onSearch($event)" />
        <InlineSvg :src="require('@/assets/icon/search.svg')" class="right-ic" />
        <OverlayPanel ref="opSearch" class="overlay-search" style="width: 550px;">
          <div class="flex flex-col">
            <p class=" text-gray1 text-sm mb-2" v-for="data in listSearch" :key="data.id" @click="onDetailMovie(data)">{{
              data.original_title }}</p>
          </div>
        </OverlayPanel>
      </div>
    </div>
    <div class="menus-header flex items-center">
      <div :class="`flex items-center gap-4 ${menu?.namePath ? 'cursor-pointer' : ''}`" v-for="(menu, idx) in listMenus"
        :key="idx" @mouseover="menu.showDropdown ? onHoverEnter($event) : null"
        @mouseleave="menu.showDropdown ? onHoverLeave($event) : null" @click="menu?.namePath ? toPage(menu) : null">
        <InlineSvg :src="menu.icon" v-if="menu.icon" />
        <p class=" font-semibold text-sm text-grey1">{{ menu.title }}</p>
      </div>
    </div>
    <OverlayPanel ref="op" class="overlay-categories">
      <div class="flex flex-col">
        <RouterLink :to="{
          name: 'movie',
          query: {
            genreId: genre.id
          }
        }" v-for="(genre, key) in listGenre" :key="key" class="text-black text-xs font-semibold mb-2">
          {{ genre.name }}
        </RouterLink>
      </div>
    </OverlayPanel>
  </header>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, computed, watch
} from 'vue'
import InlineSvg from 'vue-inline-svg'
import InputText from 'primevue/inputtext'
import OverlayPanel from 'primevue/overlaypanel'
import { IMenu } from '@/utils/interfaces/iMenu'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { movieUseCase } from '@/usecase'
import _ from 'lodash'
import { IMovieSearch } from '@/utils/interfaces/iMovie'

export default defineComponent({
  name: 'HeaderMain',
  components: {
    InlineSvg,
    InputText,
    OverlayPanel
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const inputVal = ref<string | null>(null)
    const op = ref()
    const opSearch = ref()
    const listGenre = computed(() => store.state.listGenre)
    const listSearch = ref<IMovieSearch[]>([])
    const listMenus = ref<IMenu[]>([{
      title: 'CATEGORIES',
      icon: require('@/assets/icon/categories.svg'),
      showDropdown: true,
    },
    {
      title: 'MOVIES',
      namePath: 'movie',
    },
    {
      title: 'TV SHOWS',
    },
    {
      title: 'LOGIN',
    }])

    const onHoverEnter = (evt: Event) => {
      op.value.toggle(evt)
    }

    const onHoverLeave = (evt: Event) => {
      console.log('on hover leave menu')
      // op.value.hide()
    }

    const toPage = (menu: IMenu) => {
      router.push({
        name: menu.namePath
      })
    }

    const processFetchSearch = (search: string) => {
      const query = search ? ['query', '=', search] : []
      movieUseCase.getSearch({
        custom: [query]
      }).then(({ result, error }) => {
        if (!error) {
          const mapData = result.map((val: IMovieSearch) => ({
            ...val,
            original_title: val.original_title
          })).slice(0, 7)
          listSearch.value = mapData
        }
      })
    }

    const onSearch = (evt: Event) => {
      console.log('on search')
      opSearch.value.toggle(evt)
    }

    onMounted(() => {
      store.dispatch('fetchGenre')
    })

    watch(() => inputVal.value, _.debounce(processFetchSearch, 300))

    const onDetailMovie = (data: IMovieSearch) => {
      router.push({
        name: 'movie-detail',
        params: {
          id: data.id
        }
      })
      inputVal.value = null
      listSearch.value = []
      opSearch.value.hide()
    }
    return {
      inputVal,
      listMenus,
      onHoverEnter,
      onHoverLeave,
      op,
      store,
      toPage,
      listGenre,
      opSearch,
      onSearch,
      listSearch,
      onDetailMovie
    }
  }
})

</script>
