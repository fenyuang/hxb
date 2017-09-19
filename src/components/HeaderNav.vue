<template>
  <div id="offCanvasWrapper" class="mui-off-canvas-wrap mui-draggable">
    <!--侧滑菜单部分-->
    <aside id="offCanvasSide" class="mui-off-canvas-left">
      <div id="offCanvasSideScroll" class="mui-scroll-wrapper">
        <div class="mui-scroll">

          <!--未登录状态-->
         <div v-if="login">
           <div class="login_header_img">
             <img src="../../static/images/head.png"/>
             <p class="login_regist">登录/注册</p>
           </div>
           <ul>
             <li class="curriculum_marketing">
               <a class="curriculum_marketing_text">课程营销</a>
             </li>
             <li class="curriculum_marketing">
               <a class="curriculum_marketing_text">学校控制台</a>
             </li>
           </ul>
         </div>

          <!--已登录状态-->
          <div>
            <div class="login_header_img">
              <img src="../../static/images/head.png"/>
              <p class="login_regist">学校名称</p>
            </div>

            <ul>
              <li class="curriculum_marketing" @tap="index">
                <a class="curriculum_marketing_text">首页</a>
              </li>
              <li class="curriculum_marketing">
                <a class="curriculum_marketing_text">学校控制台</a>
              </li>
              <li class="curriculum_marketing">
                <a class="curriculum_marketing_text">市场推广</a>
              </li>
              <li class="curriculum_marketing" @tap="Conversion">
                <a class="curriculum_marketing_text">跟单转化</a>
              </li>
              <li class="curriculum_marketing" @tap="curric">
                <a class="curriculum_marketing_text">课程营销</a>
              </li>
              <li class="curriculum_marketing">
                <a class="curriculum_marketing_text">推广员</a>
              </li>
              <li class="curriculum_marketing" @tap="lineStu">
                <a class="curriculum_marketing_text">学生档案</a>
              </li>
              <li class="curriculum_marketing" @tap="lineSchInfo">
                <a class="curriculum_marketing_text">学校设置</a>
              </li>
              <li class="curriculum_marketing sign_out">
                <a class="curriculum_marketing_text">退出登录</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
    <!--主界面部分-->
    <div class="mui-inner-wrap">
      <header class="mui-bar mui-bar-nav" >
        <a href="#offCanvasSide" class="mui-icon mui-action-menu mui-icon-bars mui-pull-left"></a>
        <a class="nav_logo"></a>
        <a class="mui-pull-right" v-if="searchIcon === 1" @tap="search"><img class="login_img" src="../../static/images/headLoge1(3).png"/> </a>
        <a class="mui-pull-right"  v-if="classify === 1"  @tap="clsfy"><img class="login_img" src="../../static/images/headLogo1(1).png"/> </a>
      </header>
      <div id="offCanvasContentScroll " class="mui-content mui-scroll-wrapper" style="overflow: auto;">

        <slot></slot>

      </div>
      <div class="mui-off-canvas-backdrop"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        login: false
      }
    },
    props: {
      searchIcon: {
        type: Number,
        require: true
      },
      classify: {
        type: Number,
        require: true
      }
    },
    methods: {
      search () {
        this.$router.push('/Search')
      },
      clsfy () {
        this.$router.push('/Classify')
      },
      index () {
        this.$router.push('/Index')
      },
      curric () {
        this.$router.push('/CurriculumMarketing')
      },
      Conversion () {
        this.$router.push('/Conversion')
      },
      lineStu () {
        this.$router.push('/Student')
      },
      lineSchInfo () {
        this.$router.push('/SchInfo')
      }
    }
  }
</script>

<style scoped lang="less">
  .mui-off-canvas-left {
    background-color: #2e2e2e;
    .mui-scroll {
      height: 100%;
      .login_header_img{
        overflow: hidden;
        margin-left: 70px;
        margin-top: 40px;
        line-height: 80px;
        img {
          width: 80px;
          height:80px;
          margin-top:40px;
        }
        .login_regist {
          color: #dedede;
          display: inline-block;
          line-height: 80px;
          margin-left: 10px;
          vertical-align: middle;
          margin-top:-34px;
          font-size: 36px;
        }
      }
      .curriculum_marketing {
        width: 100%;
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        border-bottom:1px solid #3e3e3e;
        .curriculum_marketing_text {
          color: #dedede;
        }
      }
      .sign_out {
        border-top:1px solid #3e3e3e;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

.mui-inner-wrap  {
  .mui-bar-nav{
    height: 100px;
    background-color: #2c618b;
    .mui-pull-left{
      color: #fff;
      font-size: 50px;
      line-height: 100px;
      padding-top: 0;
    }
    .nav_logo {
      height: 100px;
      width: 200px;
      display: inline-block;
      margin-left: 30%;
      background:url("../../static/images/headLogo1 (2).png") no-repeat 0 26px;
      background-size:200px 50px ;
    }
    .mui-pull-right {
     margin-top:26px;
      margin-left: 20px;
      .login_img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .mui-content {
    padding-top: 100px;
  }
}

</style>
