<template>
  <div>
    <AppHeader />
    <nuxt/>
  </div>
</template>
<style lang="scss">
@import '@/assets/scss/_base.scss';

</style>
<script>
import AppHeader from "~/components/AppHeader";
export default {
  components: {AppHeader}
}
</script>


