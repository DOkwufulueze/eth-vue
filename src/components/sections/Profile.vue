<template v-if="isLoggedIn">
  <div id="profile">
    <div class="content">
      <div class="message">
        <div>Welcome to your Profile Page {{ user.firstName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: function() {
    return {
      user: this.$store.state.user
    };
  }
};
</script>

<style scoped>
#profile {
  width: 100%;
  height: 420px;
}

.blockchain-message {
  float: left;
  margin-top: 20px;
  font-size: 14px;
  border: 1px solid #dcdede;
  color: #4d4c49;
  width: auto;
  padding: 10px;
}

.content {
  height: 100%;
  text-align: center;
  max-width: 920px;
  margin: auto;
  padding: 160px;
}

.message {
  height: 80px;
  line-height: 40px;
}
</style>
