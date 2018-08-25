<template>
  <div class="countdown-timer-wrap">
    <div v-show ="statusType !== 'expired'">
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
    <div class="message">{{ message }}</div>
    <div class="status-tag" :class="statusType">{{ statusText }}</div>
  </div>
</template>

<style>
.countdown-timer-wrap {
  display: inline-block;
  width: 16vh;
  vertical-align: top;
}
.hour, .min, .sec {
  display: inline-block;
}
</style>

<script>
export default {
  name: 'countDownTimer',
  props: ['starttime','endtime','trans'] ,
  data: function(){
  	return{
    	timer:"",
      wordString: {},
      start: "",
      end: "",
      interval: "",
      days:"",
      minutes:"",
      hours:"",
      seconds:"",
      message:"",
      statusType:"",
      statusText: "",

    };
  },
  created: function () {
        this.wordString = JSON.parse(this.trans);
    },
  mounted(){
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start,this.end);
    this.interval = setInterval(() => {
        this.timerCount(this.start,this.end);
    }, 1000);
  },
  methods: {
    timerCount: function(start,end){
        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = start - now;
        var passTime =  end - now;

        if(distance < 0 && passTime < 0){
            this.message = this.wordString.expired;
            this.statusType = "expired";
            this.statusText = this.wordString.status.expired;
            clearInterval(this.interval);
            return;

        }else if(distance < 0 && passTime > 0){
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