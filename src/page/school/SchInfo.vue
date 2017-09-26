<template>
<HeaderNav :classify=0  :searchIcon=0>
<div class="font_wryh">
     <div class="school_set">
      <!--  <div class="empty_box"></div> -->
        <div class="school_title">
            <ul>
                <li><a href="#/SchInfo" class="act">学校信息</a></li>
                <li><a href="#/SchRule">角色权限</a></li>
                <li><a href="#/SchSafe">安全设置</a></li>
            </ul>
        </div>
    </div>
    <div class="wrap">
     <!--    <ul class="mid_title">
            <li><a href="">学校基本信息</a></li>
            <li><a href="">域名设置</a></li>
        </ul> -->
        <div class="line_bot"></div>
        <div class="name_infor">
            <div class="pict_head"><img :src="info['logoimage']"></div>
        </div>
        <div class="line_bot"></div>
        <!--   	学校基本信息 -->
        <div class="basic_information">
            <h3><span>|</span>&nbsp;&nbsp;基本信息</h3>
            <div class="basic_infor">
                <table>                       
                    <tr>
                        <td class="title_l">学校名称</td>
                        <td class="title_r"><input type="text" name="school_name" :value="info['school_name']" ></td>
                    </tr>
                </table>
                <table>
                    <tr>
                        <td class="title_left">学校电话</td>
                        <td class="title_right"><input type="text" name="school_tel" :value="info['school_tel']" ></td>
                    </tr>
                    <tr>
                        <td class="title_left">品牌标语</td>
                        <td class="title_right"><input type="text" name="slogan" :value="info['slogan']" ></td>
                    </tr>
                </table>
            </div>
            <div class="school_intro">
                <h3>学校介绍</h3>
                <div style="">
                  <textarea name="introduce" rows="10" cols="30" :value="info['introduce']" >{{info['introduce']}}</textarea>
                </div>
            </div>
        </div>
    <!--     <div class="line_bot"></div> -->
        <div class="school_area">
            <h3><span>|</span>&nbsp;&nbsp;学校校区</h3>
            <div class="add"><a  v-bind:href="'#/AddSch?school_pid='+info.branch_school[0].school_pid">添加校区</a></div>
            <div class="box_one" v-for="school in info['branch_school']">
                <ul>
                    <li class="tit">{{school['name']}}</li>
                    <li class="address">{{school['address']}}</li>
                    <li class="num">{{school['photos_data']['mediafiles_data']['num']}}张</li>
                </ul>
            </div>
        </div>
        <div class="button"><a href="javascript:;" @click="school_save">保存</a></div>
    </div>
    <!--   	域名设置 -->
  <!--   <div class="name_set" style="display: none;">
        <div class="second_name">学校二级域名</div>
        <div class="write">
            <input type="text" name="" placeholder="4~20字符，数字/字母组合">
            <span>.huixuebao.com</span>
        </div>
        <p>如果您已有网址，如www.huixuebao.com ，您也可以将您已备案的域名解析到您的二级域名，使用独立域名。</p>
        <p><a href="" class="look">查看解析攻略</a></p>
        <div class="button button_two"><a href="">保存</a></div>
    </div> -->
