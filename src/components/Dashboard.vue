<template v-if="isLoggedIn">
  <div id="dashboard">
    <HeaderTemplate @log-user-in="logUserIn" @log-user-out="logUserOut" />
    <BodyTemplate :current-view="currentView" />
    <FooterTemplate />
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
    HeaderTemplate,
    BodyTemplate,
    FooterTemplate
  },
  props: {
    currentView: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      user: this.$store.state.user
    };
  },
  created: function() {
    if (this.user.email === "" || !this.user.isLoggedIn) this.$router.push("/");
  },
  methods: {
    ...mapActions([ACTION_TYPES.LOGIN]),
    logUserIn(evt) {
      this.$emit("log-user-in", evt);
    },
    logUserOut(evt) {
      this.$emit("log-user-out", evt);
    }
  }
};

import { mapActions } from "vuex";
import HeaderTemplate from "./layout/HeaderTemplate";
import BodyTemplate from "./layout/BodyTemplate";
import FooterTemplate from "./layout/FooterTemplate";
import { ACTION_TYPES } from "../util/constants";
</script>

<style scoped>
#dashboard {
  width: 100%;
}
</style>
