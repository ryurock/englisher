<template>
  <section class="container">
    <div>
      <h1 class="title">
        英単語を素早く覚えましょう
      </h1>
      <h2 class="subtitle">
        ennerはベーシック英語を元にしたシンプルな英単語、フレーズを学べます。
      </h2>
      <div class="links">
        <a
          href="/speedcard/basic-english/850"
          target="_blank"
          class="button--green">スピードカードで英単語を覚える</a>
      </div>
    </div>
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
      <h3>ユーザー登録、課金は一切ありません。</h3>
      <p>必要なのは覚えたいという気持ちだけです。</p>
    </section>

  </section>
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
.container {
  color: #526488;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.title {
  margin-top: 20vh;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 40px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 28px;
  word-spacing: 5px;
  padding-bottom: 15px;
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
}

</style>