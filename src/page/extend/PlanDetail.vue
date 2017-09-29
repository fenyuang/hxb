<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<section class="title">
			<div class="plan-title">{{ planDetail.plan_name }}</div>
			<div class="plan-use" v-if="planDetail.plan_state === 1">生效中</div>
			<div class="plan-use" v-else-if="planDetail.plan_state === 0">已失效</div>
			<div class="plan-list">
				<span class="left-list">有效留单奖励</span>
				<span class="right-state">{{ planDetail.from_commission }}</span>
			</div>
			<div class="plan-list">
				<span class="left-list">有效预定奖励</span>
				<span class="right-state">{{ planDetail.order_commission }}</span>
			</div>
			<div class="plan-list list-end">
				<span class="left-list">使用中</span>
				<span class="right-state">{{ planDetail.use_num }}</span>
			</div>
			<div class="plan-list">
				<span class="left-list">操作</span>
				<span class="right-state" @tap="planUpdate">结束</span>
			</div>
		</section>
		
		<!--<section class="list">
			<div class="plan-list">
				<span class="left-list">使用列表</span>
				<span class="right-state">共 1 条记录</span>
			</div>
			<div class="list-item">
				<div class="item-number">1</div>
				<p class="item-title">方案标题</p>
				<p class="item-type">方案类型 <span>微场景</span></p>
			</div>
		</section>-->
		
	</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    HeaderNav
  },
  mounted () {
    axios.post('http://hxb.scpoo.com/hxb/index.php/index/Promotionplan/plan_select', {
      id: this.$router.currentRoute.params.id
    })
      .then(msg => {
        this.planDetail = msg.data.data
      })
  },
  data () {
    return {
      planDetail: []
    }
  },
  methods: {
    planUpdate () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Promotionplan/plan_update', qs.stringify({
        id: this.$router.currentRoute.params.id,
        plan_state: 0
      }))
        .then(msg => {
          this.PlanDetail.plan_state = msg.data.data.plan_state
        })
    }
  }
}
</script>

<style scoped>
	.title { width: 100%; background: #FFFFFF;}
	.plan-title { width: 100%; text-align: center; color: #333333; height: 1.2rem; line-height: 1.2rem; font-size: 0.8rem;}
	.plan-use { width: 100%; height: 0.6rem; line-height: 0.6rem; font-size: 0.4rem; color: #999999; text-align: center;}
	.plan-list { padding-left: 0.5rem; padding-right: 0.5rem; height: 1rem; line-height: 1rem; font-size: 0.4rem;}
	.list-end { border-bottom: 1px solid #EEEEEE;}
	.left-list { color: #999999;}
	.right-state { float: right; color: #333333;}
	
	.list { margin-top: 0.5rem; background: #FFFFFF;}
	.list .plan-list { border-bottom: 1px solid #eeeeee; height: 1.2rem; line-height: 1.2rem;}
	.list-item { height: 2rem; width: 100%; font-size: 0.5rem; color: #333333; border-bottom: 1px solid #eeeeee;}
	.item-number { height: 2rem; line-height: 2rem; padding-left: 0.5rem; width: 1.5rem; float: left;}
	.item-title { padding-top: 0.3rem; color: #333333; font-size: 0.4rem; height: 0.7rem; line-height: 0.7rem;}
	.item-type { padding-bottom: 0.3rem; color: #999999; font-size: 0.4rem; height: 0.7rem; line-height: 0.7rem;}
	.item-type span { color: #333333;}
	
</style>