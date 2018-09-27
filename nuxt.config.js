module.exports = {
  generate: {
    routes: function(callback) {
      // const basicEnglish = require('./datasets/words/basic-english/speedcard.min.json');
      // let routeMap = basicEnglish.map(((word) => {
      //   return `/word/basic-english/${word.token}`;
      // }));

      // const specialEnglish = require('./datasets/words/special-english/speedcard.min.json');
      // let specialEnglishWords = specialEnglish.map((word) => {
      //   return `/word/special-english/${word.token}`;
      // });
      // routeMap = routeMap.concat(specialEnglishWords);

      const speedCardBasicEnglishPages = [
        '/speedcard/basic-english/veryfast',
        '/speedcard/basic-english/fast',
        '/speedcard/basic-english/normal',
        '/speedcard/basic-english/slow',
      ];
      const speedCardSpecialEnglishPages = [
        '/speedcard/special-english/veryfast',
        '/speedcard/special-english/fast',
        '/speedcard/special-english/normal',
        '/speedcard/special-english/slow',
      ];
      let routeMap = [].concat(speedCardBasicEnglishPages).concat(speedCardSpecialEnglishPages);
      callback(null, routeMap);
    }
  },
  env: {
    appEnv: (process.env.BRANCH == 'master') ? 'production' : 'development'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'enner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'シンプルな英語で学ぶ英語学習サイト' },
      { name: 'google-site-verification', content: 'OCKQGz_z2bJykgmD7MaKbq4Jd2lpHjX5vTOWhGh-CHY' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/purecss@1.0.0/build/pure-min.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~plugins/ga.js', ssr: false }
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'sweetalert',
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: [
    ['nuxt-sass-resources-loader', [
      '@/assets/scss/_base.scss',
    ]],
    ['@nuxtjs/sitemap'],
    '@/modules/hook/generate'
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://enner.link',
    generate: true,
    exclude: [
      '/admin'
    ]
  }
};