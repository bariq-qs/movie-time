<template>
  <WrapperList titleHeader="Movies">
    <template #content>
      <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <div class="mb-5">
          <div class="card-filter">
            <p class=" font-semibold px-4 mb-4">Sort Result By</p>
            <div class="wrp-brd-tp wrp-brd-btm px-4 py-4">
              <Dropdown optionLabel="title" id="sort-id" :options="listSort" class="w-full input-primary"
                v-model="defaultSort" />
            </div>
            <p class=" font-semibold px-4 py-4">Genres</p>
            <div class="wrp-brd-tp px-4 py-4">
              <div class="flex w-full justify-between mb-2 items-center" v-for="(genre, idx) in listGenreChoice"
                :key="idx">
                <p class="text-sm">{{ genre.name }}</p>
                <Checkbox v-model="genre.isChoice" :binary="true" :inputId="`is-choice-${idx}`" class="input-danger"
                  @change="onFilterGenre(genre)" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1 lg:col-span-2 xl:col-span-4">
          <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <CardMovie v-for="(data, idx) in listMovies" :key="idx" :idx="idx" :data="data" />
          </div>
          <div class="flex justify-center" v-if="listMovies.length > 0">
            <div class=" rounded-full bg-danger1 mt-8 flex mx-auto cursor-pointer" @click="loadMore">
              <p class=" text-grey1 text-sm font-bold  px-4 py-1">Load More</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </WrapperList>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, onMounted, computed, watch
} from 'vue'
import WrapperList from '@/components/wrapper/WrapperList.vue'
import { movieUseCase } from '@/usecase'
import { IGenre, IPopularMovie } from '@/utils/interfaces/iMovie'
import environment from '@/configs/environtment'
import CardMovie from '@/components/card/CardMovie.vue'
import Dropdown from 'primevue/dropdown'
import { useStore } from 'vuex'
import Checkbox from 'primevue/checkbox'
import { useRoute } from 'vue-router'

interface ISort {
  title: string,
  field: string
}

interface IGenreChoice extends IGenre {
  isChoice: boolean
}

export default defineComponent({
  name: 'Movie',
  components: {
    WrapperList,
    CardMovie,
    Dropdown,
    Checkbox
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const genreIdFromPram: any = computed(() => route.query?.genreId)
    const mapGenreChoice = (items: IGenre[]) => items.map((val: IGenre) => ({
      ...val,
      // eslint-disable-next-line
      isChoice: genreIdFromPram.value && Number(genreIdFromPram.value) === val.id ? true : false
    }))
    const listGenre = computed(() => mapGenreChoice(store.state.listGenre))
    const listGenreChoice = ref<IGenreChoice[]>(listGenre.value)
    const listSort = ref<ISort[]>([{
      title: 'Popularity Ascending',
      field: 'popularity.asc'
    },
    {
      title: 'Popularity Descending',
      field: 'popularity.desc'
    },
    {
      title: 'Release Date Ascending',
      field: 'primary_release_date.asc'
    },
    {
      title: 'Release Date Descending',
      field: 'primary_release_date.desc'
    },
    {
      title: 'Rating Ascending',
      field: 'vote_average.asc'
    },
    {
      title: 'Rating Descending',
      field: 'vote_average.desc'
    }
    ])

    const defaultSort = ref<ISort>(listSort.value[1])

    const listMovies = ref<IPopularMovie[]>([])

    const filters = reactive({
      custom: [['sort_by', '=', defaultSort.value.field]] as string[][],
      page: 1 as number
    })

    const isLoading = ref(true)
    const fetchDiscover = (isRestart = false) => {
      isLoading.value = true
      movieUseCase.getDiscover(filters).then(({ result, error }) => {
        if (!error) {
          const mapData = result.map((mov: IPopularMovie) => ({
            ...mov,
            backdrop_path: environment.MEDIA_URL + mov.backdrop_path,
            poster_path: environment.MEDIA_URL + mov.poster_path
          }))
          if (isRestart) {
            listMovies.value = [...listMovies.value, ...mapData]
          } else {
            listMovies.value = mapData
          }
          isLoading.value = false
        } else {
          isLoading.value = false
        }
      })
    }

    watch(() => store.state.listGenre, (newValue, oldValue) => {
      listGenreChoice.value = mapGenreChoice(newValue)
    })

    watch(() => defaultSort.value, (newValue, oldValue) => {
      const findFilter = filters.custom.filter((v) => v[0] !== 'sort_by')
      filters.custom = [...findFilter, ['sort_by', '=', newValue.field]]
      defaultSort.value = newValue
      fetchDiscover()
    })

    const onFilterGenre = (genre: IGenreChoice | null = null) => {
      const findFilter = filters.custom.filter((v) => v[0] !== 'with_genres')
      const prepareFilter = listGenreChoice.value.filter((v) => v.isChoice).map((v) => v.id)
      const organizeQuery: string[] = prepareFilter.length > 0 ? ['with_genres', '=', prepareFilter.toString().replace(/,/g, '|')] : []
      filters.custom = [...findFilter, organizeQuery]
      fetchDiscover()
    }

    const loadMore = () => {
      // eslint-disable-next-line
      filters.page = filters.page + 1
      fetchDiscover(true)
    }

    const prepareData = () => {
      if (genreIdFromPram.value) {
        onFilterGenre()
        genreIdFromPram.value = null
      } else {
        fetchDiscover()
      }
    }

    watch(() => genreIdFromPram.value, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        listGenreChoice.value = mapGenreChoice(store.state.listGenre)
        prepareData()
      }
    })

    onMounted(() => {
      prepareData()
    })
    return {
      listMovies,
      defaultSort,
      listSort,
      listGenreChoice,
      onFilterGenre,
      loadMore
    }
  }
})
</script>

<style lang="scss">
.card-filter {
  background: linear-gradient(180deg, #0E1723 0%, rgba(30, 35, 42, 0) 100%);
  border-radius: 8px;
  padding: 18px 0 18px 0;

  .wrp-brd-tp {
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .wrp-brd-btm {
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }
}
</style>
