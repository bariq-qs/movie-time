<template>
  <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }" :pagination="true" :modules="modules" class="swip-popular">
    <swiper-slide>
      <div class="wrap-popular-card">
        <img alt="llkl" src="https://swiperjs.com/demos/images/nature-1.jpg" />
        <div class="wrap-desc-film">
          <div class="content">
            <div class="flex items-center gap-2 mb-2">
              <InlineSvg :src="require('@/assets/icon/star.svg')" class="w-5 h-5" />
              <p class=" text-lg font-bold">7.3</p>
            </div>
            <p class=" text-3xl font-medium text-left">Space Sweepers</p>
            <div class="flex my-2 gap-2">
              <p>2021</p>
              <div class="flex items-center gap-2">
                <div class="p-1 rounded-full" style="background-color: #808080;"></div>
                <p>Sci-Fi</p>
              </div>
            </div>
            <p class=" text-xs">When the crew of a space junk collector ship called The Victory discovers a humanoid robot
              named
              Dorothy that's known to be a weapon of mass destruction, they get involved in a risky business deal which
              puts their lives at stake.</p>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide><img alt="llkl" src="https://swiperjs.com/demos/images/nature-2.jpg" />
    </swiper-slide>
    <swiper-slide><img alt="llkl" src="https://swiperjs.com/demos/images/nature-3.jpg" />
    </swiper-slide>
    <swiper-slide><img alt="llkl" src="https://swiperjs.com/demos/images/nature-4.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img alt="llkl" src="https://swiperjs.com/demos/images/nature-5.jpg" />
    </swiper-slide>
    <swiper-slide>
      <img alt="llkl" src="https://swiperjs.com/demos/images/nature-6.jpg" />
    </swiper-slide>
    <swiper-slide><img alt="llkl" src="https://swiperjs.com/demos/images/nature-7.jpg" />
    </swiper-slide>
    <swiper-slide><img alt="llkl" src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide>
    <swiper-slide><img alt="llkl" src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide>
  </swiper></template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination } from 'swiper'
import InlineSvg from 'vue-inline-svg'
/* eslint-disable */
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import apiUseCase from '@/usecase/apiUseCase'

export default defineComponent({
  name: 'SwiperMovie',
  components: {
    Swiper,
    SwiperSlide,
    InlineSvg
  },
  setup() {
    onMounted(() => {
      apiUseCase.get('/movie/popular?api_key=')
    })
    return {
      modules: [EffectCoverflow, Pagination]
    }
  }
})
</script>

<style lang="scss" scoped>
.swiper.swip-popular {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #1e232a;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 600px;
  height: 400px;
  background-color: #1e232a;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.swip-popular {
  .swiper-pagination.swiper-pagination-bullets.swiper-pagination-horizontal {
    .swiper-pagination-bullet-active {
      width: 50px;
      height: 10px;
      border-radius: 6px;
      background-color: #E74C3C;
    }
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
</style>
