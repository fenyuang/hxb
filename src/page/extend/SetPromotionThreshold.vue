<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<div class="set-title">设置推广员门槛</div>
		<section class="set-threshold">
			<div>
				<input type="radio" name="threshold" @tap.stop="checked(0)" :checked="check[0]" />
				<span class="threshold-btn" :class="{ active: check[0] }"></span>
				<span class="threshold-label">无门槛</span>
			</div>
			<div>
				<input type="radio" name="threshold" @tap.stop="checked(1)" :checked="check[1]" />
				<span class="threshold-btn" :class="{ active: check[1] }"></span>
				<span class="threshold-label">满</span>
				<input type="number" ref="number" :disabled="!check[1]" />
				<span class="">单可成为推广员</span>
			</div>
			<div>
				<input type="radio" name="threshold" @tap.stop="checked(2)" :checked="check[2]" />
				<span class="threshold-btn" :class="{ active: check[2] }"></span>
				<span class="threshold-label">推广码</span>
				<button class="set-btn"  @tap.stop="randomWord" :disabled="!check[2]">生成推广码</button>
				<span>{{ threshold }}</span>
			</div>
		</section>
		<button class="save" @tap.stop="setPtomotion">保存</button>
		
		<div class="layer" v-show="layer"></div>
		<div class="layer-floor" ref="layer" v-show="layer">资料添加成功！</div>
	</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import axios from 'axios'
export default {
  components: {
    HeaderNav
  },
  data () {
    return {
      check: [true, false, false],
      promoterType: 0,
      threshold: '9fsc32dk',
      num: '',
      layer: false
    }
  },
  methods: {
    checked (index) {
      for (let i = 0; i < this.check.length; i++) {
        this.check[i] = false
      }
      if (index === 2) {
        this.randomWord()
      }
      this.promoterType = index
      this.$set(this.check, index, true)
    },
    setPtomotion () {
      if (this.promoterType === 1) {
        this.num = this.$refs.number.value
      } else if (this.promoterType === 2) {
        this.num = this.threshold
      } else {
        this.num = ''
      }
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Becomepromoter/become_add', {
        become_promoter_type: this.promoterType,
        become_promoter_value: this.num
      })
        .then(msg => {
          this.$refs.layer.innerHTML = msg.data.msg
          this.layerShow()
          setTimeout(this.routeBack, 2000)
        })
    },
    randomWord () {
      this.threshold = Math.random().toString(36).substr(4).split('', 8).join('')
    },
    layerShow () {
      this.layer = true
    },
    routeBack () {
      this.$router.push('/PromotionScheme')
    }
  }
}
</script>

<style scoped>
	.set-title { width: 4rem; height: 1rem; line-height: 1rem; margin: 0.3rem auto; color: #2c618b; border: 2px solid #2c618b; font-size: 0.4rem; text-align: center;}
	.set-threshold { margin: 0 0.5rem; background: #FFFFFF;}
	.set-threshold div { width: 100%; height: 1.5rem; margin-left: 0.5rem; position: relative; line-height: 1.5rem; border-bottom: 2px solid #EEEEEE;}
	.set-threshold div input[type="radio"] { width: 0.4rem; height: 0.4rem; position: absolute; top: 0.55rem; left: 0; opacity: 0; z-index: 2;}
	.set-threshold div span { font-size: 0.4rem; color: #333333;}
	.set-threshold div .threshold-btn { width: 0.4rem; height: 0.4rem; position: absolute; top: 0.55rem; border: 2px solid #c3c3c3; border-radius: 50%;}
	.set-threshold div .threshold-btn.active { border: 4px solid #2c618b; }
	.set-threshold div .threshold-label { margin-left: 0.6rem; }
	.set-threshold div input[type="number"] { width: 2rem; height: 0.8rem;}
	.set-threshold div input[type="number"]:disabled { background: #f4f4f4;}
	.set-btn { display: inline-block; width: 2.5rem; padding: 0; margin-top: 0.35rem; margin-left: 0.3rem; height: 0.8rem; line-height: 0.8rem; font-size: 0.4rem; text-align: center; border: 2px solid #2C618B; border-radius: 5px;}
	.set-btn:disabled { background: #f4f4f4;}
	
	.save { margin: 0.5rem; width: 9rem; border: 0; height: 1.5rem; line-height: 1.5rem; font-size: 0.4rem; background: #2c618b; color: #FFFFFF; padding: 0;}
	.layer { position: absolute; width: 8rem; height: 2rem; top: 5rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 5rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>