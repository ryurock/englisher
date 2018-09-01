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

        <div class="speed">
          <button class="dropbtn">{{ speedLabel }}</button>
          <div class="speed-content">
            <nuxt-link v-if="speedKey != 'slow'" to="/speedcard/basic-english/850/slow">遅い</nuxt-link>
            <nuxt-link v-if="speedKey != 'normal'" to="/speedcard/basic-english/850/normal">普通</nuxt-link>
            <nuxt-link v-if="speedKey != 'fast'" to="/speedcard/basic-english/850/fast">早い</nuxt-link>
            <nuxt-link v-if="speedKey != 'veryFast'" to="/speedcard/basic-english/850/veryfast">超早い</nuxt-link>
          </div>
        </div>

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
            <p>残 {{ wordLength }}</p>
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
import Speaker from '~/lib/speaker';

export default {
  validate({params}) {
    if (params.speed) {
      return /^(normal|fast|slow|veryfast)$/gm.test(params.speed);
    }
    return false;
  },
  async asyncData ({params}) {
    const speedMap = {
      veryfast: {
        speakRate: 2.25,
        delay: 500,
        label: '超早い'
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
    let speed = speedMap.normal.speed;
    let delay = speedMap.normal.delay;
    if (params.speed) {
      speed = speedMap[params.speed].speakRate;
      delay = speedMap[params.speed].delay;
    }

    const endSeconds = (basicEnglish850Words.length * (delay / 1000));
    const startDateTime = new Date();
    const endDateTime   = new Date((startDateTime.getTime() + endSeconds * 1000));
    const left = endDateTime - startDateTime;
    const a_day = 24 * 60 * 60 * 1000;

    const wordInfo = basicEnglish850Words.shift();

    return {
      speedKey: params.speed,
      speedLabel: speedMap[params.speed].label,
      speedDelay: speedMap[params.speed].delay,
      speakRate: speedMap[params.speed].speakRate,
      words: basicEnglish850Words,
      word: wordInfo.langueges.en.tokens[0],
      trans: wordInfo.langueges.ja,
      wordDelay: delay,
      startTime: startDateTime.getTime(),
      endTime: endDateTime.getTime(),
      hours: Math.floor((left % a_day) / (60 * 60 * 1000)).toString().padStart(2, "0"),
      minutes: (Math.floor((left % a_day) / (60 * 1000)) % 60).toString().padStart(2, "0"),
      seconds: (Math.floor((left % a_day) / 1000) % 60 % 60).toString().padStart(2, "0"),
      wordCounter: 0,
      wordLength: basicEnglish850Words.length,
      isPlay: false,
      isVoice: false
    }
  },
  created() {
    if (process.browser) {
      window.onbeforeunload = (e) => {
        this.speaker.cancel();
      };
    }
  },
  mounted() {
    this.speaker = new Speaker();
    if (!this.speaker.isSay()) {
      this.isPlay = true;
      this.loadPlay();
      this.loadTimer();
      return;
    }

    swal({
      title: "発音の自動再生しますか？",
      icon: "warning",
      buttons: ['再生しない', '再生する']
    })
    .then((isVoice) => {
      if (isVoice) {
        this.speaker.speed(this.speakRate);
        this.speaker.say(this.word);
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
        if (left == 0) clearInterval(this.timerInterval);
        this.startTime = parseInt(this.startTime);
        this.endTime = parseInt(this.endTime) - 1000;
        const left = this.endTime - this.startTime;
        const a_day = 24 * 60 * 60 * 1000;
        this.hours = Math.floor((left % a_day) / (60 * 60 * 1000)).toString().padStart(2, "0");
        this.minutes = (Math.floor((left % a_day) / (60 * 1000)) % 60).toString().padStart(2, "0");
        this.seconds = (Math.floor((left % a_day) / 1000) % 60 % 60).toString().padStart(2, "0");
      }, 1000);
    },
    loadPlay() {
      this.wordInterval = setInterval(() => {
        this.word = this.words[this.wordCounter].langueges.en.tokens[0];
        this.trans = this.words[this.wordCounter].langueges.ja;

        if (this.words.length == this.wordCounter) clearInterval(this.wordInterval);
        if (this.isVoice) this.speaker.say(this.word);
        if (this.isPlay == false) clearInterval(this.wordInterval);
        this.wordCounter++;
        this.wordLength--;
      }, this.wordDelay);
    },
  },
}
</script>

<style>
.container {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  margin-top: 10vh;
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


.dropbtn {
  height: 28px;
  background-color: #5e803b;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  -webkit-border-radius: 5px;/* for Safari and Chrome 対応*/
  -moz-border-radius: 5px;/* for Firefox 対応*/
}

.speed {
  position: relative;
  display: inline-block;
  vertical-align: top;
  line-height: 3vh;
}

.speed-content {
  display: none;
  position: absolute;
  background-color: #3b8070;
  min-width: 72px;
  bottom: 35px;
  left: -11px;
  z-index: 1;
}

.speed-content a {
  display: block;
  padding: 12px 16px;
  font-size: 16px;
  color: white;
  text-decoration: none;
}

.speed-content a:hover {background-color: #ccc}
.speed:hover .speed-content {
  display: block;
}

.speed:hover .dropbtn {
  background-color: #3e8e41;
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