<template>
  <component class="body-template"
    :is="currentView"
    :user="user"
  >
  </component>
</template>

<script>
  export default {
    name: 'body-template',
    props: ['currentView', 'user']
  }
</script>

<style scoped>
  .body-template {
    width: 100%;
  }
</style>
