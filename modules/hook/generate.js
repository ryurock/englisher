const fs = require('fs');

module.exports = function () {
  this.nuxt.hook('generate:before', async generator => {
    let robotsTxtContext = `
    User-Agent: *
    Disallow: /
    `.trim();

    if (process.env.APP_ENV == 'production') robotsTxtContext = 'User-Agent: *';
    fs.writeFileSync('./static/robots.txt', robotsTxtContext);
  });
};