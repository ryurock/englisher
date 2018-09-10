<template>
  <footer class="footer">
    <div class="footer__player">
      <svg
        class="octicon octicon-triangle-right footer__player-icon"
        viewBox="0 0 6 16"
        version="1.1"
        width="12"
        aria-hidden="true">
        <path fill-rule="evenodd" d="M0 14l6-6-6-6v12z"></path>
      </svg>


      <svg
        class="octicon octicon-mute footer__player-icon"
        viewBox="0 0 16 16"
        version="1.1"
        width="32"
        aria-hidden="true">
        <path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path>
      </svg>

      <div class="footer__player-speed">
        <button class="footer__player-speed-dropbtn">超早い</button>
        <div class="footer__player-speed-dropup-content">
          <a v-if="speedKey != 'slow'"     href="/speedcard/basic-english/850/slow">遅い</a>
          <a v-if="speedKey != 'normal'"   href="/speedcard/basic-english/850/normal">普通</a>
          <a v-if="speedKey != 'fast'"     href="/speedcard/basic-english/850/fast">早い</a>
          <a v-if="speedKey != 'veryfast'" href="/speedcard/basic-english/850/veryfast">超早い</a>
        </div>
      </div>

      <div class="footer__player-timer-section">
        <div class="footer__player-timer-section-timer">
          <div class="footer__player-timer-section-timer-min">
            <span class="footer__player-timer-section-timer-number">00</span>
            <span class="footer__player-timer-section-timer-format">:</span>
          </div>
          <div class="footer__player-timer-section-timer-sec">
            <span class="footer__player-timer-section-timer-number">00</span>
          </div>
        </div>
        <div class="footer__player-word-counter">
          <p>残 1500</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  color: white;
  background-color: #3b8070;
  width: 100%;
  padding: 2vh;

  &__player {
    font-size: 24px;
    text-align: center;
    height: 5vh;
    line-height: 4vh;

    &-icon {
      font-size: 3vh;
      margin-right: 2vh;
    }

    &-speed:hover &-speed-dropup-content, &-speed:hover &-speed-dropbtn {
      display: block;
    }

    &-speed {
      display: block;
      position: relative;
      display: inline-block;
      vertical-align: top;
      line-height: 3vh;

      &-dropbtn {
        height: 28px;
        background-color: #5e803b;
        color: white;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        -webkit-border-radius: 5px;/* for Safari and Chrome 対応*/
        -moz-border-radius: 5px;/* for Firefox 対応*/
      }

      &-dropup-content {
        display: none;
        position: absolute;
        background-color: #3b8070;
        min-width: 72px;
        bottom: 35px;
        left: -11px;
        z-index: 1;

        a {
          display: block;
          padding: 12px 16px;
          font-size: 16px;
          color: white;
          text-decoration: none;

          :hover {
            background-color: #ccc;
          }
        }
      }
    }

    &-timer-section {
      display: inline-block;
      margin-left: 9px;
      vertical-align: super;

      &-timer {
        display: inline-block;
        margin-right: 0.3em;

        &-hour, &-min, &-sec {
          display: inline-block;
        }
      }
    }

    &-word-counter {
      display: inline-block;
      font-size: 18px;
    }
  }
}
</style>
