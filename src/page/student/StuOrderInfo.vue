<template>
<HeaderNav :classify=0  :searchIcon=0>
<div class="order" id="order_in">
	<div class="name_infor">
		<p class="p_one">{{StuOrderInfo.user_info.realname}}</p>
		<p class="p_two">{{StuOrderInfo.user_info.tel}}</p>
	</div>
	<div class="order_spe">
		<table>
			<tr>
				<td class="td_left">订单编号</td><td class="td_right">{{StuOrderInfo.order_sn}}</td>
			</tr>
			<tr>
				<td class="td_left">课程名称</td><td class="td_right">{{StuOrderInfo.course_name}}</td>
			</tr>
			<tr>
				<td class="td_left">班级名称</td><td class="td_right">{{StuOrderInfo.class_name}}</td>
			</tr>
			<tr>
				<td class="td_left">订单创建时间</td><td class="td_right">{{StuOrderInfo.addtime}}</td>
			</tr>
			<tr>
				<td class="td_left">订单状态</td><td class="td_right">{{StuOrderInfo.status==0?'已经预定':StuOrderInfo.status==10?'已经支付':'已回访'}}</td>
			</tr>
			<tr>
				<td class="td_left">应用金额(元)</td><td class="td_right">{{StuOrderInfo.class_name}}</td>
			</tr>
		</table>
	</div>
	<div class="bottom_line"></div>
	<div class="order_spe">
		<table>
			<tr>
				<td class="td_left">操作</td><td class="td_right">查看详情 ></td>
			</tr>
		</table>
	</div>
</div>
</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
import axios from 'axios'
export default {
  name: 'StuOrderInfo',
  data: function () {
    return {
      StuOrderInfo: {
        user_info: {}
      }
    }
  },
  mounted: function () {
    this.getOrderInfo()
  },
  methods: {
    getOrderInfo: function () {
      var _this = this
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Courseorder/getInfo', {uniacid: this.$route.query.uniacid, order_sn: this.$route.query.order_sn})
      .then(function (rs) {
        rs = rs.data
        if (rs.ret === 100) {
          _this.StuOrderInfo = rs.data
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
  font:12px/1.5 "Microsoft YaHei", Helvetica, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
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
#order_in .order {
  background-color: #eeeeee;
  padding-bottom: 5.14814815rem;
}
#order_in  .empty_box {
  height: 1.85185185rem;
  border: 1px solid red;
}
#order_in .name_infor {
  height: 2.68518519rem;
  background-color: #fff;
  padding-top: 0.74074074rem;
}
#order_in  .name_infor .p_one {
  font-size: 0.59259259rem;
  font-weight: bold;
  color: #333333;
  text-align: center;
}
#order_in  .name_infor .p_two {
  font-size: 0.48148148rem;
  text-align: center;
  color: #999999;
  margin-top: 0.55555556rem;
}
#order_in  .order_spe {
  padding: 0 0.37037037rem;
  background-color: #ffffff;
}
#order_in  .order_spe table {
  width: 100%;
}
#order_in  .order_spe .td_left {
  width: 30%;
  color: #666666;
  font-size: 0.48148148rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  overflow: hidden;
}
#order_in  .order_spe .td_right {
  width: 70%;
  text-align: right;
  font-size: 0.48148148rem;
  color: #333333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
#order_in .order_spe tr {
  height: 1.2037037rem;
  line-height: 1.2037037rem;
}
#order_in .order_spe {
  padding-bottom: 0.37037037rem;
}
#order_in  .bottom_line {
  height: 0.37037037rem;
  background-color: #eeeeee;
}

</style>
