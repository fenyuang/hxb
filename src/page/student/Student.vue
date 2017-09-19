<template>
<HeaderNav v-bind:classify='0' v-bind:searchIcon='0'>
  <div id="wrap">
	<div class="information_title">
		<ul>
			<li>学生姓名</li>
			<li >手机号码</li>
		</ul>
	</div>
	<div v-for="item in students" class="content_list">
		<ul>
			<li class="left"><span class="name">{{item.realname}}/</span><span class="sex">{{item.sex==1?'男':'女'}}</span></li>
			<li class="phone_number"><span>电话</span>&nbsp;&nbsp;<span class="tel">{{item.tel}}</span></li>
		</ul>
		<p><span>班级</span>&nbsp;{{item.course_data?item.course_data:'无数据'}}</p>
		<ul class="check">
			<li class="check_skip"><a v-bind:href="'#/StuInfo?id='+item.id+'&uniacid='+item.uniacid">查看详情 &gt;</a></li>
		</ul>
	</div>
</div>
</HeaderNav>
</template>   

<script>
import HeaderNav from '../../components/HeaderNav.vue'
import axios from 'axios'
export default {
  name: 'student',
  data: function () {
    return {
      students: []
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    getData: function () {
      var _this = this
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/user/user_list')
      .then(function (rs) {
        rs = rs.data
        console.log(rs.ret === 100)
        if (rs.ret === 100) {
          _this.students = rs.data
        } else {

        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {
    HeaderNav
  }

}
</script>

<style scoped>
@charset "utf-8";
/* 仅添加需要重置reset的签 ---start---*/
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
body,button,input,select,textarea {
	font:12px/1.5 SimSun, Helvetica, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
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

	* {
  font-family: "Microsoft YaHei";
}


#wrap .empty_box {
  height: 1.85185185rem;
  border: 1px solid red;
}
#wrap .information_title {
  height: 1.85185185rem;
  width: 100%;
  border-bottom: 0.37037037rem solid #eeeeee;
}
#wrap .information_title ul {
  margin: 0 0.5rem;
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
.information_title ul li {
  float: left;
  font-size: 0.51851852rem;
  background: url(./img/trangle.png) no-repeat right center;
  background-size: 0.37037037rem;
  width: 2.55555556rem;
  margin-right: 0.74074074rem;
  height: 0.55555556rem;
  line-height: 0.55555556rem;
  margin-top: 0.51851852rem;
}
.spe {
  margin-right: 0!important;
}
.content_list {
  background-color: #FFFFFF;
}
.content_list ul {
  overflow: hidden;
  padding-top: 0.72222222rem;
  padding-bottom: 0.72222222rem;
  margin-left: 0.37037037rem;
   display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
/*.content_list ul li {
  float: left;
}*/
.content_list p{
  margin: 0 auto;
  color: #333333;
  font-size: 0.44444444rem;
}
.content_list span {
  color: #999999;
}
.content_list li.left{width:3.519rem}
.content_list li.right{}
.content_list .name,.content_list .sex {
  font-size: 0.519rem;
  color: #333;
}
.wrap .content_list .phone_number {
  width: 4.67407407rem;
  font-size: 0.44444444rem;
  padding-right: 0.46296296rem;
}
.wrap .content_list .phone_number .tel{
  color: #333;
}
.content_list .check {
  position: relative;
  overflow: hidden;
  padding-bottom: 1rem;

}
.content_list .check .check_skip{position: absolute;
  right: 1rem;}
.content_list .check .check_skip a{
  width: 2.481rem;
  color: #333;
  display: inline-block;
  font-size: 0.419rem;
  height: 0.8rem;
}
.content_list p {
  margin-left: 0.72222222rem;
}
.line {
  height: 0.37037037rem;
  background-color: #eeeeee;
}
.content_list{border-bottom:0.37037037rem solid #eee; }
</style>
