<template>
  <section>
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
      width="32"
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
      <div class="timer" v-show="statusType !== 'expired'">
        <div class="hour">
          <span class="number">{{ hours }}</span>
          <span class="format">{{ wordString.hours }}</span>
        </div>
        <div class="min">
          <span class="number">{{ minutes }}</span>
          <span class="format">{{ wordString.minutes }}</span>
        </div>
        <div class="sec">
          <span class="number">{{ seconds }}</span>
        </div>
      </div>
      <div class="timer-message">
        <p>残 {{ count }}</p>
      </div>
      <div class="status-tag" :class="statusType">{{ statusText }}</div>
    </div>
  </section>
</template>

<style>
.countdown-timer-wrap {
  display: inline-block;
  width: 29vh;
  vertical-align: top;
}
.timer {
  display: inline-block;
  width: 54%;
}

.timer-message {
  display: inline-block;
}
.hour, .min, .sec, .message {
  display: inline-block;
}
.format {
  vertical-align: text-bottom;
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

<script>
export default {
  name: 'CountDownTimer',
  props: [
    'startTime',
    'endTime',
    'trans',
    'wordDelay',
    'wordLength',
    'isVoice',
    'isPlay'
  ] ,
  data: function(){
  	return {
    	timer:"",
      wordString: {},
      start: "",
      end: "",
      timerInterval: null,
      wordInterval: null,
      nextWordDecrement: null,
      days:"",
      minutes:"",
      hours:"",
      seconds:"",
      message:"",
      count: null,
      statusType:"",
      statusText: "",
    };
  },
  created: function () {
    this.wordString = this.trans;
  },
  mounted(){
    this.start = this.startTime.getTime();
    this.end = this.endTime.getTime();
    // Update the count down every 1 second
    this.timerCount(this.start,this.end);
    this.count = this.wordLength;
    this.loadTimer();
    this.loadWordCount();
  },
  methods: {
    loadWordCount() {
      this.wordInterval = setInterval(() => {
        this.count--;
        if (this.count == 0) {
          clearInterval(this.wordInterval);
        }
      }, this.wordDelay);
    },
    loadTimer() {
      this.timerInterval = setInterval(() => {
          this.timerCount(this.start,this.end);
      }, 1000);
    },
    toggleVoice(voice) {
      this.$emit('toggleVoice', voice);
    },
    togglePlay(play) {
      if (play == false) {
        clearInterval(this.timerInterval);
        clearInterval(this.wordInterval);
      } else {
        this.loadTimer();
        this.loadWordCount();
      }
      this.$emit('togglePlay', play);
    },
    timerCount(start, end) {

        // Get todays date and time
        const now = new Date().getTime();

        // Find the distance between now an the count down date
        const distance = start - now;
        const passTime =  end - now;

        if(distance < 0 && passTime < 0){
          this.message = this.wordString.expired;
          this.statusType = "expired";
          this.statusText = this.wordString.status.expired;
          clearInterval(this.interval);
          return;
        } else if(distance < 0 && passTime > 0) {
          this.calcTime(passTime);
          this.message = this.wordString.running;
          this.statusType = "running";
          this.statusText = this.wordString.status.running;
        } else if( distance > 0 && passTime > 0 ){
          this.calcTime(distance);
          this.message = this.wordString.upcoming;
          this.statusType = "upcoming";
          this.statusText = this.wordString.status.upcoming;
        }
    },
    calcTime(dist) {
      // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.hours = String(this.hours).padStart(2, 0);
        this.minutes = String(Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, 0);
        this.seconds = String(Math.floor((dist % (1000 * 60)) / 1000)).padStart(2, 0);
    }
  }
}
</script>