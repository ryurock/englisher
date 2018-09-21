<template>
  <SpeedCard
    v-bind:isPlay=true
    v-bind:speedParam="speedParams"
    v-bind:speedLabel="speedLabel"
    speed-mode=true
    timer=true
    word-count=true
    word-length=1500
  />
</template>

<script>
import SpeedCard from "~/components/SpeedCard";
const speedMap = {
  veryfast: {
    speakRate: 2.25,
    delay: 500,
    label: '超早'
  },
  fast: {
    speakRate: 1.75,
    delay: 750,
    label: '早い'
  },
  normal: {
    speakRate: 1,
    delay: 1000,
    label: '普通'
  },
  slow: {
    speakRate: 1,
    delay: 2000,
    label: '遅い'
  }
};
export default {
  validate({params}) {
    if (params.speed) {
      return /^(normal|fast|slow|veryfast)$/gm.test(params.speed);
    }
    return false;
  },
  async asyncData({params}) {
    let speakRate = speedMap.normal.speakRate;
    let delay = speedMap.normal.delay;
    if (params.speed) {
      speakRate = speedMap[params.speed].speakRate;
      delay     = speedMap[params.speed].delay;
    }

    return {
      speedParams: params.speed,
      speedLabel: params.speed
    };

  },
  components: {SpeedCard}
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/speedcard/special-english/_speed.scss';
</style>