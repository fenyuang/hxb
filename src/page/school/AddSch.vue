<template>
 <div class="add_school" id="ap_sch">
	<div class="add_head">添加校区</div>
    <div class="add_content">
    	<table>
    		<tr>
    			<td class="td_left">校区名称</td>
    			<td class="td_input"><input type="text" v-model="name" placeholder="输入学校名称" value=""/></td>
    		</tr>
    		<tr>
    			<td class="td_left">校区位置</td>
          <td>
            <tr>
              <td class="one">
                <select>
                    <option > 广东省</option>
                    <option > 湖北省 </option>
                    <option >深圳市</option>
                    <option >深圳市 </option>
                    <option >深圳市</option>
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
          <td class="td_input"><input type="text" v-model="address" placeholder="输入学校地址" value=""/></td>
    		</tr>
    		<tr>
    			<td class="td_left">校区电话</td>
          <td class="td_input"><input type="text"  v-model="tel" placeholder="输入电话" value=""/></td>
    		</tr>
    		<tr>
    			<td class="td_left">校区照片</td>
          <td class="td_input"><input type="file" class="special" id="filer_input" multiple="multiple"/></td>
    		</tr>
    	</table>
    	<div class="picture">
    		<ul>
    			<li><img src="./img/picture.png"><span><a href=""></a></span></li>
    			<li><img src="./img/picture.png"><span><a href=""></a></span></li>
    		</ul>
    	</div>
    </div>
    <div class="send"><a href="" v-on:click="checkData()">提交</a></div>
</div>	
</template>

<script>
import $ from 'jquery'
// import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      name: '',
      tel: '',
      cityid: '',
      address: '',
      school_pid: 0,
      files: []
    }
  },
  method: {
    submits: function () {
      $.ajax({
        url: 'http://hxb.scpoo.com/hxb/index.php/index/branchschool/branchschool_add?school_pid=' + this.$route.query.school_pid,
        data: {
          name: this.name,
          tel: this.tel,
          cityid: this.cityid,
          address: this.address,
          school_pid: this.school_pid,
          files: this.files
        },
        dataType: 'jsonp',
        success: function (rs) {
          if (rs.ret === 0) {
            alert('提交成功')
          } else {
            alert(rs.msg)
          }
        },
        error: function (rs) {
          alert('网络错误')
        }
      })
    },
    checkData: function () {
      if (this.name === '') {
        alert('请填写姓名')
      } else if (this.tel === '') {
        alert('请填写电话')
      } else if (this.cityid === '') {
        alert('城市编码')
      } else if (this.address === '') {
        alert('输入学校地址')
      } else {
        this.submits()
      }
    },
    getCity: function () {}

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
	width: 2.222rem;
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
	background:url(./img/delete.png) no-repeat;
	background-size: 0.741rem;float: right;margin-right: 0.611rem;margin-top: 0.37rem;
   }

#ap_sch .send a{display: block;width: 9.111rem;
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

