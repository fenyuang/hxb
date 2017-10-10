<template>
	<HeaderNav :classify=1 :searchIcon=1>
		<wc-swiper :duration="2000">
	  	<wc-slide class="swiper">
		    <img src="../../../static/images/banner01.png" />
		 	</wc-slide>
		 	<wc-slide class="swiper">
		    <img src="../../../static/images/banner01.png" />
		 	</wc-slide>
		 	<wc-slide class="swiper">
		    <img src="../../../static/images/banner01.png" />
		 	</wc-slide>
		</wc-swiper>
		
		<div class="mui-content bg-white">
			<div class="mui-segmented-control">
				<li class="control-item" :class="{ active: isActive[0] }" @tap="getAppListH5('h5', 0)">
					微场景
				</li>
				<li class="control-item" :class="{ active: isActive[1] }" @tap="getAppListH5('spa', 1)">
					微网页
				</li>
				<li class="control-item" :class="{ active: isActive[2] }" @tap="getAppListH5('wpa', 2)">
					微信图文
				</li>
				<li class="control-item" :class="{ active: isActive[3] }" @tap="getAppListH5('web', 3)">
					学校官网
				</li>
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
      imgHtml: [],
      imgHtmlId: [],
      dataType: [],
      imgLength: [],
      dataLength: [],
      allMsgData: [],
      isActive: [false, false, false, false]
    }
  },
  components: {
    HeaderNav
  },
  mounted () {
    axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps')
      .then(msg => {
        console.log(msg)
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
    window.addEventListener('touchmove', this.addImgHtml)
  },
  methods: {
    getAppListH5 (type, activeId) {
      for (let i = 0; i < this.isActive.length; i++) {
        this.isActive[i] = false
      }
      this.isActive[activeId] = true
      axios.get('http://hxb.scpoo.com/hxb/index.php/api/index/getapps', {
        type: type
      })
        .then(msg => {
          if (msg.data.code === 1) {
            this.imgHtml = []
            this.imgHtmlId = []
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
      this.$router.push('/Preview/' + this.imgHtmlId[index])
    },
    editor (index) {
      this.$router.push('/Editor/' + this.imgHtmlId[index])
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
	/*轮播*/
	.swiper img { width: 100%;}
	
	.bg-white { background: white;}
	.mui-content.bg-white { padding-top: 0 !important;}
	.mui-segmented-control { border-radius: 0; border: 0;}
	.mui-segmented-control .control-item { border-left: 0; color: #666; font-size: 0.5rem; line-height: 1.2rem; display: table-cell; overflow: hidden; text-align: center; width: 25%;}
	.mui-segmented-control .control-item.mui-active { background: none; color: rgb(2, 114, 218); border-bottom: 1px solid rgb(2, 114, 218);}
	.control-item.active { color: #2c618b; border-bottom: 2px solid #2c618b;}
	
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