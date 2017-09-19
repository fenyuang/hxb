<template>
  <div class="NewUnit">
    <div class="add_clue_btn">
      <input type="button" value="新增课程"/>
    </div>

    <form name="newCurr">
      <div class="add_clue_form">
        <div class="form_name">
         <input  type="text" placeholder="课程名称"/>
        </div>
        <div class="form_name">
          <select name="occupation">
            <option value="laye">课程分类</option>
            <option value="docu">课程分类</option>
            <option value="police">课程分类</option>
            <option value="sale">课程分类</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <input name="clueDetails" type="text" placeholder="课程价格（若免费，请写0）"/>
        </div>
        <div class="form_name">
          <input  name="clueDetails" type="text" placeholder="学习课时" />节
        </div>
        <div class="form_name">
          <select id="week" name="occupation">
            <option value="laye">学习周期</option>
            <option value="docu">4周</option>
            <option value="police">4周</option>
            <option value="sale">4周</option>
          </select>
          <span class="triangle"></span>
        </div>
      </div>

      <textarea class="characteristic" placeholder="课程特色（请填写50字内课程特色，吸引更多学生）"></textarea>

      <div class="form_name serve">
        <input name="clueDetails" type="text" placeholder="特色服务（可写多项）"/>
      </div>

      <div class="main_figure">
          <h5>课程主图</h5>
          <div class="add-main-img">
          	<img src="../../../static/images/addPic.png"/>
          	<input type="file" class="main-course-img" @change="onFileChange" />
          </div>
      </div>

      <div class="main_figure">
        <h5>课程图文介绍</h5>
        <img src="../../../static/images/tupian.png" />
        <span class="dele">
           <img src="../../../static/images/deletege.png" />
        </span>
        <img src="../../../static/images/addPic.png"/>
      </div>

      <div class="add_clue_sub">
        <input type="submit" value="提交" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
  methods: {
    onFileChange (e) {
      let files = e.target.files
      if (!files.length) {
        return
      } else {
        this.createImage(files)
        console.log(files)
      }
    },
    createImage (fileData) {
      let pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/
      let data = new FormData()
      $.each(fileData, (i, file) => {
        data.append('file', file)
      })
      if (!pattern.test(fileData[0].name)) {
        console.log(111)
      } else {
        axios.post('http://test.scpoo.com/myTools/public/index.php/base/upload', {
          data: data
        })
          .then(msg => {
            console.log(msg)
          })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .NewUnit {
    font-size: 32px;
    .add_clue_btn{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      input {
        width: 176px;
        font-size: 32px;
        color: #2c618b;
        text-align: center;
        vertical-align: middle;
        border-color: #2c618b;
        background-color: #eeeeee;
      }
    }
    .add_clue_form {
      font-size: 32px;
      color: #999999;
      width: 9rem;
      margin: 0 auto;
      background-color: #fff;
      overflow: hidden;
      .form_name {
        line-height: 110px;
        border-bottom: 1px solid #eeeeee;
        margin-top: 22px;
        position: relative;
        .triangle {
          width: 0;
          height:0;
          position: absolute;
          top: 30%;
          right: 12%;
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-top: 32px solid #999999;
        }
        input, select {
          width: 86%;
          border: 0;
        }
      }
    }
    .add_clue_sub {
      width: 9rem;
      margin: 0 auto;
      margin-top: 40px;
      input {
        font-size: 32px;
        width: 9rem;
        height: 120px;
        background-color: #2c618b;
        color:#fff;
      }
    }

    .characteristic {
      margin-top: 36px;
      width: 9rem;
      height: 200px;
      margin-left: 0.5rem;
    }
    .serve {
      width: 9rem;
      margin-top: 36px;
      margin-left: 0.5rem;
      input {
        display: inline-block;
        height: 120px;
      }
    }
    .main_figure {
      position: relative;
      margin-left: 0.5rem;
      h5 {
        font-size: 32px;
        line-height: 90px;
      }
      .add-main-img {
      	position: relative;
      	margin-right: 30px;
      	width: 160px;
      	height: 120px;
      	display: inline-block;
      	img {
	        width: 160px;
	        height: 120px;
	      }
	      .main-course-img {
	      	position: absolute;
	        width: 160px;
	        height: 120px;
	        top: 0;
	        left: 0;
	        opacity: 0;
	        z-index: 99;
	      }
      }
      .dele {
        position: absolute;
        top:75%;
        left: 0;
        width: 160px;
        height: 46px;
        background-color: rgba(0,0,0,0.5);
        img {
          float: right;
          width: 30px;
          height: 30px;
          margin-top: 7px;
          margin-right: 5px;
        }
      }
    }
  }
</style>
