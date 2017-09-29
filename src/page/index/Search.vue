<template>
	<HeaderNav :classify=1 :searchIcon=0>
		<form class="mui-input-group">
			<input id="search" type="search" @change="getUserChangeSearch" class="mui-input-clear" ref="searchTip" placeholder="请输入您要搜索的关键词">
			<span class="mui-icon mui-icon-clear mui-hidden"></span>
			<span class="mui-icon mui-icon-search"></span>
      <button @click="gotoUserSearch">搜索</button>
      <div v-for="user in userSearchValue">
      	<router-link class="userSearch" :to="{ name: 'SearchList', params: { id: user } }"></router-link>
      </div>
		</form>
		
		<div class="mui-content bg-white">
			<div class="mui-row">
				<div class="mui-col-xs-12">
					<li class="table-view-cell hot_search search">热门搜索 </li>
				</div>
			</div>
		    <div class="mui-row">
		        <div class="mui-col-xs-3" v-for="hotSearch in HotSearch">
		            <router-link to='/CompositeList' class="table-view-cell">{{ hotSearch }}</router-link>
		        </div>
		    </div>
		</div>
		
		<div class="mui-content bg-white" v-if="seen">
			<div class="mui-row">
				<div class="mui-col-xs-12">
					<li class="table-view-cell hot_search search">搜索记录 </li>
				</div>
			</div>
		    <div class="mui-row">
		        <div class="mui-col-xs-3" v-for="useSearch in UserSearch">
		            <router-link to='/CompositeList' class="table-view-cell">{{ useSearch }}</router-link>
		        </div>
		        <div class="mui-col-xs-12 text-center">
		            <li class="table-view-cell" @click="deleteUserSearch">清除历史记录></li>
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
      HotSearch: [],
      UserSearch: [],
      seen: false,
      userSearchValue: []
    }
  },
  components: {
    HeaderNav
  },
  mounted () {
    this.getHotSearch()
    this.getUserSearch()
  },
  methods: {
    getHotSearch () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getHotSearch')
        .then(msg => {
          if (msg.data.code === 1) {
            this.HotSearch = msg.data.data
          }
        })
    },
    getUserSearch () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getUserSearch')
        .then(msg => {
          if (msg.data.code === 1 && msg.data.data.length > 0) {
            this.UserSearch = msg.data.data
            this.seen = true
          }
        })
    },
    deleteUserSearch () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/deleteUserSearch')
        .then(msg => {
          if (msg.data.code === 1) {
            this.UserSearch = msg.data.data
          }
        })
    },
    getUserChangeSearch () {
      this.userSearchValue[0] = String.trim(this.$refs.searchTip.value)
      this.$set(this.userSearchValue, 0, this.userSearchValue[0])
    },
    gotoUserSearch () {
      if (document.querySelector('.userSearch') && String.trim(document.querySelector('#search').value).length > 0) {
        document.querySelector('.userSearch').click()
      } else {
        alert('请输入搜索内容')
      }
    }
  }
}
</script>

<style scoped>
	/*搜索框*/
	.mui-input-group { width: 9rem; background: none; margin: 0.3rem auto; height: 1.2rem; line-height: 1.2rem; position: relative;}
	.mui-input-group:before { height: 0;}
	.mui-input-group:after { height: 0;}
	.mui-search { height: 1.2rem; width: 9rem;}
	.mui-input-group input[type=search] { text-align: left; padding-left: 0.6rem;}
	.mui-icon { position: absolute; top: 0.4rem; left: 0.1rem; font-size: 0.4rem;}
	input[type=search] { background: #fff; width: 80%; border-radius: 0; padding: 0; margin: 0; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem;}
  .mui-input-group button { float: right; width: 20%; border: none; background: none; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; padding: 0;}
  
  /*搜索*/
  .bg-white { background: #fff;}
	.mui-content { margin-bottom: 0.3rem;}
	.mui-inner-wrap .mui-content.bg-white { padding-top: 0;}
	.mui-col-xs-12 { color: rgb(76, 217, 100);}
	.table-view-cell { font-size: 0.4rem; line-height: 1rem; padding: 0; color: #333333; padding: 0 0.2rem; display: inline-block;}
	.search { color: rgb(76, 217, 100);}
	.table-view-cell.active { background: #c1c1c1;}
	.mui-row { width: 90%; margin: 0 auto;}
	.text-center { text-align: center;}
	.text-center .table-view-cell { color: #666666;}
</style>