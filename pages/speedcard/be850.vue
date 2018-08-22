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
        <i class="fa fa-play-circle fa-lg"></i>
        <i class="fas fa-volume-off fa-lg"></i>
        <p>{{ formatTime }}</p>
        <p>残20</p>
      </div>
      <div class="logo">enner</div>
    </section>
  </section>
</template>
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
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
  vertical-align: top;
}
.player {
  display: inline-block;
  font-size: 24px;
  text-align: center;
  width: 80%;
}

.player p {
  display: inline;
  margin-right: 3vh;
}
.player i {
  margin-right: 3vh;
}
</style>

<script>
import BasicEnglish850Words from '~/models/words/basic-english850.json'

export default {
  data() {
    return {
      min: 59,
      sec: 59,
      timerOn: false,
      timerObj: null,
    }
  },
  methods: {
    count: function() {
      if (this.sec <= 0 && this.min >= 1) {
        this.min --;
        this.sec = 59;
      } else if(this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec --;
      }
    },
    start: function() {
      this.timerObj = setInterval(function() {self.count()}, 1000)
      this.timerOn = true; //timerがOFFであることを状態として保持
    },

    stop: function() {
      clearInterval(this.timerObj);
      this.timerOn = false; //timerがOFFであることを状態として保持
    },

    complete: function() {
      clearInterval(this.timerObj)
    }
  },
  computed: {
    formatTime: function() {
      console.log('hoge');
      setInterval(function() {self.count()}, 1000)
      this.timerOn = true; //timerがOFFであることを状態として保持

      let timeStrings = [
        this.min.toString(),
        this.sec.toString()
      ].map(function(str) {
        if (str.length < 2) {
          return "0" + str
        } else {
          return str
        }
      })
      return timeStrings[0] + ":" + timeStrings[1]
    }
  }
}
</script>