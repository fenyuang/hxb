<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<section class="bg-white">
			<h3 class="protocol-name">{{ userInfo.realname }}</h3>
			<p class="sure-settle" v-if="userInfo.status === 1">未结算</p>
			<p class="sure-settle" v-if="userInfo.status === 2">已确认结算</p>
			<div class="list-item">
				<p>编号</p>
				<span>01</span>
			</div>
			<div class="list-item">
				<p>结算申请时间</p>
				<span>{{ userInfo.s_time }}</span>
			</div>
			<div class="list-item">
				<p>结算起止时间</p>
				<span>{{ userInfo.e_time }}</span>
			</div>
			<div class="list-item">
				<p>结算金额（元）</p>
				<span>{{ userInfo.price }}</span>
			</div>
			<div class="list-item">
				<p>结算方式</p>
				<span v-if="userInfo.type === 1">银行卡</span>
				<span v-if="userInfo.type === 2">支付宝</span>
				<span v-if="userInfo.type === 3">微信</span>
			</div>
			<!--<div class="list-item">
				<p>开户行名称</p>
				<span>中国银行</span>
			</div>
			<div class="list-item">
				<p>开户行</p>
				<span>银行</span>
			</div>
			<div class="list-item">
				<p>银行卡号</p>
				<span>6666**********6666</span>
			</div>-->
		</section>
		
		<nav class="bg-white">
			<ul>
				<li v-for="(value, index) in detailList" :class="{ active: isActive[index] }" @click="detailShow(index)">{{ value }}</li>
			</ul>
		</nav>
		
		<section class="billing-detail" v-show="isActive[0]">
			<div v-for="list in listData.list" class="bg-white con">
				<div class="content">
					<div class="col-4">
						<p>{{ list.clue_num }}</p>
						<span>有效预定奖励</span>
					</div>
					<div class="col-4">
						<p>{{ list.course_num }}</p>
						<span>有效留单奖励</span>
					</div>
					<div class="col-4">
						<p>{{ list.clue_num + list.course_num }}</p>
						<span>合计奖励</span>
					</div>
				</div>	
				<p>{{ list.date }}</p>
			</div>
		</section>
		
		<section class="caclulation-record" v-show="isActive[1]">
			<div class="bg-white record con" v-for="settle in settleHistory">
				<div class="record-content">
					<p class="content-left">结算金额 <span>{{ settle.price }}</span></p>
					<p class="content-right">结算状态
						<span>已确认结算</span>
					</p>
					<p class="content-left">结算申请时间 <span>{{ settle.s_time.split(' ')[0] }}</span></p>
					<p class="content-right">操作 <span>打款结算</span></p>
					<p>结算起止时间 <span>{{ settle.s_time.split(' ')[0] + '~' + settle.e_time.split(' ')[0] }}</span></p>
				</div>
				<p>账单明细></p>
			</div>
			<div class="dataNo" v-if="settleHistory.length === 0">
				结算记录为空
			</div>
		</section>
	</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import axios from 'axios'
export default {
  components: {
    HeaderNav
  },
  mounted () {
    axios.get('http://hxb.scpoo.com/hxb/index.php/index/promoter/getPromoterPayDetail?id=' + this.$router.currentRoute.params.id)
      .then(msg => {
        this.listData = msg.data.data
      })
    axios.get('http://hxb.scpoo.com/hxb/index.php/index/promoter/getPromoterPayList?status=' + this.$router.currentRoute.params.status + '&stu_id=' + this.$router.currentRoute.params.stu_id)
      .then(msg => {
        for (let i = 0; i < msg.data.data.length; i++) {
          if (msg.data.data[i].id === parseInt(this.$router.currentRoute.params.id)) {
            this.userInfo = msg.data.data[i]
          }
        }
      })
    axios.get('http://hxb.scpoo.com/hxb/index.php/index/promoter/getPromoterPayList?status=2' + '&stu_id=' + this.$router.currentRoute.params.stu_id)
      .then(msg => {
        this.settleHistory = msg.data.data
      })
  },
  data () {
    return {
      detailList: ['账单明细', '结算记录'],
      isActive: [true, false],
      listData: {},
      userInfo: {},
      settleHistory: []
    }
  },
  methods: {
    detailShow (index) {
      for (let i = 0; i < this.isActive.length; i++) {
        this.isActive[i] = false
      }
      this.$set(this.isActive, index, true)
    }
  }
}
</script>

<style scoped>
	p { margin-bottom: 0;}
	.bg-white { background: #FFFFFF;}
	.protocol-name { height: 1.2rem; line-height: 1.2rem; width: 100%; text-align: center; font-size: 0.8rem; color: #333333; margin: 0;}
	.sure-settle { height: 0.8rem; line-height: 0.8rem; width: 100%; text-align: center; font-size: 0.4rem; color: #999999;}
	.list-item { width: 100%; padding: 0 0.5rem; height: 1.2rem; display: flex;}
	.list-item p { width: 50%; font-size: 0.4rem; line-height: 1.2rem; color: #666666; float: left;}
	.list-item span { width: 50%; font-size: 0.4rem; line-height: 1.2rem; text-align: right; display: inline-block; color: #333333;}
	
	nav { margin-top: 0.5rem; height: 1.2rem; line-height: 1.2rem; width: 100%; box-sizing: border-box; margin-bottom: 3px;}
	nav ul { padding: 0 0.5rem; height: 1.2rem;}
	nav ul li { width: 50%; text-align: center; float: left; font-size: 0.4rem; line-height: 1.2rem; padding: 0 0.5rem;}
	nav ul li.active { border-bottom: 3px solid #2c618b; color: #2c618b;}
	
	/*账单明细*/
	.billing-detail { margin-bottom: 0.5rem; }
	.con { margin-bottom: 0.3rem;}
	.content { display: flex; width: 100%; padding: 0 0.5rem; border-bottom: 1px solid #EEEEEE;}
	.content .col-4 { flex-grow: 1; padding: 0.3rem 0;}
	.content .col-4 p { text-align: center; color: #333333; font-size: 0.4rem; line-height: 0.6rem;}
	.content .col-4 span { text-align: center; display: block; color: #999999; font-size: 0.4rem; line-height: 0.6rem;}
	.con > p { color: #999999; height: 1.2rem; line-height: 1.2rem; text-align: right; padding-right: 0.5rem;}
	
	/*结算记录*/
	.record-content { width: 100%; padding: 0.5rem; line-height: 0.8rem; border-bottom: 1px solid #EEEEEE;}
	.record-content .content-left { width: 5rem; float: left;}
	.record-content .content-right { width: 4rem; float: left;}
	.record-content p { font-size: 0.4rem; color: #999999; line-height: 0.8rem;}
	.record-content p span { color: #333333;}
	.record > p { height: 1.2rem; line-height: 1.2rem; padding-right: 0.5rem; text-align: right; color: #93c971; font-size: 0.4rem;}
	.dataNo { width: 100%; height: 4rem; line-height: 4rem; text-align: center; font-size: 0.8rem;}
</style>