<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<section class="count bg-white">
			<div class="title">
				<p>效果统计</p>
				<select class="select">
					<option value="全部">全部</option>
					<option value="昨天">昨天</option>
					<option value="近七天">近七天</option>
					<option value="近30天">近30天</option>
				</select>
			</div>
			<div class="count-con">
				<div class="left-con con">
					<h3>{{ detailData.pv }}</h3>
					<p>页面PV</p>
				</div>
				<div class="right-con con">
					<h3>{{ detailData.uv }}</h3>
					<p>页面UV</p>
				</div>
			</div>
		</section>
		
		<section class="count bg-white">
			<div class="title">
				<p>表单统计</p>
				<span>共2条记录</span>
			</div>
			<div class="table-count">
				<div class="tab-con">
					<div class="tab-left">
						姓名
					</div>
					<div class="tab-cen">
						电话号码
					</div>
					<div class="tab-rig">
						提交时间
					</div>
				</div>
				<div class="tab-con" v-for="data in detailData.form_list">
					<div class="tab-left">
						{{ data.name }}
					</div>
					<div class="tab-cen">
						{{ data.tel }}
					</div>
					<div class="tab-rig">
						{{ data.reg_time }}
					</div>
				</div>
			</div>
		</section>
		
		<section class="count bg-white">
			<div class="title">
				<p>社交分享</p>
				<span class="share"><img src="../../../static/images/share.png" />分享</span>
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
    axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/UseDetail?id=' + this.$router.currentRoute.params.id + '&type=h5')
      .then(msg => {
        console.log(msg)
        this.detailData = msg.data.data
      })
  },
  data () {
    return {
      detailData: {}
    }
  }
}
</script>

<style scoped>
	p,h3,select { margin: 0; padding: 0;}
	.bg-white { background: #FFFFFF; margin-top: 0.5rem;}
	.title { height: 1.2rem; line-height: 1.2rem;}
	.title p { padding-left: 1rem; width: 4rem; float: left; font-size: 0.4rem; line-height: 1.2rem; color: #333333; position: relative;}
	.title p:after { content: "\007C"; height: 0.5rem; overflow: hidden; font-size: 1.2rem; position: absolute; top: 0.25rem; left: 0.5rem; color: #2c618b;}
	.title select { width: 3rem; direction: rtl; float: right; height: 1.2rem; line-height: 1.2rem; padding-right: 0.5rem;}
	.title select:after { content: "\25BC"; width: 2rem; height: 1rem; background: red; font-size: 0.6rem; position: absolute; top: -0.3rem; left: 0;}
	
	.count-con { width: 100%; height: 4rem;}
	.count-con .con { width: 3rem; height: 3rem; float: left; margin-left: 1rem; margin-right: 1rem; margin-top: 0.5rem; border-radius: 50%;}
	.count-con .con h3 { margin-top: 0.5rem; font-size: 0.5rem; height: 0.8rem; line-height: 0.8rem; text-align: center; color: #000000;}
	.count-con .con p { text-align: center; font-size: 0.4rem; height: 0.8rem; line-height: 0.8rem; color: #333333;}
	.count-con .left-con {  border: 8px solid #2c618b;}
	.count-con .right-con {  border: 8px solid #53bfdc;} 
	
	/*表单统计*/
	.title span { float: right; padding-right: 0.5rem; font-size: 0.4rem; color: #666666;}
	.table-count { display: table; border-collapse: collapse;}
	.tab-con { display: table-row; text-align: center; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; border-top: 2px solid #EEEEEE;}
	.tab-con .tab-left { display: table-cell; width: 2.5rem; padding-left: 0.5rem; border-right: 2px solid #EEEEEE;}
	.tab-con .tab-cen { display: table-cell; width: 4rem; border-right: 2px solid #EEEEEE;}
	.tab-con .tab-rig { display: table-cell; width: 3.5rem;}
	
	.title .share img { width: 0.6rem; height: 0.6rem; margin-right: 0.2rem; vertical-align: middle;}
</style>