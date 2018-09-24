<template>
  <main class="main">
    <section class="word">
      <h1 class="word__typography">{{ word.token }}</h1>
    </section>

    <section class="translate-section">
      <div
       v-for="(translate, index) in word.translate.ja"
       v-bind:key="index">
        <h2 class="translate-section__typography">{{ translate.token }}</h2>
      </div>

    </section>
    <section class="ad">
      <div class="ad__banner">
        <img src="https://placehold.jp/320x100.png" />
      </div>
    </section>
  </main>
</template>

<script>

export default {
  async asyncData({ params }) {
    const token = params.token;
    const word = require(`~/datasets/words/basic-english/dist/${token}.min.json`);
    console.log(word);
    return {
      word: word
    };
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display');

.main {
  margin-top: 5vh;
  color: #35495e;
}
.word {
  text-align: center;
  &__typography {
    margin: 3vh auto;
    padding-top: 3vh;
    font-size: 48px;
    font-family: $word-font-family;
    word-break: break-all;
    text-align: center;
  }
}

.translate-section {
  margin-top: 3vh;
  &__typography {
    width: 90%;
    margin: 3vh auto;
    font-size: 28px;
    color: #3b8070;
    text-align: center;
    letter-spacing: 0.05em;
  }

  &__part-of-speech {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vh;
    margin-top: 6vh;

    &-title {
      font-style: italic;
      margin-top: auto;
      margin-left: 10%;
    }

    &-type {
      margin-right: 20%;
    }
  }
}

.ad {
  position: absolute;
  bottom: 10vh;
  width: 100%;
  &__banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>