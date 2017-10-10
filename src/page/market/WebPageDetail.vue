<template>
	<HeaderNav :classify=0 :searchIcon=0>
		<section class="bg-white">
			<div class="title">{{ webPageTitle }}</div>
			<div class="con">
				<span>推广中</span>
				<span>春季招生</span>
			</div>
			<div class="content">
				<div class="left-con">浏览量</div>
				<div class="right-con">{{ webPageData.pv }}</div>
			</div>
			<div class="content">
				<div class="left-con">下单量</div>
				<div class="right-con">{{ webPageData.order_num }}</div>
			</div>
			<div class="content">
				<div class="left-con">创建时间</div>
				<div class="right-con">{{ webPageData.create_time }}</div>
			</div>
		</section>
		
		<section class="bg-white goods">
			<div class="content">
				<div class="left-goods">关联商品</div>
				<div class="right-goods">共{{ goodsLength }}条记录</div>
			</div>
			<div class="content" v-for="(list, index) in webPageData.goods_list">
				<div class="left-goods"><span>{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</span>{{ list.name }}</div>
				<div class="right-goods"></div>
			</div>
		</section>
		
		<footer>
			<div class="preview" @tap.stop="preview">
				<img src="../../../static/images/eyes-white.png"/>
				预览
			</div>
			<div class="editor" @tap.stop="editor">
				<img src="../../../static/images/editor-white.png"/>
				编辑
			</div>
			<div class="delete" @tap.stop="effectShow">
				<img src="../../../static/images/delete-white.png"/>
				使失效
			</div>
		</footer>
		<PopupHint :Content="pop" v-show="layer===1"></PopupHint>
		<section class="effect" v-show="effect" @tap.stop="effectHide">
				<div class="effect-layer-bg"></div>
				<div class="effect-layer-con" @tap.stop="effectShow">
					<span @tap.stop="effectHide"></span>
					<p>使失效后用户再访问该方案，</p>
					<p>将提示已失效，且无法进行操作。</p>
					<p>
						<button class="effect-sure" @tap.stop="delUseList">确认</button>
						<button class="effect-cancel" @tap.stop="effectHide">取消</button>
					</p>
				</div>
			</section>
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
  mounted () {
    axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/UseDetail?id=' + this.$router.currentRoute.params.id + '&type=spa')
      .then(msg => {
        console.log(msg)
        this.webPageData = msg.data.data
        this.webPageTitle = this.$router.currentRoute.params.title
        this.goodsLength = msg.data.data.goods_list.length
      })
  },
  data () {
    return {
      webPageData: [],
      webPageTitle: '',
      goodsLength: 0,
      effect: false,
      layer: 0,
      pop: ''
    }
  },
  methods: {
    preview () {
      this.$router.push('/preview/' + this.$router.currentRoute.params.page_id)
    },
    editor () {
      this.$router.push('/editor/' + this.$router.currentRoute.params.page_id)
    },
    delUseList () {
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/Promotion/delUseList?id=' + this.$router.currentRoute.params.id)
        .then(msg => {
          this.effectHide()
          this.layer = 1
          this.pop = msg.data.message
          setTimeout(() => {
            this.layer = 0
          }, 2000)
        })
    },
    effectShow () {
      this.effect = true
    },
    effectHide () {
      this.effect = false
    }
  }
}
</script>

<style scoped>
	p,button { margin: 0; padding: 0; border: 0;}
	.bg-white { background: #FFFFFF;}
	.title { width: 100%; height: 1.5rem; line-height: 1.2rem; padding-top: 0.3rem; text-align: center; font-size: 0.6rem; color: #333333;}
	.con { width: 100%; height: 1rem; text-align: center;}
	.con span { font-size: 0.4rem; height: 0.8rem; line-height: 0.8rem; display: inline-block; border: 1px solid #2C618B; border-radius: 5px; color: #2C618B; padding-left: 0.4rem; padding-right: 0.4rem; margin-right: 0.1rem;}
	.content { height: 1.2rem;}
	.content .left-con { width: 50%; float: left; font-size: 0.4rem; line-height: 1.2rem; color: #666666; padding-left: 0.5rem;}
	.content .right-con { width: 50%; float: right; font-size: 0.4rem; line-height: 1.2rem; color: #333333; text-align: right; padding-right: 0.5rem;}
	
	.goods { margin-top: 0.5rem;}
	.goods .content { border-bottom: 2px solid #EEEEEE;}
	.left-goods { height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; color: #333333; width: 50%; float: left; padding-left: 0.5rem;}
	.left-goods span { font-size: 0.4rem; padding-right: 0.3rem; color: #999999;}
	.right-goods { height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; color: #666666; width: 50%; float: left; padding-right: 0.5rem; text-align: right;}
	
	footer { position: fixed; left: 0; bottom: 0; height: 1.2rem; width: 100%; background: #537d9f;}
	footer > div { width: 33.33%; height: 1.2rem; line-height: 1.2rem; font-size: 0.4rem; color: #FFFFFF; float: left;}
	footer > div > img { vertical-align: middle; height: 0.4rem;}
	.preview { padding-left: 0.5rem;}
	.preview img {} 
	.editor { text-align: center;}
	.delete { text-align: right; padding-right: 0.5rem;}
	/*使失效弹窗*/
	.effect { width: 100%; height: 100%; position: absolute; top: 1.3333rem; left: 0;}
	.effect-layer-bg { width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.3);}
	.effect-layer-con { width: 80%; border-radius: 5px; height: 4rem; background: #93C971; position: fixed; top: 5rem; left: 10%;}
	.effect-layer-con span { width: 100%; height: 0.8rem; display: block; position: relative;}
	.effect-layer-con span:after { content: '\2715'; position: absolute; top: 0.2rem; right: 0rem; width: 0.8rem; height: 0.8rem; font-size: 0.6rem; color: #FFFFFF;}
	.effect-layer-con p { color: #FFFFFF; text-align: center; height: 0.8rem; line-height: 0.8rem; font-size: 0.4rem;}
	.effect-layer-con p button { background: none; color: #FFFFFF; border: 2px solid #FFFFFF; height: 0.8rem; line-height: 0.8rem; font-size: 0.4rem; margin: 0; padding: 0; width: 2rem; text-align: center; margin-top: 0.4rem; margin-right: 0.2rem;}
</style>