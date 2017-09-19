<template>
  <HeaderNav :classify = 0  :searchIcon = 0>
  <div class="CourseDetails">
    <ul class="ul">
      <li class="title">
        {{useInfo.realname}}
      </li>
      <li class="idnum">
       {{useInfo.tel}}
      </li>
      <li class="classification">
        <span class="classification_title">订单标号</span>
        <span class="classification_n1">{{info['order_sn']}}</span>
        <br style="clear: both">
      </li>
      <li class="classification">
        <span class="classification_title">课程名称</span>
        <span class="classification_n1" style="max-width: 50%;">{{info['course_name']}}</span>
        <br style="clear: both">
      </li>
      <li class="classification" style="border-bottom: 1px solid #eeeeee;">
        <span class="classification_title">班级名称</span>
        <span class="classification_n1">{{info['class_name']}}</span>
        <br style="clear: both">
      </li>
      <li class="classification">
        <span class="classification_title">应付金额（元）</span>
        <span class="classification_n1">{{info['meet_price']}}</span>
        <br style="clear: both">
      </li>
      <li class="classification">
        <span class="classification_title">优惠金额（元）</span>
        <span class="classification_n1">{{info['discount_price']}}</span>
        <br style="clear: both">
      </li>
      <li class="classification">
        <span class="classification_title">实际金额（元）</span>
        <span class="classification_n1">{{info['paid_price']}}</span>
        <br style="clear: both">
      </li>
    </ul>
    <!-- <li class="discount">
      <img src="../../../static/images/Discount.png"/>
      <ul>
        <li>6.5折折扣：保价90天，买贵翻盘赔/ </li>
        <li>3月23日 23:59 结束 </li>
        <li> 赠送：课程配套教材2本《走遍西班牙1~2》</li>
        <li>优惠券:￥50</li>
      </ul>
    </li> -->
    <li class="classification" style="margin-top: 38px;line-height: 40px;padding-bottom: 10px;">
      <span class="classification_title">{{info['addtime']}}</span>
        <input class="classification_yiy" type="button" :value="info['status_name']"  style=" display: inline-block;float: right;margin-right: 20px; width: 120px;border: 1px solid #2c618b;color: #2c618b;border-radius: 20px;"/>
      <br style="clear: both">
    </li>

  </div>
  </HeaderNav>
</template>

<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  export default {
    data () {
      return {
        info: {},
        useInfo: {}
      }
    },
    mounted () {
      /* 订单详情 */
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Courseorder/getInfo', {order_sn: this.$route.query.order_sn}).then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.info = res.data.data
            this.useInfo = res.data.data.user_info
          } else {
            confirm(res.data.msg)
          }
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
.CourseDetails {
  font-size: 32px;
  background-color: #fff;
  overflow: hidden;
  .ul {
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
       height: 130px;
      padding-top: 35px;
      .classification_title {
        float: left;
        margin-left: 20px;
        color:#999999 ;
      }
      .classification_n1 {
        float: right;
        margin-right: 20px;
        white-space: pre-wrap;
      }
      .classification_yiy {
        display: inline-block;
        float: right;
        margin-right: 20px;
        border: 1px solid #2c618b;
        color: #2c618b;
        border-radius: 5px;
      }
      .classification_btn {
        background-color: #93c971;
        color: #fff;
        height: 64px;
        margin-top: 30px;
        margin-left: 20px;
      }
    }

  }

  .discount {
    width: 9rem;
    margin: 0 auto;
    margin-top: 70px;
    ul {
      margin-left: 100px;
      font-size: 28px;
    }
  }
}
</style>
