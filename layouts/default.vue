<template>
  <div>
    <AppHeader />
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.header {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #3b8070;
}
.logo {
  width: 10vh;
  height: 5vh;
  margin: 0;
  margin-left: 1vh;
  font-size: 22px;
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-style: italic;
  font-weight: normal;
  line-height: 5vh;
  color: white;
}
</style>
<script>
import AppHeader from "~/components/Header";
export default {
  components: {AppHeader}
}
</script>


