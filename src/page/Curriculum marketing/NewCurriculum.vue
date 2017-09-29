<template>
  <HeaderNav :classify=0  :searchIcon = 0>
  <div class="NewUnit">
    <div class="add_clue_btn">
      <input type="button" :value="title"/>
    </div>

    <form name="newCurr">
      <div class="add_clue_form">
        <div class="form_name">
         <input name="name" type="text" placeholder="课程名称" v-model="info.name"/>
        </div>
        <div class="form_name">
          <select name="parent_category" :value = "parent_category" @change="chose_category">
            <option value="">请选择</option>
            <option :value="parent_list['id']" v-for="parent_list in parent_category_ist">{{parent_list['name']}}</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <select name="category" v-model="category"> <!--:value = "category"-->
            <option value="">请选择</option>
            <option :value="list['id']" v-for="list in category_ist">{{list['name']}}</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <input name="price" type="text" v-model="info['price']" placeholder="课程价格（若免费，请写0）"/>
        </div>
        <div class="form_name">
          <input name="class_hour" type="text" v-model="info['class_hour']" placeholder="学习课时" />节
        </div>
        <div class="form_name">
          <input name="cycle_value" type="text" v-model="info['cycle_value']" placeholder="学习周期" style="width:46%;" />
          <select name="cycle_unit" style="width:46%;" :value = "cycle_unit" >
            <option value="日">日</option>
            <option value="周">周</option>
            <option value="月">月</option>
            <option value="年">年</option>
          </select>
          <span class="triangle"></span>
        </div>
      </div>

      <textarea class="characteristic" name="detail" v-model="info['feature']" placeholder="课程特色（请填写50字内课程特色，吸引更多学生）"></textarea>

      <div class="form_name serve">
        <input name="feature" class="ser" type="text" v-model="info['feature_service']" placeholder="特色服务（可写多项）"/>
        <input type="button" class="add" value="添加一项" @tap="addServer"/>
      </div>
      <div class="form_name serve" style="margin-top: 0;">
        <input type="button" :value="list"  v-for="(list, index) in features" style="background-color: #2c618b;color: #fff;" @tap="deleServers(index)"/>
      </div>
      <div class="main_figure ">
          <h5 >课程主图</h5>

        <div style="width: 78px;height: 60px;position: relative;display: inline-block;margin-right: 10px;" v-for="(list, index) in MainImg">
          <img :src = 'list.path' style="width: 78px;height: 60px;" />
          <span style=" position: absolute;left: 0;bottom:0; width: 78px;height: 26px;background-color: rgba(0,0,0,0.5);">
              <img src="../../../static/images/deletege.png" style=" width: 18px;height: 24px;float: right" @click.self='removePic($event.target, index)'/>
           </span>
        </div>

        <div class="mainPic">
          <img  src="../../../static/images/addPic.png"/>
          <input type="file" @change.stop="fil" name="pic" accept="image/*" style="position: absolute;top:15px;left: 1px;opacity: 0;z-index: 5;width: 1.8rem;" multiple="multiple"/>
        </div>
      </div>

      <div class="main_figure">
        <h5>课程图文介绍</h5>

        <div style="width: 78px;height: 60px;position: relative;display: inline-block;margin-right: 10px;" v-for="(list, index) in TextImg">
          <img :src = 'list.path' style="width: 78px;height: 60px;" />
          <span style=" position: absolute;left: 0;bottom:0; width: 78px;height: 26px;background-color: rgba(0,0,0,0.5);">
              <img src="../../../static/images/deletege.png" style=" width: 18px;height: 24px;float: right" @click.self='removePic($event.target, index)'/>
           </span>
        </div>

        <div class="mainPic TextImg">
          <img  src="../../../static/images/addPic.png"/>
          <input type="file" @change.stop="fil" name="pic" accept="image/*" style="position: absolute;top:15px;left: 1px;opacity: 0;z-index: 5;width: 1.8rem;"   multiple="multiple" />
        </div>
      </div>

      <div class="add_clue_sub">
        <input type="button" @tap="course_save" value="提交" />
      </div>
    </form>
  </div>
  </HeaderNav>
</template>

