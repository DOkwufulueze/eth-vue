<template>
  <div id="profile-form">
    <h3>{{ this.$route.path === '/sign-up' ? 'Sign Up' : 'Edit Profile' }}</h3>
    <div class="row">
      <label for="first-name">First name</label>
      <input type="text" id="first-name" name="first-name" v-model="firstName">
    </div>

    <div class="row">
      <label for="last-name">Last name</label>
      <input type="text" id="Last-name" name="Last-name" v-model="lastName">
    </div>

    <div class="row">
      <label for="email">Email</label>
      <input type="text" id="email" name="email" v-model="email">
    </div>

    <div class="row">
      <input type="button" value="Submit" @click="submitProfileToTheBlockchain">
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data: function () {
      return {
        firstName: this.$store.state.user.firstName,
        lastName: this.$store.state.user.lastName,
        email: this.$store.state.user.email
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      ...mapActions([
        ACTION_TYPES.LOGIN
      ]),
      submitProfileToTheBlockchain (evt) {
        evt.target.disabled = true
        const action = this.$route.path === '/sign-up' ? 'signup' : 'editProfile'
        const userProfileData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        }

        Auth[action](this.$store.state, userProfileData)
        .then((userData) => {
          this[ACTION_TYPES.LOGIN](userData)
          .then((userData) => {
            evt.target.disabled = false
            console.log(action === 'signup' ? 'Signed up and logged In' : 'Successfully updated profile')
            if (this.$store.state.user.email === '' || !this.$store.state.user.isLoggedIn) {
              this.$router.push('/')
            } else {
              this.$router.push('/dashboard')
            }
          })
        })
      }
    }
  }

  import { mapActions } from 'vuex'
  import { ACTION_TYPES } from '../../util/constants'
  import Auth from '../../js/Auth'
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

  .row {
    margin-top: 20px;
    font-size: 14px;
    width: 300px;
    height: 40px;
    display: block;
    margin: auto;
  }

  label {
    height: 100%;
    line-height: 40px;
    width: 100px;
    display: inline-block;
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
