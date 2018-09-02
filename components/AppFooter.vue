<template>
  <footer class="app-footer">
    <p class="privacy"><nuxt-link to="/privacy">プライバシー</nuxt-link></p>
    <p class="copyright">©Copyright2018 <nuxt-link to="/" rel="nofollow">enner</nuxt-link>.All Rights Reserved.</p>
  </footer>
</template>

<style lang="sass">
.app-footer
  font-size: 11px
  width: 100%
  height: 30px

.app-footer a
  color: $brown

.privacy
  margin: 1vh

.copyright
  color: $text-color
  margin: 1vh
  text-align: center
</style>

