<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<style lang="stylus">
  #app
    height 100%
</style>
