<template>
  <main class="main">
    <section class="word">
      <h1 class="word__typography">{{ word.token }}</h1>
    </section>

    <section class="translate-section">
      <div
       v-for="(translate, index) in word.translate.ja"
       v-bind:key="index">
        <h2 class="translate-section__typography">{{ translate.token }}</h2>
      </div>
    </section>
    <section class="part-of-speech-section">
      <h2 class="part-of-speech-section__title">品詞</h2>
      <h3
       v-for="(tag, index) in posTagsEn2Ja"
       v-bind:key="index"
       class="part-of-speech-section__tag">{{ tag }}</h3>
    </section>

    <section class="synonyms-section">
      <h2 class="synonyms-section__title">類義語</h2>
      <h3
       v-for="(synonym, index) in makeSynonymLink"
       v-bind:key="index"
       class="synonyms-section__tag">
       <a v-bind:href="synonym.link">{{ synonym.token }}</a>
       </h3>
    </section>

    <section class="ad">
      <div class="ad__banner">
        <img src="https://placehold.jp/320x100.png" />
      </div>
    </section>
  </main>
</template>

<script>

export default {
  async asyncData({ params }) {
    const token = params.token;
    const word = require(`~/datasets/words/basic-english/dist/${token}.min.json`);
    console.log(word);
    return {
      word: word
    };
  },
  computed: {
    posTagsEn2Ja() {
      return this.word.pos.tags.map((tag) => {
        if (tag.tag == 'Noun') return '名詞';
        if (tag.tag == 'Pronoun') return '代名詞';
        if (tag.tag == 'Verb') return '動詞';
        if (tag.tag == 'Adjective') return '形容詞';
        if (tag.tag == 'Adverb') return '副詞';
        if (tag.tag == 'Preposition') return '前置詞';
        if (tag.tag == 'Conjunction') return '接続詞';
        if (tag.tag == 'Interjection') return '間投詞';
      });
    },
    makeSynonymLink() {
      const metaKeys = this.word.metaTags.map((metaTag) => metaTag.metaKey);
      const isBasicEnglish = metaKeys.find((metaKey) => metaKey == 'basicEnglish');
      return this.word.synonyms.map((synonym) => {
        let data = { token: synonym.token };

        data.link = (isBasicEnglish) ? `/word/basic-english/${data.token}` : `/word/special-english/${data.token}`;
        return data;
      });
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Playfair+Display');

.main {
  margin-top: 5vh;
  color: #35495e;
}
.word {
  text-align: center;
  &__typography {
    margin: 3vh auto;
    padding-top: 3vh;
    font-size: 48px;
    font-family: $word-font-family;
    word-break: break-all;
    text-align: center;
  }
}

.translate-section {
  margin-top: 3vh;
  &__typography {
    width: 90%;
    margin: 3vh auto;
    font-size: 28px;
    color: #3b8070;
    text-align: center;
    letter-spacing: 0.05em;
  }

  &__part-of-speech {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1vh;
    margin-top: 6vh;

    &-title {
      font-style: italic;
      margin-top: auto;
      margin-left: 10%;
    }

    &-type {
      margin-right: 20%;
    }
  }
}

.part-of-speech-section {
  margin: 0 13px;

  &__title {
    padding-left: 8px;
    border-bottom: 1px solid #3b8070;
    border-left: 7px solid #3b8070;
    font-size: 21px;
  }

  &__tag {
    margin-top: 3vh;
    font-size: 24px;
    font-weight: 500;
  }
}

.synonyms-section {
  margin: 3vh 13px;
  &__title {
    padding-left: 8px;
    border-bottom: 1px solid #3b8070;
    border-left: 7px solid #3b8070;
    font-size: 21px;
  }
  &__tag {
    margin-top: 3vh;
    font-size: 24px;
    font-weight: 500;
  }

}
.ad {
  position: absolute;
  bottom: 10vh;
  width: 100%;
  &__banner {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>