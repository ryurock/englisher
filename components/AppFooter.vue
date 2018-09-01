<template>
  <footer class="app-footer">
    <p class="privacy"><nuxt-link to="/privacy">プライバシー</nuxt-link></p>
    <p class="copyright">©Copyright2018 <nuxt-link to="/" rel="nofollow">enner</nuxt-link>.All Rights Reserved.</p>
  </footer>
</template>

<style>
.app-footer {
  font-size: 11px;
  width: 100%;
  height: 30px;
}

.app-footer a {
  color: #555;
}

.privacy {
  margin: 1vh;
}

.copyright {
  color: #526488;
  margin: 1vh;
  text-align: center;
}
.copyright a {
  color: #3b8070;
  text-decoration: none;
}
</style>

