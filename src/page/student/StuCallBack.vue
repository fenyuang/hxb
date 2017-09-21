<template>
<div class="wrap">
	<div class="empty_box"></div>
	<div class="name_infor">
		<div class="pict_head"></div>
		<p class="p_one">付露</p>
		<p class="p_two">已经回访,有意向</p>
	</div>
	<div class="tab_bar_list">
		<ul>
			<li><a href="#/StuInfo">基本信息</a></li>
			<li class="active"><a href="#/StuCallBack">回访记录</a></li>
			<li><a href="#/StuPreOrder">预定订单</a></li>
			<li><a href="">推广信息</a></li>
		</ul>
	</div>
	<div class="tab_barline"></div>
	<div class="basic_infor">
		<!--   tab2 -->
		<div class="tab2" >
			<ul>
				<li class="tab2_top"><span style="font-weight: bold;color: #333333">付露</span><span>费用有点贵，再考虑下费用有点贵，再考虑下</span></li>
				<li class="tab2_bottom"><span>有意向(电话)</span><span>2017/03/20 16:00</span></li>
			</ul>
			<ul>
				<li class="tab2_top"><span style="font-weight: bold;color: #333333">付露</span><span>费用有点贵，再考虑下</span></li>
				<li class="tab2_bottom"><span>有意向(电话)</span><span>2017/03/20 16:00</span></li>
			</ul>
			<ul>
				<li class="tab2_top"><span style="font-weight: bold;color: #333333">付露</span><span>费用有点贵，再考虑下</span></li>
				<li class="tab2_bottom"><span>有意向(电话)</span><span>2017/03/20 16:00</span></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
@charset "utf-8";
body,div,p,ul,li,a,dl,dt,dd,img,ol,input,table,tr,td,textarea,h1,h2,h3,h4,h5,h6,select {
  margin: 0;
  padding: 0;
  outline: none;
}
address, caption, cite, code, dfn, em, th, var, i, samp {
  font-style:normal;
  font-weight:normal;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display:block;
  *zoom:1;
}
q:before, q:after {
  content:'';
}
body,html,button,input,select,textarea {
  font:12px/1.5 'Microsoft YaHei', Helvetica, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
  *line-height: 1.5;
  -ms-overflow-style: scrollbar;  
  color:#333;
  margin:0 auto;
  background:#fff;
}
/*禁止FF等浏览器给textarea增加可拖拽大小的设置*/
textarea {
  resize: none;
}
/*图片无边框*/
img {
  border: none;
  vertical-align: top;
}
input {
  border: 0;
  outline: none;
}
/*IE input X 去掉文本框的叉叉和密码输入框的眼睛图标*/
::-ms-clear, ::-ms-reveal{display: none;}
sup {
  vertical-align: text-top
}

sub {
  vertical-align: text-bottom
}
/* 清除列表样式设置，以下为示例，仅写你用到的标签 */
ul,li {
  list-style: none;
}
/*表格边框合并*/
table {
  border-collapse: collapse;
  border-spacing: 0
}
table,td,th,tr {
  border-collapse: collapse;
}
/*修复火狐按钮文字不垂直居中的bug*/
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner,
input[type="file"] > input[type="button"]::-moz-focus-inner {
  border: none;
  padding: 0;
}
.empty_box {
  height: 1.85185185rem;
  border: 1px solid red;
}
.name_infor {
  height: 5.25925926rem;
  background-color: #fff;
  padding-top: 0.55555556rem;
}
.name_infor .pict_head {
  width: 2.22222222rem;
  height: 2.22222222rem;
  border-radius: 50%;
  background: url(../../../static/images/pict.png) no-repeat;
  background-size: 2.22222222rem;
  margin: 0 auto;
}
.name_infor .p_one {
  font-size: 0.59259259rem;
  font-weight: bold;
  color: #333333;
  text-align: center;
  padding-top: 0.55555556rem;
}
.name_infor .p_two {
  font-size: 0.48148148rem;
  text-align: center;
  color: #999999;
  padding-top: 0.55555556rem;
  margin-bottom: 0.55555556rem;
}
.tab_bar_list ul {
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
  margin: 0 0.37037037rem;
}
.tab_bar_list ul li {
  float: left;
  text-align: center;
  height: 80px;
  line-height: 80px;
}
.tab_bar_list ul li a {
  display: block;
  font-size: 0.55555556rem;
  color: #666666;
}
.active {
  border-bottom: 0.07407407rem solid #2c618b;
}
.tab_barline {
  height: 0.37037037rem;
  background-color: #eeeeee;
}
/*tab1*/
.basic_infor {
  margin-bottom: 0.51851852rem;
}
.basic_infor h3 span {
  font-weight: bold;
  color: #2c618b;
  font-size: 0.55555556rem;
}
.basic_infor h3 {
  color: #333333;
  font-size: 0.51851852rem;
  height: 1.85185185rem;
  line-height: 1.85185185rem;
  border-bottom: 1px solid #eeeeee;
}
.basic_infor {
  margin: 0 0.37037037rem;
}
.basic_infor tr {
  height: 1.66666667rem;
  line-height: 1.66666667rem;
  color: #666666;
  font-size: 0.51851852rem;
  border-bottom: 1px solid #eeeeee;
}
.basic_infor .td_title {
  width: 35%;
  text-align: left;
}
.basic_infor .td_infor {
  text-align: right;
}
.basic_infor table {
  width: 100%;
}
/*tab2*/
.basic_infor .tab2 span {
  display: inline-block;
  font-size: 0.51851852rem;
  color: #999999;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 5.33333333rem;
  white-space: nowrap;
}
.basic_infor .tab2 .tab2_top {
  padding-top: 0.74074074rem;
}
.basic_infor .tab2 .tab2_bottom {
  padding-bottom: 0.59259259rem;
}
.basic_infor .tab2 ul {
  border-bottom: 0.01851852rem solid #eeeeee;
}
.basic_infor .tab2 ul li {
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
/*tab3*/
.tab3 ul {
  background: url(../../../static/images/arrrow.png) no-repeat right center;
  background-size: 0.37037037rem;
}
</style>
