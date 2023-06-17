<template>
  <SwiperMovie />
  <DiscoverMovie />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwiperMovie from './SwiperMovie.vue'
import DiscoverMovie from './DiscoverMovie.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SwiperMovie,
    DiscoverMovie
  },
  setup() {
    return {
    }
  }
})
</script>
