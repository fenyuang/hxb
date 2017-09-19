<template>
  <HeaderNav :classify  = 0  :searchIcon = 0 >
  <div class="ViewOutline">
    <h4>查看课程大纲</h4>
    <ul class="ViewOutline_list" v-if="viewlist">

      <li class="margin"  v-for="(list, index) in viewlist">
        <div class="unitImg">
          <img :src="`../../../static/images/unit${index-1}.png`"/>
        </div>
        <ul class="text">
          <li class="text_title"> {{list.name}} </li>
          <ul class="hidden" style="display: none;">
            <li v-for="listxia in list.section" ><span class="critrl"></span>&nbsp;&nbsp;{{listxia.name}}</li>
          </ul>
         </ul>
        <div class="shrink" @tap="open($event.target)">
          <img src="../../../static/images/shrink.png"/>
        </div>
        <br style="clear: both"/>
      </li>

    </ul>
    <center v-else="">Not Word </center>
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
        viewlist: []
      }
    },
    methods: {
      open (target) {
        if ($(target).parents('.shrink').attr('class') === 'shrink') {
          if ($(target).parents('.shrink').siblings('.text').children('.hidden').is(':visible')) {
            $(target).attr('src', '../../../static/images/shrink.png')
            $(target).parents('.shrink').siblings('.text').children('.hidden').hide()
          } else {
            $(target).attr('src', '../../../static/images/open.png')
            $(target).parents('.shrink').siblings('.text').children('.hidden').show()
          }
        } else {
          if ($(target).siblings('.text').children('.hidden').is(':visible')) {
            $(target).children('img').attr('src', '../../../static/images/shrink.png')
            $(target).siblings('.text').children('.hidden').hide()
          } else {
            $(target).children('img').attr('src', '../../../static/images/open.png')
            $(target).siblings('.text').children('.hidden').show()
          }
        }
      },
      getViewlist () {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/course_outline', {course_id: this.$route.query.id}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.viewlist = res.data.data
            } else {
              alert(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.getViewlist()
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
  .ViewOutline {
    font-size: 32px;
    h4 {
      text-align: center;
      font-weight: 400;
      padding-top: 26px;
      padding-bottom: 26px;
    }
    .ViewOutline_list {
      .margin {
        background-color: #fff;
        padding-top: 54px;
        margin-bottom: 32px;
        width: 100%;
        line-height: 60px;
        position: relative;
        .unitImg {
          float: left;
          img {
            width: 108px;
            height: 108px;
          }
        }
        .text {
          float: left;
          margin-top: 24px;
          margin-left: 12px;
          width: 80%;
          li {
            white-space: nowrap;
            color: #666666;
            .critrl {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 10px;
              margin-bottom: 8px;
              background-color: #93c971;
            }
          }
          .text_title {
            color: #000;
            font-weight: 600;
          }

        }
        .shrink {
          position: absolute;
          top: 82px;
          right: 6%;
        }
      }
    }
  }
</style>