</div>
</HeaderNav>    
</template>
<script>
  import HeaderNav from '../../components/HeaderNav.vue'
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    data () {
      return {
        id: '1',
        info: [],
        condition: {}
      }
    },
    methods: {
      /* 机构信息保存 */
      school_save () {
        var schoolName = $('input[name="school_name"]').val()
        var schoolTel = $('input[name="school_tel"]').val()
        var slogan = $('input[name="slogan"]').val()
        var introduce = $('textarea[name="introduce"]').val()
        var condition = {id: this.id, school_name: schoolName, school_tel: schoolTel, slogan: slogan, introduce: introduce}
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/organization/organization_update', condition).then((res) => {
          if (res.status === 200) {
            alert(res.data.msg)
            return false
          }
        }).catch((err) => {
          console.log(err)
          return false
        })
      }
    },
    mounted () {
      /* 进入页面获取机构详情 */
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/organization/organization_select', {id: this.id}).then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            console.log(res.data)
            this.info = res.data.data
          } else {
            alert(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
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
  background-color: #fff;
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
/*  font:12px/1.5 'Microsoft YaHei', Helvetica, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;*/
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
.school_title ul {
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
  margin: 0 0.37037037rem;
}
.school_title ul li {
  float: left;
}
.wrap .mid_title {
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
.wrap .mid_title li {
  float: left;
}
ul li a {
  color: #666666 !important;
  font-size: 0.55555556rem;
  display: block;
  height: 1.44444444rem;
  line-height: 1.44444444rem;
}
.act {
  color: #2c618b!important;
  border-bottom: 1px solid #2c618b;
}
.mid_title {
  margin: 0 1.7962963rem;
}
.line_bot {
  height: 0.37037037rem;
  background-color: #eeeeee;
}
.name_infor {
  height: 3.22222222rem;
}
.name_infor .pict_head{margin: 0 auto;text-align: center;}
.name_infor .pict_head img{
  width: 2.22222222rem;
  height: 2.22222222rem;
  border-radius: 50%;
/*  background: url(./img/pict.png) no-repeat;*/
  background-size: 2.22222222rem;
  margin: 0 auto;
  margin-top: 0.57407407rem;
}
.name_infor .p_one {
  font-size: 0.59259259rem;
  color: #333333;
  text-align: center;
  padding-top: 0.55555556rem;
}
/*学校基本信息*/
.basic_information {
  margin: 0 0.37037037rem;
}
.basic_information h3 {
  color: #333333;
  font-size: 0.55555556rem;
  height: 1.87037037rem;
  line-height: 1.87037037rem;
  border-bottom: 1px solid #eeeeee;
}
.basic_information h3 span {
  color: #2c618b;
}
.basic_infor table tr {
  height: 1.66666667rem;
  border-bottom: 1px solid #eeeeee;
}
.basic_infor table {
  width: 100%;
}
.basic_infor table .title_l {
  width: 25%;
  text-align: left;
  color: #666666;
  font-size: 0.48148148rem;
}
.basic_infor table .title_r {
  text-align: right;
  color: #333333;
  font-size: 0.55555556rem;
}
.basic_infor table .title_ch {
  color: #6189a8;
  font-size: 0.48148148rem;
}
.basic_infor table .title_cer {
  color: #6189a8;
  font-size: 0.48148148rem;
}
.basic_infor table .title_left {
  width: 25%;
  text-align: left;
  color: #666666;
  font-size: 0.48148148rem;
}
.basic_infor table .title_right {
  text-align: right;
  width: 75%;
  color: #333333;
  font-size: 0.48148148rem;
}
.school_area h3 {
  color: #333333;
  font-size: 0.55555556rem;
  height: 1.87037037rem;
  line-height: 1.87037037rem;
  border-bottom: 1px solid #eeeeee;
}
.school_area h3 span {
  color: #2c618b;
}
.school_area {
  margin: 0 0.18518519rem;
}
.school_area ul li {
  display: inline-block;
  font-size: 0.38148148rem;
  color: #666666;
  text-align: left;
}
.school_area ul {
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.school_area .tit {
  color: #333333;
  width: 36%;
  text-align: left;
  white-space: nowrap;
}
.school_area .address {
  width: 50%;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.school_area .num {
  width: 33%;
  text-align: right;
  white-space: nowrap;
}
.box_one {
  margin: 0.55555556rem auto;
  width: 100%;
}
.button a {
  display: block;
  width: 9.37037037rem;
  height: 2.03703704rem;
  line-height: 2.03703704rem;
  border-radius: 0.09259259rem;
  background-color: #2c618b;
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  font-size: 0.59259259rem;
  margin-bottom: 0.92592593rem;
}
.school_area {
  position: relative;
}
.school_area .add {
  position: absolute;
  top: 0.55555556rem;
  right: 0;
  height: 0.755556rem;
  line-height: 0.755555rem;
  background: url(../../../static/images/add_y.png) no-repeat;
  background-size: 0.74074074rem;
}
.school_area .add a {
  padding-left: 0.96296296rem;
  display: block;
  color: #93c971;
  font-size: 0.55555556rem;
}
/*
域名设置*/
.name_set {
  background-color: #eeeeee;
}
.name_set .second_name {
  height: 1.2962963rem;
  line-height: 1.2962963rem;
  margin-left: 0.33333333rem;
  font-size: 0.55555556rem;
  color: #333333;
}
.name_set .write {
  height: 1.66666667rem;
  background-color: #ffffff;
  line-height: 1.66666667rem;
  margin: 0 0.37037037rem;
  overflow: hidden;
}
.name_set .write input {
  color: #999999;
  font-size: 0.44444444rem;
  width: 7.59259259rem;
  font-family: "Microsoft YaHei";
}
.name_set .write span {
  float: right;
  font-size: 0.44444444rem;
  color: #33333;
}
.name_set p {
  margin: 0 0.37037037rem;
  font-size: 0.44444444rem;
  color: #999999;
  margin-top: 0.37037037rem;
}
.name_set .look {
  color: #2c618b;
}
.name_set .button_two {
  margin-top: 0.74074074rem;
  padding-bottom: 4.46296296rem;
}
/*角色权限----角色管理*/
.j_power .mid_title {
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
.j_power .mid_title li {
  float: left;
}
.tab2 {
  margin: 0 0.37037037rem;
}
.tab2 span {
  display: inline-block;
  font-size: 0.51851852rem;
  color: #999999;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 5.33333333rem;
  white-space: nowrap;
}
.tab2 .tab2_top {
  padding-top: 0.74074074rem;
}
.tab2 .tab2_bottom {
  padding-bottom: 0.59259259rem;
}
.tab2 ul {
  border-bottom: 0.01851852rem solid #eeeeee;
}
.tab2 ul li {
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
}
.tab3 ul {
  background: url(../../../static/images/arrrow.png) no-repeat right center;
  background-size: 0.37037037rem;
}
.tab3 .right {
  text-align: center;
  color: #333333;
}
.tab3 .control {
  text-align: right;
}
/*角色权限---团队管理*/
.name_list ul {
  overflow: hidden;
  display: -webkit-flex;
  -webkit-flex-flow: nowrap;
  justify-content: space-between;
  margin: 0 2.51851852rem;
}
.name_list ul li {
  width: 1.62962963rem;
  float: left;
  background: url(../../../static/images/trangle.png) no-repeat right center;
  background-size: 0.37037037rem;
}
.box {
  height: 3.05555556rem;
  background-color: #eeeeee;
}
/*安全设置*/
.safe_set h3 {
  font-size: 0.55555556rem;
  color: #333333;
  height: 1.85185185rem;
  line-height: 1.85185185rem;
  padding-left: 0.37037037rem;
  border-bottom: 1px solid #eeeeee;
}
.safe_set h3 span {
  color: #2c618b;
}
.safe_set table tr {
  height: 1.66666667rem;
  line-height: 1.66666667rem;
  border-bottom: 1px solid #eeeeee;
}
.safe_set table {
  width: 100%;
}
.safe_set table tr .left {
  width: 30%;
}
.safe_set table tr .left span {
  font-size: 0.48148148rem;
  color: #666666;
}
.safe_set table tr .center {
  width: 50%;
}
.safe_set table tr .center input {
  font-size: 0.51851852rem;
  color: #333;
}
.safe_set table tr .right {
  width: 20%;
}
.safe_set table a {
  display: block;
  width: 2.48148148rem;
  height: 1.09259259rem;
  line-height: 1.09259259rem;
  color: #fff;
  font-size: 0.48148148rem;
  background-color: #93c971;
  border-radius: 0.09259259rem;
  text-align: center;
}
.safe_set {
  margin: 0 0.37037037rem;
}
.school_intro textarea{font-size: 0.379rem;}
</style>
