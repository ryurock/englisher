<template>
  <header class="header">
    <h1 class="header__logo"><a href="/">enner</a></h1>
  </header>
</template>
<style lang="scss">
.header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;

  &__logo {
    display: inline-block;
    margin-left: 3%;
    margin-top: 5px;
    font-size: 22px;
    font-family: $title-font-family;
    font-style: italic;
    font-weight: normal;
    color: $white;

    a {
      text-decoration: none;
      letter-spacing: -1px;
    }
  }
}

.logo {
  display: inline-block;
  margin-left: 3%;
  margin-top: 5px;
  font-size: 22px;
  font-family: $title-font-family;
  font-style: italic;
  font-weight: normal;
  color: $white;

  a {
    text-decoration: none;
    color: $white;
    letter-spacing: -1px;
  }
}
</style>
