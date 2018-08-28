<template>
<no-ssr>
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
    <section class="grammar">
      <div class="grammar-container">
        <ul>
          <li>単語の最後 s(es,ies) をつけると複数になる。</li>
          <li>形容詞のそれぞれを変えるにはer と est</li>
          <li>動詞の語尾を変えるには、ing と ed</li>
        </ul>
      </div>
    </section>
    <section class="ad">
      <div class="banner">
        <img src="https://placehold.jp/320x100.png" />
      </div>
    </section>
    <footer class="footer">
      <div class="player">
        <svg class="octicon octicon-triangle-right player-icon" viewBox="0 0 6 16" version="1.1" width="12" aria-hidden="true"><path fill-rule="evenodd" d="M0 14l6-6-6-6v12z"></path></svg>
        <svg class="octicon octicon-mute player-icon" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path></svg>
        <CountDownTimer
          v-bind:startTime='startTime'
          v-bind:endTime='endTime'
          v-bind:wordDelay='wordDelay'
          v-bind:wordLength='wordLength'
          v-bind:trans='{
            day: "",
            hours: ":",
            minutes: ":",
            seconds: ":",
            expired: "",
            running: "",
            upcoming: "",
            status: {}
          }'
         ></CountDownTimer>
      </div>
    </footer>
  </main>
</no-ssr>

</template>

<script>
import basicEnglish850Words from '~/models/words/basic-english/850.json'
import CountDownTimer from '~/components/SpeedCard/CountDownTimer.vue'

export default {
  components: {
    CountDownTimer
  },
  data() {
    const defaultSpeed = 2;
    const endSeconds = (basicEnglish850Words.length * defaultSpeed);
    const startTime = new Date();
    const endTime = new Date(startTime.setSeconds(endSeconds));

    const wordInfo = basicEnglish850Words.shift();
    return {
      words: basicEnglish850Words,
      word: wordInfo.langueges.en.tokens[0],
      trans: wordInfo.langueges.ja,
      wordDelay: (defaultSpeed * 1000),
      wordLength: basicEnglish850Words.length,
      startTime: startTime,
      endTime: endTime,
    }
  },
  mounted() {
    let counter = 0;
    this.wordInterval = setInterval(() => {
      this.word = this.words[counter].langueges.en.tokens[0];
      this.trans = this.words[counter].langueges.ja;

      // clearInterval(this.wordInterval);
      counter++;
    }, this.wordDelay);
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
  font-size: 9vh;
  word-break: break-all;
  margin: 3vh auto;
  text-align: center;
}

.trans {
  margin-bottom: 3vh;
}

.trans-word {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3b8070;
}

.trans-word h2 {
  font-size: 28px;
  margin: 3vh auto;
  text-align: center;
}

.part-of-speech {
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;
}
.part-of-speech-title {
  font-style: italic;
  width: 7vh;
  margin-left: 4vh;
}
.part-of-speech-type {
  width: 35vh;
  text-align: center;
}

.example {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2vh;
}
.example-title {
  font-size: 18px;
  font-style: italic;
  width: 10vh;
  margin-left: 4vh;
}

.example-text {
  width: 35vh;
  margin-right: 2vh;
  text-align: center;
}

.ad {
  position: absolute;
  bottom: 10vh;
  width: 100%;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grammar {
  position: absolute;
  bottom: 25vh;
  width: 100%;
}

.grammar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 400px) {
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
</style>