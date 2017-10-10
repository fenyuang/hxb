<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<nav>
			<div>
				<ul>
					<li v-for="(value, index) in schemeList" :class="{ active: isActive[index] }" @tap="marketListShow(index)">{{ value }}</li>
				</ul>
			</div>
		</nav>
		
		<div v-show="isActive[0]">
			<ul class="sceneShow">
	    	<li class="imgCon" v-for="(scene, index) in sceneData" @tap.stop="dataTypeShow(index)">
		      <div class="content">
		      	<p class="wap_pic"><img class="" :src=" scene.cover "></p>
		      	<p class="wap_text">{{ scene.title }}</p>
		      	<span class="wap-layer" v-show="scene.status === 1">投放中</span>
		      	<span class="wap-layer" v-show="scene.status === 2">已失效</span>
		      </div>
		      <div class="masker" v-show="dataType[index]"></div>
		      <div class="mask" v-show="dataType[index]">
		      	<p><a class="preview mask_common" @tap.stop="sceneDetail(scene.id)">详情</a>
		      	<a class="use mask_common" @tap.stop="editor(scene.page_id)">编辑</a></p>
		      	<p><a class="preview mask_common" @tap.stop="preview(scene.page_id)">预览</a>
		      	<a class="use mask_common" @tap.stop="effectShow(scene.id)">使失效</a></p>
		      </div>
		    </li>
			</ul>
			<section class="effect" v-show="effect" @tap.stop="effectHide">
				<div class="effect-layer-bg"></div>
				<div class="effect-layer-con" @tap.stop="effectShow">
					<span @tap.stop="effectHide"></span>
					<p>使失效后用户再访问该方案，</p>
					<p>将提示已失效，且无法进行操作。</p>
					<p>
						<button class="effect-sure" @tap.stop="effectSure">确认</button>
						<button class="effect-cancel" @tap.stop="effectHide">取消</button>
					</p>
				</div>
			</section>
			<PopupHint :Content="pop" v-show="layer===1"></PopupHint>
		</div>
		
		<div v-show="isActive[1]">
			<section class="webPage">
				<div class="web-list" v-for="(scene, index) in webPageData" @tap.stop="webPageDetail(scene.id, scene.page_id, scene.title)">
					<div class="list-left">
						<img :src=" scene.cover " />
					</div>
					<div class="list-right">
						<h3>{{ scene.title }}</h3>
						<div class="list-text">
							<p>商品数 <span>{{ scene.goods_num }}</span></p>
							<p>浏览量 <span v-if="userData[index]">{{ userData[index].pv }}</span></p>
							<p>下单数 <span v-if="userData[index]">{{ userData[index].order_num }}</span></p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
import PopupHint from '../../components/PopupHint'
import axios from 'axios'
export default {
  components: {
    HeaderNav,
    PopupHint
  },
  data () {
    return {
      schemeList: ['H5 场景秀', '我的微网页'],
      isActive: [true, false],
      dataType: [],
      sceneData: [],
      effect: false,
      id: '',
      layer: 0,
      pop: '',
      webPageData: [],
      userData: []
    }
  },
  mounted () {
    this.sceneList()
    this.webPageList()
  },
  methods: {
    marketListShow (index) {
      for (let i = 0; i < this.isActive.length; i++) {
        this.isActive[i] = false
      }
      this.$set(this.isActive, index, true)
      if (index === 0) {
        this.sceneList()
      } else if (index === 1) {
        this.webPageList()
      }
    },
    sceneList () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/getUseList?type=h5')
        .then(msg => {
          this.sceneData = msg.data.data
          for (let i = 0; i < msg.data.data.length; i++) {
            this.dataType[i] = false
          }
        })
    },
    webPageList () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/getUseList?type=spa')
        .then(msg => {
          this.webPageData = msg.data.data
          for (let i = 0; i < this.webPageData.length; i++) {
            axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/UseDetail?id=' + this.webPageData.id + '&type=spa')
              .then(msg => {
                this.userData[i] = msg.data.data
              })
          }
        })
    },
    dataTypeShow (index) {
      if (!this.dataType[index]) {
        for (let i = 0; i < this.dataType.length; i++) {
          this.dataType[i] = false
        }
        this.$set(this.dataType, index, !this.dataType[index])
      } else {
        this.$set(this.dataType, index, false)
      }
    },
    effectShow (id) {
      this.effect = true
      this.id = id
    },
    effectHide () {
      this.effect = false
      this.id = ''
      this.pageId = ''
    },
    effectSure () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/delUseList?id=' + this.id)
        .then(msg => {
          this.effectHide()
          this.sceneList()
          this.layer = 1
          this.pop = msg.data.message
          setTimeout(() => {
            this.layer = 0
          }, 2000)
        })
    },
    sceneDetail (id) {
      this.$router.push('/SceneDetail/' + id + '/h5')
    },
    preview (pageId) {
      this.$router.push('/Preview/' + pageId)
    },
    editor (pageId) {
      this.$router.push('/editor/' + pageId)
    },
    webPageDetail (id, pageId, title) {
      this.$router.push('/WebPageDetail/' + id + '/' + pageId + '/' + title)
    }
  }
}
</script>

