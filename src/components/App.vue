<template>
  <div id="app">
    <router-view
      :current-view="currentView"
      :user="user">
      </router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    ...mapState({
      hasInjectedWeb3: state => state.web3.isInjected,
      hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
      isConnectedToApprovedNetwork: state => state.user.isConnectedToApprovedNetwork,
      hasCoinbase: state => state.user.hasCoinbase,
      networkId: state => state.web3.networkId,
      coinbase: state => state.web3.coinbase,
      currentRoute: state => state.currentRoute,
      user: state => state.user
    }),
    currentView () {
      switch (this.$route.path) {
        case '/home':
          return Web3Message
        case '/dashboard':
          return Profile
        case '/sign-up':
          return ProfileForm
        case '/profile/edit':
          return ProfileForm
        default:
          return Web3Message
      }
    },
    isLoggedIn () {
      return this.$store.state.user.isLoggedIn
    }
  },
  components: {
    Profile,
    ProfileForm,
    Web3Message
  },
  beforeCreate: function () {
    this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
    .then(() => {
      this.$store.dispatch(ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS)
    })
    .catch((result) => {
      console.log("We've encountered problems with your Web3 connection")
    })
  },
  created: function () {
    this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route)
  },
  methods: {
    ...mapActions([
      ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO,
      ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS
    ])
  },
  watch: {
    hasInjectedWeb3: function (web3ConnectionValue) {
      console.log('hasInjectedWeb3: ', web3ConnectionValue)
    },
    networkId: function (networkId) {
      console.log('networkId: ' + networkId)
    },
    coinbase: function (coinbase) {
      console.log('coinbase: ' + coinbase)
    },
    $route: function (newRoute) {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute)
    },
    isLoggedIn: function (newValue) {
      if (!newValue) this.$router.push('/')
    }
  }
}

import { mapState, mapActions } from 'vuex'
import { ACTION_TYPES } from '../util/constants'
import Profile from './sections/Profile'
import ProfileForm from './sections/ProfileForm'
import Web3Message from './sections/Web3Message'
</script>

<style>
body {
  margin: 0;
  width: 100%;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  min-width: 1020px;
  margin: auto;
}
</style>
