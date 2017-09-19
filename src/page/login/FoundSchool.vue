<template>
	<div>
		<div class="text">一分钟极速建校</div>
		<div class="mui-input-row">
			<input type="text" ref="school_name" class="mui-input-clear school-input" required="required" placeholder="请输入学校名称">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
		</div>
		<div class="mui-input-row">
			<input type="text" ref="name" class="mui-input-clear name-input" required="required" placeholder="请输入您的真实姓名">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
		</div>
		<span class="errorRegister" ref="errorRegister" v-show="errorRegister">111</span>
		<li @click="RegisterSchool">
			<button type="button" class="mui-btn mui-btn-block login-btn">注册</button>
		</li>
		
		<router-link class="index" to='/Index'></router-link>
		<div class="layer" v-show="layer"></div>
		<div class="layer-floor" ref="layer" v-show="layer">注册成功...</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      errorRegister: false,
      layer: false
    }
  },
  methods: {
    RegisterSchool () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/api/user/setschool', {
        name: this.$refs.name.value,
        school_name: this.$refs.school_name.value
      })
        .then(msg => {
          if (msg.data.error_code === 0) {
            this.layer = true
            setTimeout(this.Index, 2000)
          } else {
            this.errorRegister = true
            this.$refs.errorRegister.innerHTML = '*' + msg.data.message
            setTimeout(this.errorRegisterFoundSchool, 2000)
          }
        })
    },
    Index () {
      document.querySelector('.index').click()
    },
    errorRegisterFoundSchool () {
      this.errorRegister = false
    }
  }
}
</script>

<style scoped>
	ul,ol,li { list-style: none;}
	.text { text-align: center; height: 4rem; line-height: 4rem; font-size: 0.6rem; color: #333333;}
	.mui-input-row { width: 9rem; height: 1.5rem; line-height: 1.5rem; margin: 0 auto;}
	.mui-input-row input { height: 1.5rem !important; line-height: 1.5rem !important; font-size: 0.4rem; padding: 0 0.4rem; margin-bottom: 0;}
	.school-input { border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-top-left-radius: 0.2rem; border-top-right-radius: 0.2rem;}
	.name-input { border-top-left-radius: 0; border-top-right-radius: 0; border-top: 0; border-bottom-left-radius: 0.2rem; border-bottom-right-radius: 0.2rem;}
	
	.mui-btn { width: 9rem; margin: 0.8rem auto; background: #185e96; color: #fff;}
	
	.errorRegister { margin-left: 0.5rem; color: #FF0000; position: absolute;}
	.layer { position: absolute; width: 8rem; height: 2rem; top: 8rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 8rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>