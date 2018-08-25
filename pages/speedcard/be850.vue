<template>
  <section class="container">
    <div class="character-token">
      <h1>even</h1>
      <h2>〇〇だって / 〇〇でも（強調）</h2>
    </div>
    <div class="related-info">
      <div class="part-of-speech">
        <div class="part-of-speech-title">
          <p>品詞</p>
        </div>
        <div class="part-of-speech-type">
          <h3>形容詞</h3>
        </div>
      </div>
      <div class="example">
        <div class="example-title">
          <p>例文</p>
        </div>
        <div class="example-token">
          <h3>an even chance</h3>
        </div>
      </div>

      <div class="part-of-speech">
        <div class="part-of-speech-title">
          <p>品詞</p>
        </div>
        <div class="part-of-speech-type">
          <h3>動詞</h3>
        </div>
      </div>
      <div class="example">
        <div class="example-title">
          <p>例文</p>
        </div>
        <div class="example-token">
          <h3>Even I can do it</h3>
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
    <section class="footer">
      <div class="player">
        <svg class="octicon octicon-triangle-right player-icon" viewBox="0 0 6 16" version="1.1" width="12" aria-hidden="true"><path fill-rule="evenodd" d="M0 14l6-6-6-6v12z"></path></svg>
        <svg class="octicon octicon-mute player-icon" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path></svg>
        <countDownTimer
         starttime="Sep 5, 2018 15:37:25"
         endtime="Sep 8, 2018 16:37:25"
         trans='{
         "day":"",
         "hours":":",
         "minutes":":",
         "seconds":":",
         "expired":"",
         "running":"",
         "upcoming":"",
         "status": {}
         }'
         ></countDownTimer>
        <p>残20</p>
      </div>
      <div class="logo">enner</div>
    </section>
  </section>
</template>


<script>
import BasicEnglish850Words from '~/models/words/basic-english850.json'
import CountDownTimer from '~/components/SpeedCard/CountDownTimer.vue'

export default {
  components: {
    CountDownTimer
  },
  data() {
    const defaultSpeed = 2;
    const endSeconds = (BasicEnglish850Words.length * defaultSpeed);
    return {}
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
  margin-bottom: 3%;
}
.character-token h1 {
  display: block;
  margin: 3vh;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  font-weight: bold;
  font-size: 100px;
  letter-spacing: 1px;
}

.character-token h2 {
  font-size: 36px;
  font-weight: bold;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.related-info {
  color: #526488;
  width: 100%;
}

.part-of-speech {
  margin-left: 10%;
  margin-bottom: 1%;
  font-size: 19px;
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
  font-size: 22px;
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
  text-align: right;
  color: white;
  background-color: #3b8070;
  width: 100%;
  padding: 2vh;
}

.logo {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  float: right;
  font-style: italic;
  font-size: 22px;
  height: 4vh;
  line-height: 3.4vh;
}

.player {
  float: left;
  font-size: 24px;
  text-align: center;
  width: 80%;
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