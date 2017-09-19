<template>
	<div>
		<header>
			<a class="back">< 返回</a>
			<span>{{ pageIndex + 1 }}/{{ pageCount }}</span>
			<a class="preserve">预览 ></a>
		</header>
		
		<div class="mui-slider" @tap.stop='cancelEdito'>
		  <div class="mui-slider-group">
		    <div class="mui-slider-item" v-for="condata in conData">
		    	<div class="item-con">
		    		<div v-for="item in condata.elements" @tap.stop='editoEle(item)'>
		    			<div v-if="item">
		    				<div v-if="item.type === 'text'" style="position: relative;">
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
  														 zIndex: item.zindex }" @tap="typeStyle">{{ item.text }}</p>
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
			    														 zIndex: item.zindex }" :src="item.src" >
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
	  														 zIndex: item.zindex }">{{ item.html }}</div>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    </div>
		  </div>
		</div>
		
		<section v-show="panelShow" class="text-panel">
			<div class="mui-content">
				<div>
					<div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
						<a class="mui-control-item mui-active" href="#item1">文本</a>
						<a class="mui-control-item" href="#item2">样式</a>
						<a class="mui-control-item" href="#item3">动画</a>
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
					<div id="item2" class="mui-control-content">
						<ul class="mui-table-view">
							<li class="mui-table-view-cell style">
								<div>
									<div class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary style-lists">
										<a class="mui-control-item mui-active" href="#itemColor">颜色</a>
										<a class="mui-control-item" href="#itemBgColor">背景</a>
										<a class="mui-control-item" href="#itemFont">大小</a>
										<a class="mui-control-item" href="#itemOpacity">透明度</a>
										<a class="mui-control-item" href="#itemAlign">对齐</a>
										<a class="mui-control-item" href="#itemLineHeight">行高</a>
									</div>
									<div>
										<div id="itemColor" class="mui-control-content mui-active style-list">
											<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"> 
												<div class="mui-scroll">
													<span @tap.stop="color($event.target)" class="color000000 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorffffff bg-span"></span>
													<span @tap.stop="color($event.target)" class="color21d4d8 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color1292b3 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color00bef2 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color69cef5 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color4993c8 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color0062b8 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color6666ff bg-span"></span>
													<span @tap.stop="color($event.target)" class="color7749f5 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color9621c1 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorf41484 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorf074ac bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorf16c74 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colore01e36 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorfc532b bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorf97f2d bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorcc6d1f bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorddb208 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorf7df00 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorf4f47a bg-span"></span>
													<span @tap.stop="color($event.target)" class="colorb7d989 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color7ed321 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color17a53c bg-span"></span>
													<span @tap.stop="color($event.target)" class="color0c9467 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color42c2b3 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colore3e4e5 bg-span"></span>
													<span @tap.stop="color($event.target)" class="colora8a8a8 bg-span"></span>
													<span @tap.stop="color($event.target)" class="color545454 bg-span"></span>
												</div>
											</div>
										</div>
										<div id="itemBgColor" class="mui-control-content style-list">
											<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"> 
												<div class="mui-scroll">
													<span @tap.stop="bgColor($event.target)" class="color000000 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorffffff bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color21d4d8 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color1292b3 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color00bef2 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color69cef5 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color4993c8 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color0062b8 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color6666ff bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color7749f5 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color9621c1 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorf41484 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorf074ac bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorf16c74 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colore01e36 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorfc532b bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorf97f2d bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorcc6d1f bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorddb208 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorf7df00 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorf4f47a bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colorb7d989 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color7ed321 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color17a53c bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color0c9467 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color42c2b3 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colore3e4e5 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="colora8a8a8 bg-span"></span>
													<span @tap.stop="bgColor($event.target)" class="color545454 bg-span"></span>
												</div>
											</div>
										</div>
										<div id="itemFont" class="mui-control-content style-list">
											<ul class="mui-table-view">
												<li class="mui-table-view-cell style-size">
													<span @tap.stop="fontSize($event.target)" data-value="12">12px</span>
													<span @tap.stop="fontSize($event.target)" data-value="14">14px</span>
													<span @tap.stop="fontSize($event.target)" data-value="18">18px</span>
													<span @tap.stop="fontSize($event.target)" data-value="24">24px</span>
													<span @tap.stop="fontSize($event.target)" data-value="32">32px</span>
													<span @tap.stop="fontSize($event.target)" data-value="40">40px</span>
												</li>
											</ul>
										</div>
										<div id="itemOpacity" class="mui-control-content style-list">
											<ul class="mui-table-view">
												<li class="mui-table-view-cell mui-input-row mui-input-range">
													<input type="range" id="field-range" v-model="edEle.opacity" min="0" step="0.01" max="1">
												</li>
											</ul>
										</div>
										<div id="itemAlign" class="mui-control-content style-list">
											<ul class="mui-table-view">
												<li class="mui-table-view-cell style-align">
													<span class="span_align align_left" @tap.stop="align($event.target)" data-value="left"></span>
													<span class="span_align align_center" @tap.stop="align($event.target)" data-value="center"></span>
													<span class="span_align align_right" @tap.stop="align($event.target)" data-value="right"></span>
												</li>
											</ul>
										</div>
										<div id="itemLineHeight" class="mui-control-content style-list">
											<ul class="mui-table-view">
												<li class="mui-table-view-cell mui-input-row mui-input-range">
													<input type="range" id="field-range" v-model="edEle.lineHeight" min="0" step="0.01" max="3">
													<span class="mui-tooltip mui-hidden"></span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div id="item3" class="mui-control-content">
						<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted animation">  
					    <div class="mui-scroll">  
					      <span>无动画</span>
								<span>上移入</span>
								<span>下移入</span>
								<span>左移入</span>
								<span>右移入</span>
								<span>放大</span>
								<span>淡入</span>
								<span>右移入</span>
								<span>放大</span>
								<span>淡入</span>
								<span>右移入</span>
								<span>放大</span>
								<span>淡入</span>
					    </div>  
						</div> 
					</div>
				</div>
			</div>
		</section>
		<footer v-show="footerShow">
			<div class="mui-content">
		    <div class="mui-row">
		        <div class="mui-col-sm-3">
		            <li class="mui-table-view-cell" @tap="addText">
		            	<img src="../../../static/images/text.png"/>
		              <div>添加文字</div>
		            </li>
		        </div>
		        <div class="mui-col-sm-3">
		            <li class="mui-table-view-cell" @change="onFileChange">
		            	<img src="../../../static/images/image.png"/>
		              <div>添加图片</div>
		              <input type="file" id="addImgFile" />
		            </li>
		        </div>
		        <div class="mui-col-sm-3">
		            <li class="mui-table-view-cell">
		            	<img src="../../../static/images/background.png"/>
		              <div>修改背景</div>
		              <input type="file" id="reviseBgFile" />
		            </li>
		        </div>
		        <div class="mui-col-sm-3">
		            <li class="mui-table-view-cell">
		            	<img src="../../../static/images/background.png"/>
		              <div>更多</div>
		            </li>
		        </div>
		    </div>
		</div>
		</footer>
	</div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  data () {
    return {
      conData: [1, 2],
      pageCount: 0,
      pageIndex: 0,
      panelShow: false,
      footerShow: true,
      textValue: [],
      textareaValue: []
    }
  },
  computed: {
    edEle () {
      return this.$store.state.editoEle
    }
  },
  mounted () {
    document.querySelector('.mui-slider-group').style.height = window.innerHeight * 0.8 + 'px'
    document.querySelector('.mui-slider-group').style.marginTop = window.innerHeight * 0.1 + 'px'
    document.querySelector('.mui-slider-group').style.marginBottom = window.innerHeight * 0.1 + 'px'
    console.log(this.$router.currentRoute.params.id)
    axios.get('http://hxb.scpoo.com/hxb/index.php/api/editor/getpage?id=' + this.$router.currentRoute.params.id + '&loginId=' + '13169731844')
      .then(msg => {
        console.log(msg)
        this.conData = msg.data.data.pages
        this.pageCount = msg.data.data.pages.length
        console.log(this.conData)
      })
    document.querySelector('.mui-slider').addEventListener('slide', event => {
      this.pageIndex = event.detail.slideNumber
    })
  },
  methods: {
    editoEle (ele) {
      if (ele.type === 'text') {
        this.panelShow = true
        this.footerShow = false
        this.$store.dispatch('editEle', ele)
        console.log(this.$store.state)
        console.log(this.$store.state.editoEle)
      } else {
        this.panelShow = false
        this.footerShow = true
      }
    },
    cancelEdito () {
      this.panelShow = false
      this.footerShow = true
      if (this.textareaValue[0]) {
        this.textareaValue[0].border = 0
      }
      this.textareaValue = []
    },
    addText () {
      let obj = {}
      obj.animatedName = ''
      obj.backgroundColor = ''
      obj.bg = ''
      obj.color = '#000000'
      obj.delay = 0
      obj.duration = 1
      obj.fontFamily = '微软雅黑'
      obj.fontSize = 32
      obj.fontWeight = 'bold'
      obj.height = 50
      obj.iconKey = ''
      obj.imgSrc = ''
      obj.left = 0
      obj.lineHeight = 1.5
      obj.loop = false
      obj.opacity = 100
      obj.picArr = []
      obj.playing = false
      obj.text = '标题/文本'
      obj.textAlign = 'center'
      obj.top = 0
      obj.transform = 0
      obj.type = 'text'
      obj.width = 260
      obj.zindex = 1
      let i = this.conData[this.pageIndex].elements.length
      this.conData[this.pageIndex].elements[i] = obj
      this.$set(this.conData[this.pageIndex].elements, i, obj)
      console.log(this.conData)
    },
    onFileChange (e) {
      let files = e.target.files
      if (!files.length) {
        return
      } else {
        this.addImg(files)
        console.log(files)
      }
    },
    addImg (fileData) {
      let pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/
      let data = new FormData()
      $.each($('#addImgFile')[0].files, (i, file) => {
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
              let obj = {}
              obj.backgroundColor = ''
              obj.color = ''
              obj.fontFamily = ''
              obj.fontSize = ''
              obj.height = 200
              obj.width = 'auto'
              obj.left = 100
              obj.top = 100
              obj.lineHeight = 1
              obj.textAlign = ''
              obj.zIndex = 1
              obj.type = 'pic'
              obj.src = msg.data
              let i = this.conData[this.pageIndex].elements.length
              this.conData[this.pageIndex].elements[i] = obj
              this.$set(this.conData[this.pageIndex].elements, i, obj)
              console.log(this.conData[this.pageIndex].elements)
            }
          }
        })
      }
    },
    reviseBg (fileData) {
      let pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/
      let data = new FormData()
      $.each($('#reviseBgFile')[0].files, (i, file) => {
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
          }
        })
      }
    },
    typeStyle (e) {
      if (this.textareaValue[0]) {
        this.textareaValue[0].border = 0
      }
      this.textareaValue = []
      this.textareaValue[0] = e.currentTarget.style
      this.textareaValue[0].border = '1px solid #185e96'
      this.textareaValue[1] = e.currentTarget.innerHTML
      this.$set(this.textareaValue, 1, e.currentTarget.innerHTML)
      console.log(e.detail.target)
      console.log(this.textareaValue)
      this.append(e.detail.target)
      this.drag(e.detail.target)
    },
    drag (el) {
      let oDiv = el
      oDiv.addEventListener('touchstart', e => {
        let ev = e.touches[0]
        let disX = ev.pageX - oDiv.offsetLeft
        let disY = ev.pageY - oDiv.offsetTop
        oDiv.addEventListener('touchmove', e => {
          e.stopPropagation()
          let ev = e.touches[0]
          let l = ev.pageX - disX
          let t = ev.pageY - disY
          oDiv.style.left = l + 'px'
          oDiv.style.top = t + 'px'
        })
      })
    },
    append (el) {
      let node = document.createElement('span')
      node.className = 'delete'
      el.after(node)
    },
    color (target) {
      let color = $(target).css('backgroundColor')
      this.$store.dispatch('changeColor', color)
    },
    bgColor (target) {
      let backgroundColor = $(target).css('backgroundColor')
      this.$store.dispatch('changeBgColor', backgroundColor)
    },
    align (target) {
      let textAlign = $(target).attr('data-value')
      this.$store.dispatch('changeAlign', textAlign)
    },
    fontSize (target) {
      let fontSize = $(target).attr('data-value')
      this.$store.dispatch('changeFontSize', fontSize)
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
	.mui-slider { background: #333;}
	.item-con { width: 8rem; left: 1rem; margin-right: 1rem; float: left; height: inherit; margin: 0 auto; background: #fff; position: relative; overflow: hidden;}
	
	/*编辑面板*/
	.mui-table-view:before { height: 0;}
	.mui-table-view:after { height: 0;}
	.text-panel { height: 3rem; width: 10rem; background: #000; position: fixed; left: 0; bottom: 0; z-index: 99999;}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item { color: #fff; font-size: 0.4rem; height: 0.8rem; line-height: 0.8rem;}
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active { color: #fff;}
	.text-panel .mui-table-view-cell { height: 2.2rem; line-height: 2.2rem; padding: 0;}
	.mui-table-view-cell.mui-active { background: none;}
	.text-panel textarea { line-height: 0.6rem; height: 100%; padding: 0.1rem;}
	
	#item2 .mui-table-view { background: none;}
	.style { background: #333;}
	.style.mui-active { background: #333;}
	.style-lists { width: 80%; margin: 0 auto;}
	.style-lists.mui-segmented-control.mui-segmented-control-inverted .mui-control-item { height: 0.6rem; line-height: 0.6rem;}
	.style-list .mui-table-view { background: #333; color: #fff;}
	.bg-span { width: 0.7rem; height: 0.7rem; margin-right: 0.1rem; line-height: 1.2rem; display: inline-block; background: #fff;}
	.bg-span.color000000 { background: #000000; margin-left: 0.1rem;}
	.bg-span.colorffffff { background: #ffffff;}
	.bg-span.color21d4d8 { background: #21d4d8;}
	.bg-span.color1292b3 { background: #1292b3;}
	.bg-span.color00bef2 { background: #00bef2;}
	.bg-span.color69cef5 { background: #69cef5;}
	.bg-span.color4993c8 { background: #4993c8;}
	.bg-span.color0062b8 { background: #0062b8;}
	.bg-span.color6666ff { background: #6666ff;}
	.bg-span.color7749f5 { background: #7749f5;}
	.bg-span.color9621c1 { background: #9621c1;}
	.bg-span.colorf41484 { background: #f41484;}
	.bg-span.colorf074ac { background: #f074ac;}
	.bg-span.colorf16c74 { background: #f16c74;}
	.bg-span.colore01e36 { background: #e01e36;}
	.bg-span.colorfc532b { background: #fc532b;}
	.bg-span.colorf97f2d { background: #f97f2d;}
	.bg-span.colorcc6d1f { background: #cc6d1f;}
	.bg-span.colorddb208 { background: #ddb208;}
	.bg-span.colorf7df00 { background: #f7df00;}
	.bg-span.colorf4f47a { background: #f4f47a;}
	.bg-span.colorb7d989 { background: #b7d989;}
	.bg-span.color7ed321 { background: #7ed321;}
	.bg-span.color17a53c { background: #17a53c;}
	.bg-span.color0c9467 { background: #0c9467;}
	.bg-span.color42c2b3 { background: #42c2b3;}
	.bg-span.colore3e4e5 { background: #e3e4e5;}
	.bg-span.colora8a8a8 { background: #a8a8a8;}
	.bg-span.color545454 { background: #545454;}
	.mui-input-row.mui-table-view-cell { line-height: 1.8rem;}
	.mui-input-row.mui-input-range { margin: 0 10%;}
	.mui-input-range input[type=range] { margin: 0; background: #fff;}
	.mui-input-range .mui-tooltip { top: -1rem; width: 2.4rem; height: 2rem;}
	
	.style .style-size { width: 9rem; height: 1rem !important; line-height: 1rem !important; border: 1px solid #fff; margin: 0.3rem auto;}
	.style .style-size span { width: 1.4rem; height: 1rem; line-height: 1rem; font-size: 0.3rem; color: #fff; text-align: center; display: inline-block;}
	
	.style-align { width: 9rem; height: 1rem !important; line-height: 1rem !important; border: 1px solid #fff; margin: 0.3rem auto;}
	.style-align .span_align { width: 2.9rem; height: 0.8rem; margin-top: 0.1rem; text-align: center; display: inline-block;}
	.style-align .align_left { background: url(../../../static/images/alignLeft.png) no-repeat center;}
	.style-align .align_center { background: url(../../../static/images/alignCenter.png) no-repeat center;}
	.style-align .align_right { background: url(../../../static/images/alignRight.png) no-repeat center;}
	
	.animation { background: #333;}
	.mui-segmented-control.mui-scroll-wrapper.animation { height: 2.2rem; line-height: 2.2rem;}
	.animation .mui-scroll span { color: #fff; display: inline-block; width: 1.2rem; height: 1.2rem; font-size: 0.3rem; line-height: 1.2rem; text-align: center; margin-right: 0.1rem; border: 1px solid #fff;}
	.animation .mui-scroll span:first-child { margin-left: 0.2rem;}
	
	/*底部*/
	footer { width: 100%; height: 1.2rem; line-height: 1.2rem; background: #000; position: fixed; left: 0; bottom: 0; z-index: 9998;} 
	.mui-content { background: none;}
	.mui-col-sm-3 { width: 25%; text-align: center;}
	.mui-col-sm-3 .mui-table-view-cell { padding: 0; height: 1.2rem; line-height: 1.2rem;}
	.mui-col-sm-3 .mui-table-view-cell img { width: 0.4rem; vertical-align: middle; padding-bottom: 0.15rem;}
	.mui-col-sm-3 .mui-table-view-cell div { color: #fff; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; display: inline-block;}
	#addImgFile { position: absolute; z-index: 99999; height: 1.2rem; width: 100%; top: 0; left: 0; opacity: 0;}
	#reviseBgFile { position: absolute; z-index: 99999; height: 1.2rem; width: 100%; top: 0; left: 0; opacity: 0;}
</style>