<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<div class="set-title">新建推广方案</div>
		<section class="base-info">
			<div class="info-title">基本信息</div>
			<input type="text" ref="plan_name" placeholder="请输入推广方案标题" />
		</section>
		<section class="commission-rule">
			<div class="info-title">佣金规则</div>
			<div>
				<label>有效留单奖励</label><input type="number" ref="from_commission" placeholder="元/人"/>
			</div>
			<div>
				<label>有效预定奖励</label><input type="number" ref="order_commission" placeholder="元/人"/>
			</div>
			<div>
				<label>支持成交方式</label>
				<section class="check">
					<input type="checkbox" name="is_weixin" ref="is_weixin" value="微信" />微信
					<input type="checkbox" name="is_aliplay" ref="is_aliplay" value="支付宝" />支付宝
					<input type="checkbox" name="is_bank" ref="is_bank" value="银行卡" />银行卡
				</section>
			</div>
		</section>
		<button class="save" @tap="addScheme">保存</button>
		
		<div class="layer" v-show="layer"></div>
		<div class="layer-floor" ref="layer" v-show="layer">新建推广方案成功...</div>
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
      layer: false
    }
  },
  methods: {
    addScheme () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Promotionplan/plan_add', {
        plan_name: this.$refs.plan_name.value,
        from_commission: this.$refs.from_commission.value || 0,
        order_commission: this.$refs.order_commission.value || 0,
        is_weixin: this.$refs.is_weixin.checked === true ? 1 : 0,
        is_aliplay: this.$refs.is_aliplay.checked === true ? 1 : 0,
        is_bank: this.$refs.is_bank.checked === true ? 1 : 0
      })
        .then(msg => {
          this.$refs.layer.innerHTML = msg.data.msg
          this.layer = true
          setTimeout(this.routeBack, 2000)
        })
    },
    routeBack () {
      this.$router.push('/PromotionScheme')
    }
  }
}
</script>

<style scoped>
	.set-title { width: 4rem; height: 1rem; line-height: 1rem; margin: 0.3rem auto; color: #2c618b; border: 1px solid #2c618b; font-size: 0.4rem; text-align: center;}
	
	.base-info { margin: 0.5rem; background: #FFFFFF;}
	.info-title { border-bottom: 1px solid #eeeeee; height: 1.2rem; line-height: 1.2rem; text-align: center; font-size: 0.4rem; color: #333333;}
	.base-info input { border: 0; padding-left: 0.2rem; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; margin-bottom: 0;}
	.commission-rule { background: #FFFFFF; margin: 0 0.5rem;}
	.commission-rule div { height: 1.2rem; width: 9rem; border-bottom: 1px solid #eeeeee;}
	.commission-rule div label { padding-left: 0.3rem; width: 4rem; height: 1.2rem; line-height: 1.2rem; color: #666666; font-size: 0.4rem;}
	.commission-rule div input[type="number"] { float: right; width: 5rem; height: 1.2rem; line-height: 1.2rem; border: 0; text-align: right; padding-right: 0.3rem; border-bottom: 1px solid #EEEEEE; margin-bottom: 0;}
	.check { width: 6rem; float: right; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem;}
	.check input { margin-left: 0.3rem; margin-right: 0.1rem;}
	
	.save { margin: 0.5rem; width: 9rem; border: 0; height: 1.5rem; line-height: 1.5rem; font-size: 0.4rem; background: #2c618b; color: #FFFFFF; padding: 0;}
	
	.layer { position: absolute; width: 8rem; height: 2rem; top: 5rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 5rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>