<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    data () {
      return {
        id: this.$route.query.id,
        info: {},
        parent_category_ist: [],
        category_ist: [],
        condition: {},
        url: '',
        cycle_unit: '日',
        parent_category: '',
        category: '',
        title: '新增课程',
        features: [],
        MainImg: [],
        MainHttp: [],
        TextImg: [],
        TextHttp: []
      }
    },
    methods: {
      addServer () {
        let featu = $('input[name="feature"]').val()
        if (featu) {
          this.features.push(featu)
          this.info.feature = ''
        }
      },
      deleServers (index) {
        this.features.splice(index, 1)
      },
      fil (ev) {
        if (ev.target.files.length !== 0) {
          let file = ev.target.files
          for (let i = 0; i < file.length; i++) {
            let type = file[i].type.split('/')[0]
            if (type !== 'image') {
              alert('请上传图片')
              break
            }
            var size = Math.round(file[i].size / 1024 / 1024)
            if (size > 3) {
              alert('图片大小不得超过3M')
              break
            }
            let reader = new FileReader()
            reader.readAsDataURL(file[i])
            let self = this
            reader.onloadend = function (e) {
              let dataUrl = reader.result
              let obj = {path: dataUrl}
              let images = []
              images.push(dataUrl)
//              判断是课程主图还是课程图文介绍
              if ($(ev.target).parents('.mainPic').attr('class').indexOf('TextImg') === -1) {
                axios.post('http://hxb.scpoo.com/hxb/index.php/index/common/upload_image', {image: images}).then((res) => {
                  if (res.status === 200) {
                    if (res.data.ret === 100) {
                      let urlString = res.data.data.join()
                      self.MainHttp.push(urlString)
                    } else {
                      confirm(res.data.msg)
                    }
                  }
                }).catch((err) => {
                  console.log(err)
                  return false
                })
                self.MainImg.push(obj)
              } else {
                axios.post('http://hxb.scpoo.com/hxb/index.php/index/common/upload_image', {image: images}).then((res) => {
                  if (res.status === 200) {
                    if (res.data.ret === 100) {
                      let urlString = res.data.data.join()
                      self.TextHttp.push(urlString)
                    } else {
                      confirm(res.data.msg)
                    }
                  }
                }).catch((err) => {
                  console.log(err)
                  return false
                })
                self.TextImg.push(obj)
              }
            }
          }
        } else {
          return
        }
      },
      removePic (target, index) {
        if ($(target).parents('.main_figure').children('.mainPic').attr('class').indexOf('TextImg') === -1) {
          this.MainImg.splice(index, 1)
          this.MainHttp.splice(index, 1)
          return false
        } else {
          this.TextImg.splice(index, 1)
          this.TextHttp.splice(index, 1)
          return false
        }
      },
      /* 课程信息保存 */
      course_save () {
        var name = $('input[name="name"]').val()
        var parentCategory = $('select[name="parent_category"]').val()
        var category = $('select[name="category"]').val()
        var price = $('input[name="price"]').val()
        var classHour = $('input[name="class_hour"]').val()
        var cycleValue = $('input[name="cycle_value"]').val()
        var cycleUnit = $('select[name="cycle_unit"]').val()
        var feature = $('textarea[name="detail"]').val()
        if (this.id) {
          this.condition = {id: this.id, name: name, parent_category: parentCategory, category: category, price: price, class_hour: classHour, cycle_value: cycleValue, cycle_unit: cycleUnit, feature: feature, feature_service: this.features, image: this.MainHttp, detail: this.TextHttp}
          this.url = 'http://hxb.scpoo.com/hxb/index.php/index/course/course_update'
        } else {
          this.condition = {name: name, parent_category: parentCategory, category: category, price: price, class_hour: classHour, cycle_value: cycleValue, cycle_unit: cycleUnit, feature: feature, feature_service: this.features, image: this.MainHttp, detail: this.TextHttp}
          this.url = 'http://hxb.scpoo.com/hxb/index.php/index/course/course_add'
        }
        axios.post(this.url, this.condition).then((res) => {
          if (res.status === 200) {
            confirm(res.data.msg)
            if (res.data.ret === 100) {
              this.$router.push('/CurriculumMarketing')
              return false
            }
          }
        }).catch((err) => {
          console.log(err)
          return false
        })
      },
      /* 获取二级分类列表ajax */
      ajax_category_list (pid) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/parent_category_common_list', {pid: pid}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.category_ist = res.data.data
            } else {
              alert(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /* 切换一级分类获取二级分类 */
      chose_category () {
        this.parent_category = $('select[name="parent_category"]').val()
        if (this.parent_category) {
          /* 课程分类二级列表 */
          this.ajax_category_list(this.parent_category)
        } else {
          this.category_ist = ''
        }
      }
    },
    components: {
      HeaderNav
    },
    mounted () {
      if (this.id) {
        this.title = '修改课程'
        /* 课程详情 */
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/course_info', {id: this.id}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.info = res.data.data
              this.cycle_unit = this.info.cycle_unit
              this.category = this.info.category
              this.features = this.info.feature_service
              this.MainImg = this.info.image
              this.TextImg = this.info.detail
              this.parent_category = this.info.parent_category
              if (this.parent_category) {
                /* 课程分类二级列表 */
                this.ajax_category_list(this.parent_category)
              }
            } else {
              alert(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      /* 课程分类一级列表 */
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Course/category_list').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.parent_category_ist = res.data.data
          } else {
            alert(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
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
        text-align: center;
        vertical-align: middle;
        border-color: #2c618b;
        color:#2c618b;
        background-color: #eeeeee;
      }
    }
    .add_clue_form {
      font-size: 32px;
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
      .ser {
        width: 76%;
        display: inline-block;
        height: 120px;
      }
      .add {
        width: 20%;
        height: 120px;
        background-color: #2c618b;
        color: #fff;
      }
    }
    .main_figure {
      position: relative;
      margin-left: 0.5rem;
      h5 {
        font-size: 32px;
        line-height: 90px;
      }
      .mainPic {
        position: relative;
        display: inline-block;
        width: 140px;
        img {
          margin-right: 30px;
          width: 140px;
          height: 120px;
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
