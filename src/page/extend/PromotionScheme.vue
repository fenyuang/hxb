<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<nav>
			<div>
				<ul>
					<li v-for="(value, index) in schemeList" :class="{ active: isActive[index] }" @tap="schemeShow(index)">{{ value }}</li>
				</ul>
			</div>
		</nav>
		
		<div v-show="isActive[0]" @tap.stop="layerHidden">
			<section class="extend extend_plan">
				<ul>
					<li v-for="(list, index) in listData" @tap.stop="toPlanDetail(list.id)">
						<div class="left_panel">
							<p class="panel_title panel_text">{{ list.plan_name }}</p>
							<p class="panel_result panel_text" v-if="list.plan_state === 1">生效中</p>
							<p class="panel_result panel_text" v-else-if="list.plan_state === 0">已失效</p>
						</div>
						<div class="right_panel">
							<p class="panel_use panel_text">使用 <span>{{ list.use_num }}</span></p>
							<p class="panel_finish panel_text">结束</p>
						</div>
					</li>
				</ul>
			</section>
			
			<section class="layer" v-show="layer">
				<div class="layer-background"></div>
				<div class="layer-content">
					<span @tap.stop="layerHidden"></span>
					<div class="new-scheme layer-scheme" @tap.stop="toNewScheme">新建推广方案</div>
					<div class="set-scheme layer-scheme" @tap.stop="toSetScheme">设置推广员门槛</div>
				</div>
			</section>
			
			<div class="addLayer" @tap.stop="layerShow">
				<img src="../../../static/images/add.png"/>
			</div>
		</div>
	
		<div v-show="isActive[1]">
			<ul class="scheme">
				<li v-for="(value, index) in schemeLi" :class="{ scheme_active: schemeActive[index] }" @tap="schemeLiShow(index)">{{ value }}</li>
			</ul>
			<div class="scheme-search scheme-abs" v-show="schemeActive[0]">
				<input type="text" ref="searchNameId" placeholder="请输入推广员姓名或编号查找" />
				<button @tap.stop="extensionListSearch">确认</button>
			</div>
			<div class="scheme-date scheme-abs" v-show="schemeActive[1]">
				<input type="date" ref="beforeDate" />
				<span>至</span>
				<input type="date" ref="afterDate" />
				<button @tap.stop="extensionCreateTime">确认</button>
			</div>
			<ul class="scheme-list scheme-abs" v-show="schemeActive[2]">
				<li @tap.stop="extensionListCreateTime">按成员推广时间</li>
				<li @tap.stop="extensionListPageTrans">按一周转发页面</li>
			</ul>
			
			<section class="extend extend_plan">
				<ul>
					<li v-for="list in listData" @tap.stop="toPromotionDetail(list.id)">
						<div class="left_panel">
							<p class="panel_title panel_text">{{ list.realname }}</p>
							<p class="panel_result panel_text">{{ list.create_time }}</p>
						</div>
						<div class="right_panel">
							<p class="panel_use panel_text">{{ list.studentid }}</p>
							<p class="panel_finish panel_text">{{ list.tel }}</p>
						</div>
					</li>
				</ul>
			</section>
		</div>

		<div v-show="isActive[2]">
			<div class="apply">
				<label>推广员</label>
				<input type="text" ref="commissionSearch" placeholder="请输入推广员姓名查找" />
				<button @tap.stop="commissionApplySearch">查询</button>
			</div>
			
			<section class="extend extend_plan">
				<ul>
					<li v-for="list in listData" @tap.stop="toListDetail(list.status, list.stu_id, list.id)">
						<div class="left_panel">
							<p class="panel_title panel_text">{{ list.realname }}</p>
							<p class="panel_result panel_text" v-if="list.status===1">未结算</p>
							<p class="panel_result panel_text" v-else-if="list.status===1">已确认结算</p>
						</div>
						<div class="right_panel">
							<p class="panel_use panel_text" v-if="list.type===1">支付宝</p>
							<p class="panel_use panel_text" v-if="list.type===2">微信</p>
							<p class="panel_use panel_text" v-if="list.type===3">银行卡</p>
							<p class="panel_finish panel_text" v-if="list.type===1">{{ list.alipay }}</p>
							<p class="panel_finish panel_text" v-if="list.type===2">{{ list.wxpay }}</p>
							<p class="panel_finish panel_text" v-if="list.type===3">{{ list.bank_no }}</p>
						</div>
					</li>
				</ul>
			</section>
		</div>
	
		<div v-show="isActive[3]">
			<section class="extend extend_plan">
				<ul>
					<li v-for="list in listData" @tap.stop="toListDetail(list.status, list.stu_id, list.id)">
						<div class="left_panel">
							<p class="panel_title panel_text">{{ list.realname }}</p>
							<p class="panel_result panel_text" v-if="list.status===1">未结算</p>
							<p class="panel_result panel_text" v-else-if="list.status===1">已确认结算</p>
						</div>
						<div class="right_panel">
							<p class="panel_use panel_text" v-if="list.type===1">支付宝</p>
							<p class="panel_use panel_text" v-if="list.type===2">微信</p>
							<p class="panel_use panel_text" v-if="list.type===3">银行卡</p>
							<p class="panel_finish panel_text" v-if="list.type===1">{{ list.alipay }}</p>
							<p class="panel_finish panel_text" v-if="list.type===2">{{ list.wxpay }}</p>
							<p class="panel_finish panel_text" v-if="list.type===3">{{ list.bank_no }}</p>
						</div>
					</li>
				</ul>
			</section>
		</div>
		
		<div class="markLayer" v-show="markLayer"></div>
		<div class="layer-floor" ref="markLayer" v-show="markLayer">查询数据为空...</div>
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
      schemeList: ['推广方案', '推广员列表', '佣金结算申请', '佣金结算历史'],
      isActive: [true, false, false, false],
      schemeLi: ['推广员', '成为推广员时间', '排序方式'],
      schemeActive: [false, false, false],
      layer: false,
      listData: [],
      listDataId: [],
      markLayer: false
    }
  },
  mounted () {
    this.promotionScheme()
    setTimeout(this.layerHeight, 1000)
  },
  methods: {
    schemeShow (index) {
      for (let i = 0; i < this.isActive.length; i++) {
        this.isActive[i] = false
      }
      if (index === 0) {
        this.promotionScheme()
      } else if (index === 1) {
        this.extensionList()
      } else if (index === 2) {
        this.commissionApply()
      } else if (index === 3) {
        this.commissionApplyHistory()
      }
      this.$set(this.isActive, index, true)
    },
    layerHeight () {
      document.querySelector('.layer').style.height = document.querySelector('.extend_plan').offsetHeight + document.querySelector('nav').offsetHeight + 'px'
    },
    promotionScheme () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Promotionplan/plan_list')
        .then(msg => {
          if (msg.data.ret === 100) {
            this.listData = msg.data.data
          }
        })
    },
    layerShow () {
      this.layer = true
    },
    layerHidden () {
      this.layer = false
    },
    toNewScheme () {
      this.$router.push('/NewPromotionScheme')
    },
    toSetScheme () {
      this.$router.push('/SetPromotionThreshold')
    },
    toListDetail (status, stuId, id) {
      this.$router.push('/ListDetail/' + status + '/' + stuId + '/' + id)
    },
    toPlanDetail (id) {
      this.$router.push('/PlanDetail/' + id)
    },
    extensionList () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/promoter/promoter_list')
        .then(msg => {
          if (msg.data.ret === 100) {
            this.listData = msg.data.data
          }
        })
    },
    toPromotionDetail (id) {
      this.$router.push('/PromotionDetail/' + id)
    },
    extensionListSearch () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/promoter/promoter_list', {
        studentid: parseInt(this.$refs.searchNameId.value) || '',
        stu_name: parseInt(this.$refs.searchNameId.value) ? '' : this.$refs.searchNameId.value
      })
        .then(msg => {
          if (msg.data.ret === 100) {
            this.listData = msg.data.data
            this.schemeActive[0] = false
          } else {
            this.$refs.layer.innerHTML = '查询数据为空'
            this.markLayer = true
            setTimeout(this.layerHide, 2000)
          }
        })
    },
    extensionCreateTime () {
      if (this.$refs.beforeDate.value < this.$refs.afterDate.value) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/promoter/promoter_list', {
          create_time: [this.$refs.beforeDate.value, this.$refs.afterDate.value]
        })
          .then(msg => {
            if (msg.data.ret === 100) {
              this.listData = msg.data.data
              this.schemeActive[1] = false
            } else {
              this.$refs.markLayer.innerHTML = '您所查的时间无数据'
              this.markLayer = true
              setTimeout(this.layerHide, 2000)
            }
          })
      } else {
        this.$refs.markLayer.innerHTML = '输入日期不正确'
        this.markLayer = true
        setTimeout(this.layerHide, 2000)
      }
    },
    extensionListCreateTime () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/promoter/promoter_list', {
        order: 'create_time '
      })
        .then(msg => {
          this.listData = msg.data.data
          this.schemeActive[2] = false
        })
    },
    extensionListPageTrans () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/promoter/promoter_list', {
        order: 'page_trans'
      })
        .then(msg => {
          this.listData = msg.data.data
          this.schemeActive[2] = false
        })
    },
    commissionApply () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/promoter/getPromoterPayList?status=' + 1)
        .then(msg => {
          this.listData = msg.data.data
        })
    },
    commissionApplySearch () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/promoter/getPromoterPayList?status=1&stu_name=' + this.$refs.commissionSearch.value)
        .then(msg => {
          if (msg.data.code === 1) {
            if (msg.data.data.length > 0) {
              this.listData = msg.data.data
            } else {
              this.$refs.markLayer.innerHTML = '查询数据为空'
              this.markLayer = true
              setTimeout(this.layerHide, 2000)
            }
          } else {
            this.$refs.markLayer.innerHTML = '查询数据为空'
            this.markLayer = true
            setTimeout(this.layerHide, 2000)
          }
        })
    },
    commissionApplyHistory () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/promoter/getPromoterPayList?status=' + 2)
        .then(msg => {
          console.log(msg)
          this.listData = msg.data.data
        })
    },
    schemeLiShow (index) {
      if (!this.schemeActive[index]) {
        for (let i = 0; i < this.isActive.length; i++) {
          this.schemeActive[i] = false
        }
        this.$set(this.schemeActive, index, true)
      } else {
        this.$set(this.schemeActive, index, false)
      }
    },
    layerHide () {
      this.markLayer = false
    }
  }
}
</script>

