import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'

import { mapState, mapActions } from 'vuex'
import { ACTION_TYPES } from './util/constants'
import UserManager from './js/UserManager'
import monitorWeb3 from './util/web3/monitorWeb3'

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App :is-d-app-ready="isDAppReady" :current-view="currentView" :is-valid-user-but="isValidUserBut" />',
  components: { App },
  beforeCreate: function () {
    this.$store.dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
    .then((result) => {
      let state = result.state
      monitorWeb3(state)
      this.$store.dispatch(ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS)
      .then(() => {
        if (!(this.isDAppReady)) {
          this.forcedIsValidUserBut = '0'
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
        }
      })
      .catch(() => {
        console.log('Unable to UPDATE_USER_BLOCKCHAIN_STATUS')
        if (!(this.isDAppReady)) {
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
        }
      })
    })
    .catch((result = {}) => {
      let state = result.state
      this.forcedIsValidUserBut = '0'
      monitorWeb3(state)
      if (!(this.isDAppReady)) {
        this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true)
      }

      console.error(result, 'Unable to REGISTER_WEB3_INSTANCE')
    })
  },
  computed: {
    ...mapState({
      hasInjectedWeb3: state => state.web3.isInjected,
      hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
      isConnectedToApprovedNetwork: state => state.user.isConnectedToApprovedNetwork,
      hasCoinbase: state => state.user.hasCoinbase,
      networkId: state => state.web3.networkId,
      coinbase: state => state.web3.coinbase,
      currentRoute: state => state.currentRoute,
      currentView: state => state.currentView,
      user: state => state.user,
      isDAppReady: state => state.isDAppReady,
      isValidUserBut: state => state.isValidUserBut,
      originalIsValidUserBut: state => state.originalIsValidUserBut,
      gravatarURL: state => state.gravatarURL,
      avatarCanvas: state => state.avatarCanvas,
      defaultRoute: state => state.defaultRoute
    })
  },
  created: function () {
    this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route)
    this[ACTION_TYPES.SET_CURRENT_VIEW](this.$route)
  },
  data: function () {
    return {
      managers: {
        UserManager
      }
    }
  },
  methods: {
    ...mapActions([
      ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO,
      ACTION_TYPES.UPDATE_USER_GRAVATAR,
      ACTION_TYPES.SET_IS_VALID_USER_BUT,
      ACTION_TYPES.RESET_IS_VALID_USER_BUT,
      ACTION_TYPES.SET_CURRENT_VIEW,
      ACTION_TYPES.LOGIN
    ]),
    callUpdateUserGravatar (payload = null) {
      this[ACTION_TYPES.UPDATE_USER_GRAVATAR](payload)
    },
    callToWriteUser (payload = null) {
      const actionParams = Object.assign({}, payload.requestParams, {
        methodName: payload.methodName,
        contractIndexToUse: payload.contractIndexToUse
      })
      this.managers[payload.managerIndex || 'UserManager'].writeData(this.$store.state, actionParams)
      .then((userData) => {
        this[ACTION_TYPES.LOGIN]({
          userObject: payload.vueObject
        })
        .then(() => {
          if (payload.callback) payload.callback(userData)
        })
      })
      .catch((err) => {
        if (payload.callback) payload.callback()
        console.error(err, 'Unable to write user data')
      })
    },
    callSetIsValidUserBut (newValue) {
      this[ACTION_TYPES.SET_IS_VALID_USER_BUT](newValue)
    },
    callResetIsValidUserBut () {
      this[ACTION_TYPES.RESET_IS_VALID_USER_BUT]()
    },
    callToWriteData (payload = null) {
      const actionParams = Object.assign({}, payload.requestParams, {
        methodName: payload.methodName,
        contractIndexToUse: payload.contractIndexToUse
      })
      const value = payload.value
      this.managers[payload.managerIndex || 'UserManager'].writeData(this.$store.state, actionParams, value)
      .then((responseObject) => {
        if (payload.callback) payload.callback(responseObject)
      })
      .catch((err) => {
        if (payload.callback) payload.callback(false)
        console.error(err, `Unable to ${payload.methodName}`)
      })
    }
  },
  watch: {
    hasInjectedWeb3 (web3ConnectionValue) {
      console.log('hasInjectedWeb3: ', web3ConnectionValue)
    },
    networkId (networkId) {
      console.log('networkId: ', networkId)
    },
    coinbase (coinbase) {
      console.log('coinbase: ', coinbase)
    },
    isDAppReady (isDAppReady) {
      console.log('isDAppReady: ', isDAppReady)
      this.callSetIsValidUserBut(this.$route.query.isValidUserBut || this.forcedIsValidUserBut)
    },
    $route (newRoute) {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute)
      this[ACTION_TYPES.SET_CURRENT_VIEW](newRoute)
      const isValidUserBut = this.$route.query.isValidUserBut
      if (isValidUserBut) {
        this.callSetIsValidUserBut(isValidUserBut)
      } else {
        this.callResetIsValidUserBut()
      }
    }
  }
})
