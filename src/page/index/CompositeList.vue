<template>
	<HeaderNav :classify=0 :searchIcon=1>
		<div class="mui-content bg-white">
			<div class="mui-card">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right">按场景</a>
						<ul class="mui-collapse-content">
							<li class="mui-table-view-cell mui-active">全部</li>
			        <li class="mui-table-view-cell" v-for="appclass0 in appClass[0]" @tap="getAppListParamId('Scene', appclass0.id)">{{ appclass0.name }}</li>
						</ul>
					</li>
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right">按季节</a>
						<ul class="mui-collapse-content">
							<li class="mui-table-view-cell mui-active">全部</li>
					      <li class="mui-table-view-cell" v-for="appclass1 in appClass[1]" @tap="getAppListParamId('style', appclass1.id)">{{ appclass1.name }}</li>
						</ul>
					</li>
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right">按风格</a>
						<ul class="mui-collapse-content">
							<li class="mui-table-view-cell mui-active">全部</li>
					      <li class="mui-table-view-cell" v-for="appclass2 in appClass[2]" @tap="getAppListParamId('season', appclass2.id)">{{ appclass2.name }}</li>
						</ul>
					</li>
					<li class="mui-table-view-cell mui-collapse">
						<a class="mui-navigate-right">按类型</a>
						<ul class="mui-collapse-content">
							<li class="mui-table-view-cell mui-active">全部</li>
					        <li class="mui-table-view-cell" @tap="getAppListType('h5')">微场景</li>
					        <li class="mui-table-view-cell" @tap="getAppListType('spa')">微网页</li>
					        <li class="mui-table-view-cell" @tap="getAppListType('wpa')">微信图文</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	
		<div id="imgCon">
	    <ul class="mui-table-view mui-grid-view">
	    	<li class="mui-table-view-cell mui-media mui-col-xs-6 imgCon" v-for="(imghtml, index) in imgHtml" @tap.stop="clickSee(index)">
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
		      	<p><a class="preview mask_common" @tap.stop="preview(index)">预览</a>
		      	<a class="use mask_common" @tap.stop="editor(index)">使用</a></p>
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
      appClass: [],
      imgHtmlId: [],
      dataType: [],
      imgHtml: [],
      imgLength: [],
      dataLength: [],
      allMsgData: []
    }
  },
  components: {
    HeaderNav
  },
  mounted () {
    for (let i = 0; i < 3; i++) {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getAppCategory?type=' + (i + 1), {
        data: String
      })
        .then(msg => {
          if (msg.data.code === 1) {
            this.appClass[i] = msg.data.data
          }
        })
    }
    setTimeout(this.getAppList, 100)
    window.addEventListener('touchmove', this.addImgHtml)
  },
  methods: {
    getAppList () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps')
        .then(msg => {
          if (msg.data.code === 1) {
            this.allMsgData = msg.data.data
            this.imgLength[0] = this.allMsgData.length
            if (this.allMsgData.length > 10) {
              this.dataLength[0] = 10
              for (let i = 0; i < 10; i++) {
                this.imgHtml[i] = this.allMsgData[i]
                this.imgHtmlId[i] = this.allMsgData[i].id
                this.dataType[i] = false
                this.$set(this.imgHtml, i, this.allMsgData[i])
              }
            } else {
              this.dataLength[0] = this.allMsgData.length
              for (let i = 0; i < this.allMsgData.length; i++) {
                this.imgHtml[i] = this.allMsgData[i]
                this.imgHtmlId[i] = this.allMsgData[i].id
                this.dataType[i] = false
                this.$set(this.imgHtml, i, this.allMsgData[i])
              }
            }
          }
        })
    },
    getAppListType (type) {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps', {
        type: type
      })
        .then(msg => {
          if (msg.data.code === 1) {
            this.imgHtml = []
            this.allMsgData = msg.data.data
            this.imgLength[0] = this.allMsgData.length
            if (this.allMsgData.length > 10) {
              this.dataLength[0] = 10
              for (let i = 0; i < 10; i++) {
                this.imgHtml[i] = this.allMsgData[i]
                this.imgHtmlId[i] = this.allMsgData[i].id
                this.dataType[i] = false
                this.$set(this.imgHtml, i, this.allMsgData[i])
              }
            } else {
              this.dataLength[0] = this.allMsgData.length
              for (let i = 0; i < this.allMsgData.length; i++) {
                this.imgHtml[i] = this.allMsgData[i]
                this.imgHtmlId[i] = this.allMsgData[i].id
                this.dataType[i] = false
                this.$set(this.imgHtml, i, this.allMsgData[i])
              }
            }
          }
        })
    },
    getAppListParamId (param, id) {
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps', {
        param: id
      })
        .then(msg => {
          if (msg.data.code === 1) {
            this.imgHtml = []
            this.allMsgData = msg.data.data
            this.imgLength[0] = this.allMsgData.length
            if (this.allMsgData.length > 10) {
              this.dataLength[0] = 10
              for (let i = 0; i < 10; i++) {
                this.imgHtml[i] = this.allMsgData[i]
                this.imgHtmlId[i] = this.allMsgData[i].id
                this.dataType[i] = false
                this.$set(this.imgHtml, i, this.allMsgData[i])
              }
            } else {
              this.dataLength[0] = this.allMsgData.length
              for (let i = 0; i < this.allMsgData.length; i++) {
                this.imgHtml[i] = this.allMsgData[i]
                this.imgHtmlId[i] = this.allMsgData[i].id
                this.dataType[i] = false
                this.$set(this.imgHtml, i, this.allMsgData[i])
              }
            }
          }
        })
    },
    preview (index) {
      this.$router.push('/Preview' + this.imgHtmlId[index])
    },
    editor (index) {
      this.$router.push('/Editor' + this.imgHtmlId[index])
    },
    clickSee (index) {
      if (!this.dataType[index]) {
        for (let i = 0; i < this.dataType.length; i++) {
          this.dataType[i] = false
        }
        this.$set(this.dataType, index, !this.dataType[index])
      } else {
        this.$set(this.dataType, index, false)
      }
    },
    addImgHtml () {
      if (document.documentElement.scrollTop + window.screen.height >= document.documentElement.offsetHeight) {
        if (this.imgLength[0] > this.dataLength[0]) {
          if (this.imgLength[0] >= this.dataLength[0] + 6) {
            for (let i = this.dataLength[0]; i < this.dataLength[0] + 6; i++) {
              this.imgHtml[i] = this.allMsgData[i]
              this.imgHtmlId[i] = this.allMsgData[i].id
              this.dataType[i] = false
              this.$set(this.imgHtml, i, this.allMsgData[i])
            }
          } else if (this.imgLength[0] > this.dataLength[0]) {
            for (let i = this.dataLength[0]; i < this.allMsgData.length; i++) {
              this.imgHtml[i] = this.allMsgData[i]
              this.imgHtmlId[i] = this.allMsgData[i].id
              this.dataType[i] = false
              this.$set(this.imgHtml, i, this.allMsgData[i])
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
	ol,ul,li { list-style: none;}
	.bg-white { background: #fff; height: 1.2rem; line-height: 1.2rem;}
	.mui-card { margin: 0; overflow: visible;}
	.mui-content>.mui-card:first-child { margin-top: 0;}
	.mui-inner-wrap .mui-content.bg-white { padding-top: 0;}
	.mui-table-view > .mui-table-view-cell { font-size: 0.4rem; overflow: visible; float: left; padding: 0; width: 25%; height: 1.2rem; line-height: 1.2rem; text-align: center; display: inline-block; color: #333;}
	.mui-table-view-cell:after { height: 0;}
	.mui-table-view > .mui-table-view-cell a { margin: 0; padding: 0;}
	.mui-table-view-cell.mui-collapse.mui-active { margin-top: 0; border-radius: 0; background: none; z-index: 99999;}
	.mui-table-view > .mui-table-view-cell .mui-navigate-right:after { content: "\25BC"; font-size: 0.1rem; left: 0.05rem; top: 0.15rem; position: relative;}
	.mui-table-view > .mui-table-view-cell.mui-collapse.mui-active>.mui-navigate-right:after { content: "\25B2";}
	.mui-table-view-cell.mui-collapse .mui-collapse-content { margin: 0; padding: 0;}
	.mui-collapse-content .mui-table-view-cell { padding: 0;margin: 0; font-size: 0.4rem; height: 1rem; line-height: 1rem;}
	.mui-card .mui-table-view .mui-table-view-cell:first-child { border-radius: 0;}
	
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
	.mask .mask_common {  padding: 0.2rem 0.3rem !important; color: #fff;}
	.mask .preview { background: rgb(76, 217, 100); margin-right: 0.2rem !important;}
	.mask .use { background: rgb(52, 158, 255);}
</style>