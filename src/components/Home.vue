<template>
  <div id="home">
    <HeaderTemplate />
    <BodyTemplate :current-view="currentView"/>
    <FooterTemplate />
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: [ 'currentView' ],
    components: {
      HeaderTemplate,
      BodyTemplate,
      FooterTemplate
    },
    computed: {
      user () {
        return this.$store.state.user
      }
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
