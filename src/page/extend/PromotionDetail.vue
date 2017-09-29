<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<nav>
			<ul>
				<li v-for="(value, index) in detailList" :class="{ active: isActive[index] }" @click="detailShow(index)">{{ value }}</li>
			</ul>
		</nav>
		
		<div v-show="isActive[0]">
			<section class="commission-settlement">
				<div class="set-title">佣金结算</div>				
				<div class="set-money">
					<div class="pending-set settlement">
						<p>999,9</p>
						<p>待结算</p>
						<p>(元)</p>
					</div>
					<div class="confirm-set settlement">
						<p>0.00</p>
						<p>待确认到账</p>
						<p>(元)</p>
					</div>
					<div class="total-set settlement">
						<p>199.00</p>
						<p>累计</p>
						<p>(元)</p>
					</div>
				</div>
			</section>
			
			<section class="commission-settlement">
				<div class="set-title">佣金结算</div>				
				<div class="work">
					<div class="work-left">
						<p>最近一周转发页面</p>
						<p>999,9</p>
					</div>
					<div class="work-right">
						<p>最近一周转发次数</p>
						<p>199</p>
					</div>
				</div>
				<div class="work">
					<div class="work-left">
						<p>累计转发页面</p>
						<p>999,9</p>
					</div>
					<div class="work-right">
						<p>累计转发次数</p>
						<p>199</p>
					</div>
				</div>
			</section>
			
			<section class="commission-settlement">
				<div class="set-title">推广效果</div>				
				<div class="work">
					<div class="work-left">
						<p>带来 PV/UV</p>
						<p>999/100</p>
					</div>
					<div class="work-right">
						<p>带来转发</p>
						<p>199</p>
					</div>
				</div>
				<div class="work">
					<div class="work-left">
						<p>带来预定订单</p>
						<p>999,9</p>
					</div>
					<div class="work-right">
						<p>带来留单</p>
						<p>199</p>
					</div>
				</div>
			</section>
			
			<section class="commission-settlement">
				<div class="set-title">推广动态</div>				
				<div class="news">
					<div class="news-list">
						<p>转发了xx。</p>
						<span class="time">2017-3-4 11:21</span>
					</div>
					<div class="news-list">
						<p>xx浏览了他xx时间转发的xx</p>
						<span class="time">2017-3-4 11:21</span>
					</div>
				</div>
			</section>
		</div>
		
		<div v-show="isActive[1]">
			<section class="commission-settlement">
				<div class="head">
					<img :src="listData.headimgurl" />
				</div>
				<div class="name_address">
					<p class="name">{{ listData.realname }}</p>
					<p class="address">{{ listData.cityid }}</p>
				</div>
			</section>
			
			<section class="commission-settlement">
				<div class="set-title">基本信息</div>				
				<div class="base-info">
					<div class="base-list">
						<div class="base-list-left">
							<img src="../../../static/images/name.png" alt="" />
							<p>昵称</p>
						</div>
						<span class="time">{{ listData.realname }}</span>
					</div>
					<div class="base-list">
						<div class="base-list-left">
							<img src="../../../static/images/phone.png" alt="" />
							<p>电话</p>
						</div>
						<span class="time">{{ listData.tel }}</span>
					</div>
					<div class="base-list">
						<div class="base-list-left">
							<img src="../../../static/images/getTime.png" alt="" />
							<p>成为推广员时间</p>
						</div>
						<span class="time">{{ listData.create_time }}</span>
					</div>
				</div>
			</section>
		</div>
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
    axios.post('http://hxb.scpoo.com/hxb/index.php/index/promoter/promoter_select', {
      id: this.$router.currentRoute.params.id
    })
      .then(msg => {
        if (msg.data.ret === 100) {
          this.listData = msg.data.data
        }
      })
  },
  data () {
    return {
      detailList: ['推广概况', '基本资料'],
      isActive: [true, false],
      listData: {}
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
	/*nav导航条*/
	nav { height: 1.2rem; line-height: 1.2rem; width: 100%; background: #FFFFFF; box-sizing: border-box; border-bottom: 1px solid #EEEEEE;}
	nav ul { width: 100%; height: 1.2rem; background: #FFFFFF; padding: 0 0.5rem;}
	nav ul li { float: left; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 3.5rem; margin: 0 0.5rem; text-align: center; color: #666666;}
	nav ul li.active { color: #2c618b; border-bottom: 3px solid #2c618b;}
	
	/*推广概况*/
	.commission-settlement { background: #FFFFFF; margin-top: 0.5rem;}
	.set-title { padding-left: 1rem; padding-right: 0.5rem; height: 1.2rem; border-bottom: 1px solid #EEEEEE; line-height: 1.2rem; font-size: 0.4rem; position: relative;}
	.set-title:before { content:""; width: 0.2rem; height: 0.6rem; background: #2c618b; display: inline-block; position: absolute; top: 0.3rem; left: 0.5rem;}
	.set-money { margin: 0.5rem; height: 3.8rem;}
	.set-money:after { clear: both; height: 0; overflow: hidden; display: inline-block;}
	.settlement { border-radius: 50%; width: 2.8rem; height: 2.8rem; float: left;}
	.pending-set { border: 3px solid #2c618b; margin-right: 0.3rem;}
	.confirm-set { border: 3px solid #53bfdc; margin-right: 0.3rem;}
	.total-set { border: 3px solid #93c971;}
	.settlement p { font-size: 0.4rem; text-align: center; width: 2.8rem; margin: 0; color: #333333; height: 0.5rem; line-height: 0.5rem;}
	.settlement p:first-child { color: #000000; margin-top: 0.5rem; font-size: 0.5rem; height: 0.8rem; line-height: 0.8rem;}
	
	.work { height: 2rem; border-bottom: 1px solid #EEEEEE;}
	.work-left { padding-left: 0.5rem; clear: both; width: 5rem; height: 1.5rem; margin-top: 0.3rem; margin-bottom: 0.3rem; float: left; border-right: 1px solid #EEEEEE;}
	.work p { font-size: 0.4rem; line-height: 0.6rem; color: #333333;}
	.work-right { padding-left: 0.5rem; float: left; margin-top: 0.3rem;}
	
	.news { padding: 0 0.5rem; margin-bottom: 1rem;}
	.news-list { line-height: 0.8rem; height: 0.8rem;}
	.news-list p { color: #333333; font-size: 0.4rem; float: left; width: 6rem; margin: 0;}
	.news-list span { font-size: 0.4rem; width: 3rem; color: #999999; text-align: right;}
	
	/*基本资料*/
	.head { width: 100%; height: 3rem; text-align: center; vertical-align: middle; line-height: 3rem;}
	.head img { width: 2rem; height: 2rem; border-radius: 50%; vertical-align: middle;}
	.name_address { width: 100%; height: 2rem; text-align: center;}
	.name_address p { font-size: 0.4rem; height: 0.6rem; line-height: 0.6rem;}
	.name_address .name { color: #000000; font-size: 0.44rem;}
	.name_address .address { color: #999999;}
	
	.base-list { padding: 0 0.5rem; display: flex; height: 1.2rem; border-bottom: 1px solid #EEEEEE; line-height: 1.2rem;}
	.base-list:after { content: ""; width: 0; height: 0; visibility: hidden; clear: both; display: block;}
	.base-list-left { float: left; width: 4.5rem;}
	.base-list-left img { width: 0.6rem; vertical-align: middle;}
	.base-list-left p { font-size: 0.4rem; padding-left: 0.3rem; line-height: 1.2rem; display: inline-block; color: #999999;}
	.base-list span { text-align: right; display: inline-block; width: 4.5rem; float: right; color: #333333; font-size: 0.4rem; line-height: 1.2rem;}
</style>