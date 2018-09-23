<template>
  <main class="main">
    <section class="word">
      <h1 class="word__typography">{{ word }}</h1>
    </section>

    <section class="translate-section">
      <div>
        <h2 class="translate-section__typography">{{ translate }}</h2>
      </div>

    </section>
    <section class="ad">
      <div class="ad__banner">
        <img src="https://placehold.jp/320x100.png" />
      </div>
    </section>
    <footer class="footer">
      <div class="footer__player">
        <svg
          v-if="isPlay == false"
          v-on:click="togglePlay(true)"
          class="octicon octicon-triangle-right footer__player-icon"
          viewBox="0 0 6 16"
          version="1.1"
          width="12"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M0 14l6-6-6-6v12z"></path>
        </svg>
        <svg
          v-else
          v-on:click="togglePlay(false)"
          class="octicon octicon-x footer__player-icon"
          viewBox="0 0 12 16"
          version="1.1"
          width="26"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path>
        </svg>

        <svg
          v-if="isSpeak == false"
          v-on:click="toggleSpeak(true)"
          class="octicon octicon-mute footer__player-icon"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path>
        </svg>
        <svg
          v-else
          v-on:click="toggleSpeak(false)"
          class="octicon octicon-unmute footer__player-icon"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true">
          <path fill-rule="evenodd" d="M12 8.02c0 1.09-.45 2.09-1.17 2.83l-.67-.67c.55-.56.89-1.31.89-2.16 0-.85-.34-1.61-.89-2.16l.67-.67A3.99 3.99 0 0 1 12 8.02zM7.72 2.28L4 6H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2l3.72 3.72c.47.47 1.28.14 1.28-.53V2.81c0-.67-.81-1-1.28-.53zm5.94.08l-.67.67a6.996 6.996 0 0 1 2.06 4.98c0 1.94-.78 3.7-2.06 4.98l.67.67A7.973 7.973 0 0 0 16 8c0-2.22-.89-4.22-2.34-5.66v.02zm-1.41 1.41l-.69.67a5.05 5.05 0 0 1 1.48 3.58c0 1.39-.56 2.66-1.48 3.56l.69.67A5.97 5.97 0 0 0 14 8.02c0-1.65-.67-3.16-1.75-4.25z"></path>
        </svg>

        <div class="footer__player-speed">
          <button class="footer__player-speed-dropbtn">{{ speedMap.label }}</button>
          <div class="footer__player-speed-dropup-content">
            <a
              v-for="(link, index) in links" v-bind:key="index"
              v-if="speedParam != link.key"
              v-bind:href="link.link"
            >
              {{link.label}}
            </a>
          </div>
        </div>

        <div class="footer__player-timer-section">
          <div class="footer__player-timer-section-timer">
            <div class="footer__player-timer-section-timer-min">
              <span class="footer__player-timer-section-timer-number">{{ timerTime.minutes }}</span>
              <span class="footer__player-timer-section-timer-format">:</span>
            </div>
            <div class="footer__player-timer-section-timer-sec">
              <span class="footer__player-timer-section-timer-number">{{ timerTime.seconds }}</span>
            </div>
          </div>
          <div class="footer__player-word-counter">
            <p>残 {{ wordLength }}</p>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>

<script>
import swal from 'sweetalert';
import Speaker from '~/lib/speaker';

export default {
  props: [
    'words',
    'speedParam',
    'type'
  ],
  data() {
    const speedMap = {
      veryfast: {
        speakRate: 2.25,
        delay: 500,
        label: '超早',
        link: `/speedcard/${this.type}/veryfast`
      },
      fast: {
        speakRate: 1.75,
        delay: 750,
        label: '早い',
        link: `/speedcard/${this.type}/fast`
      },
      normal: {
        speakRate: 1,
        delay: 1000,
        label: '普通',
        link: `/speedcard/${this.type}/normal`
      },
      slow: {
        speakRate: 1,
        delay: 2000,
        label: '遅い',
        link: `/speedcard/${this.type}/slow`
      }
    };
    const wordCounter = 0;
    const timerTime = this.endTime(this.words.length, speedMap[this.speedParam].delay);
    return {
      word: this.words[wordCounter].token,
      wordLength: this.words.length,
      translate: this.words[wordCounter].translate.ja[0].token,
      links: [
        {key: "veryfast", label: speedMap.veryfast.label, link: speedMap.veryfast.link},
        {key: "fast", label: speedMap.fast.label,     link: speedMap.fast.link},
        {key: "normal", label: speedMap.normal.label,   link: speedMap.normal.link},
        {key: "slow", label: speedMap.slow.label,     link: speedMap.slow.link},
      ],
      speedMap: speedMap[this.speedParam],
      wordCounter: wordCounter,
      timerTime: timerTime,
      isPlay: false,
      isSpeak: false,
    };
  },
  mounted() {
    this.speaker = new Speaker();
    // 音声未対応の場合
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
    .then((isSpeak) => {
      this.isPlay = true;
      this.speaker.speed(this.speedMap.speakRate);
      this.isSpeak = (isSpeak) ? true : false;
      this.loadPlay();
      this.loadTimer();
    });
  },
  methods: {
    loadTimer() {
      this.timerInterval = setInterval(() => {
        this.timerTime = this.endTime(this.wordLength, this.speedMap.delay);
      }, 1000);
    },
    endTime(wordLength, speedDelay) {
      const endSeconds = (wordLength * (speedDelay / 1000));
      const startDateTime = new Date();
      const endDateTime   = new Date((startDateTime.getTime() + endSeconds * 1000));
      const left = endDateTime - startDateTime;
      const a_day = 24 * 60 * 60 * 1000;
      return {
        hours:   Math.floor((left % a_day) / (60 * 60 * 1000)).toString().padStart(2, "0"),
        minutes: (Math.floor((left % a_day) / (60 * 1000)) % 60).toString().padStart(2, "0"),
        seconds: (Math.floor((left % a_day) / 1000) % 60 % 60).toString().padStart(2, "0")
      };
    },
    toggleSpeak(isSpeak) {
      this.isSpeak = isSpeak;
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
    loadPlay() {
      this.wordInterval = setInterval(() => {
        if (this.words.length - 1 == this.wordCounter) clearInterval(this.wordInterval);
        if (this.isPlay == false) clearInterval(this.wordInterval);

        this.word = this.words[this.wordCounter].token;
        this.translate = this.words[this.wordCounter].translate.ja[0].token
        if (this.isSpeak) this.speaker.say(this.word);

        this.wordCounter++;
        this.wordLength--;
      }, this.speedMap.delay);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/SpeedCard.scss';
</style>
