<template>
  <div class="add_school" id="ad_r">
	<div class="add_head"><a href="#/AddRole">新增角色</a></div>
    <div class="add_content">
    	<table>
    		<tr>
    			<td class="td_left">角色名称</td>
    			<td><input type="text" name="name" class="inputText" id="quan_name" placeholder="(请输名称,输入后不可修改)" value=""></td>
    		</tr>
            <tr>
                <td class="td_left">备注名称</td>
                <td><input type="text" name="beizhu" class="inputText" id="quan_beizhu"  placeholder="(请输名称,输入后不可修改)" value=""></td>
            </tr>
    		<tr>
    			<td class="td_left" style="color: #2c618b;">角色权限</td>
    			<td>
    			    <!-- <select>
                                <option :value="list.id" v-for="list in rolelist">{{list.description}}</option>
                            </select> -->
              <span class="right" v-for="(list,index) in rolelist">{{list.description}}<input type="checkbox" v-bind:value="index+1+''" v-model="role_id"></span>
    			</td>
    		</tr>
    	</table>
    	{{role_id}}
    </div>
    <div class="send"><a v-on:click="subadd">提交</a></div>
</div>	
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  name: '',
  data: function () {
    return {
      tabsName: ['角色管理', '团队管理'],
      curIndex: 0,
      rolelist: [],
      role_id: []
    }
  },
  methods: {
    tabsSwitch: function (x) {
      this.curIndex = x
    },
    subadd: function () {
      var name = $('#quan_name').val()
      var beizhu = $('#quan_beizhu').val()
      if (name === '') {
        alert('填写名字')
        return false
      }
      if (beizhu === '') {
        alert('填写备注')
        return false
      }
      this.datas = {name: name, description: beizhu, role_id: this.role_id}
      this.getAddrole(this.datas)
    },
    getRolelist: function () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Power/getInterfacelsit').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.rolelist = res.data.data
          } else {
            console.log(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getAddrole: function (datas) {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Power/getRoleadd', datas).then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            alert(res.data.msg)
          } else {
            console.log(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted: function () {
    this.getRolelist()
  }
}
</script>

<style scoped>

  body,div,p,ul,li,a,dl,dt,dd,img,ol,input,table,tr,td,textarea,h1,h2,h3,h4,h5,h6,select {
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
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
#ad_r .add_school{background-color: #eeeeee;}
#ad_r .add_head{padding: 0.37rem}
#ad_r .add_head a{font-size: 0.556rem;
	display: block;
	color: #333;
	text-align: center;
	height: 1.852rem;
	line-height: 1.111rem;
	width: 3.259rem;
	height: 1.111rem;
	border: 1px solid #2c618b;
	margin: 0 auto;
	border-radius: 0.093rem;
}
#ad_r .add_content{margin: 0 auto;background-color: #fff;margin-left: 0.37rem;margin-right: 0.37rem}
#ad_r .add_content table{width: 100%;}
#ad_r .add_content tr{height: 1.667rem;border-bottom:1px solid #eee; font-size: 0.444rem;color: #999;}
#ad_r .add_content tr td{padding-left: 0.5rem;}
#ad_r .td_left{width: 25%;}

#ad_r .add_content .inputText{width: 100%;font-size: 0.444rem;color: #999999;text-align: center;}
#ad_r .add_content select{height: 1.667rem;font-size: 0.444rem;color: #999999;border: none;text-align: center;width: 100%;padding-left: 0.5rem;}

#ad_r .add_content .special{color: #2c618b;
	width: 2.222rem;
	height: 0.889rem;
	border: 1px solid #2c618b;
	border-radius: 0.093rem;
	float:right;
	margin-right:0.481rem;
}
#ad_r .add_content .right{
  margin-right:0.2rem;
}
#ad_r .send a{display: block;width: 9.37rem;
	height: 1.889rem;
	background-color: #2c618b;
	border-radius: 0.093rem;
	text-align: center;color: #fff;
	font-size: 0.593rem;
  line-height: 1.889rem;
  margin:0.926rem auto;
}


</style>
