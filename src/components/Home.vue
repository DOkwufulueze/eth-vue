<template>
  <div id="home">
    <HeaderTemplate
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    />
    <BodyTemplate
      :current-view="currentView"
    />
    <FooterTemplate />
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: ['currentView'],
    methods: {
      logUserIn (evt) {
        this.$emit('log-user-in', evt)
      },
      logUserOut (evt) {
        this.$emit('log-user-out', evt)
      }
    },
    components: {
      HeaderTemplate,
      BodyTemplate,
      FooterTemplate
    }
  }

  import HeaderTemplate from './layout/HeaderTemplate'
  import BodyTemplate from './layout/BodyTemplate'
  import FooterTemplate from './layout/FooterTemplate'
</script>

<style scoped>
  #home {
    width: 100%;
  }
</style>
