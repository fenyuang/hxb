<template>
	<div @tap.stop='cancelEdito'>
		<header>
			<a class="back" @tap.stop='back'>< 返回</a>
			<span>{{ pageIndex + 1 }}/{{ pageCount }}</span>
			<a class="preserve" @tap.stop='preserve'>保存 ></a>
		</header>
		
		<section class="swiper">
			<wc-swiper v-if="conData.length" class="wc-swipe" :autoplay="false" @transitionend="pageInd">
		    <wc-slide v-for="(condata, key) in conData" :key="key">
		    	<div class="item-con" :style="{backgroundColor: condata.background_color}">
		    		<div v-for="item in condata.elements">
		    			<div v-if="item">
		    				<div v-if="item.type === 'text'">
		    					<p style="position: absolute;" :style="{ backgroundColor: item.backgroundColor, 
															 color: item.color, 
															 fontFamily: item.fontFamily, 
															 fontWeight: item.fontWeight,
															 fontSize: item.fontSize + 'px',
															 height: item.height + 'px',
															 width: item.width + 'px',
															 left: item.left + 'px',
															 top: item.top + 'px',
															 lineHeight: item.lineHeight,
															 textAlign: item.textAlign,
															 opacity: item.opacity,
															 animation: item.animation,
															 animationName: item.animatedName,
															 animationDelay: item.deley + 's',
															 animationDuration: item.duration + 's',
															 zIndex: item.zindex }" @tap.stop='editoEle(item)'>{{ item.text }}</p>
		    				</div>
		    				<div v-else-if="item.type === 'pic'">
		    					<img v-bind:style="{ backgroundColor: item.backgroundColor, 
			    														 color: item.color, 
			    														 fontFamily: item.fontFamily, 
			    														 fontSize: item.fontSize + 'px',
			    														 height: item.height + 'px',
			    														 width: item.width + 'px',
			    														 left: item.left + 'px',
			    														 top: item.top + 'px',
			    														 lineHeight: item.lineHeight + 'px',
			    														 textAlign: item.textAlign,
			    														 zIndex: item.zindex }" :src="item.imgSrc" @tap.stop='editoEle(item)' style="position: absolute;">
		    				</div>
		    				<div v-else-if="item.type === 'bg'">
		    					<img style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;" :src=" item.imgSrc ">
		    				</div>
		    				<div v-html="item.html" v-else-if="item.type === 'form'">
		    					<div :style="{ backgroundColor: item.backgroundColor, 
	  														 color: item.color, 
	  														 fontFamily: item.fontFamily, 
	  														 fontWeight: item.fontWeight,
	  														 fontSize: item.fontSize + 'px',
	  														 height: item.height + 'px',
	  														 width: item.width + 'px',
	  														 left: item.left + 'px',
	  														 top: item.top + 'px',
	  														 lineHeight: item.lineHeight,
	  														 textAlign: item.textAlign,
	  														 opacity: item.opacity,
	  														 animation: item.animation,
	  														 animationName: item.animatedName,
	  														 animationDelay: item.deley + 's',
	  														 animationDuration: item.duration + 's',
	  														 zIndex: item.zindex }" style="position: absolute;">{{ item.html }}</div>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    </wc-slide>
			</wc-swiper>
		</section>
			
		
		<section v-show="panelShow" class="text-panel">
			<div class="mui-content">
				<div>
					<div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
						<a class="mui-control-item mui-active" href="#item1">修改文本</a>
					</div>
				</div>
				<div>
					<div id="item1" class="mui-control-content mui-active">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell">
								<textarea ref="textValue" v-model="edEle.text"></textarea>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
		
		<section v-show="imgShow" class="img-panel">
				<a class="mui-control-item mui-active" href="#item1">修改图片</a>
				<input type="file" class="revise-img" id="reviseImg" @change='onFileChange' />
		</section>
		
		<section v-show="attributeShow" class="img-panel">
				<input type="text" class="revise revise-name" v-model="msgData.name" />
				<input type="text" class="revise revise-title" v-model="msgData.title" />
		</section>
		
		<footer v-show="footerShow">
			<div class="mui-content">
		    <div class="mui-row">
		        <div class="mui-col-sm-12" @tap.stop='reviseAttribute'>
		            <li class="mui-table-view-cell">
		            	<img src="http://hxb.scpoo.com/school/static/images/text.png"/>
		              <div>修改属性</div>
		            </li>
		        </div>
		    </div>
		</div>
		</footer>
		
		<div class="layer" v-show="layer"></div>
		<div class="layer-floor" ref="layer" v-show="layer">正在保存...</div>
	</div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    return {
      msgData: {},
      conData: [],
      pageCount: 0,
      pageIndex: 0,
      panelShow: false,
      imgShow: false,
      footerShow: true,
      attributeShow: false,
      textareaValue: [],
      imgCon: [],
      layer: false
    }
  },
  computed: {
    edEle () {
      return this.$store.state.editoEle
    },
    edImg () {
      return this.$store.state.editoImg
    }
  },
  mounted () {
    axios.get('http://hxb.scpoo.com/hxb/index.php/api/editor/getpage?id=' + this.$router.currentRoute.params.id + '&loginId=' + '13169731844')
      .then(msg => {
        this.msgData = msg.data.data
        this.conData = this.msgData.pages
        this.pageCount = msg.data.data.pages.length
        console.log(this.conData)
      })
    document.querySelector('.swiper').style.height = window.innerHeight * 0.8 + 'px'
    document.querySelector('.swiper').style.marginTop = window.innerHeight * 0.1 + 'px'
    document.querySelector('.swiper').style.marginBottom = window.innerHeight * 0.1 + 'px'
  },
  methods: {
    editoEle (ele) {
      if (ele.type === 'text') {
        this.panelShow = true
        this.imgShow = false
        this.attributeShow = false
        this.footerShow = false
        this.$store.dispatch('editEle', ele)
      } else if (ele.type === 'pic') {
        this.imgShow = true
        this.panelShow = false
        this.attributeShow = false
        this.footerShow = false
        this.$store.dispatch('editEle', ele)
      }
    },
    onFileChange (e) {
      let files = e.target.files
      if (!files.length) {
        return
      } else {
        this.reviseImg(files)
        console.log(files)
      }
    },
    reviseImg (fileData) {
      let pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/
      let data = new FormData()
      $.each($('#reviseImg')[0].files, (i, file) => {
        data.append('file', file)
      })
      if (!pattern.test(fileData[0].name)) {
        alert('系统仅支持jpg/jpeg/png/gif/bmp格式的照片！')
      } else {
        $.ajax({
          url: 'http://test.scpoo.com/myTools/public/index.php/base/upload',
          type: 'post',
          data: data,
          cache: false,
          contentType: false,
          processData: false,
          success: msg => {
            console.log(msg)
            if (msg.ret === 100) {
              let imgSrc = msg.data
              this.$store.dispatch('changeImgSrc', imgSrc)
            }
          }
        })
      }
    },
    reviseAttribute () {
      this.attributeShow = true
      this.panelShow = false
      this.imgShow = false
      this.footerShow = true
    },
    cancelEdito () {
      this.panelShow = false
      this.imgShow = false
      this.attributeShow = false
      this.footerShow = true
      this.textareaValue = []
    },
    pageInd (currentSlide) {
      this.pageIndex = currentSlide
    },
    back () {
      window.history.back()
    },
    preserve () {
      this.layer = true
      axios.post('http://114.215.97.88:3000/api/pages/' + this.msgData._id.$id, {
        autoplay: this.msgData.autoplay,
        createDate: this.msgData.createDate,
        desc: this.msgData.desc,
        description: this.msgData.description,
        direction: this.msgData.direction,
        effect: this.msgData.effect,
        loginId: this.msgData.loginId,
        music: this.msgData.music,
        name: this.msgData.name,
        pages: this.msgData.pages,
        thumb: this.msgData.thumb,
        title: this.msgData.title,
        type: this.msgData.type,
        __v: this.msgData.__v,
        id: this.msgData._id.$id
      })
        .then(msg => {
          this.$refs.layer.innerHTML = '保存成功...'
          setTimeout(this.routeToPromotionSetting, 2000)
        })
    },
    routeToPromotionSetting () {
      this.$router.push('/PromotionSetting/' + this.msgData._id.$id)
    }
  },
  watch: {
    textareaValue (newVal, oldVal) {
      console.log(newVal)
    }
  }
}
</script>

