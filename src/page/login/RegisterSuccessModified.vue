<template>
	<div>
		<LoginLogo></LoginLogo>
		<p>恭喜您的账号注册成功，正在进入</p>
		<p>登录页面...</p>
		<router-link class="login" ref="login" to='/'>立即登录>></router-link>
	</div>
</template>

<script>
import LoginLogo from '../../components/login/LoginLogo.vue'
export default {
  components: {
    LoginLogo
  },
  mounted () {
    setTimeout(this.login, 3000)
  },
  methods: {
    login () {
      document.querySelector('.login').click()
    }
  }
}
</script>

<style scoped>
	p { text-align: center; font-size: 0.4rem;}
	.login { text-align: center; display: block; font-size: 0.5rem;}
</style>