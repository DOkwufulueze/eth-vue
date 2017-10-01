<template>
  <div id="home">
    <HeaderTemplate :user="user" />
    <BodyTemplate
      :current-view="currentView"
      :user="user"
    />
    <FooterTemplate />
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: [ 'currentView', 'user' ],
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
