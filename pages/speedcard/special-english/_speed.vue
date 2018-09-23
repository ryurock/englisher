<template>
  <SpeedCard
    v-bind:words="words"
    v-bind:type="'special-english'"
    v-bind:speedParam="speedParams"
  />
</template>

<script>
import SpeedCard from "~/components/SpeedCard";
import words from '~/datasets/words/special-english/all.min.json';

export default {
  validate({params}) {
    if (params.speed) {
      return /^(normal|fast|slow|veryfast)$/gm.test(params.speed);
    }
    return false;
  },
  async asyncData({params}) {
    return {
      words: words,
      speedParams: params.speed
    };

  },
  components: {SpeedCard}
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/speedcard/special-english/_speed.scss';
</style>