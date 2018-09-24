<template>
  <main class="container">
    <section>
      <h1 class="section-top__title">
        英語スキルの向上を
      </h1>
      <h2 class="section-top__sub-title">
        ベーシック英語やスペシャルイングリッシュを元にしたシンプルな英単語、フレーズを学べます。
      </h2>
      <div class="links">
        <a href="/speedcard/basic-english/fast" class="button__green">
        スピードカードで英単語を覚える<br />(初級)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/special-english/fast" class="button__green">
        スピードカードで英単語を覚える<br />(中級)
        </a>
      </div>
    </section>

    <section class="section">
      <h3>スピードカードとは？</h3>
      <p>英単語カードのように単語やフレーズをめくりながら黙読できる機能です。</p>
      <h3>初級(Basic English)</h3>
      <div class="links">
        <a href="/speedcard/basic-english/veryfast" class="button__green">
        スピードカードで英単語を覚える<br />(2倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/basic-english/fast" class="button__green">
        スピードカードで英単語を覚える<br />(1.5倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/basic-english/normal" class="button__green">
        スピードカードで英単語を覚える<br />(普通)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/basic-english/slow" class="button__green">
        スピードカードで英単語を覚える<br />(低速)
        </a>
      </div>
      <h3>中級(Specail English)</h3>
      <div class="links">
        <a href="/speedcard/special-english/veryfast" class="button__green">
        スピードカードで英単語を覚える<br />(2倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/special-english/fast" class="button__green">
        スピードカードで英単語を覚える<br />(1.5倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/special-english/normal" class="button__green">
        スピードカードで英単語を覚える<br />(普通)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/special-english/slow" class="button__green">
        スピードカードで英単語を覚える<br />(低速)
        </a>
      </div>
    </section>

    <section class="section">
      <h3>ベーシック英語とは？</h3>
      <p>基本単語が850と少ない単語とルールで成り立つ英語の事です。ennerでは辞書のような冗長的な品詞の種類等を取り除いて見やすく覚えやすいです。</p>
      <div class="links">
        <a
          href="/word/basic-english/"
          target="_blank"
          class="button__green">ベーシック英単語一覧を見る</a>
      </div>
    </section>

    <section class="section">
      <h3>スペシャルイングリッシュとは？</h3>
      <p>
        英語を母国語としない人向けに単語を約1500語に絞ったアメリカ合衆国政府が運営する国営放送<a href="https://www.voanews.com/" target="_blank">Voice of America</a>で使われている英語のことです。
        簡易な文法で非ネイティブの人がアメリカ英語を勉強するのに人気があります。
      </p>
      <div class="links">
        <a
          href="/word/special-english/"
          target="_blank"
          class="button__green">スペシャルイングリッシュの単語一覧を見る</a>
      </div>
    </section>
    <AppFooter />
  </main>
</template>

<script>
import AppFooter from "~/components/AppFooter";
export default {
  components: {AppFooter},
  head() {
    return {
      title: 'enner | 英単語やフレーズを簡単な語句、フレーズで覚えれる学べるサイト',
      meta: [
        { hid: 'description', name: 'description', content: '英語を学習できるサイト。スピードラーニングのような聞き流しや単語やフレーズをみて覚えれる勉強方法等のコンテンツがあります' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/index.scss'
</style>