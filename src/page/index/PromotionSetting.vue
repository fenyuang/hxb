<template>
	<div>
		<header>
			<a class="back" @tap.stop='back'>< 返回</a>
			<span>推广设置</span>
			<a class="preserve" @tap.stop='sureSetting'>确定</a>
		</header>
		<div class="open-set">请选择是否开启推广设置</div>
		
		<div class="open-select bg-white">
			<div class="open-left-img">
				<img src="../../../../h5editor_webapp/images/coupon.png"/>
			</div>
			<div class="open-right-select">
				<div>
					<input type="radio" name="threshold" @tap.stop="checked(0)" :checked="check[0]" />
					<span class="threshold-btn" :class="{ active: check[0] }"></span>
					<label>启用</label>
				</div>
				<div>
					<input type="radio" name="threshold" @tap.stop="checked(1)" :checked="check[1]" />
					<span class="threshold-btn" :class="{ active: check[1] }"></span>
					<label>不启用</label>
				</div>
			</div>
		</div>
		
		<div class="scheme-list">推广方案列表</div>
		<ul class="list">
			<li v-for="(list, index) in listData" :class="{ active: planCheck[index] }" @tap.stop="planSelect(index)">{{ list.plan_name }}</li>
		</ul>
		<PopupHint :Content="pop" v-show="layer===1"></PopupHint>
	</div>
</template>

<script>
import axios from 'axios'
import PopupHint from '../../components/PopupHint'
export default {
  components: {
    PopupHint
  },
  data () {
    return {
      check: [true, false],
      listData: [],
      planCheck: [],
      status: 1,
      planId: 1,
      layer: 0,
      pop: ''
    }
  },
  mounted () {
    axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotionplan/plan_list')
      .then(msg => {
        this.listData = msg.data.data
        for (let i = 0; i < this.listData.length; i++) {
          this.planCheck[i] = false
        }
        this.planCheck[0] = true
        this.planId = this.listData[0].id
      })
  },
  methods: {
    checked (index) {
      for (let i = 0; i < this.check.length; i++) {
        this.check[i] = false
      }
      this.$set(this.check, index, true)
      this.status = index + 1
    },
    planSelect (index) {
      for (let i = 0; i < this.planCheck.length; i++) {
        this.planCheck[i] = false
      }
      this.$set(this.planCheck, index, true)
      this.planId = this.listData[index].id
    },
    sureSetting () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/api/index/setProtion', {
        status: this.status,
        plan_id: this.planId,
        page_id: this.$router.currentRoute.params.id
      })
        .then(msg => {
          this.layer = 1
          this.pop = msg.data.message
          if (msg.data.code === 1) {
            setTimeout(() => {
              this.$router.push('/MarketList')
            }, 2000)
          } else {
            setTimeout(() => {
              this.layer = 0
            }, 2000)
          }
        })
    }
  }
}
</script>

<style scoped>
	/*头部*/
	header { width: 100%; height: 1.5rem; line-height: 1.5rem; background: #195e97; position: fixed; top: 0; left: 0; z-index: 999;}
	header .back { color: #fff; font-size: 0.5rem; height: 1.5rem; line-height: 1.5rem; width: 2rem; padding-left: 0.5rem; text-align: left; display: inline-block;}
	header span { color: #fff; font-size: 0.5rem; height: 1.5rem; line-height: 1.5rem; display: inline-block; width: 5.8rem; text-align: center;}
	header .preserve { color: #fff; font-size: 0.5rem; height: 1.5rem; line-height: 1.5rem; width: 2rem; text-align: right; padding-right: 0.5rem; display: inline-block; float: right;}
	
	.open-set { height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; padding-left: 0.5rem; color: #666666; margin-top: 1.5rem;}
	.bg-white { background: #FFFFFF;}
	.open-select { height: 4rem; width: 100%;}
	.open-select .open-left-img { width: 4rem; height: 4rem; padding: 0.5rem; float: left;}
	.open-select .open-left-img img { width: 3rem;}
	.open-select .open-right-select { float: left; padding-top: 1rem; padding-bottom: 1rem;}
	.open-select .open-right-select div { height: 1rem; line-height: 1rem; position: relative;}
	.open-select .open-right-select div input[type="radio"] { width: 0.4rem; height: 0.4rem; position: absolute; top: 0.3rem; left: 0; opacity: 0; z-index: 2;}
	.open-select .open-right-select div span {  width: 0.4rem; height: 0.4rem; position: absolute; top: 0.3rem; border: 2px solid #c3c3c3; border-radius: 50%;}
	.open-select .open-right-select div span.active { border: 4px solid #2c618b; }
	.open-select .open-right-select div label { margin-left: 0.6rem; font-size: 0.4rem;}
	
	.scheme-list { height: 1.5rem; width: 100%; line-height: 1.5rem; font-size: 0.4rem; color: #333333; text-align: center;}
	.list li { width: 100%; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; color: #666666; padding-left: 0.5rem; border-bottom: 2px solid #EEEEEE;}
	.list li.active { background: #FFFFFF; color: #195e97; position: relative;}
	.list li.active:after { content: "\2714"; position: absolute; right: 0.5rem; font-size: 0.6rem;}
	
</style>