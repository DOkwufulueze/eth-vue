<template v-if="isLoggedIn">
  <div id="dashboard">
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
    name: 'dashboard',
    props: [ 'currentView', 'user' ],
    components: {
      HeaderTemplate,
      BodyTemplate,
      FooterTemplate
    },
    created: function () {
      if (this.user.email === '' || !this.user.isLoggedIn) this.$router.push('/')
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
