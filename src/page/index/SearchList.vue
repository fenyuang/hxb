<template>
	<HeaderNav :classify=1 :searchIcon=0>
		<div class="search-con">
			<form class="mui-input-group">
				<input id="search" type="search" class="mui-input-clear" ref="searchTip" @change="getUserChangeSearch" placeholder="请输入您要搜索的关键词">
				<span class="mui-icon mui-icon-clear mui-hidden"></span>
				<span class="mui-icon mui-icon-search"></span>
	      <button @tap="gotoUserSearch">搜索</button>
			</form>
		</div>
		
		<div class="mui-content bg-white">
			<div class="mui-segmented-control">
				<li class="control-item" @tap="getAppListH5()">
					全部
				</li>
				<li class="control-item" @tap="getAppListH5('h5')">
					微场景
				</li>
				<li class="control-item" @tap="getAppListH5('spa')">
					微网页
				</li>
				<li class="control-item" @tap="getAppListH5('wpa')">
					微信图文
				</li>
			</div>
		</div>
		<p v-show="notSearchShow">暂时没找到您想要的结果，我们会努力的...</p>
		<p v-show="SearchShow">共搜索到 <span style="color:rgb(2, 114, 218); font-size: 0.4rem;">{{ SearchData }}</span> 条内容</p>
		
		<div id="imgCon" v-show="SearchShow">
	    <ul class="mui-table-view mui-grid-view">
	    	<li class="mui-table-view-cell mui-media mui-col-xs-6 imgCon" v-for="(imghtml, index) in imgHtml" @tap="clickSee(index)">
		      <a>
		      	<p class="wap_pic"><img class="mui-media-object" :src=" imghtml.cover "></p>
		      	<div class="mui-media-body"> {{ imghtml.title }} </div>
		      	<div class="look_for">
		      		<p><img src="../../../static/images/browse.png"><span>&nbsp;{{ imghtml.read_num }}</span></p>
		      		<p><img src="../../../static/images/selected.png"><span>&nbsp;{{ imghtml.share_num }}</span></p>
		      	</div>
		      </a>
		      <div class="masker" v-show=" dataType[index] "></div>
		      <div class="mask" v-show=" dataType[index] ">
		      	<p><a class="preview mask_common" @tap="preview(index)">预览</a>
		      	<a class="use mask_common" @tap="editor(index)">使用</a></p>
		      </div>
		    </li>
	    </ul>    
		</div>
	</HeaderNav>
</template>

<script>
import axios from 'axios'
import HeaderNav from '../../components/HeaderNav'
export default {
  data () {
    return {
      notSearchShow: true,
      SearchShow: false,
      SearchData: 0,
      SerchKeyword: [],
      imgHtml: [],
      imgHtmlId: [],
      dataType: []
    }
  },
  components: {
    HeaderNav
  },
  mounted () {
    this.$refs.searchTip.value = decodeURI(this.$router.currentRoute.params.id)
    this.getSearchList()
  },
  methods: {
    getSearchList () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps?keywords=' + this.$router.currentRoute.params.id)
        .then(msg => {
          this.SerchKeyword[0] = this.$router.currentRoute.params.id
          if (msg.data.code === 1) {
            this.notSearchShow = false
            this.SearchShow = true
            this.imgHtml = msg.data.data
            this.SearchData = msg.data.data.length
            this.dataType = []
            for (let i = 0; i < this.imgHtml.length; i++) {
              this.imgHtmlId[i] = this.imgHtml[i].id
              this.dataType[i] = false
            }
          }
        })
    },
    preview (index) {
      this.$router.push('/Preview/' + this.imgHtmlId[index])
    },
    editor (index) {
      this.$router.push('/Editor/' + this.imgHtmlId[index])
    },
    getAppListH5 (type) {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps', {
        type: type,
        keywords: this.SerchKeyword[0]
      })
        .then(msg => {
          if (msg.data.code === 1) {
            this.imgHtml = msg.data.data
            this.SearchData = msg.data.data.length
            this.dataType = []
            for (let i = 0; i < this.imgHtml.length; i++) {
              this.imgHtmlId[i] = this.imgHtml[i].id
              this.dataType[i] = false
            }
          }
        })
    },
    clickSee (index) {
      if (!this.dataType[index]) {
        for (let i = 0; i < this.dataType.length; i++) {
          this.dataType[i] = false
        }
        this.$set(this.dataType, index, !this.dataType[index].seen)
      } else {
        this.$set(this.dataType, index, false)
      }
    },
    getUserChangeSearch () {
      this.SerchKeyword[0] = String.trim(this.$refs.searchTip.value)
      this.$set(this.SerchKeyword, 0, String.trim(this.$refs.searchTip.value))
    },
    gotoUserSearch () {
      this.getUserChangeSearch()
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps?keywords=' + this.SerchKeyword[0])
        .then(msg => {
          if (msg.data.code === 1) {
            this.imgHtml = msg.data.data
            this.SearchData = msg.data.data.length
            this.dataType = []
            for (let i = 0; i < this.imgHtml.length; i++) {
              this.imgHtmlId[i] = this.imgHtml[i].id
              this.dataType[i] = false
            }
          }
        })
    }
  }
}
</script>

