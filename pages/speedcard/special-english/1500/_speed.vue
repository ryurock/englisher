<template>
  <main class="main">
    <section class="word">
      <h1 class="word__typography">Acording to</h1>
    </section>

    <section class="translate-section">
      <div>
        <h2 class="translate-section__typography">コンテンツ</h2>
      </div>

      <section class="translate-section__part-of-speech">
        <div class="translate-section__part-of-speech-title">
          <p>品詞</p>
        </div>
        <div class="translate-section__part-of-speech-type">
          <h3>動詞</h3>
        </div>
      </section>
    </section>
    <section class="ad">
      <div class="ad__banner">
        <img src="https://placehold.jp/320x100.png" />
      </div>
    </section>
    <SpeedCard
     speak=true
     speed-mode=true
     timer=true
     word-count=true
     word-length=1500
    />
  </main>
</template>

<script>
import SpeedCard from "~/components/SpeedCard";

export default {
  components: {SpeedCard}
}
</script>


<style lang="scss">
@import '@/assets/scss/pages/speedcard/special-english/1500/_speed.scss';
</style>