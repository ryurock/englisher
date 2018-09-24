<template>
  <main class="container">
    <section>
      <h1 class="section-top__title">ベーシック英語に関する一覧</h1>
      <h2 class="section-top__sub-title">基礎英語に関する一覧</h2>
    </section>

    <section class="section">
      <h3>動作に関するもの</h3>
      <p>動作に関するものにフォーカスを当てた単語の一覧</p>
      <div class="links">
        <a
          v-for="(relatedMovement, index) in relatedMovements"
          v-bind:key="index"
          v-bind:href="`/word/basic-english/${relatedMovement.token }`"
          target="_blank"
          class="links__botton"
        >{{ relatedMovement.token }}
        </a>
      </div>
    </section>

    <section class="section">
      <h3>状態に関するもの<br />(一般的な語)</h3>
      <p>状態に関するものにフォーカスを当てた単語の一覧</p>
      <div class="links">
        <a
          v-for="(relatedPopularState, index) in relatedPopularStates"
          v-bind:key="index"
          v-bind:href="`/word/basic-english/${relatedPopularState.token }`"
          target="_blank"
          class="links__botton"
        >{{ relatedPopularState.token }}
        </a>
      </div>
    </section>

    <section class="section">
      <h3>状態に関するもの<br />(相対する語)</h3>
      <p>状態に関するもので相対する語にフォーカスを当てた単語の一覧</p>
      <div class="links">
        <a
          v-for="(relatedRelativeState, index) in relatedRelativeStates"
          v-bind:key="index"
          v-bind:href="`/word/basic-english/${relatedRelativeState.token }`"
          target="_blank"
          class="links__botton"
        >{{ relatedRelativeState.token }}
        </a>
      </div>
    </section>

    <section class="section">
      <h3>物事に関するもの<br />(一般的な語)</h3>
      <p>物・事に関する事で目で見える物・事にフォーカスを当てた単語の一覧</p>
      <div class="links">
        <a
          v-for="(relatedPopularMovement, index) in relatedPopularMovements"
          v-bind:key="index"
          v-bind:href="`/word/basic-english/${relatedPopularMovement.token }`"
          target="_blank"
          class="links__botton"
        >{{ relatedPopularMovement.token }}
        </a>
      </div>
    </section>

    <section class="section">
      <h3>物事に関するもの<br />（視覚に訴える語）</h3>
      <p>物・事に関する事で目で見える物・事にフォーカスを当てた単語の一覧</p>
      <div class="links">
        <a
          v-for="(relatedVisionThing, index) in relatedVisionThings"
          v-bind:key="index"
          v-bind:href="`/word/basic-english/${relatedVisionThing.token }`"
          target="_blank"
          class="links__botton"
        >{{ relatedVisionThing.token }}
        </a>
      </div>
    </section>

    <section class="section">
      <h3>ベーシック英語とは？</h3>
      <p>基本単語が850と少ない単語とルールで成り立つ英語の事です。ennerでは辞書のような冗長的な品詞の種類等を取り除いて見やすく覚えやすいです。</p>
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
      title: 'enner | BasicEnglish(ベーシック・イングリッシュ)や基礎単語の一覧',
      meta: [
        { hid: 'description', name: 'description', content: 'BasicEnglish(ベーシック・イングリッシュ)や基礎単語の種類別の一覧' }
      ]
    }
  },
  async asyncData() {
    const relatedVisionThings = words.filter((word) => {
      const relatedVisionThing =  word.metaTags.find((v) => v.metaValue.type == 'relatedVisionThings');
      return (relatedVisionThing) ? word : null;
    });

    const relatedPopularStates = words.filter((word) => {
      const v = word.metaTags.find((v) => v.metaValue.type == 'relatedPopularState');
      return (v) ? word : null;
    });

    const relatedRelativeStates = words.filter((word) => {
      const v = word.metaTags.find((v) => v.metaValue.type == 'relatedRelativeState');
      return (v) ? word : null;
    });

    const relatedPopularMovements = words.filter((word) => {
      const v = word.metaTags.find((v) => v.metaValue.type == 'relatedPopularMovement');
      return (v) ? word : null;
    });

    const relatedMovements = words.filter((word) => {
      const v = word.metaTags.find((v) => v.metaValue.type == 'relatedMovement');
      return (v) ? word : null;
    });

    return {
      relatedPopularStates: relatedPopularStates,
      relatedRelativeStates: relatedRelativeStates,
      relatedPopularMovements: relatedPopularMovements,
      relatedVisionThings: relatedVisionThings,
      relatedMovements: relatedMovements,
      words: words
    };
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/word/basic-english/index.scss'
</style>