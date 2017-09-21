<template>
<HeaderNav :classify=0  :searchIcon=0>
<div class="wrap" id="wrap_or">
  <div class="name_infor">
    <div class="pict_head"><img v-bind:src="StuPreOrdert.headimgurl"></div>
    <p class="p_one">{{StuPreOrdert.realname}}</p>
  </div>
  <div class="tab_bar_list">
    <ul>
      <li><a v-bind:href="'#/StuInfo?id='+this.$route.query.id+'&amp;uniacid='+this.$route.query.uniacid">基本信息</a></li>
      <li class="active"><a href="javascript:;">预定订单</a></li>
      <li><a href="javascript:;">推广信息</a></li>
    </ul>
  </div>
  <div class="tab_barline"></div>
  <div class="basic_infor">
    <!--  tab3 -->
    <div class="tab2 tab3" >
      <div v-for="item in StuPreOrder ">
           <a v-bind:href="'#/StuOrderInfo?id='+item.id+'&amp;uniacid='+item.uniacid+'&amp;order_sn='+item.order_sn">
            <ul>
              <li class="tab2_top"><span style="color: #333333">{{item.user_info.realname}}</span><span>{{item.status==0?'已经预定':item.status==10?'已经支付':'已回访'}}</span></li>
              <li class="tab2_bottom"><span>{{item.user_info.tel}}</span><span>{{item.addtime}}</span></li>
            </ul>
          </a>
      </div>
    </div>
  </div>
</div>
</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
import axios from 'axios'
export default {
  name: 'StuPreOrder',
  data: function () {
    return {
      StuPreOrder: [],
      StuPreOrdert: {}
    }
  },
  mounted: function () {
    this.getOrderList()
    this.getUserInfo()
  },
  methods: {
    getOrderList: function () {
      var _this = this
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/Courseorder/getList?uniacid=' + this.$route.query.uniacid)
      .then(function (rs) {
        rs = rs.data
        if (rs.ret === 100) {
          _this.StuPreOrder = rs.data
        } else {
          alert(rs.msg)
        }
      })
    },
    getUserInfo: function () {
      var _this = this
      axios.get('http://hxb.scpoo.com/hxb/index.php/index/user/user_select?id=' + this.$route.query.id)
      .then(function (rs) {
        rs = rs.data
        if (rs.ret === 100) {
          _this.StuPreOrdert = rs.data
        } else {
          alert(rs.msg)
        }
      })
    }
  },
  components: {
    HeaderNav: HeaderNav
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
#wrap_or .empty_box {
  height: 1.85185185rem;
  border: 1px solid red;
}
#wrap_or .name_infor {
  height: 4.25925926rem;
  background-color: #fff;
  padding-top: 0.55555556rem;
}
#wrap_or .name_infor .pict_head{margin: 0 auto;text-align: center;}
#wrap_or .name_infor .pict_head img {
  width: 2.22222222rem;
  height: 2.22222222rem;
  border-radius: 50%;
/*  background: url(./img/pict.png) no-repeat;*/
  background-size: 2.22222222rem;
  margin: 0 auto;
}
#wrap_or .name_infor .p_one {
  font-size: 0.59259259rem;
  font-weight: bold;
  color: #333333;
  text-align: center;
  padding-top: 0.55555556rem;
}
#wrap_or .name_infor .p_two {
  font-size: 0.48148148rem;
  text-align: center;
  color: #999999;
  padding-top: 0.55555556rem;
  margin-bottom: 0.55555556rem;
}
#wrap_or .tab_bar_list ul {
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
  margin: 0 0.37037037rem;
}
#wrap_or .tab_bar_list ul li {
  float: left;
  text-align: center;
  height: 80px;
  line-height: 80px;
}
#wrap_or .tab_bar_list ul li a {
  display: block;
  font-size: 0.55555556rem;
  color: #666666;
}
#wrap_or .active {
  border-bottom: 0.07407407rem solid #2c618b;
}
#wrap_or .tab_barline {
  height: 0.37037037rem;
  background-color: #eeeeee;
}
/*tab1*/
#wrap_or .basic_infor {
  margin-bottom: 0.51851852rem;
}
#wrap_or .basic_infor h3 span {
  font-weight: bold;
  color: #2c618b;
  font-size: 0.55555556rem;
}
#wrap_or .basic_infor h3 {
  color: #333333;
  font-size: 0.51851852rem;
  height: 1.85185185rem;
  line-height: 1.85185185rem;
  border-bottom: 1px solid #eeeeee;
}
#wrap_or .basic_infor {
  margin: 0 0.37037037rem;
}
#wrap_or .basic_infor tr {
  height: 1.66666667rem;
  line-height: 1.66666667rem;
  color: #666666;
  font-size: 0.51851852rem;
  border-bottom: 1px solid #eeeeee;
}
#wrap_or .basic_infor .td_title {
  width: 35%;
  text-align: left;
}
#wrap_or .basic_infor .td_infor {
  text-align: right;
}
#wrap_or .basic_infor table {
  width: 100%;
}
/*tab2*/
#wrap_or .basic_infor .tab2 span {
  display: block;
  height: 1rem;
  font-size: 0.51851852rem;
  color: #999999;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 5.33333333rem;
  white-space: nowrap;
  line-height: 1rem;
}
#wrap_or .basic_infor .tab2 .tab2_top {
  padding-top: 0.74074074rem;
}
#wrap_or .basic_infor .tab2 .tab2_bottom {
  padding-bottom: 0.59259259rem;
}
#wrap_or .basic_infor .tab2 ul {
  border-bottom: 0.01851852rem solid #eeeeee;
}
#wrap_or .basic_infor .tab2 ul li {
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
/*tab3*/
#wrap_or .tab3 ul {
  background: url(../../../static/images/arrow2.jpg) no-repeat right center;
  background-size: 0.37037037rem;
}
</style>
