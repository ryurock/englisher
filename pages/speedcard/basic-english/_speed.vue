<template>
  <SpeedCard
    v-bind:words="words"
    v-bind:type="'special-english'"
    v-bind:speedParam="speedParams"
  />
</template>

<script>
import SpeedCard from "~/components/SpeedCard";
import words from '~/datasets/words/basic-english/all.min.json';
export default {
  validate({params}) {
    if (params.speed) {
      return /^(normal|fast|slow|veryfast)$/gm.test(params.speed);
    }
    return false;
  },
  head() {
    return {
      title: 'enner | BasicEnglish(ベーシック・イングリッシュ)のスピードカード',
      meta: [
        { hid: 'description', name: 'description', content: 'BasicEnglish(ベーシック・イングリッシュ)を黙読して英単語を覚えましょう' }
      ]
    }
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
@import '@/assets/scss/pages/speedcard/basic-english/_speed.scss';
</style>