<template>
	<HeaderNav :classify=0 :searchIcon=1>
		<router-link to='/CompositeList'>
			<button type="button" class="mui-btn mui-btn-block all-classify">全部分类</button>
		</router-link>
		
		<div class="mui-content bg-white">
			<div class="mui-row">
				<div class="mui-col-xs-12">
					<router-link to='/CompositeList' class="table-view-cell">按场景 </router-link>
				</div>
			</div>
		    <div class="mui-row">
		        <div class="mui-col-xs-3">
		            <router-link to='/CompositeList' class="table-view-cell active">全部 </router-link>
		        </div>
		        <div class="mui-col-xs-3" v-for="appClassify0 in appClassify[0]">
		            <router-link to='/CompositeList' class="table-view-cell">{{ appClassify0.name }}</router-link>
		        </div>
		    </div>
		</div>
		
		<div class="mui-content bg-white">
			<div class="mui-row">
				<div class="mui-col-xs-12">
					<router-link to='/CompositeList' class="table-view-cell">按风格 </router-link>
				</div>
			</div>
		    <div class="mui-row">
		        <div class="mui-col-xs-3">
		            <router-link to='/CompositeList' class="table-view-cell">全部 </router-link>
		        </div>
		        <div class="mui-col-xs-3" v-for="appClassify1 in appClassify[1]">
		            <router-link to='/CompositeList' class="table-view-cell">{{ appClassify1.name }}</router-link>
		        </div>
		    </div>
		</div>
		<div class="mui-content bg-white">
			<div class="mui-row">
				<div class="mui-col-xs-12">
					<router-link to='/CompositeList' class="table-view-cell">按季节 </router-link>
				</div>
			</div>
		    <div class="mui-row">
		        <div class="mui-col-xs-3">
		            <router-link to='/CompositeList' class="table-view-cell">全部 </router-link>
		        </div>
		        <div class="mui-col-xs-3" v-for="appClassify2 in appClassify[2]">
		            <router-link to='/CompositeList' class="table-view-cell">{{ appClassify2.name }}</router-link>
		        </div>
		    </div>
		</div>
		<div class="mui-content bg-white">
			<div class="mui-row">
				<div class="mui-col-xs-12">
					<router-link to='/CompositeList' class="table-view-cell">按类型 </router-link>
				</div>
			</div>
		    <div class="mui-row">
		        <div class="mui-col-xs-3">
		            <router-link to='/CompositeList' class="table-view-cell">全部 </router-link>
		        </div>
		        <div class="mui-col-xs-3" v-for="fix in fixClass">
		            <router-link to='/CompositeList' class="table-view-cell">{{ fix }}</router-link>
		        </div>
		    </div>
		</div>
	</HeaderNav>
</template>

<script>
import axios from 'axios'
import HeaderNav from '../../components/HeaderNav'
export default {
  data () {
    return {
      fixClass: ['微场景', '微网页', '微信图文'],
      appClassify: []
    }
  },
  components: {
    HeaderNav
  },
  mounted () {
    for (let i = 0; i < 3; i++) {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getAppCategory?type=' + (i + 1))
        .then(msg => {
          if (msg.data.code === 1) {
            this.appClassify[i] = msg.data.data
            this.$set(this.appClassify, i, msg.data.data)
          }
        })
    }
  }
}
</script>

<style scoped>
	ol,ul,li { list-style: none;}
	.bg-white { background: #fff;}
	.all-classify { width: 90%; margin: 0.3rem auto; font-size: 0.5rem; height: 1.5rem; line-height: 1.5rem; padding: 0;}
	.mui-content { margin-bottom: 0.3rem;}
	.mui-inner-wrap .mui-content.bg-white { padding-top: 0;}
	.mui-col-xs-12 { color: rgb(76, 217, 100);}
	.table-view-cell { font-size: 0.4rem; line-height: 1rem; margin-bottom: 0.2rem; padding: 0; color: #333333; padding: 0 0.2rem; display: inline-block;}
	.table-view-cell.active { background: #c1c1c1;}
	.mui-row { width: 90%; margin: 0 auto;}
</style>