<style scoped>
	/*nav导航条*/
	::-webkit-scrollbar { width: 0; height: 0;}
	nav { height: 1.2rem; line-height: 1.2rem; width: 100%; background: #FFFFFF; overflow: hidden; box-sizing: border-box; border-bottom: 1px solid #EEEEEE;}
	nav div { overflow-x: auto; height: 1.2rem; width: 100%;}
	nav ul { width: 14rem; height: 1.2rem; background: #FFFFFF;}
	nav ul li { float: left; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 3.5rem; text-align: center; color: #666666;}
	nav ul li.active { color: #2c618b; border-bottom: 3px solid #2c618b;}
	
	/*推广方案*/
	.extend { background: #FFFFFF; margin-top: 0.5rem;}
	.extend_plan ul li { height: 2.2rem; width: 100%; border-bottom: 2px solid #eeeeee; position: relative;}
	.extend_plan ul li .left_panel { float: left; margin: 0.5rem; width: 4rem;}
	.extend_plan ul li .panel_text { color: #999999; font-size: 0.4rem; margin: 0; line-height: 0.6rem;}
	.extend_plan ul li .panel_title { color: #333333;}
	.extend_plan ul li .panel_use span { color: #333333;}
	.extend_plan ul li .right_panel { float: right; margin: 0.5rem 1.2rem;}
	.right_panel .panel_text { text-align: right;}
	.extend_plan ul li:after { content: ">"; position: absolute; font-size: 0.8rem; color: #999999; height: 0.8rem; right: 0.5rem; top: 0.8rem;}
	/*遮罩层、新建图层*/
	.addLayer { position: fixed; right: 0.5rem; bottom: 1rem; height: 1rem; width: 1rem; z-index: 99999; opacity: 0.8;}
	.addLayer img { width: 1rem; height: 1rem;}
	.layer { width: 100%; position: absolute; top: 1.333333rem; left: 0;}
	.layer .layer-background { width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3);}
	.layer .layer-content { width: 70%; border-radius: 5px; height: 4rem; background: #93c971; position: fixed; top: 5rem; left: 15%;}
	.layer .layer-content span { width: 100%; height: 0.8rem; display: block; position: relative;}
	.layer .layer-content span:after { content: "\2715"; position: absolute; top: 0.2rem; right: 0rem; width: 0.8rem; height: 0.8rem; font-size: 0.6rem; color: #FFFFFF;}
	.layer .layer-content .layer-scheme { width: 80%; color: #FFFFFF; border: 2px solid #FFFFFF; height: 1rem; line-height: 1rem; font-size: 0.4rem; text-align: center; border-radius: 5px; margin: 0 auto 0.5rem;}
	
	/*推广员列表*/
	.scheme { width: 100%; background: #FFFFFF; height: 1.2rem; line-height: 1.2rem; border-bottom: 2px solid #EEEEEE;}
	.scheme li { font-size: 0.4rem; color: #666666; padding:0 0.53rem; float: left; height: 1.2rem; text-align: center; line-height: 1.2rem;}
	.scheme li:after { content: "\25BC"; font-size: 0.4rem; line-height: 1.2rem; height: 1.2rem;}
	.scheme li.scheme_active:after { content: "\25B2";}
	.scheme .scheme-student { width: 2.6rem;}
	.scheme .scheme-time { width: 4.4rem;}
	.scheme .list-order { width: 3rem;}
	
	.scheme-abs { position: absolute; z-index: 9; box-shadow: 10px 10px 5px 5px #ececec;}
	.scheme-list { width: 100%; background: #FFFFFF;}
	.scheme-list li { width: 100%; color: #666666; padding-left: 0.5rem; border-bottom: 2px solid #EEEEEE; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem;}
	.scheme-date { width: 100%; height: 1.2rem; line-height: 1.2rem; background: #FFFFFF; padding-left: 0.5rem;}
	.scheme-date input[type="date"] { width: 3.5rem; height: 1rem; border: 0; background: #eeeeee; padding: 0; margin: 0;}
	.scheme-date span { font-size: 0.4rem; line-height: 1.2rem; color: #999999;}
	.scheme-date button { background: #93c971; color: #FFFFFF; text-align: center; height: 1rem; line-height: 1rem; font-size: 0.4rem; width: 1.5rem; padding: 0; border: 0; margin-top: 0.1rem;}
	.scheme-search { width: 100%; height: 1.2rem; line-height: 1.2rem; background: #FFFFFF; padding-left: 0.5rem;}
	.scheme-search input[type="text"] { width: 7.4rem; height: 1rem; background: #EEEEEE; font-size: 0.4rem; color: #999999; border: 0; padding-left: 0.2rem; border-radius: 5px; margin-top: 0.1rem;}
	button { width: 1.5rem; height: 1rem; line-height: 1rem; padding: 0; margin-top: 0.1rem; font-size: 0.4rem; text-align: center; color: #FFFFFF; border: 0; border-radius: 5px; background: #93c971;}
		
	/*申请结算*/
	.apply { width: 100%; height: 1.2rem; padding: 0 0.5rem; line-height: 1.2rem; background: #FFFFFF; border-bottom: 1px solid #EEEEEE;}
	.apply label { color: #666666; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 1.5rem;}
	.apply input[type="text"] { background: #EEEEEE; border: 0; padding-left: 0.3rem; color: #999999; font-size: 0.4rem; height: 1rem; line-height: 1rem; margin-top: 0.1rem; width: 6rem;}
	
	/*遮罩层*/
	.markLayer { position: absolute; width: 8rem; height: 2rem; top: 5rem; left: 10%; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 5rem; left: 1rem; z-index: 999; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>