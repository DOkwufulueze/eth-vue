<template>
  <div id="app">
    <router-view
      :is-d-app-ready="isDAppReady"
      :current-view="currentView"
      :is-valid-user-but="isValidUserBut"
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    isDAppReady: {
      type: Boolean,
      default: false
    },
    currentView: {
      type: Object,
      default: null
    },
    isValidUserBut: {
      type: String,
      default: '0'
    }
  },
  methods: {
    logUserIn (evt) {
      this.$emit('log-user-in', evt)
    },
    logUserOut (evt) {
      this.$emit('log-user-out', evt)
    }
  }
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
