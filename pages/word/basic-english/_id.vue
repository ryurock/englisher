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
  margin-top: 10vh;
  color: #35495e;
}

.word h1 {
  font-size: 48px;
  margin: 1vh auto;
  word-break: break-all;
  text-align: center;
}

.trans {
  margin-bottom: 2vh;
}


.trans-word h2 {
  margin: 3vh auto;
  font-size: 28px;
  color: #3b8070;
  text-align: center;
}

.part-of-speech {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1vh;
}
.part-of-speech-title {
  font-style: italic;
  margin-left: 10%;
}
.part-of-speech-type {
  margin-right: 20%;
}

.example {
  display: flex;
  justify-content: space-between;
  margin-top: 3vh;
  margin-bottom: 1vh;
}
.example-title {
  font-style: italic;
  margin-left: 10%;
  margin-top: auto;
  margin-bottom: auto;
}

.example-text {
  width: 67%;
  margin-right: 10%;
  text-align: right;
}

.example-text h3 {
  font-size: 26px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0px;

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

@media screen and (min-width: 920px) {
  .container {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }

  .part-of-speech-title {
    margin-left: 20%;
  }
  .part-of-speech-type {
    margin-right: 20%;
  }
  .example-title {
    margin-left: 20%;
  }
  .example-text {
    width: 60%;
    margin-right: 13%;
  }
}
</style>