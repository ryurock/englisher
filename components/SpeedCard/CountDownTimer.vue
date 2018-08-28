<template>
  <div class="countdown-timer-wrap">
    <div class="timer" v-show ="statusType !== 'expired'">
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
    'wordLength'
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
    this.timerInterval = setInterval(() => {
        this.timerCount(this.start,this.end);
    }, 1000);
    this.count = this.wordLength;
    this.wordInterval = setInterval(() => {
      this.count--;
      if (this.count == 0) {
        clearInterval(this.wordInterval);
      }
    }, this.wordDelay);
  },
  methods: {
    timerCount: function(start, end){

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
    calcTime: function(dist){
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