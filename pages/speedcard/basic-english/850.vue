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
    <section class="ad">
      <div class="banner">
        <img src="https://placehold.jp/320x100.png" />
      </div>
    </section>
    <footer class="footer">
      <div class="player">
        <svg
          v-if="isPlay == false"
          v-on:click="togglePlay(true)"
          class="octicon octicon-triangle-right player-icon"
          viewBox="0 0 6 16"
          version="1.1"
          width="12"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M0 14l6-6-6-6v12z"></path>
        </svg>
        <svg
          v-else
          v-on:click="togglePlay(false)"
          class="octicon octicon-x player-icon"
          viewBox="0 0 12 16"
          version="1.1"
          width="26"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
        </svg>


        <svg
          v-if="isVoice == false"
          v-on:click="toggleVoice(true)"
          class="octicon octicon-mute player-icon"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path>
        </svg>
        <svg
          v-else
          v-on:click="toggleVoice(false)"
          class="octicon octicon-unmute player-icon"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M12 8.02c0 1.09-.45 2.09-1.17 2.83l-.67-.67c.55-.56.89-1.31.89-2.16 0-.85-.34-1.61-.89-2.16l.67-.67A3.99 3.99 0 0 1 12 8.02zM7.72 2.28L4 6H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2l3.72 3.72c.47.47 1.28.14 1.28-.53V2.81c0-.67-.81-1-1.28-.53zm5.94.08l-.67.67a6.996 6.996 0 0 1 2.06 4.98c0 1.94-.78 3.7-2.06 4.98l.67.67A7.973 7.973 0 0 0 16 8c0-2.22-.89-4.22-2.34-5.66v.02zm-1.41 1.41l-.69.67a5.05 5.05 0 0 1 1.48 3.58c0 1.39-.56 2.66-1.48 3.56l.69.67A5.97 5.97 0 0 0 14 8.02c0-1.65-.67-3.16-1.75-4.25z"></path>
        </svg>

        <div class="countdown-timer-wrap">
          <div class="timer">
            <div class="min">
              <span class="number">{{ minutes }}</span>
              <span class="format">:</span>
            </div>
            <div class="sec">
              <span class="number">{{ seconds }}</span>
            </div>
          </div>
          <div class="timer-message">
            <p>残 {{ count }}</p>
          </div>
        </div>
      </div>
    </footer>
  </main>
</no-ssr>

</template>

<script>
import basicEnglish850Words from '~/models/words/basic-english/850.json';
import swal from 'sweetalert';
import Artyom from 'artyom.js';

export default {
  data() {
    const defaultSpeed = 2;
    const endSeconds = (basicEnglish850Words.length * defaultSpeed);
    const startDateTime = new Date();
    const endDateTime   = new Date((startDateTime.getTime() + endSeconds * 1000));
    const left = endDateTime - startDateTime;
    const a_day = 24 * 60 * 60 * 1000;

    const wordInfo = basicEnglish850Words.shift();
    return {
      words: basicEnglish850Words,
      word: wordInfo.langueges.en.tokens[0],
      trans: wordInfo.langueges.ja,
      wordDelay: (defaultSpeed * 1000),
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      hours: Math.floor((left % a_day) / (60 * 60 * 1000)).toString().padStart(2, "0"),
      minutes: (Math.floor((left % a_day) / (60 * 1000)) % 60).toString().padStart(2, "0"),
      seconds: (Math.floor((left % a_day) / 1000) % 60 % 60).toString().padStart(2, "0"),
      count: basicEnglish850Words.length,
      isPlay: false,
      isVoice: false
    }
  },
  mounted() {
    this.counter = 0;
    this.artyom = new Artyom();
    swal({
      title: "発音の自動再生しますか？",
      icon: "warning",
      buttons: ['再生しない', '再生する']
    })
    .then((isVoice) => {
      if (isVoice) {
        this.artyom.say(this.word);
        this.isVoice = true;
      } else {
        this.isVoice = false;
      }
      this.isPlay = true;

      this.loadPlay();
      this.loadTimer();
    });
  },
  methods: {
    toggleVoice(isVoice) {
      this.isVoice = isVoice;
    },
    togglePlay(isPlay) {
      if (isPlay == false) {
        clearInterval(this.wordInterval);
        clearInterval(this.timerInterval);
      } else {
        this.loadPlay();
        this.loadTimer();
      }
      this.isPlay = isPlay;
    },
    loadTimer() {
      this.timerInterval = setInterval(() => {
        this.endDateTime = (this.endDateTime - 1000);
        const left = this.endDateTime - this.startDateTime;
        const a_day = 24 * 60 * 60 * 1000;
        this.hours = Math.floor((left % a_day) / (60 * 60 * 1000)).toString().padStart(2, "0");
        this.minutes = (Math.floor((left % a_day) / (60 * 1000)) % 60).toString().padStart(2, "0");
        this.seconds = (Math.floor((left % a_day) / 1000) % 60 % 60).toString().padStart(2, "0");

      }, 1000);
    },
    loadPlay() {
      this.wordInterval = setInterval(() => {
        this.word = this.words[this.counter].langueges.en.tokens[0];
        this.trans = this.words[this.counter].langueges.ja;

        if (this.words.length == this.counter) clearInterval(this.wordInterval);
        if (this.isVoice) this.artyom.say(this.word);
        if (this.isPlay == false) clearInterval(this.wordInterval);
        this.counter++;
        this.count--;
      }, this.wordDelay);
    }
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


.word h1 {
  margin: 3vh auto;
  padding-top: 1vh;
  font-size: 48px;
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
  margin-top: 6vh;
}

.part-of-speech-title {
  font-style: italic;
  margin-top: auto;
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
  font-size: 26px;
  line-height: 30px;
  letter-spacing: 0px;
  text-align: right;
}

.example-text h3 {
  font-size: 26px;
  font-weight: 400;
  line-height: 26px;
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
  bottom: 29vh;
  width: 100%;
}

.grammar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  position: absolute;
  bottom: 0;
  color: white;
  background-color: #3b8070;
  width: 100%;
  padding: 2vh;
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
  height: 1.4em; /* 大きさは height で指定 */
}

.player-icon {
  font-size: 3vh;
  margin-right: 2vh;
}

.countdown-timer-wrap {
  display: inline-block;
  width: 197px;
  vertical-align: top;
}
.timer {
  display: inline-block;
  margin-right: 0.3em;
}

.timer-message {
  display: inline-block;
  font-size: 18px;
}
.hour, .min, .sec, .message {
  display: inline-block;
}

@media screen and (min-width: 920px) {
  .container {
    width: 100%;
    margin-top: 20vh;
    margin-left: auto;
    margin-right: auto;
  }

  .part-of-speech-title {
    margin-left: 30%;
  }
  .part-of-speech-type {
    margin-right: 30%;
  }
  .example-title {
    margin-left: 30%;
  }
  .example-text {
    width: 52%;
    margin-right: 13%;
  }
  .example-text h3 {
    text-align: center;
  }

}
</style>