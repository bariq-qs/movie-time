<template>
  <SwiperMovie />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwiperMovie from './SwiperMovie.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SwiperMovie
  },
  setup() {
    return {
    }
  }
})
</script>