<style scoped>
	/*搜索框*/
	.mui-inner-wrap .mui-content.bg-white { padding-top: 0;}
	.search-con { background: #185e96; padding: 0.1rem 0;}
	.mui-input-group { width: 9rem; background: none; margin: 0.1rem auto; height: 1.2rem; line-height: 1.2rem; position: relative;}
	.mui-input-group:before { height: 0;}
	.mui-input-group:after { height: 0;}
	.mui-search { height: 1.2rem; width: 9rem;}
	.mui-input-group input[type=search] { text-align: left; padding-left: 0.6rem;}
	.mui-icon { position: absolute; top: 0.4rem; left: 0.1rem; font-size: 0.4rem;}
	input[type=search] { background: #fff; width: 80%; border-radius: 0; padding: 0; margin: 0; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem;}
  .mui-input-group button { float: right; color: #fff; width: 20%; border: none; background: none; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; padding: 0;}
  
  /*导航条*/
  .bg-white { background: white;}
	.mui-segmented-control { border-radius: 0; border: 0;}
	.mui-segmented-control .control-item { border-left: 0; color: #666; font-size: 0.5rem; line-height: 1.2rem; display: table-cell; overflow: hidden; text-align: center; width: 25%;}
	.mui-segmented-control .control-item.mui-active { background: none; color: rgb(2, 114, 218); border-bottom: 1px solid rgb(2, 114, 218);}
	p { font-size: 0.3rem;}
	
	/*应用列表样式*/
	.mui-table-view.mui-grid-view { padding: 0; background: #f2f2f2;}
	.mui-table-view.mui-grid-view .mui-table-view-cell { margin: 0.2rem; padding: 0; height: 7rem; background: #FFFFFF; position: relative; width: 4.6rem;}
	.mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) { margin: 0; height: 7rem;}
	.mui-table-view-cell>a:not(.mui-btn) > p { height: 5.5rem; overflow: hidden;}
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body { height: 0.8rem; padding-left: 0.2rem; padding-right: 0.2rem; text-align: left; margin-top: 0; font-size: 0.4rem; line-height: 0.8rem;}
	.look_for { height: 0.7rem;}
	.look_for p { height: 0.7rem; line-height: 0.7rem; float: left; margin-left: 0.2rem;}
	.look_for p img { width: 0.3rem; height: 0.3rem; line-height: 0.7rem; margin-top: 0.2rem;}
	.look_for p span { display: inline-block; height: 0.7rem; line-height: 0.7rem; font-size: 0.4rem; margin-right: 0.4rem;}
	.masker { height: 100%; width: 100%; background: #333; position: absolute; left: 0; top: 0; opacity: 0.5;}
	.mask { position: absolute; height: 1.2rem; width: 100%; top: 2.9rem;}
	.mask .mask_common {  padding: 0.2rem 0.3rem; color: #fff;}
	.mask .preview { background: rgb(76, 217, 100); margin-right: 0.2rem;}
	.mask .use { background: rgb(52, 158, 255);}
</style>