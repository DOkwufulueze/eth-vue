<template>
  <div id="footer-template">
    <div class="content">
      <div class="links">
        <a href="https://github.com/DOkwufulueze/eth-vue" target="_blank" class="link2">Github</a> <span class="divider"></span>
        <a href="http://danielokwufulueze.com" target="_blank" class="link3">www</a>
      </div>

      <div class="copyleft">
        <div class="text">Copyleft <span class="copyleft-resource"></span> 2017 <a href="https://danielokwufulueze.com" class="link2">Daniel Okwufulueze</a>.</div>
      </div>

      <div class="social">
        <a href="https://facebook.com/DOkwufulueze" target="_blank" class="facebook"></a>
        <a href="https://twitter.com/dokwufulueze" target="_blank" class="twitter"></a>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'footer-template'
  }
</script>

<style scoped>
  #footer-template {
    width: 100%;
    background: #bababa;
    color: #1d1e1f;
    height: 150px;
    position: fixed;
    bottom: 0;
    min-width: 700px
  }

  .content {
    height: 100%;
    max-width: 920px;
    margin: auto;
    text-align: center;
    padding: 50px 0px 10px 0px;
  }

  .links {
    clear: both;
    height: 20px;
    margin-bottom: 30px;
  }

  .links a {
    color: inherit;
    text-decoration: none;
  }

  .divider {
    color: inherit;
  }

  .divider:before {
    content: "|"
  }

  .copyright {
    clear: both;
    height: 20px;
    font-size: 14px;
  }

  .copyleft-resource {
    background: url('/static/images/copyleft.png') no-repeat;
    height: 20px;
    width: 20px;
    display: inline-block;
    background-size: contain;
  }

  .social {
    clear: both;
    height: 20px;
    float: right;
    position: relative;
    top: -39px;
  }

  .facebook {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/static/images/Facebook.png') no-repeat;
    background-size: contain;
  }

  .twitter {
    display: inline-block;
    width: 20px;
    margin: 0px 0px 0px 30px;
    height: 20px;
    background: url('/static/images/twitter.png') no-repeat;
    background-size: contain;
  }
</style>
