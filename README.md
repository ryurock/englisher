# englisher

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Dump BackUp

```
docker-compose exec app bash --login
mysqldump -uroot -proot -h mysql enner_development > ./tmp/mysql/enner.dump.sql
```