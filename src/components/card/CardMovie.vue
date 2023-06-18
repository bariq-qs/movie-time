<template>
  <div class="w-100 card-movie" @mouseover="onHoverEnter(idx)" @mouseleave="onHoverLeave(idx)">
    <div class="poster">
      <div class="rating text-grey1 py-1 px-2">{{ data.vote_average }}</div>
      <img :src="data.poster_path" alt="poster-mov" />
      <div class="poster-active invisible">
        <div class="p-3 w-full">
          <div class="flex items-center gap-2 justify-center mb-8">
            <InlineSvg :src="require('@/assets/icon/star.svg')" class="w-5 h-5 " />
            <p class=" text-lg font-bold">{{ data.vote_average }}</p>
          </div>
          <div class="flex justify-center">
            <p class=" font-semibold text-lg">Action</p>
          </div>
          <div class=" flex justify-center">
            <div class=" rounded-full bg-danger1 mt-8 flex mx-auto cursor-pointer" @click="toDetail()">
              <p class=" text-grey1 text-sm font-bold  px-4 py-1">VIEW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="description mt-2">
      <p class=" text-grey1 font-semibold">{{ data.title }}</p>
      <p class="text-grey2 text-xs">{{ moment(data.release_date).format('YYYY') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  computed
} from 'vue'
import InlineSvg from 'vue-inline-svg'
import $ from 'jquery'
import { IPopularMovie } from '@/utils/interfaces/iMovie'
import moment from 'moment'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CardMovie',
  components: {
    InlineSvg
  },
  props: {
    idx: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object as PropType<IPopularMovie>,
      default: () => null
    }
  },
  setup(props) {
    const idx = computed(() => props.idx)
    const data = computed(() => props.data)
    const router = useRouter()
    const onHoverEnter = (index: number) => {
      $(`.poster-active:eq(${index})`).removeClass('invisible')
    }
    const onHoverLeave = (index: number) => {
      $(`.poster-active:eq(${index})`).addClass('invisible')
    }
    const toDetail = () => {
      router.push({
        name: 'movie-detail',
        params: {
          id: data.value.id
        }
      })
    }
    return {
      onHoverEnter,
      onHoverLeave,
      idx,
      data,
      moment,
      toDetail
    }
  }
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
