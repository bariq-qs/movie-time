<template>
  <div class="wrapper-list">
    <div class="header">
      <div class="title-section">
        <div class="divider mb-2"></div>
        <div class="title-text text-grey1">{{ titleHeader }}</div>
      </div>
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import './wrapper-list.scss'

const props = defineProps({
  titleHeader: {
    type: String,
    default: () => 'title'
  }
})

</script>
