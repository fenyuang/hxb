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
	    	<li class="imgCon">
		      <div class="content">
		      	<p class="wap_pic"><img class="" src="../../../static/images/coupon.png"></p>
		      	<p class="wap_text">sss</p>
		      </div>
		      <div class="masker" v-show="dataType[0]"></div>
		      <div class="mask" v-show="dataType[0]">
		      	<p><a class="preview mask_common">详情</a>
		      	<a class="use mask_common">编辑</a></p>
		      	<p><a class="preview mask_common">预览</a>
		      	<a class="use mask_common">使失效</a></p>
		      </div>
		    </li>
		    <li class="imgCon">
		      <div class="content">
		      	<p class="wap_pic"><img class="" src="../../../static/images/coupon.png"></p>
		      	<p class="wap_text">sss</p>
		      </div>
		      <div class="masker" v-show="dataType[1]"></div>
		      <div class="mask" v-show="dataType[1]">
		      	<p><a class="preview mask_common">详情</a>
		      	<a class="use mask_common">编辑</a></p>
		      	<p><a class="preview mask_common">预览</a>
		      	<a class="use mask_common">使失效</a></p>
		      </div>
		    </li><li class="imgCon">
		      <div class="content">
		      	<p class="wap_pic"><img class="" src="../../../static/images/coupon.png"></p>
		      	<p class="wap_text">sss</p>
		      </div>
		      <div class="masker" v-show="dataType[0]"></div>
		      <div class="mask" v-show="dataType[0]">
		      	<p><a class="preview mask_common">详情</a>
		      	<a class="use mask_common">编辑</a></p>
		      	<p><a class="preview mask_common">预览</a>
		      	<a class="use mask_common">使失效</a></p>
		      </div>
		    </li>
		    <li class="imgCon">
		      <div class="content">
		      	<p class="wap_pic"><img class="" src="../../../static/images/coupon.png"></p>
		      	<p class="wap_text">sss</p>
		      </div>
		      <div class="masker" v-show="dataType[1]"></div>
		      <div class="mask" v-show="dataType[1]">
		      	<p><a class="preview mask_common">详情</a>
		      	<a class="use mask_common">编辑</a></p>
		      	<p><a class="preview mask_common">预览</a>
		      	<a class="use mask_common">使失效</a></p>
		      </div>
		    </li>
			</ul>
		</div>
		
		<div v-show="isActive[1]">
			<section class="webPage">
				<div class="web-list">
					<div class="list-left">
						<img src="../../../static/images/coupon.png"/>
					</div>
					<div class="list-right">
						<h3>春季优惠抢先学</h3>
						<div class="list-text">
							<p>商品数 <span>100</span></p>
							<p>浏览量 <span>100</span></p>
							<p>下单数 <span>100</span></p>
						</div>
					</div>
				</div>
				<div class="web-list">
					<div class="list-left">
						<img src="../../../static/images/coupon.png"/>
					</div>
					<div class="list-right">
						<h3>春季优惠抢先学</h3>
						<div class="list-text">
							<p>商品数 <span>100</span></p>
							<p>浏览量 <span>100</span></p>
							<p>下单数 <span>100</span></p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav'
export default {
  components: {
    HeaderNav
  },
  data () {
    return {
      schemeList: ['H5 场景秀', '我的微网页'],
      isActive: [true, false],
      dataType: [false, false]
    }
  },
  methods: {
    marketListShow (index) {
      for (let i = 0; i < this.isActive.length; i++) {
        this.isActive[i] = false
      }
      this.$set(this.isActive, index, true)
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
	.sceneShow .imgCon .content { background: #FFFFFF;}
	.sceneShow .imgCon .content .wap_pic { height: 5.5rem; overflow: hidden;}
	.sceneShow .imgCon .content .wap_pic img { width: 4.5rem;}
	.sceneShow .imgCon .content .wap_text { height: 0.8rem; width: 100%; font-size: 0.4rem; line-height: 0.8rem; color: #333333; padding-left: 0.2rem; padding-right: 0.2rem; overflow: hidden; text-overflow: ellipsis;}
	
	.masker { height: 100%; width: 100%; background: #333; position: absolute; left: 0; top: 0; opacity: 0.5;}
	.mask { position: absolute; height: 2.4rem; width: 100%; top: 2rem;}
	.mask p { text-align: center; height: 1rem;}
	.mask .mask_common { width: 1.5rem; height: 0.8rem; line-height: 0.8rem; display: inline-block; font-size: 0.4rem; color: #fff; border: 1px solid #FFFFFF;}
	.mask .preview { margin-right: 0.2rem;}
	
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