<style scoped>
	/*nav导航条*/
	::-webkit-scrollbar { width: 0; height: 0;}
	p { margin: 0;}
	nav { height: 1.2rem; line-height: 1.2rem; width: 100%; background: #FFFFFF; overflow: hidden; box-sizing: border-box; border-bottom: 1px solid #EEEEEE;}
	nav div { overflow-x: auto; height: 1.2rem; width: 100%;}
	nav ul { width: 10rem; height: 1.2rem; background: #FFFFFF;}
	nav ul li { float: left; font-size: 0.4rem; height: 1.2rem; line-height: 1.2rem; width: 5rem; text-align: center; color: #666666;}
	nav ul li.active { color: #2c618b; border-bottom: 3px solid #2c618b;}
	
	/*H5场景秀*/
	.sceneShow { margin-top: 0.5rem;}
	.sceneShow .imgCon { width: 45%; float: left; margin-left: 0.25rem; margin-right: 0.25rem; margin-bottom: 0.5rem; position: relative;}
	.sceneShow .imgCon .content { background: #FFFFFF; position: relative;}
	.sceneShow .imgCon .content .wap_pic { height: 5.5rem; overflow: hidden;}
	.sceneShow .imgCon .content .wap_pic img { width: 4.5rem;}
	.sceneShow .imgCon .content .wap_text { height: 0.8rem; width: 100%; font-size: 0.4rem; line-height: 0.8rem; color: #333333; padding-left: 0.2rem; padding-right: 0.2rem; overflow: hidden; text-overflow: ellipsis;}
	.sceneShow .imgCon .content .wap-layer { position: absolute; top: 0; right: 0; width: 2rem; height: 0.8rem; line-height: 0.8rem; text-align: center; color: #FFFFFF; background: rgba(0, 0, 0, 0.6);}
	
	.masker { height: 100%; width: 100%; background: #333; position: absolute; left: 0; top: 0; opacity: 0.5;}
	.mask { position: absolute; height: 2.4rem; width: 100%; top: 2rem;}
	.mask p { text-align: center; height: 1rem;}
	.mask .mask_common { width: 1.5rem; height: 0.8rem; line-height: 0.8rem; display: inline-block; font-size: 0.4rem; color: #fff; border: 1px solid #FFFFFF;}
	.mask .preview { margin-right: 0.2rem;}
	
	/*使失效弹窗*/
	.effect { width: 100%; height: 100%; position: fixed; top: 1.3333rem; left: 0;}
	.effect-layer-bg { width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.3);}
	.effect-layer-con { width: 80%; border-radius: 5px; height: 4rem; background: #93C971; position: fixed; top: 5rem; left: 10%;}
	.effect-layer-con span { width: 100%; height: 0.8rem; display: block; position: relative;}
	.effect-layer-con span:after { content: '\2715'; position: absolute; top: 0.2rem; right: 0rem; width: 0.8rem; height: 0.8rem; font-size: 0.6rem; color: #FFFFFF;}
	.effect-layer-con p { color: #FFFFFF; text-align: center; height: 0.8rem; line-height: 0.8rem; font-size: 0.4rem;}
	.effect-layer-con p button { background: none; color: #FFFFFF; border: 2px solid #FFFFFF; height: 0.8rem; line-height: 0.8rem; font-size: 0.4rem; margin: 0; padding: 0; width: 2rem; text-align: center; margin-top: 0.4rem; margin-right: 0.2rem;}
	
	/*我的微网页*/
	.webPage { margin-top: 0.5rem;}
	.webPage .web-list { background: #FFFFFF; width: 100%; height: 2.2rem; border-bottom: 1px solid #EEEEEE; position: relative;}
	.webPage .web-list:after { content: ">"; position: absolute; font-size: 1rem; color: #999999; height: 0.8rem; right: 0.2rem; top: 0.8rem; }
	.webPage .web-list .list-left { width: 2.5rem; height: 2.2rem; float: left; padding: 0.35rem 0.5rem; border-right: 1px solid #EEEEEE;}
	.webPage .web-list .list-left img { width: 1.5rem; height: 1.5rem;}
	.webPage .web-list .list-right { width: 7.5rem; height: 2.2rem; float: right; padding: 0.35rem 0.5rem;}
	.webPage .web-list .list-right h3 { font-size: 0.5rem; color: #333333; height: 0.8rem; line-height: 0.8rem; margin: 0;}
	.webPage .web-list .list-right .list-text { font-size: 0.4rem; height: 0.7rem; line-height: 0.7rem;}
	.webPage .web-list .list-right .list-text p { color: #999999; float: left; padding-right: 0.2rem; font-size: 0.35rem;}
	.webPage .web-list .list-right .list-text p span { color: #333333;}
</style>