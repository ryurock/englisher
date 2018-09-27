<template>
  <main class="container">
    <section>
      <h1 class="section-top__title">
        英単語を覚えて英語を楽しみましょう
      </h1>
      <h2 class="section-top__sub-title">
        スピードカード(英単語カード)を使って中高校生レベルの単語を覚えれます。
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