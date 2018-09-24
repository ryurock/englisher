<template>
  <main class="container">
    <section>
      <h1 class="section-top__title">スペシャルイングリッシュに関する一覧</h1>
    </section>

    <section class="section">
      <div class="links">
        <a
          v-for="(word, index) in words"
          v-bind:key="index"
          v-bind:href="`/word/special-english/${word.token}`"
          target="_blank"
          class="links__botton"
        >{{ word.token }}
        </a>
      </div>
    </section>

    <section class="section">
      <h3>スペシャルイングリッシュとは？</h3>
      <p>
        英語を母国語としない人向けに単語を約1500語に絞ったアメリカ合衆国政府が運営する国営放送<a href="https://www.voanews.com/" target="_blank">Voice of America</a>で使われている英語のことです。
        簡易な文法で非ネイティブの人がアメリカ英語を勉強するのに人気があります。
      </p>
    </section>
    <AppFooter />
  </main>
</template>

<script>
import AppFooter from "~/components/AppFooter";
import words from '~/datasets/words/basic-english/all.min.json';

export default {
  components: {AppFooter},
  head() {
    return {
      title: 'enner | 英単語やフレーズを簡単な語句、フレーズで覚えれる学べるサイト',
      meta: [
        { hid: 'description', name: 'description', content: '英語を学習できるサイト。スピードラーニングのような聞き流しや単語やフレーズをみて覚えれる勉強方法等のコンテンツがあります' }
      ]
    }
  },
  async asyncData() {
    return {
      words: words
    };
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/word/special-english/index.scss'
</style>