<template>
  <SpeedCard
    v-bind:speedParam="speedParams"
  />
</template>

<script>
import SpeedCard from "~/components/SpeedCard";
export default {
  validate({params}) {
    if (params.speed) {
      return /^(normal|fast|slow|veryfast)$/gm.test(params.speed);
    }
    return false;
  },
  async asyncData({params}) {
    return {
      speedParams: params.speed
    };

  },
  components: {SpeedCard}
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/speedcard/special-english/_speed.scss';
</style>