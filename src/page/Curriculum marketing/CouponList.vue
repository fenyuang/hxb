<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<a>
					<img class="mui-media-object mui-pull-left" src="../../../static/images/coupon.png">
					<div class="mui-media-body">
						<p><span>领取限制 <b>1人一张</b></span><span>领取人 / 次  <b>0/0</b></span></p>
						<p><span>最低消费  <b>10元</b></span><span>已经使  <b>0</b></span></p>
						<p><span>库存 <b>10张</b></span></p>
					</div>
					<div class="edit-btn">
						<button type="button" class="mui-btn editor-btn">编辑</button>
						<button type="button" class="mui-btn editor-btn">推广</button>
						<button type="button" class="mui-btn lose-btn">使失效</button>
					</div>
				</a>
				<p>有效期 ： 2017/05/31 15:03:23 至 2017-06-30 15:03:19</p>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a>
					<img class="mui-media-object mui-pull-left" src="../../../static/images/coupon.png">
					<div class="mui-media-body">
						<p><span>领取限制 <b>1人一张</b></span><span>领取人 / 次  <b>0/0</b></span></p>
						<p><span>最低消费  <b>10元</b></span><span>已经使  <b>0</b></span></p>
						<p><span>库存 <b>10张</b></span></p>
					</div>
					<div class="edit-btn">
						<button type="button" class="mui-btn editor-btn">编辑</button>
						<button type="button" class="mui-btn editor-btn">推广</button>
						<button type="button" class="mui-btn lose-btn">使失效</button>
					</div>
				</a>
				<p>有效期 ： 2017/05/31 15:03:23 至 2017-06-30 15:03:19</p>
			</li>
		</ul>
	</div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
	.mui-table-view { background: none; letter-spacing: 0.01rem;}
	.mui-table-view .mui-media-object { height: 1.8rem; max-width: 1.8rem;}
	.mui-table-view-cell { padding:0; margin: 0 auto 0.2rem; background: #fff;}
	.mui-table-view-cell>a:not(.mui-btn) { margin: 0 auto; width: 96%; padding: 0.2rem 0;}
	.mui-table-view-cell:after { height: 0;}
	.mui-table-view-cell>a:after { position: absolute; right: 0; bottom: 0; left: 0; height: 0.02rem; content: ''; transform: scaleY(.5); -webkit-transform: scaleY(.5); background-color: #c8c7cc;}
	.mui-table-view .mui-media-object.mui-pull-left { margin-right: 0.4rem;}
	.mui-table-view .mui-media-body p span { width: 3.9rem; height: 0.6rem; line-height: 0.6rem; font-size: 0.4rem; color: #999999; display: inline-block;}
	.mui-table-view .mui-media-body p span b { color: #333333; padding-left: 0.2rem;}
	.mui-table-view-cell > p { height: 1rem; line-height: 1rem; font-size: 0.4rem; padding-left: 0.2rem; letter-spacing: 0.02rem;;}

	.edit-btn { margin-left: 2.2rem; margin-top: 0.2rem;}
	.edit-btn .mui-btn { font-size: 0.42rem; height: 1rem; letter-spacing: 0.02rem; color: #FFFFFF; line-height: 1rem; padding: 0 0.42rem; margin-right: 0.3rem;}
	.edit-btn .editor-btn { background: rgb(44, 97, 139);}
	.edit-btn .lose-btn { background: rgb(153, 153, 153);}
</style>
