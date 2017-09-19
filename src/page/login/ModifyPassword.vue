<template>
	<div>
		<LoginLogo></LoginLogo>
		<div class="mui-input-row">
			<input type="tel" ref="getTel" class="mui-input-clear" required="required" placeholder="请输入您的手机号码">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
		</div>
		<div class="mui-input-row">
			<input type="text" ref="textCode" class="mui-input-clear" required="required" placeholder="请输入右侧验证码">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
			<div class="get-code" style="width: 120px; height: 50px;" v-html='verCode'></div>
		</div>
		<div class="mui-input-row">
			<input type="text" ref="messageCode" required="required" placeholder="请输入短信验证码">
			<button id="get_code"  @click="gainTelPhone" ref="getTelCode" :disabled="time > 0 ? true : false">获取验证码</button>
		</div>
		
		<span class="errorModify" ref="errorModify" v-show="errorModify"></span>
		
		<div class="mui-input-row margin-pass">
			<input type="password" class="mui-input-password" required="required" ref="getPassword" placeholder="请输入密码(建议6-20个字符)">
			<span class="mui-icon mui-icon-eye"></span>
		</div>
		<div class="mui-input-row">
			<input type="password" class="mui-input-password" required="required" ref="relPassword" placeholder="请再次输入您刚刚输入的密码">
			<span class="mui-icon mui-icon-eye"></span>
		</div>
		<button type="button" @click="changePassword" required="required" class="mui-btn mui-btn-block modify-btn">确认</button>
		<router-link class="login" to='/'></router-link>
		<router-link class="toRegister" to='/Register'></router-link>
		
		<div class="layer" v-show="layer"></div>
		<div class="layer-floor" ref="layer" v-show="layer">修改密码成功...</div>
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
      errorModify: false,
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
            console.log(msg)
            if (msg.data.code === 0) {
              this.sendVerCode()
            } else {
              this.errorModify = true
              this.$refs.errorModify.innerHTML = '*该手机号暂未注册...'
              setTimeout(this.errorModifyPassword, 2000)
            }
          })
      } else {
        this.errorModify = true
        this.$refs.errorModify.innerHTML = '*请输入正确的手机号'
        setTimeout(this.errorModifyPassword, 3000)
      }
    },
    sendVerCode () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/user/sendVerCode?tel=' + this.tel)
        .then(msg => {
          if (msg.data.code === 1) {
            this.layer = true
            this.$refs.layer.innerHTML = msg.data.message
            setTimeout(this.layerHide, 3000)
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
        this.errorModify = true
        this.$refs.errorModify.innerHTML = '*请输入大于6位数的密码'
        setTimeout(this.errorModifyPassword, 3000)
        return false
      }
      return true
    },
    relPassword () {
      if (this.$refs.getPassword.value !== this.$refs.relPassword.value) {
        this.errorModify = true
        this.$refs.errorModify.innerHTML = '*请输入相同的密码'
        setTimeout(this.errorModifyPassword, 3000)
        return false
      }
      return true
    },
    changePassword () {
      if (this.getPassword()) {
        if (this.relPassword()) {
          axios.post('http://hxb.scpoo.com/hxb/index.php/api/user/changepassword', {
            tel: this.$refs.getTel.value,
            telcode: this.$refs.messageCode.value,
            vercode: this.$refs.textCode.value,
            password: this.$refs.getPassword.value,
            cupassword: this.$refs.relPassword.value
          })
            .then(msg => {
              if (msg.data.code === 1) {
                this.layer = true
                this.$refs.layer.innerHTML = '修改密码成功...'
                document.querySelector('.login').click()
              } else {
                this.errorModify = true
                this.$refs.errorModify.innerHTML = '*' + msg.data.message
                setTimeout(this.errorModifyPassword, 3000)
              }
            })
        }
      }
    },
    errorModifyPassword () {
      this.errorModify = false
    },
    layerHide () {
      this.layer = false
    },
    goRegister () {
      document.querySelector('.toRegister').click()
    }
  }
}
</script>

<style scoped>
	button { padding: 0;}
	.mui-input-row { width: 9rem; height: 1.5rem; line-height: 1.5rem; margin: 0 auto;}
	.mui-input-row input { height: 1.5rem; line-height: 1.5rem; font-size: 0.4rem;}
	.mui-input-row .mui-input-clear~.mui-icon-clear, .mui-input-row .mui-input-password~.mui-icon-eye, .mui-input-row .mui-input-speech~.mui-icon-speech { width: 0.4rem; height: 0.4rem; top: 0.55rem; right: 0.55rem;}
	#get_code { position: absolute; top: 0.15rem; right: 0.2rem; background: rgb(76, 217, 100); color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 3rem; text-align: center; border-radius: 7px; display: inline-block;}
	.margin-pass { margin-top: 0.6rem;}
	.modify-btn { width: 9rem; height: 1.5rem; line-height: 1.5rem; color: #fff; margin: 0.2rem auto; font-size: 0.5rem; background: rgb(2, 114, 218); padding: 0;}
	.get-code { background: #333; overflow: hidden; position: absolute; top: 0.1rem; right: 0.15rem;}
	.layer { position: absolute; left: 0.5rem; color: #FF0000;}
	.layer-floor { height: 0.6rem; line-height: 0.6rem; font-size: 0.4rem;}
	
	.errorModify { margin-left: 0.5rem; color: #FF0000; position: absolute;}
	.layer { position: absolute; width: 8rem; height: 2rem; top: 8rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 8rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>