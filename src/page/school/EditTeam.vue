<template>
<HeaderNav :classify=0  :searchIcon=0>
  <div class="add_school" id="add_people">
	<div class="add_head"><a href="">修改人员</a></div>
    <div class="add_content">
    	<table>
    		<tr>
    			<td class="td_left">姓名</td>
    			<td><input type="text" name="" id="quan_name"  placeholder="(请输名称,输入后不可修改)" :value="info.name"></td>
    		</tr>
            <tr>
                <td class="td_left">手机号码</td>
                <td><input type="text" name="" id="quan_tel"  placeholder="(请输名称,输入后不可修改)" :value="info.tel"></td>
            </tr>
            <tr>
                <td class="td_left">QQ号码</td>
                <td><input type="text" name="" id="quan_qq"  placeholder="(请输名称,输入后不可修改)" :value="info.qq"></td>
            </tr>
    		<tr>
    			<td class="td_left" style="color: #2c618b;">角色确认</td>
    			<td>
    			    <select id="quan_role_id">
	    				<option :value="list.id" :selected="list.id===info.role_id" v-for="list in rolelsit">{{list.name}}</option>
    			    </select>
    			</td>
    		</tr>
    	</table>
    	
    </div>
    <div class="send"><a @tap="subadd">提交</a></div>
</div>
</HeaderNav>
</template>
<script>
import HeaderNav from '../../components/HeaderNav.vue'
import axios from 'axios'
import $ from 'jquery'
export default {
  name: '',
  data: function () {
    return {
      tabsName: ['角色管理', '团队管理'],
      curIndex: 0,
      rolelsit: [],
      info: []
    }
  },
  methods: {
    tabsSwitch: function (x) {
      this.curIndex = x
    },
    subadd () {
      var name = $('#quan_name').val()
      var tel = $('#quan_tel').val()
      var qq = $('#quan_qq').val()
      var password = $('#quan_password').val()
      var roleid = $('#quan_role_id').val()

      if (name === '') {
        alert('填写名字')
        return false
      }
      if (tel === '') {
        alert('填写手机号码')
        return false
      }
      if (qq === '') {
        alert('填写QQ')
        return false
      }
      if (password === '') {
        alert('填写 密码')
        return false
      }
      this.datas = {name: name, tel: tel, qq: qq, id: this.$route.query.id, role_id: roleid}
      this.getAddrole(this.datas)
    },
    getRolelist () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Power/getRolelist').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.rolelsit = res.data.data
          } else {
            console.log(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getAddrole (datas) {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Power/getTeamedit', datas).then((res) => {
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
    },
    getInfo () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Power/getTeaminfo', {id: this.$route.query.id}).then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.info = res.data.data
          } else {
            console.log(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getRolelist()
    this.getInfo()
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
#add_people{background-color: #eeeeee;}
#add_people .add_head{padding: 0.37rem}
#add_people .add_head a{font-size: 0.556rem;
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
#add_people .add_content{margin: 0 auto;background-color: #fff;margin-left: 0.37rem;margin-right: 0.37rem}
#add_people .add_content table{width: 100%;}
#add_people .add_content tr{height: 1.667rem;border-bottom:1px solid #eee; font-size: 0.444rem;color: #999;}
#add_people .add_content tr td{padding-left: 0.5rem;}
#add_people .td_left{width: 25%;}

#add_people .add_content input{width: 100%;font-size: 0.444rem;color: #999999;text-align: center;}
#add_people .add_content select{height: 1.667rem;font-size: 0.444rem;color: #999999;border: none;text-align: center;width: 100%;padding-left: 0.5rem;}

#add_people .add_content .special{color: #2c618b;
	width: 2.222rem;
	height: 0.889rem;
	border: 1px solid #2c618b;
	border-radius: 0.093rem;
	float:right;
	margin-right:0.481rem;}

#add_people .send a{display: block;width: 9.37rem;
	height: 1.889rem;
	background-color: #2c618b;
	border-radius: 0.093rem;
	text-align: center;color: #fff;
	font-size: 0.593rem;
    line-height: 1.889rem;
    margin:0.926rem auto;
}

</style>
