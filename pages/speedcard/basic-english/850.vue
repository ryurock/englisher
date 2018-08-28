<template>
<no-ssr>
  <section class="container">
    <div class="character-token">
      <h1 class="character-token">{{ word }}</h1>
    </div>

    <div class="related-info">
      <h2 class="trans-token">{{ transWord1 }}</h2>
      <div v-if="partOfSpeech1" class="part-of-speech">
        <div class="part-of-speech-title">
          <p>品詞</p>
        </div>
        <div class="part-of-speech-type">
          <h3>{{ partOfSpeech1 }}</h3>
        </div>
      </div>
      <div v-if="example1" class="example">
        <div class="example-title">
          <p>例文</p>
        </div>
        <div class="example-token">
          <h3>{{ example1 }}</h3>
        </div>
      </div>
    </div>

    <div class="related-info">
      <h2 v-if="transWord2" class="trans-token">{{ transWord2 }}</h2>
      <div v-if="partOfSpeech2" class="part-of-speech">
        <div class="part-of-speech-title">
          <p>品詞</p>
        </div>
        <div class="part-of-speech-type">
          <h3>{{ partOfSpeech2 }}</h3>
        </div>
      </div>
      <div v-if="example2" class="example">
        <div class="example-title">
          <p>例文</p>
        </div>
        <div class="example-token">
          <h3>{{ example2 }}</h3>
        </div>
      </div>
    </div>

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
  </section>
</no-ssr>
</template>

<script>
import basicEnglish850Words from '~/models/words/basic-english850.json'
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

    const example1 = (wordInfo.ja[0].enEx) ? wordInfo.ja[0].enEx.join(' / ') : '';
    let transWord2, partOfSpeech2, example2 = '';
    if (wordInfo.ja[1]) {
      if (wordInfo.ja[1].words) transWord2 = wordInfo.ja[1].words.join(' / ');
      if (wordInfo.ja[1].wordClass) partOfSpeech2 = wordInfo.ja[1].wordClass.join(' / ');
      if (wordInfo.ja[1].enEx) example2 = wordInfo.ja[1].enEx.join(' / ');
    }
    return {
      word: wordInfo.en.word,
      transWord1: wordInfo.ja[0].words.join(' / '),
      partOfSpeech1: wordInfo.ja[0].wordClass.join(' / '),
      example1: example1,
      transWord2: transWord2,
      partOfSpeech2: partOfSpeech2,
      example2: example2,
      words: basicEnglish850Words,
      wordDelay: (defaultSpeed * 1000),
      wordLength: basicEnglish850Words.length,
      startTime: startTime,
      endTime: endTime,
    }
  },
  mounted() {
    let counter = 0;
    this.wordInterval = setInterval(() => {
      // const wordInfo = this.words.shift();
      this.word = this.words[counter].en.word;
      this.transWord1 = this.words[counter].ja[0].words.join(' / ');
      this.partOfSpeech1 = this.words[counter].ja[0].wordClass.join(' / ');
      this.example1 = (this.words[counter].ja[0].enEx) ? this.words[counter].ja[0].enEx.join(' / ') : '';

      this.transWord2 = '';
      this.partOfSpeech2 = '';
      this.example2 = '';
      if (this.words[counter].ja[1]) {
        this.transWord2 = (this.words[counter].ja[1].words) ? this.transWord2 = this.words[counter].ja[1].words.join(' / ') : '';
        this.partOfSpeech2 = (this.words[counter].ja[1].wordClass) ? this.partOfSpeech2 = this.words[counter].ja[1].wordClass.join(' / ') : '';
        this.example2 = (this.words[counter].ja[1].enEx) ? this.example2 = this.words[counter].ja[1].enEx.join(' / ') : '';
      }


      clearInterval(this.wordInterval);
      counter++;
    }, this.wordDelay);

  },
  methods: {},
  computed: {}
}
</script>

<style>
.container {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  color: #35495e;
}

.character-token {
  display: block;
  height: 23vh;
  margin: 3vh;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  font-weight: bold;
  font-size: 80px;
  margin-bottom: 3%;
  word-break: break-all;
  letter-spacing: 1px;
}
.trans-token {
  display: block;
  margin: 3vh;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  font-size: 24px;
  font-weight: bold;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.character-token {
  word-break: break-all;
  display: block;
  margin: 3vh;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  font-weight: bold;
  font-size: 80px;
  letter-spacing: 1px;
}

.related-info {
  color: #526488;
  width: 100%;
}

.part-of-speech {
  margin-left: 10%;
  margin-bottom: 1%;
  font-size: 17px;
}

.part-of-speech-title {
  display: inline-block;
  width: 19%;
  font-style: italic;
  text-align: right;
}

.part-of-speech-type {
  display: inline-block;
  width: 80%;
}

.example {
  margin-left: 10%;
  margin-bottom: 2%;
}

.example-title {
  display: inline-block;
  width: 20%;
  font-size: 20px;
  font-style: italic;
  text-align: right;
}
.example-token {
  display: inline-block;
  width: 80%;
  font-size: 22px;
}
.ad {
  margin-top: 3vh;
}
.grammar {
  margin-top: 3vh;
  text-align: left;
}

.grammar li {
  margin-bottom: 1%;
}

.footer {
  position: absolute;
  bottom: 0;
  color: white;
  background-color: #3b8070;
  width: 100%;
  padding: 2vh;
}

.logo {
  width: 10vh;
  height: 5vh;
  margin: 0;
  margin-left: 1vh;
  font-size: 22px;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-style: italic;
  font-weight: normal;
  line-height: 5vh;
  color: white;
}

.player {
  font-size: 24px;
  text-align: center;
  height: 4vh;
  line-height: 4vh;
}

.octicon {
  display: inline-block; /* 公式と同じ */
  fill: currentColor;    /* 公式と同じ */
  vertical-align: text-bottom;
  height: 1.4em; /* 大きさは height で指定 */
}

.player-icon {
  font-size: 3vh;
  margin-right: 3vh;
}
.player p {
  display: inline-block;
  font-size: 21px;
  margin-left: 1vh;
  margin-right: 2vh;
  vertical-align: top;
}
.player i {
  margin-right: 3vh;
}
</style>