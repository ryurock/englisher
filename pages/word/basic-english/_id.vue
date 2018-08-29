<template>
  <main class="container">
    <div class="word">
      <h1>{{ word }}</h1>
    </div>
    <section v-for="(tran, key, index) in trans" v-bind:key="index" class="trans">
      <div class="trans-word">
        <h2>{{ tran.tokens.join(' / ') }}</h2>
      </div>
      <div class="part-of-speech">
        <div class="part-of-speech-title">
          <p>品詞</p>
        </div>
        <div class="part-of-speech-type">
          <h3>{{ tran.wordClass.join(' / ') }}</h3>
        </div>
      </div>
      <div v-if="tran.example.length > 0" class="example">
        <div class="example-title">
          <p>例文</p>
        </div>
        <div class="example-text">
          <h3>{{ tran.example.join(' / ') }}</h3>
        </div>
      </div>
    </section>
    <section class="ad">
      <img src="https://placehold.jp/320x100.png" />
    </section>
    <section class="grammar">
      <ul>
        <li>単語の最後 s(es,ies) をつけると複数になる。</li>
        <li>形容詞のそれぞれを変えるにはer と est</li>
        <li>動詞の語尾を変えるには、ing と ed</li>
      </ul>
    </section>

  </main>
</template>

<script>
import basicEnglish850Words from '~/models/words/basic-english/850.json'

export default {
  async asyncData({ params }) {
    const word = basicEnglish850Words.find(word => word.id == params.id);
    return {
      word: word.langueges.en.tokens[0],
      trans: word.langueges.ja
    };
  }
}
</script>

<style>
.container {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  min-height: 5vh;
  margin-top: 5vh;
  color: #35495e;
}

.word {
  display: flex;
  justify-content: center;
  align-items: center;
}

.word h1 {
  font-size: 8vh;
  margin: 1vh auto;
  text-align: center;
}

.trans {
  margin-bottom: 2vh;
}

.trans-word {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b8070;
}

.trans-word h2 {
  font-size: 4vh;
  margin: 3vh auto;
  text-align: center;
}

.part-of-speech {
  font-size: 2.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
}
.part-of-speech-title {
  font-style: italic;
  width: 13vh;
  margin-left: 4vh;
}
.part-of-speech-type {
  width: 35vh;
  text-align: center;
}

.example {
  font-size: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
}
.example-title {
  font-size: 2.5vh;
  font-style: italic;
  width: 13vh;
  margin-left: 5vh;
}

.example-text {
  width: 37vh;
  margin-right: 2vh;
  text-align: center;
}

.ad {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.grammar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;
}

@media screen and (min-width: 450px) {
  .example-title {
    margin-left: 7vh;
  }
  .example-text {
    width: 70vh;
  }
  .part-of-speech-type {
    width: 70vh;
  }
}

@media screen and (min-width: 375px) {
  .example-title {
    margin-left: 4vh;
  }
  .example-text {
    width: 70vh;
  }
  .part-of-speech-type {
    width: 70vh;
  }
}
</style>