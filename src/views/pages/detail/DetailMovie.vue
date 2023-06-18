<template>
  <div class="detail-movie">
    <div class="header-detail">
      <div class="content">
        <div class="wrap-title">
          <p class=" text-lg font-medium mb-1">{{ moment(dataDetail?.release_date).format('YYYY') }}</p>
          <p class="title mb-1">{{ dataDetail?.title }}</p>
          <p class=" text-sm font-medium mb-1">{{ dataDetail?.genres.map((val: IGenre) =>
            val.name).toString().replace(',', ', ') }}</p>
        </div>
        <div class="black-section grid grid-cols-1 lg:grid-cols-5">
          <div class="gap-2 container-item">
            <InlineSvg :src="require('@/assets/icon/star.svg')" class="w-8 h-8 " />
            <p class="title">{{ dataDetail?.vote_average }}</p>
            <div>
              <p class="item-title">user score</p>
              <p class="item-subtitle">{{ dataDetail?.vote_count }} votes</p>
            </div>
          </div>
          <div class="container-item">
            <div>
              <p class="item-title">status</p>
              <p class="item-subtitle">{{ dataDetail?.status }}</p>
            </div>
          </div>
          <div class="container-item">
            <div>
              <p class="item-title">language</p>
              <p class="item-subtitle">{{ dataDetail?.original_language }}</p>
            </div>
          </div>
          <div class="container-item">
            <div>
              <p class="item-title">budget</p>
              <p class="item-subtitle">{{ `$${Number(dataDetail?.budget).toLocaleString('id-ID')}` }}</p>
            </div>
          </div>
          <div class="container-item">
            <div>
              <p class="item-title">production</p>
              <p class="item-subtitle">{{ dataDetail?.production_companies.map((val: ProductionCompany) =>
                val.name).toString().replace(',', ', ') }}</p>
            </div>
          </div>
        </div>
        <img :src="dataDetail?.poster_path" alt="image-pro" />
      </div>
    </div>
    <div class="overview-section">
      <div class="ovrvw-wrap">
        <p class=" text-danger1 text-sm font-semibold mb-2">OVERVIEW</p>
        <p class=" text-sm text-black">{{ dataDetail?.overview }}</p>
      </div>
      <div class="comment-wrap">
        <p class=" text-danger1 text-sm font-semibold mb-2 my-5">REVIEWS</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card-comment" v-for="comment in listComments" :key="comment.id">
            <div class=" flex justify-between items-center mb-4">
              <div class="flex gap-4 items-center">
                <Avatar :label="comment.author.charAt(0)" style="background-color: rgba(30, 35, 43, 0.21); color: black"
                  shape="circle" />
                <div>
                  <p class=" text-black text-sm font-bold">{{ comment.author_details.name }}</p>
                  <p class=" text-xs text-grey2">{{ moment(comment.created_at).format('MMMM DD, YYYY') }}</p>
                </div>
              </div>
              <div class=" inline-flex rounded-lg px-3 py-1 items-start gap-2"
                style="background-color: rgba(196, 196, 196, 0.28);">
                <InlineSvg :src="require('@/assets/icon/star.svg')" class="w-5 h-5 mt-3" />
                <p class="rtg-title text-black">9.0</p>
              </div>
            </div>
            <div class="description italic text-xs text-black text-justify" v-html="comment.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="recomend-movies">
      <p class="mb-10 font-semibold text-sm">RECOMMENDATION MOVIES</p>
      <div class=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-14">
        <CardMovie v-for="(data, idx) in listMovies" :key="idx" :idx="idx" :data="data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, watch
} from 'vue'
import { movieUseCase } from '@/usecase'
import { useRoute } from 'vue-router'
import InlineSvg from 'vue-inline-svg'
import Avatar from 'primevue/avatar'
import {
  ICommentMovie, IPopularMovie, IDetailMovie, IGenre, ProductionCompany
} from '@/utils/interfaces/iMovie'
import moment from 'moment'
import CardMovie from '@/components/card/CardMovie.vue'
import environment from '@/configs/environtment'
import $ from 'jquery'
import './detail-movie.scss'

export default defineComponent({
  name: 'DetailMovie',
  components: {
    InlineSvg,
    Avatar,
    CardMovie
  },
  props: {
  },
  setup() {
    const route = useRoute()
    const listComments = ref<ICommentMovie[]>([])
    const listMovies = ref<IPopularMovie[]>([])
    const dataDetail = ref<IDetailMovie | null>(null)
    const fetchComment = () => {
      movieUseCase.getReview(Number(route.params.id))
        .then(({ result, error }) => {
          if (!error) {
            const mapData = result.map((val: ICommentMovie) => ({
              ...val
            }))
            listComments.value = mapData.slice(1, 3)
          }
        })
    }

    const fetchRecomend = () => {
      movieUseCase.getRecommend(Number(route.params.id))
        .then(({ result, error }) => {
          if (!error) {
            const mapData = result.map((mov: IPopularMovie) => ({
              ...mov,
              backdrop_path: environment.MEDIA_URL + mov.backdrop_path,
              poster_path: environment.MEDIA_URL + mov.poster_path
            }))
            listMovies.value = mapData.slice(0, 5)
          }
        })
    }

    const fetchDetail = () => {
      movieUseCase.getDetailMovie(Number(route.params.id))
        .then(({ error, result }) => {
          if (!error) {
            const mapData: IDetailMovie = {
              ...result,
              backdrop_path: environment.MEDIA_URL + result.backdrop_path,
              poster_path: environment.MEDIA_URL + result.poster_path
            }
            // eslint-disable-next-line
            $('.header-detail').css({ 'background': 'url(' + mapData.backdrop_path + ')', 'background-repeat': 'no-repeat', 'background-size': '100vw' })
            dataDetail.value = mapData
            fetchComment()
            fetchRecomend()
          }
        })
    }

    const loadData = () => {
      if (route.params.id) {
        fetchDetail()
      }
    }

    watch(() => route.params.id, (newVal, oldVal) => {
      loadData()
    })

    onMounted(() => {
      loadData()
    })
    return {
      listComments,
      moment,
      listMovies,
      dataDetail
    }
  }
})
</script>
