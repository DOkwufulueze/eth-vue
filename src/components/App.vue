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
  name: "App",
  computed: {
    ...mapState({
      hasInjectedWeb3: state => state.web3.isInjected,
      hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
      isConnectedToApprovedNetwork: state =>
        state.user.isConnectedToApprovedNetwork,
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
  data: function() {
    return {
      managers: { UserManager }
    };
  },
  watch: {
    hasInjectedWeb3(web3ConnectionValue) {
      console.log("App:::hasInjectedWeb3: ", web3ConnectionValue);
    },
    networkId(networkId) {
      console.log("App:::networkId: ", networkId);
    },
    coinbase(coinbase) {
      console.log("App:::coinbase: ", coinbase);
    },
    isDAppReady(isDAppReady) {
      console.log("App:::isDAppReady: ", isDAppReady);
      this.callSetIsValidUserBut(
        this.$route.query.isValidUserBut || this.forcedIsValidUserBut
      );
    },
    $route(newRoute) {
      this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](newRoute);
      this[ACTION_TYPES.SET_CURRENT_VIEW](newRoute);
      const isValidUserBut = this.$route.query.isValidUserBut;
      if (isValidUserBut) {
        this.callSetIsValidUserBut(isValidUserBut);
      } else {
        this.callResetIsValidUserBut();
      }
    }
  },
  beforeCreate: function() {
    this.$store
      .dispatch(ACTION_TYPES.REGISTER_WEB3_INSTANCE)
      .then(result => {
        let state = result.state;
        monitorWeb3(state);
        this.$store
          .dispatch(ACTION_TYPES.UPDATE_USER_BLOCKCHAIN_STATUS)
          .then(() => {
            if (!this.isDAppReady) {
              this.forcedIsValidUserBut = "0";
              this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true);
            }
          })
          .catch(() => {
            console.log("App:::Unable to UPDATE_USER_BLOCKCHAIN_STATUS");
            if (!this.isDAppReady) {
              this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true);
            }
          });
      })
      .catch((result = {}) => {
        let state = result.state;
        this.forcedIsValidUserBut = "0";
        monitorWeb3(state);
        if (!this.isDAppReady) {
          this.$store.dispatch(ACTION_TYPES.UPDATE_DAPP_READINESS, true);
        }

        console.error(result, "App:::Unable to REGISTER_WEB3_INSTANCE");
      });
  },
  created: function() {
    this[ACTION_TYPES.CHANGE_CURRENT_ROUTE_TO](this.$route);
    this[ACTION_TYPES.SET_CURRENT_VIEW](this.$route);
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
    callUpdateUserGravatar(payload = null) {
      this[ACTION_TYPES.UPDATE_USER_GRAVATAR](payload);
    },
    callToWriteUser(payload = null) {
      const actionParams = Object.assign({}, payload.requestParams, {
        methodName: payload.methodName,
        contractIndexToUse: payload.contractIndexToUse
      });
      this.managers[payload.managerIndex || "UserManager"]
        .accessBlockchain(this.$store.state, actionParams)
        .then(userData => {
          this[ACTION_TYPES.LOGIN]({
            userObject: payload.vueObject
          })
            .then(() => {
              if (payload.callback) payload.callback(userData);
            })
            .catch(error => {
              console.error("App:::Unable to perform login action: " + error);
            });
        })
        .catch(error => {
          if (payload.callback) payload.callback(false);
          console.error("App:::Unable to write user data: " + error);
        });
    },
    callSetIsValidUserBut(newValue) {
      this[ACTION_TYPES.SET_IS_VALID_USER_BUT](newValue);
    },
    callResetIsValidUserBut() {
      this[ACTION_TYPES.RESET_IS_VALID_USER_BUT]();
    },
    callToAccessBlockchain(payload = null) {
      const actionParams = Object.assign({}, payload.requestParams, {
        methodName: payload.methodName,
        contractIndexToUse: payload.contractIndexToUse
      });
      const value = payload.value;
      this.managers[payload.managerIndex || "UserManager"]
        .accessBlockchain(this.$store.state, actionParams, value)
        .then(responseObject => {
          if (payload.callback) payload.callback(responseObject);
        })
        .catch(err => {
          if (payload.callback) payload.callback(false);
          console.error(
            err,
            `App:::Unable to ${payload.methodName}. You may not need to pay any attention to this error. A page load on Sign Up may throw this error, but everything is fine.`
          );
        });
    },
    logUserIn(evt = null) {
      if (!this.user.isLoggedIn) {
        this.$root.callToAccessBlockchain({
          requestParams: {},
          contractIndexToUse: "UserAuthManager",
          methodName: "login",
          managerIndex: "UserManager",
          callback: (isUserExists = false) => {
            if (evt) evt.target.disabled = false;
            if (isUserExists) {
              UserManager.promisifyUserData(this.$store.state)
                .then(userObject => {
                  this.$store
                    .dispatch(ACTION_TYPES.LOGIN, {
                      userObject
                    })
                    .then(() => {
                      console.log(
                        "App:::LOGIN Successful",
                        this.user.isLoggedIn
                      );
                      if (this.user.isLoggedIn) this.$router.push("/dashboard");
                      else this.$router.push("/home");
                    })
                    .catch(() => {
                      console.log("App:::Unable to LOGIN");
                      if (!this.isDAppReady) {
                        this.$store.dispatch(
                          ACTION_TYPES.UPDATE_DAPP_READINESS,
                          true
                        );
                      }
                    });
                })
                .catch((result = {}) => {
                  console.error(result, "App:::Unable to fetch User Data");
                  if (result.isValid) {
                    this.$store
                      .dispatch(
                        ACTION_TYPES.INITIALISE_IS_VALID_USER_BUT,
                        result.warningMessage
                      )
                      .then(() => {
                        if (!this.isDAppReady) {
                          this.$store.dispatch(
                            ACTION_TYPES.UPDATE_DAPP_READINESS,
                            true
                          );
                        }
                      })
                      .catch(() => {
                        console.log(
                          "App:::Unable to INITIALISE_IS_VALID_USER_BUT"
                        );
                        if (!this.isDAppReady) {
                          this.$store.dispatch(
                            ACTION_TYPES.UPDATE_DAPP_READINESS,
                            true
                          );
                        }
                      });
                  } else {
                    if (!this.isDAppReady) {
                      this.$store.dispatch(
                        ACTION_TYPES.UPDATE_DAPP_READINESS,
                        true
                      );
                    }
                  }
                });
            } else {
              this.$router.push("/");
            }
          }
        });
      } else {
        if (evt) evt.target.disabled = false;
      }
    },
    logUserOut(evt = null) {
      this.$store.dispatch(ACTION_TYPES.LOGOUT).then(() => {
        if (evt) evt.target.disabled = false;
        this.$router.push("/");
      });
    }
  }
};

import { mapState, mapActions } from "vuex";
import { ACTION_TYPES } from "../util/constants";
import UserManager from "../js/UserManager";
import monitorWeb3 from "../util/web3/monitorWeb3";
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  /*max-width: 960px;*/
  min-width: 1020px;
  margin: auto;
}
</style>
