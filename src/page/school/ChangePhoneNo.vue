<template>
  <div id="change_no">
	   <div class="header">
	   	  <h1><a href=""></a></h1>
	   </div>
	   <div class="content">
		    <div class="wrap">
		    	<div class="input_place"><input type="text" name="" placeholder="请输入当前绑定的手机号码"></div>
		   	    <div class="input_place"><input type="text" name="" placeholder="请输入右侧的验证码"><span class="span_one"></span></div>
		   	 <!--    <div class="input_place"><input type="text" name="" placeholder="请输入手机号码"><span class="span_two">获取验证码</span></div> -->
	       </div>

	       <div class="wrap wrap_two">
		    	<div class="input_place"><input type="text" name="" placeholder="请输入您要绑定的新手机号码"></div>
		   	    <div class="input_place"><input type="text" name="" placeholder="请输入手机验证码"><span class="span_two">获取验证码</span></div>
	       </div>
       </div>
       <div class="commit"><a href="">确定</a></div>
       <div class="dialog" style="display:none;">
         <span class="font_black">更换手机绑定成功，正在回到安全设置...</span>
         <span class="font_blue">返回安全设置&gt;&gt; </span>
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

#change_no .header{height: 3.406rem;width: 100%;margin: 0 auto;}
#change_no .header h1 a{
	display: block;
	background: url(../../../static/images/font_hxb.png) no-repeat;
    width: 2.859rem;
    height: 0.891rem;
    background-size: 2.859rem;
    margin-left: 1.203rem;}
#change_no .header h1{
	width: 4.062rem; 
	background: url(../../../static/images/head_logo.png) no-repeat;
	height: 0.969rem;
	background-size:0.969rem;
    line-height: 0.969rem;
    margin: 0 auto;
    margin-top: 1.297rem;
}
#change_no .content .wrap{margin: 0 0.625rem;margin-bottom: 0.625rem;}
#change_no .content .wrap .input_place{height: 1.406rem;border-bottom: 1px solid #eee!important;position: relative;}
#change_no .content .wrap .input_place input{ padding-left: 0.344rem;height: 98%;font-size: 0.469rem;}
#change_no .content .wrap .input_place span{width: 2.812rem;height:1.219rem;display: block;position: absolute;right: 0px;top:4px;font-size: 0.46875rem;}
#change_no .content .wrap .input_place .span_one{background-color: #d2d2d2;}
#change_no .content .wrap .input_place .span_two{background-color: #93c971;color: #fff;text-align: center;line-height: 1.219rem;}
#change_no .content .wrap_two{margin-bottom: 1.031rem;}
#change_no .commit{height: 1.594rem;background-color: #2c618b;margin: 0 0.625rem;text-align: center;line-height: 1.594rem; }

#change_no .commit a{color: #fff;font-size: 0.5rem;}

#change_no .dialog span{display: block;text-align: center;}
#change_no .dialog .font_black{font-size: 0.5rem;color: #333333;}
#change_no .dialog .font_blue{font-size: 0.5rem;color: #2c618b;}
#change_no .dialog{margin:0 0.625rem;position: absolute;top: 3.719rem;}
#change_no{position: relative;}


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
 /* font:12px/1.5 'Microsoft YaHei', Helvetica, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;*/
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

</style>
