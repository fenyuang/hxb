<template>
  <div class="order" id="team_order">
	  	<div class="order_spe">
	  		<table>
	  			<tr>
	  				<td class="td_left">序号</td><td class="td_right">01</td>
	  			</tr>
	  			<tr>
	  				<td class="td_left">姓名</td><td class="td_right">01</td>
	  			</tr>
	  			<tr>
	  				<td class="td_left">角色</td><td class="td_right">01</td>
	  			</tr>
	  			<tr>
	  				<td class="td_left">手机号码</td><td class="td_right">01</td>
	  			</tr>
	  			<tr>
	  				<td class="td_left">QQ号</td><td class="td_right">超级管理员</td>
	  			</tr>
	  			<tr>
	  				<td class="td_left">创建人</td><td class="td_right">Administer</td>
	  			</tr>
	  			<tr>
	  				<td class="td_left">创建时间</td><td class="td_right">2017/07/02 11:21</td>
	  			</tr> 			
	  		</table>
	  	</div>
	  	<div class="order_spe">
	  	     <table>
	  			<tr>
	  				<td class="td_left">操作</td><td class="td_right active">修改 ></td><td class="td_right active">删除 ></td>
	  			</tr>
	  		</table>
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

*{font-family: "Microsoft YaHei";}
#team_order .order{background-color: #eeeeee;padding-bottom: 9.148rem;}
#team_order .name_infor{height: 2.685rem;background-color: #fff;padding-top: 0.74rem;}

#team_order .name_infor .p_one{font-size: 0.593rem;font-weight: bold;color: #333333;text-align: center;}
#team_order .name_infor .p_two{font-size: 0.48rem;text-align: center;color: #999999;margin-top: 0.556rem;}
#team_order .order_spe{padding:0 0.34rem;background-color: #ffffff;border-bottom: 0.37rem solid #eee;}
#team_order .order_spe table{width: 100%}
#team_order .order_spe .td_left{
  width: 30%;
  color: #666666;
  font-size: 0.48rem;
  white-space: nowrap;
  text-overflow:ellipsis;
  text-align: left;
  overflow: hidden;}
#team_order .order_spe .td_right{
  text-align: right;
  font-size: 0.48rem;
  color: #333333;
  white-space: nowrap;
  text-overflow:ellipsis;overflow: hidden;}
#team_order .active{color: #2c618b !important;}
#team_order .order_spe tr{height: 1.204rem;line-height: 1.204rem;}
#team_order .order_spe{padding-bottom: 0.37rem;}
#team_order .bottom_line{height: 0.37rem;background-color: #eeeeee;}

</style>
