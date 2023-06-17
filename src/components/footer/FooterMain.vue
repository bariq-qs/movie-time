<template>
  <footer class="layout-footer">
    <p class=" text-grey2 text-xs">© 2021 MoovieTime. All rights reserved.</p>
    <InlineSvg :src="require('@/assets/moovie-time-logo-footer.svg')" />
    <p class=" text-grey2 text-xs">Made with Vue js</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InlineSvg from 'vue-inline-svg'

export default defineComponent({
  name: 'FooterMain',
  components: {
    InlineSvg
  }
})
</script>
