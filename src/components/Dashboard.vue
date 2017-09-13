<template v-if="isLoggedIn">
  <div id="dashboard">
    <HeaderTemplate />
    <BodyTemplate :current-view="currentView" />
    <FooterTemplate />
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    props: [ 'currentView' ],
    components: {
      HeaderTemplate,
      BodyTemplate,
      FooterTemplate
    },
    created: function () {
      if (this.$store.state.user.email === '' || !this.$store.state.user.isLoggedIn) this.$router.push('/')
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      isLoggedIn () {
        return this.$store.state.user.isLoggedIn
      }
    },
    methods: {
      ...mapActions([
        ACTION_TYPES.LOGIN
      ])
    }
  }

  import { mapActions } from 'vuex'
  import HeaderTemplate from './layout/HeaderTemplate'
  import BodyTemplate from './layout/BodyTemplate'
  import FooterTemplate from './layout/FooterTemplate'
  import { ACTION_TYPES } from '../util/constants'
</script>

<style scoped>
  #dashboard {
    width: 100%;
  }
</style>
