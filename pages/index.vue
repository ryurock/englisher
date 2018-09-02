<template>
  <main class="container">
    <div>
      <h1 class="title">
        英語スキルの向上を
      </h1>
      <h2 class="subtitle">
        ベーシック英語やスペシャルイングリッシュを元にしたシンプルな英単語、フレーズを学べます。
      </h2>
      <div class="links">
        <a href="/speedcard/basic-english/850/fast" class="button--green">
        スピードカードで英単語を覚える
        </a>
      </div>
    </div>

    <section class="sub-section">
      <h3>スピードカードとは？</h3>
      <p class="text-center">英単語カードのように単語やフレーズをめくりながら黙読できる機能です。</p>
      <div class="links">
        <a href="/speedcard/basic-english/850/veryfast" class="button--green">
        スピードカードで英単語を覚える(2倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/basic-english/850/fast" class="button--green">
        スピードカードで英単語を覚える(1.5倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/basic-english/850/normal" class="button--green">
        スピードカードで英単語を覚える(1倍速)
        </a>
      </div>
      <div class="links">
        <a href="/speedcard/basic-english/850/fast" class="button--green">
        スピードカードで英単語を覚える(低速)
        </a>
      </div>
    </section>

    <section class="sub-section">
      <h3>ベーシック英語とは？</h3>
      <p>基本単語が850と少ない単語とルールで成り立つ英語の事です。ennerでは辞書のような冗長的な品詞の種類等を取り除いて見やすく覚えやすいです。</p>
      <div class="links">
        <a
          href="/speedcard/basic-english/850"
          target="_blank"
          class="button--green">ベーシック英単語一覧を見る</a>
      </div>
    </section>

    <section class="sub-section">
      <h3>スペシャルイングリッシュとは？</h3>
      <p>
        英語を母国語としない人向けに単語を約1500語に絞ったアメリカ合衆国政府が運営する国営放送<a href="https://www.voanews.com/" target="_blank">Voice of America</a>で使われている英語のことです。
        簡易な文法で非ネイティブの人がアメリカ英語を勉強するのに人気があります。
      </p>
      <div class="links">
        <a
          href="/speedcard/basic-english/850"
          target="_blank"
          class="button--green">スペシャルイングリッシュの単語一覧を見る</a>
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
      title: 'enner | ベーシック英単語を素早く読み流す',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/pages/index.sass'
</style>