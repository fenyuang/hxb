<template>
  <HeaderNav :classify = 0  :searchIcon = 0>
  <div class="CourseDetails">
    <ul>
      <li class="title">
        {{course.name}}
      </li>
      <li class="idnum">
        {{course.id}}
      </li>
      <li class="classification">
        <span class="classification_title">分类</span>
        <span class="classification_n1">{{course.category_name}}</span>
        <br style="clear: both">
      </li>
      <li class="classification">
        <span class="classification_title">课程价格</span>
        <span class="classification_n1">{{course.price}}</span>
        <br style="clear: both">
      </li>
      <li class="classification">
        <span class="classification_title">课程状态</span>
        <span class="classification_n1">{{course.status_value}}</span>
        <br style="clear: both">
      </li>
      <li class="classification cls">
        <span class="classification_title">班级</span>
        <input class="classification_btn" type="button" value="新增"/>
        <span class="classification_n1">班级（6）</span>
        <br style="clear: both">
      </li>
      <li class="classification_kongbaiBg"></li>
      <li class="classification">
      <span class="classification_title">课程大纲</span>
        <input class="classification_n1 classification_btn" @tap="getHrefedit" type="button" value="编辑"/>
        <input class="classification_n1 classification_btn" @tap="getHrefview"  style="margin-right: 0;" type="button" value="查看"/>
      <br style="clear: both">
    </li>

      <li class="classification_kongbaiBg"></li>

      <li class="classlist">
        <span class="classlist_list">班级列表</span>
        <span class="classlist_num">共{{classlist.length}}条记录</span>
        <br style="clear: both">
      </li>
      <div v-if="confrim === 0 ">
        <li class="classlist" v-for="list in classlist">
          <span class="classlist_list" style="color: #999999;">{{list.id}}</span>
          <span class="classlist_num" style="color: #000;">{{list.name}}</span>
          <br style="clear: both;">
        </li>
      </div>
      <div v-if="confrim === 1 ">
        <center>Now you don't </center>
      </div>
    </ul>

    <!--底部导航-->

    <ul class="bottom_nav">
        <li class="update float" @tap="lineNewCurr">
          <img src="../../../static/images/upadte.png"/>
        </li>
        <li class="offself float" v-if="course.status === 1 " >
          <img src="../../../static/images/OffSelf.png" @tap="gerStatus(2)" />
        </li>
        <li class="offself float" v-else>
          <img src="../../../static/images/sjia.png" @tap="gerStatus(1)" />
        </li>
        <li class="dele float">
          <img src="../../../static/images/dele.png" @tap="gerDelect" />
        </li>
    </ul>
  </div>
  </HeaderNav>
</template>
<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  export default {
    data () {
      return {
        addClass: 0,
        confrim: 0,
        course: [],
        classlist: []
      }
    },
    methods: {
      lineNewCurr () {
        this.$router.push({path: '/NewCurriculum', query: {id: this.course.id}})
      },
      getCourse () {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/course_info', {id: this.$route.query.id}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.course = res.data.data
            } else {
              confirm(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getClass () {
        axios.get('http://hxb.scpoo.com/hxb/index.php/index/Course/class_list?course_id=' + this.$route.query.id).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              if (res.data.data.length === 0) {
                this.confrim = 1
              } else {
                this.classlist = res.data.data
              }
            } else {
              confirm(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      gerStatus (a) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/course_opration', {type: a, id: this.$route.query.id}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              window.location.reload()
            } else {
              confirm(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      gerDelect () {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/course_delete', {id: this.$route.query.id}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              window.location.href = '#/CurriculumMarketing'
            } else {
              alert(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getHrefview () {
        window.location.href = '#/ViewOutline?id=' + this.$route.query.id
      },
      getHrefedit () {
        window.location.href = '#/ChapterManagement?id=' + this.$route.query.id
      }
    },
    mounted () {
      this.getCourse()
      this.getClass()
    },
    components: {
      HeaderNav
    }
  }
</script>
<style scoped lang="less">
.CourseDetails {
  font-size: 32px;
  overflow: auto;
  background-color: #fff;
  ul {
    margin-top: 20px;
    .title {
      margin-bottom: 20px;
      font-weight: 500;
      text-align: center;
    }
    .idnum {
      text-align: center;
      color: #999999;
      margin-bottom: 20px;
    }
    .classification {
      line-height: 130px;
      .classification_title {
        float: left;
        margin-left: 20px;
        color:#999999 ;
      }
      .classification_n1 {
        float: right;
        margin-right: 20px;
      }
      .classification_btn {
         background-color: #93c971;
        color: #fff;
        height: 64px;
        margin-top: 30px;
        margin-left: 20px;
      }
    }
    .cls {
      padding-bottom: 60px;
    }
    .classification_kongbaiBg {
      height: 40px;
      background-color: #eeeeee;
    }
    .classlist {
      line-height: 140px;
      border-bottom: 1px solid #eeeeee;
      .classlist_list {
        float: left;
        margin-left: 20px;
      }
      .classlist_num {
        float: right;
        color:#999999 ;
        margin-right: 20px;
      }
    }
  }
  .bottom_nav {
    width: 100%;
    line-height: 80px;
    background-color: #5681a2;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .float {
      float: left;
      vertical-align: middle;
      margin-top: 28px;
      img {
        width: 160px;
        height: 60px;
      }
    }
    .update {
         margin-left: 32px;
    }
    .offself {
      margin-left: 15%;
    }
    .dele {
      float: right;
      margin-right: 32px;
    }
  }
}
</style>
