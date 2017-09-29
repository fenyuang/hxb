<template>
	<div>
		<LoginLogo></LoginLogo>
		<div class="mui-input-row">
			<input type="text" ref="tel" class="mui-input-clear" required="required" placeholder="请输入用户名或手机号登录">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
		</div>
		<div class="mui-input-row mui-password">
			<input type="password" ref="password" required="required" class="mui-input-password" placeholder="请输入登录密码">
			<span class="mui-icon mui-icon-eye"></span>
		</div>
		<router-link class="modify-password" to='/ModifyPassword'>忘记密码</router-link>
		<li @tap="login">
			<button type="button" class="mui-btn mui-btn-block login-btn">登录</button>
		</li>
		<div class="mui-checkbox">
			<input class="checkbox" type="checkbox" checked>
			<label>下次自动登录</label>
			<router-link class="register" to='/Register'>免费注册</router-link>
		</div>

		<!--<div class="layer" v-show="layer"></div>-->
		<!--<div class="layer-floor" ref="layer" v-show="layer">账号密码不匹配...</div>-->
    <PopupHint   :Content="pop"  v-if="layer === 1"></PopupHint>
	</div>
</template>

<script>
import LoginLogo from '../../components/login/LoginLogo.vue'
import PopupHint from '../../components/PopupHint'
import axios from 'axios'
export default {
  data () {
    return {
      layer: 0,
      pop: ''
    }
  },
  components: {
    LoginLogo, PopupHint
  },
  watch: {
    layer (newVal, oldVal) {
      if (this.layer === 1) {
        setTimeout(() => {
          this.layer = 0
        }, 2000)
      }
    }
  },
  methods: {
    login () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/api/user/login', {
        tel: this.$refs.tel.value,
        password: this.$refs.password.value
      })
        .then(msg => {
          if (msg.data.code === 1) {
            if (msg.data.data.shool_name !== null) {
              this.$router.push('/Index')
            } else {
              this.$router.push('/FoundSchool')
            }
          } else {
//            this.$refs.layer.innerHTML = '*' + msg.data.message
            this.layer = 1
            this.pop = msg.data.message
//            setTimeout(this.errorLayer, 2000)
          }
        })
    },
    errorLayer () {
      this.layer = false
    }
  }
}
</script>

<style scoped>
	ul,ol,li { list-style: none;}
	input { border: 0;}
	.mui-input-row { width: 9rem; height: 1.5rem; line-height: 1.5rem; margin: 0.1rem auto;}
	.mui-input-row input { height: 1.5rem !important; line-height: 1.5rem !important; font-size: 0.4rem;}
	.mui-input-row .mui-input-clear~.mui-icon-clear, .mui-input-row .mui-input-password~.mui-icon-eye { width: 0.4rem; height: 0.4rem; top: 0.55rem; right: 0.55rem;}
	.modify-password { position: absolute; right: 0.5rem; font-size: 0.4rem; color: #666666; margin: 0.5rem 0;}
	.login-btn { width: 9rem; height: 1.5rem; line-height: 1.5rem; color: #fff; margin: 1.5rem auto 0.2rem; font-size: 0.5rem; background: #185e96; padding: 0;}
	.mui-checkbox { height: 1rem; line-height: 1rem;}
	.mui-checkbox input[type=checkbox] { position: relative; right: 0; left: 0.5rem; height: 0.4rem; width: 0.4rem; line-height: 1rem;}
	.mui-checkbox input[type=checkbox]:before { height: 0.4rem; width: 0.4rem; line-height: 1rem;}
	.mui-checkbox label { width: 5rem; font-size: 0.4rem; padding-left: 1rem; padding-right: 0; height: 1rem; line-height: 1rem;}
	.mui-checkbox .register { height: 1rem; line-height: 1rem; position: absolute; color: #185e96; right: 0.5rem; font-size: 0.4rem;}
	.mui-checkbox input[type=checkbox]:checked:before { color: #185e96;}

	.layer { position: absolute; width: 8rem; height: 2rem; top: 6rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 6rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>
