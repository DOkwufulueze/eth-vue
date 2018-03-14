<template>
  <div id="profile-form" v-if="isAfterMount">
    <h3>{{ this.$route.path === '/sign-up' ? 'Sign Up' : 'Edit Profile' }}</h3>
    <div class="wrapper">
      <div class="column">
        <div class="row">
          <label for="first-name">First name</label>
          <input type="text" id="first-name" name="first-name" v-model="user.firstName">
        </div>

        <div class="row">
          <label for="last-name">Last name</label>
          <input type="text" id="Last-name" name="Last-name" v-model="user.lastName">
        </div>

        <div class="row">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" @input="setAvatar" v-model="user.email">
        </div>

        <div class="row">
          <label class="warning-label">Please fill all fields.</label> <input type="button" value="Submit" @click="submitProfileToTheBlockchain">
        </div>
      </div>

      <div class="avatar-column">
        <div class="avatar"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed: {
      isDAppReady: function () {
        return this.$store.state.isDAppReady
      }
    },
    data: function () {
      return {
        user: this.$store.state.user,
        isAfterMount: false
      }
    },
    methods: {
      ...mapActions([
        ACTION_TYPES.LOGIN
      ]),
      setAvatar (evt = null) {
        const email = evt && evt.target && evt.target.value !== undefined ? evt.target.value.trim() : this.user.email.trim()
        this.$root.callUpdateUserGravatar({
          email: email,
          callback: (avatarCanvas) => {
            this.styleAndAddAvatarCanvasToPage(avatarCanvas)
          }
        })
      },
      styleAvatarCanvas (avatarCanvas) {
        if (avatarCanvas && avatarCanvas.style) {
          avatarCanvas.style.borderRadius = '104px'
        }
      },
      addAvatarCanvasToPage (avatarCanvas) {
        const avatarContainer = document.querySelector('.avatar')
        if (avatarContainer && avatarCanvas && avatarCanvas.style) {
          const formerCanvas = avatarContainer.querySelector('canvas')
          if (formerCanvas) {
            avatarContainer.replaceChild(avatarCanvas, formerCanvas)
          } else {
            avatarContainer.appendChild(avatarCanvas)
          }
        }
      },
      styleAndAddAvatarCanvasToPage (avatarCanvas) {
        this.styleAvatarCanvas(avatarCanvas)
        this.addAvatarCanvasToPage(avatarCanvas)
      },
      submitProfileToTheBlockchain (evt) {
        if (this.user.firstName.trim() === '' || this.user.lastName.trim() === '' || this.user.email.trim() === '') {
          document.querySelector('.warning-label').style.display = 'inline-block'
        } else {
          document.querySelector('.warning-label').style.display = 'none'
          evt.target.disabled = true
          const action = this.$route.path === '/sign-up' ? 'signup' : 'editProfile'
          const userObject = {
            firstName: `b${this.user.firstName || ''}`,
            lastName: `b${this.user.lastName || ''}`,
            email: `b${this.user.email || ''}`,
            gravatar: `b${this.user.gravatar || ''}`
          }

          const vueUserObject = Object.assign({}, userObject, {
            firstName: this.user.firstName || '',
            lastName: this.user.lastName || '',
            email: this.user.email || '',
            gravatar: this.user.gravatar || ''
          })

          this.$root.callToWriteUser({
            vueObject: vueUserObject,
            requestParams: userObject,
            contractIndexToUse: 'UserAuthManager',
            methodName: 'setUser',
            managerIndex: 'UserManager',
            callback: (userData = null) => {
              evt.target.disabled = false
              console.log(action === 'signup' ? 'Signed up and logged In' : 'Successfully updated profile')
              if (this.user.email === '' || !this.user.isLoggedIn) {
                this.$router.push('/')
              } else {
                this.$router.push('/dashboard')
              }
            }
          })
        }
      },
      loadProfileFormOrPage () {
        if (this.$store.state.currentRoute.name === 'ProfileEdit') {
          this.isAfterMount = true
          this.setAvatar()
        } else {
          this.$root.callToAccessBlockchain({
            requestParams: {},
            contractIndexToUse: 'UserAuthManager',
            methodName: 'login',
            managerIndex: 'UserManager',
            callback: (isUserExists = false) => {
              if (isUserExists) {
                this.$root.logUserIn()
              } else {
                this.isAfterMount = true
                this.setAvatar()
              }
            }
          })
        }
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.loadProfileFormOrPage()
      })
    },
    watch: {
      isDAppReady: function (value) {
        console.log('isDAppReady: ', value)
        this.$nextTick(function () {
          this.loadProfileFormOrPage()
        })
      },
      isAfterMount: function (value) {
        console.log('isAfterMount: ', value)
        this.$nextTick(function () {
          this.setAvatar()
        })
      }
    },
    name: 'profile-form'
  }

  import { mapActions } from 'vuex'
  import { ACTION_TYPES } from '../../util/constants'
</script>

<style scoped>
  #profile-form {
    width: 100%;
    height: 420px;
    position: relative;
    top: 100px;
  }

  h3 {
    width: 100px;
    margin: auto;
    margin-bottom: 20px;
  }

  .wrapper {
    width: 460px;
    margin: auto;
  }

  .column {
    width: 300px;
    display: inline-block;
  }

  .row {
    margin-top: 20px;
    font-size: 14px;
    width: 300px;
    height: 40px;
    display: block;
  }

  .avatar {
    height: 104px;
    width: 104px;
    position: absolute;
  }

  .avatar-column {
    height: 106px;
    width: 106px;
    display: inline-block;
    position: absolute;
    top: 60px;
    margin-left: 20px;
    border: 1px solid #dcdede;
    border-radius: 106px;
  }

  label {
    height: 100%;
    line-height: 40px;
    width: 100px;
    display: inline-block;
  }

  .warning-label {
    display: none;
    width: 140px;
    height: 20px;
    line-height: 20px;
    color: #ba3333;
  }

  input[type=text] {
    height: 30px;
    line-height: 30px;
    width: 200px;
    display: inline-block;
    color: #4d4c49;
    outline: none;
  }

  input {
    height: 30px;
    line-height: 30px;
    width: 100px;
    float: right;
  }
</style>
