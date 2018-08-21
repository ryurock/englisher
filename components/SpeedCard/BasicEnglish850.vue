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
  </section>
</template>

<script>
import BasicEnglish850Words from '~/models/words/basic-english850.json'
export default {
    name: 'speedCardBasicEnglish850',
    data () {
      return { BasicEnglish850Words }
    },
    methods: {
      hoge: function(){
        console.log('hoge');
      }
    }
  }
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.character-token {
  margin-bottom: 3%;
}
.character-token h1 {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: bold;
  font-size: 80px;
  color: #35495e;
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
  margin-bottom: 2%;
  font-size: 22px;
}

.part-of-speech-title {
  display: inline-block;
  width: 20%;
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
  font-size: 24px;
}

</style>