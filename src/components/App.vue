<template>
  <div id="app">
    <router-view
      :is-d-app-ready="isDAppReady"
      :current-view="currentView"
      :is-valid-user-but="isValidUserBut"
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    >
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      logUserIn (evt) {
        this.$emit('log-user-in', evt)
      },
      logUserOut (evt) {
        this.$emit('log-user-out', evt)
      }
    },
    props: [ 'isDAppReady', 'currentView', 'isValidUserBut' ]
  }

</script>

<style>
  html {
    background: #eef0ef;
  }

  body {
    margin: 0;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  textarea {
    resize: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    /*max-width: 960px;*/
    min-width: 1020px;
    margin: auto;
  }
</style>