<style scoped>
	/*公共*/
	ul,ol,li { list-style: none;}
	
	/*头部*/
	header { width: 100%; height: 1.2rem; line-height: 1.2rem; background: rgb(2, 114, 218); position: fixed; top: 0; left: 0; z-index: 999;}
	header .back { color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 2rem; text-align: center; display: inline-block;}
	header span { color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; display: inline-block; width: 5.8rem; text-align: center;}
	header .preserve { color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 2rem; text-align: center; display: inline-block; float: right;}
	
	/*编辑框*/
	.wc-swipe { height: 100%;}
	.item-con { width: 8rem; left: 1rem; margin-right: 1rem; float: left; height: inherit; margin: 0 auto; background: #fff; position: relative; overflow: hidden;}
	
	/*编辑面板*/
	.text-panel { height: 3rem; width: 10rem; background: #000; position: fixed; left: 0; bottom: 0; z-index: 99999;}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item { color: #fff; font-size: 0.4rem; height: 0.8rem; line-height: 0.8rem;}
	.text-panel .mui-table-view-cell { height: 2.2rem; line-height: 2.2rem; padding: 0;}
	.text-panel textarea { line-height: 0.6rem; height: 100%; padding: 0.1rem;}
	
	.img-panel { height: 2rem; width: 10rem; background: #000000; position: fixed; left: 0; bottom: 0; z-index: 99999;}
	.img-panel a { height: 2rem; width: 10rem; color: #fff; line-height: 2rem; text-align: center; display: inline-block; font-size: 0.6rem;}
	.revise-img { height: 2rem; width: 10rem; position: absolute; left: 0; top: 0; z-index: 2; opacity: 0;}
	
	.revise { height: 0.8rem; width: 8rem; margin: 0.1rem 1rem; padding: 0;}
	
	/*底部*/
	footer { width: 100%; height: 1.2rem; line-height: 1.2rem; background: #000; position: fixed; left: 0; bottom: 0; z-index: 9998;} 
	.mui-content { background: none;}
	.mui-col-sm-12 { width: 100%; text-align: center;}
	.mui-col-sm-12 .mui-table-view-cell { padding: 0; height: 1.2rem; line-height: 1.2rem;}
	.mui-col-sm-12 .mui-table-view-cell.mui-active { background: none;}
	.mui-col-sm-12 .mui-table-view-cell img { width: 0.4rem; vertical-align: middle; padding-bottom: 0.15rem;}
	.mui-col-sm-12 .mui-table-view-cell div { color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; display: inline-block;}
	#addImgFile { position: absolute; z-index: 99999; height: 1.2rem; width: 100%; top: 0; left: 0; opacity: 0;}
	#reviseBgFile { position: absolute; z-index: 99999; height: 1.2rem; width: 100%; top: 0; left: 0; opacity: 0;}
	
	/*遮罩层*/
	.layer { position: absolute; width: 10rem; z-index: 99999; height: 2rem; top: 8rem; background: #000; opacity: 0.6; border-radius: 0.2rem;}
	.layer-floor {  position: absolute; top: 8rem; z-index: 100000; left: 1rem; color: #fff; width: 8rem; height: 2rem; border-radius: 10px; line-height: 2rem; font-size: 0.5rem; text-align: center;}
</style>