<template>
  <main class="container">
    <div>
      <h1 class="title">
        英単語を素早く覚えましょう
      </h1>
      <h2 class="subtitle">
        ennerはベーシック英語やスペシャルイングリッシュを元にしたシンプルな英単語、フレーズを学べます。
      </h2>
      <div class="links">
        <nuxt-link to="/speedcard/basic-english/850/fast" class="button--green">
        スピードカードで英単語を覚える
        </nuxt-link>
      </div>
    </div>

    <section class="sub-section">
      <h3>スピードカードとは？</h3>
      <p class="text-center">英単語カードのように単語やフレーズをめくりながら黙読できる機能です。</p>
      <div class="links">
        <nuxt-link to="/speedcard/basic-english/850/veryfast" class="button--green">
        スピードカードで英単語を覚える(2倍速)
        </nuxt-link>
      </div>
      <div class="links">
        <nuxt-link to="/speedcard/basic-english/850/fast" class="button--green">
        スピードカードで英単語を覚える(1.5倍速)
        </nuxt-link>
      </div>
      <div class="links">
        <nuxt-link to="/speedcard/basic-english/850/normal" class="button--green">
        スピードカードで英単語を覚える(1倍速)
        </nuxt-link>
      </div>
      <div class="links">
        <nuxt-link to="/speedcard/basic-english/850/fast" class="button--green">
        スピードカードで英単語を覚える(低速)
        </nuxt-link>
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

  </main>
</template>

<script>
export default {
  components: {},
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

<style>
a {
  color: #3b8070;
  text-decoration: none;
}
.container {
  color: #526488;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.title {
  margin-top: 20vh;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  letter-spacing: 0px;
}

.subtitle {
  font-weight: 300;
  font-size: 28px;
  word-spacing: 5px;
  padding-bottom: 15px;
  text-align: justify;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
  margin-bottom: 3vh;
  font-size: 15px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.sub-section {
  margin-top: 50px;
}
.sub-section h3 {
  margin: 3vh auto;
  font-weight: 300;
  font-size: 28px;
  word-spacing: 5px;
}
.sub-section p {
  font-size: 18px;
  margin: auto 3vh;
  text-align: justify;
}


@media screen and (min-width: 760px) {
  .subtitle {
    text-align: center;
    margin: auto 10%;
  }
  .sub-section p {
    text-align: center;
    margin: auto 15%;
  }
}
</style>

