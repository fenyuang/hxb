<template>
	<div>
		<LoginLogo></LoginLogo>
		<div class="mui-input-row">
			<input type="tel" class="mui-input-clear" ref="getTel" placeholder="请输入手机号注册">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
		</div>
		<div class="mui-input-row">
			<input type="text" class="mui-input-clear" ref="textCode" placeholder="请输验证码">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
			<div class="get-code" style="width: 120px; height: 50px;" v-html='verCode'></div>
		</div>
		<div class="mui-input-row">
			<input type="text" ref="messageCode"  placeholder="请输入短信验证码">
			<button id="get_code" @tap="gainTelPhone" ref="getTelCode" :disabled="time > 0 ? true : false">获取验证码</button >
		</div>
				
		<div class="mui-input-row margin-pass">
			<input type="password" class="mui-input-password" ref="getPassword" placeholder="请输入密码(建议6-20个字符)">
			<span class="mui-icon mui-icon-eye"></span>
		</div>
		<div class="mui-input-row">
			<input type="password" class="mui-input-password" ref="relPassword" placeholder="请再次输入您刚刚输入的密码">
			<span class="mui-icon mui-icon-eye"></span>
		</div>
		<div class="mui-checkbox">
			<input class="checkbox" type="checkbox" checked>
			<label>我已阅读并接受</label>
			<router-link class="protocol" to='/Protocol'>惠学宝用户协议</router-link> 
		</div>
		<button type="button" class="mui-btn mui-btn-block register-btn" @tap="signup">注册</button>
		<div class="login">
			<label>已有账号？</label>
			<router-link class="goLogin" to='/'>马上登录</router-link> 
		</div>
		
		<div class="layer" v-show="layer"></div>
		<div class="layer-floor" ref="layer" v-show="layer">注册成功...</div>
	</div>
</template>

<script>
import LoginLogo from '../../components/login/LoginLogo.vue'
import axios from 'axios'
export default {
  components: {
    LoginLogo
  },
  data () {
    return {
      data: [],
      tel: '',
      time: 0,
      getCode: '',
      verCode: '<iframe style="border:0" ref="ifram" src="http://hxb.scpoo.com/hxb/index.php/api/user/getVerCode"></iframe>',
      errorRegister: false,
      layer: false
    }
  },
  props: {
    second: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    gainTelPhone () {
      this.tel = this.$refs.getTel.value
      if ((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.tel))) {
        axios.get('http://hxb.scpoo.com/hxb/index.php/api/user/idVerify?tel=' + this.tel)
          .then(msg => {
            if (msg.data.code !== 0) {
              this.sendVerCode()
            } else {
              this.layer = true
              this.$refs.layer.innerHTML = '该手机号已注册...'
              setTimeout(this.goLogin, 2000)
            }
          })
      } else {
        this.layer = true
        this.$refs.layer.innerHTML = '*请输入正确的手机号'
        setTimeout(this.errorLayer, 3000)
      }
    },
    sendVerCode () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/user/sendVerCode?tel=' + this.tel)
        .then(msg => {
          if (msg.data.code === 1) {
            this.layer = true
            this.$refs.layer.innerHTML = msg.data.message
            setTimeout(this.errorLayer, 2000)
            this.time = this.second
            this.timer()
          }
        })
    },
    timer () {
      if (this.time > 0) {
        this.time--
        this.$refs.getTelCode.innerHTML = this.time > 0 ? this.time + 's后重新发送' : '获取验证码'
        setTimeout(this.timer, 1000)
      }
    },
    getPassword () {
      if (this.$refs.getPassword.value.length < 6) {
        this.layer = true
        this.$refs.layer.innerHTML = '*请输入大于6位数的密码'
        setTimeout(this.errorLayer, 2000)
        return false
      }
      return true
    },
    relPassword () {
      if (this.$refs.getPassword.value !== this.$refs.relPassword.value) {
        this.layer = true
        this.$refs.layer.innerHTML = '*请输入相同的密码'
        setTimeout(this.errorLayer, 2000)
        return false
      }
      return true
    },
    signup () {
      if (this.getPassword()) {
        if (this.relPassword()) {
          axios.post('http://hxb.scpoo.com/hxb/index.php/api/user/signup', {
            tel: this.$refs.getTel.value,
            telcode: this.$refs.messageCode.value,
            vercode: this.$refs.textCode.value,
            password: this.$refs.getPassword.value,
            cupassword: this.$refs.relPassword.value
          })
            .then(msg => {
              if (msg.data.code === 1) {
                this.$refs.layer.innerHTML = msg.data.message
                this.layer = true
                setTimeout(this.layerHide, 2000)
              } else {
                this.layer = true
                this.$refs.layer.innerHTML = '*' + msg.data.message
                setTimeout(this.errorLayer, 2000)
              }
            })
        }
      }
    },
    errorLayer () {
      this.layer = false
    },
    layerHide () {
      this.$router.push('/FoundSchool')
    },
    goLogin () {
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
	button { padding: 0; border: 0;}
	a { color: #185e96;}
	input { border: 0;}
	.mui-input-row { width: 9rem; height: 1.5rem; line-height: 1.5rem; margin: 0.1rem auto;}
	.mui-input-row input { height: 1.5rem; line-height: 1.5rem; font-size: 0.4rem;}
	.mui-input-row .mui-input-clear~.mui-icon-clear, .mui-input-row .mui-input-password~.mui-icon-eye, .mui-input-row .mui-input-speech~.mui-icon-speech { width: 0.4rem; height: 0.4rem; top: 0.55rem; right: 0.55rem;}
	#get_code { position: absolute; top: 0.15rem; right: 0.2rem; background: #97ca76; color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 3rem; text-align: center; border-radius: 7px; display: inline-block;}
	.margin-pass { margin-top: 0.6rem;}
	.mui-checkbox input[type=checkbox] { position: relative; right: 0; left: 0.5rem; height: 0.4rem; width: 0.4rem; line-height: 1rem;}
	.mui-checkbox input[type=checkbox]:before { height: 0.4rem; width: 0.4rem; line-height: 1rem; color: #185E96; font-size: 0.8rem;}
	.mui-checkbox label { width: 4.2rem; font-size: 0.4rem; padding-left: 1rem; padding-right: 0; height: 1rem; line-height: 1rem;}
	.mui-checkbox .protocol { height: 1rem; line-height: 1rem; font-size: 0.4rem;}
	.register-btn { width: 9rem; height: 1.5rem; line-height: 1.5rem; color: #fff; margin: 0.2rem auto; font-size: 0.5rem; background: #185e96; padding: 0;}
	.get-code { background: #333; overflow: hidden; position: absolute; top: 0.1rem; right: 0.15rem;}
	.login { float: right; margin-right: 0.5rem; font-size: 0.4rem; height: 0.8rem; line-height: 0.8rem;}
	
	.layer { position: absolute; width: 8rem; height: 2rem; top: 8rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 8rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>