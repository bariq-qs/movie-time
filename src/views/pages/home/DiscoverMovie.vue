<template>
  <WrapperList v-bind="paramsWrapper">
    <template #header>
      <div class="flex gap-2 items-center">
        <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
        <div v-for="(sort, idx) in listSort" :key="idx"
        :class="`cursor-pointer rounded-full ${defaultSort.field === sort.field ? 'bg-danger1' : 'background-sort-nonactive'}`"
        @click="onSort(sort)">
        <p class=" text-grey1 text-sm py-1 px-4">{{ sort.title }}</p>
      </div>
    </div>
  </template>
  <template #content>
      <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-14">
        <CardMovie v-for="(data, idx) in listMovies" :key="idx" :idx="idx" :data="data" />
      </div>
    </template>
  </WrapperList>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import WrapperList from '@/components/wrapper/WrapperList.vue'
import { movieUseCase } from '@/usecase'
import { IPopularMovie } from '@/utils/interfaces/iMovie'
import CardMovie from '@/components/card/CardMovie.vue'
import environment from '@/configs/environtment'

interface ISort {
  title: string,
  field: string
}

const paramsWrapper = reactive({
  titleHeader: 'Discover Movies'
})

const listSort = ref<ISort[]>([{
  title: 'Popularity',
  field: 'popularity.desc'
},
{
  title: 'Release Date',
  field: 'primary_release_date.desc'
}])

const defaultSort = ref<ISort>(listSort.value[0])

const listMovies = ref<IPopularMovie[]>([])

const filters = reactive({
  custom: [['sort_by', '=', defaultSort.value.field]]
})

const isLoading = ref(true)

const fetchDiscover = () => {
  isLoading.value = true
  movieUseCase.getDiscover(filters).then(({ result, error }) => {
    if (!error) {
      const mapData = result.map((mov: IPopularMovie) => ({
        ...mov,
        backdrop_path: environment.MEDIA_URL + mov.backdrop_path,
        poster_path: environment.MEDIA_URL + mov.poster_path
      }))
      listMovies.value = mapData
      isLoading.value = false
    } else {
      isLoading.value = false
    }
  })
}

const onSort = (sort: ISort) => {
  const findFilter = filters.custom.filter((v) => v[0] !== 'sort_by')
  filters.custom = [...findFilter, ['sort_by', '=', sort.field]]
  defaultSort.value = sort
  fetchDiscover()
}

onMounted(() => {
  fetchDiscover()
})
</script>

<style lang="scss">
.card-movie {
  .poster {
    position: relative;

    img {
      height: 400px;
      width: 100%;
    }

    .rating {
      position: absolute;
      background: rgba(30, 35, 43, 0.8);
      font-weight: 700;
      font-size: 18px;
      right: 0;
    }

    .poster-active {
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      height: 400px;
      width: 100%;
      top: 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>
