<template>
<HeaderNav :classify=0  :searchIcon=0>
<form action="http://hxb.scpoo.com/hxb/index.php/index/branchschool/branchschool_add" method="post" enctype="multipart/form-data">
 <div class="add_school" id="ap_sch">
	<div class="add_head">添加校区</div>
    <div class="add_content">
    	<table>
    		<tr>
    			<td class="td_left">校区名称</td>
    			<td class="td_input"><input type="text" name="name" placeholder="输入学校名称" value="新东方南山校区"/></td>
    		</tr>
    		<tr>
    			<td class="td_left">校区位置</td>
          <td>
            <tr>
              <td class="one">
                <select>
                    <option> 广东省</option>
                </select>
              </td>
            <td class="one">
                <select>
                    <option value=" 深圳市 ">深圳市</option>
                    <option value=" 汕头市">汕头市 </option>
                    <option value=" 深圳市">深圳市</option>
                    <option value=" 深圳市">深圳市 </option>
                    <option value=" 深圳市">深圳市</option>
                </select>
            </td>
            <td class="one">
                <select>
                    <option value="南山区">南山区</option>
                    <option value="宝安">宝安区</option>
                    <option value="南山区">南山区</option>
                    <option value="南山区">南山区</option>
                    <option value="南山区">南山区</option>
                </select>
            </td>    
           </tr>
        </td>
    		</tr>
    		<tr>
    			<td class="td_left">详细地址</td>
          <td class="td_input"><input type="text" name="address" placeholder="输入学校地址" value="深圳市南山区科兴科学园"/></td>
    		</tr>
    		<tr>
    			<td class="td_left">校区电话</td>
          <td class="td_input"><input type="tel" name="tel" placeholder="输入电话" value="0755123456"/></td>
    		</tr>
    		<tr>
    			<td class="td_left">校区照片</td>
          <td class="td_input"><input type="file" name="files[]" class="special" id="filer_input" multiple="multiple"/></td>
    		</tr>
    	</table>
    	<div class="picture">
    		<ul>
    			<li><img src="../../../static/images/picture.png"><span><a href=""></a></span></li>
    			<li><img src="../../../static/images/picture.png"><span><a href=""></a></span></li>
    		</ul>
    	</div>
    </div>
    <input type="hidden" name="school_pid" placeholder="输入总校ID" value="2"/>
    <input type="hidden" name="cityid" placeholder="输入城市编码" v-model="cityid"/>
    <div class="send"><input type="submit" class="submit" value="提交"/></div>
</div>
</form>
</HeaderNav>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
export default {
  name: '',
  data () {
    return {
      cityid: '123'
    }
  },
  methods: {},
  components: {
    HeaderNav
  }
}
</script>

<style scoped>

        body,div,p,ul,li,a,dl,dt,dd,img,ol,input,table,tr,td,textarea,h1,h2,h3,h4,h5,h6,select {
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
/*  background-color:#fff !important;*/
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

*{font-family: "Microsoft YaHei" !important;}
#ap_sch .add_school{width: 100%;background-color:#fff;}
#ap_sch .add_head{font-size: 0.556rem;
  color: #333;
  text-align: center;
  height: 1.852rem;
  line-height: 1.852rem;
  border-bottom: 1px solid #eee;
  background-color:#fff !important;
}
#ap_sch .add_content{width: 100%;}
#ap_sch .add_content table{width: 100%;background-color:#fff !important;}
#ap_sch .add_content tr{height: 1.667rem;border-bottom:1px solid #eee; font-size: 0.444rem;color: #999;}
#ap_sch .add_content tr td{padding-left: 0.5rem;}
#ap_sch .td_left{width: 25%;}

#ap_sch .add_content input{/*width: 100%;*/font-size: 0.444rem;color: #999999;text-align: center;}
#ap_sch .add_content select{height: 1.667rem;font-size: 0.444rem;color: #999999;border: none;text-align: center;width: 100%;padding-left: 0.5rem;}

#ap_sch .add_content .special{color: #2c618b;
	width: 2.322rem;
	height: 0.889rem;
/*	border: 1px solid #2c618b;*/
	border-radius: 0.093rem;
	float:right;
	margin-right:0.481rem;}
#ap_sch .picture ul{
	display: -webkit-flex;
    -webkit-flex-flow: nowrap;
    justify-content: space-between;}
#ap_sch .picture ul li {display:inline-block;width: 5.37rem;height: 4.037rem;margin: 0 0.2rem;position: relative;}
#ap_sch .picture img{width: 100%;height: 100%;background-color: #efeff4!important;}
#ap_sch .picture span{position: absolute;bottom: 0;left: 0;background-color: rgba(80,80,80,0.5);height: 1.4rem;display: block;width: 100%;}

#ap_sch .picture span a{
  display: block;
	width: 0.741rem;
	height: 0.741rem;
	background:url(../../../static/images/delete.png) no-repeat;
	background-size: 0.741rem;float: right;margin-right: 0.611rem;margin-top: 0.37rem;
   }

#ap_sch .send .submit{display: block;width: 9.111rem;
	height: 1.889rem;
	background-color: #2c618b!important;
	border-radius: 0.093rem;
	text-align: center;color: #fff;
	font-size: 0.593rem;
line-height: 1.889rem;
margin:0.926rem auto;
}

.one{width: 15% !important;padding-left: 0!important;}

</style>

