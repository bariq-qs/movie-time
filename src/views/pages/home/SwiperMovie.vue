<template>
  <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }" :pagination="true" :modules="modules" class="swip-popular">
    <swiper-slide v-for="(data, idx) in listMovies" :key="idx">
      <div class="wrap-popular-card">
        <img alt="llkl" :src="data.poster_path" />
        <div class="wrap-desc-film">
          <div class="content">
            <div class="flex items-center gap-2 mb-2">
              <InlineSvg :src="require('@/assets/icon/star.svg')" class="w-5 h-5 " />
              <p class=" text-lg font-bold">{{ data.vote_average }}</p>
            </div>
            <p class=" text-3xl font-medium text-left">{{ data.title }}</p>
            <div class="flex my-2 gap-2">
              <p>{{ moment(data.release_date).format('YYYY') }}</p>
              <div class="flex items-center gap-2">
                <div class="p-1 rounded-full" style="background-color: #808080;"></div>
                <p>Sci-Fi</p>
              </div>
            </div>
            <p class=" text-xs text-justify">{{ data.overview }}</p>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
/* eslint-disable import/extensions */
import { defineComponent, onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination } from 'swiper'
import InlineSvg from 'vue-inline-svg'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { movieUseCase } from '@/usecase'
import IResponse from '@/utils/interfaces/iResponse'
import environtment from '@/configs/environtment'
import { IPopularMovie } from '@/utils/interfaces/iMovie'
import moment from 'moment'

export default defineComponent({
  name: 'SwiperMovie',
  components: {
    Swiper,
    SwiperSlide,
    InlineSvg
  },
  setup() {
    const listMovies = ref<IPopularMovie[]>([])
    const getData = () => {
      movieUseCase.getPopular().then((res: IResponse) => {
        if (!res.error) {
          const mapData = res.result.map((mov: IPopularMovie) => ({
            ...mov,
            backdrop_path: environtment.MEDIA_URL + mov.backdrop_path,
            poster_path: environtment.MEDIA_URL + mov.poster_path
          }))
          listMovies.value = mapData.slice(0, 10)
        }
      })
    }
    onMounted(() => {
      getData()
    })
    return {
      modules: [EffectCoverflow, Pagination],
      listMovies,
      moment
    }
  }
})
</script>

<style lang="scss">
.swiper.swip-popular {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #1e232a;

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 600px;
    height: 400px;
    background-color: #1e232a;
  }
}

.swip-popular.swiper.swiper-horizontal {
  .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal {
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      width: 50px;
      height: 10px;
      border-radius: 6px;
      background-color: #E74C3C;
    }
  }

  .wrap-popular-card {
    display: flex;

    img {
      width: 200px;
      height: 350px;
    }

    .wrap-desc-film {
      padding: 25px 0 25px 0;
      text-align: justify;

      .content {
        width: 400px;
        padding: 10px 20px 10px 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: black;
      }
    }
  }
}
</style>
