<template>
  <component class="body-template" :is="currentView"></component>
</template>

<script>
  export default {
    name: 'body-template',
    props: ['currentView'],
    computed: {
      user () {
        return this.$store.state.user
      },
      isLoggedIn () {
        return this.$store.state.user.isLoggedIn
      }
    }
  }
</script>

<style scoped>
  .body-template {
    width: 100%;
  }
</style>
