<template>
	<div>
		<div class="mui-content">
	    <div class="mui-content-padded coupon-btn">
	      <button type="button" class="mui-btn mui-btn-block">新建优惠券</button>
	    </div>
		</div>

		<div class="mui-content">
			<img src="../../../static/images/newCouponImage.png" />
			<input type="file" id="file" />
		</div>

		<div class="mui-content bg-white">
			<header>基本信息</header>
			<div class="mui-input-row">
        <label>优惠券标题</label>
    		<input type="text" class="mui-input-clear" placeholder="请输入优惠券标题">
    	</div>
    	<div class="mui-input-row">
        <label>发放总量</label>
    		<input type="number" class="mui-input-clear label-right" placeholder="请输入发放总量">
    		<label class="right-label">张</label>
    	</div>
    	<div class="mui-input-row" :class="{on:!parValue}">
        <label>面值</label>
    		<input type="number" class="mui-input-clear" placeholder="请输入优惠券面值" :disabled="!parValue">
    	</div>
    	<div class="mui-input-row input-radio">
        <span class="checkbox" :class="{on:randomActive}"><input @tap="random" name="random" type="checkbox"></span><label class="random">随机</label>
        <label class="money">最低金额</label><input type="number" :disabled="!randomActive">
        <label class="money">最高金额</label><input type="number" :disabled="!randomActive">
    	</div>
		</div>

		<div class="mui-content bg-white">
			<header>基本规则</header>
			<div class="mui-input-row">
        <label>每人限领</label>
    		<input type="number" class="mui-input-clear" placeholder="请输入每人限领张数">
    	</div>
    	<div class="mui-input-row">
        <label>生效时间</label>
    		<input type="date" class="mui-input-clear" placeholder="请输入生效时间">
    	</div>
    	<div class="mui-input-row">
        <label>失效时间</label>
    		<input type="date" class="mui-input-clear" placeholder="请输入失效时间">
    	</div>
		</div>

		<div class="mui-content">
	    <div class="mui-content-padded save-coupon">
	      <button type="button" class="mui-btn mui-btn-block">保存</button>
	    </div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      randomActive: false,
      parValue: true
    }
  },
  methods: {
    random () {
      this.randomActive = !this.randomActive
      this.parValue = !this.parValue
    }
  }
}
</script>

<style scoped>
	.bg-white { background: #FFFFFF;}
	.coupon-btn { margin: 0.2rem auto; width: 4rem;}
	.coupon-btn .mui-btn-block { padding: 0; margin-bottom: 0; width: 4rem; font-size: 0.5rem; height: 1.2rem; line-height: 1.2rem; color: ; border: 0.02rem solid #2c618b;}

	.mui-content { width: 90%; margin: 0.2rem auto; position: relative;}
	.mui-content img{ width: 100%; max-height: 9rem;}
	#file { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; z-index: 99;}

	.mui-content header { width: 100%; height: 1.2rem; line-height: 1.2rem; text-align: center; font-size: 0.5rem;}
	.mui-input-row { height: 1.2rem; line-height: 1.2rem; padding: 0; border-bottom: 0.02rem solid rgb(238, 238, 238);}
	.mui-input-row label { width: 3rem; height: 1.2rem; line-height: 1.2rem; color: #666666; padding: 0; font-size: 0.4rem; padding-left: 0.5rem;}
	.mui-input-row label~input { width: 6rem; float: left; padding: 0; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem;}
	.mui-input-row .label-right { width: 5rem;}
	.mui-input-row .right-label { float: right; width: 1rem; padding-left: 0; color: #999999;}
	.mui-input-row.on input { background:  rgb(244, 244, 244);}

	.input-radio .checkbox { float: left; margin-left: 0.5rem; position: relative; top: 0.4rem; width: 0.4rem; height: 0.4rem; display: inline-block; border: 0.02rem solid #666; border-radius: 50%;}
	.input-radio .checkbox.on { border: 0.1rem solid #2c618b;}
	.input-radio .checkbox input[type="checkbox"] { opacity: 0; position: absolute; z-index: 2;}
	.input-radio .random { padding-left: 0; width: 1rem; font-size: 0.4rem; text-align: center;}
	.input-radio .money { padding-left: 0; width: 1.8rem; font-size: 0.4rem; text-align: center;}
	.input-radio .money~input { width: 1.6rem; height: 0.8rem; margin-top: 0.2rem; background: rgb(244, 244, 244);}
	.input-radio .on~input { background: #fff;}

	.save-coupon { margin: 0;}
	.save-coupon .mui-btn { background: rgb(44, 97, 139); color: #FFFFFF;}
</style>
