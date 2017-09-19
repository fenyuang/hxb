<template>
  <HeaderNav :classify = 0   :searchIcon = 0 >
  <div class="grop">
    <div style="padding: 10px 10px;">
      <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
        <a class="mui-control-item mui-active" href="#item1" >
          课程管理
        </a>
        <a class="mui-control-item"  href="#item2">
          订单管理
        </a>
        <a class="mui-control-item"  href="#item3">
          营销中心
        </a>
      </div>
    </div>

    <div>
      <!--课程管理-->
      <div id="item1" class="mui-control-content mui-active">
        <ul class="select">
          <li class="search_select">
            <div  style="padding-right:15px;" @tap="togginput">课程名称</div>
            <span class="triangle laiyuan"></span>
          </li>
          <!--<li class="search_select" >
            <select name="search_select"  class="search_select_option">
              <option>课程分类</option>
              <option>线索1</option>
              <option>线索来源2</option>
            </select>
            <span class="triangle laiyuan"></span>
          </li>-->

          <li class="search_select" >
            <select name="kcstatus" class="search_select_option" @change="kcStatus">
              <option value="">课程状态</option>
              <option value="1">上架</option>
              <option value="2">下架</option>
            </select>
            <span class="triangle laiyuan"></span>
          </li>
          <br style="clear: both;">
        </ul>

        <div id="search_kcdiv" class="search_class" style="display:none;">
          <div class="kongbaiBg"></div>
          <input type="text" name="kc_name"  value="">
          <input type="button" class="clisub" @tap="searchkcGo" value="搜索">
          <br style="clear: both;"/>
        </div>
        <div  style="clear: both;" class="kongbaiBg"></div>


        <ul class="Info">
            <li class="Info_all" v-for="list in course">
              <ul class="Info_name">
                <li class="Info_name_NM">{{list.name}}</li>
                <li class="Info_name_sex">（{{list.id}}）</li>
              </ul>
              <ul class="Info_message">

                <li class="Info_message_num">
                  <span>分类</span> &nbsp; <span style="color: #000;">{{list.category_name}}</span>&nbsp;&nbsp;
                  <span>课程价格</span>  &nbsp;<span style="color: #000;">{{list.price}}元</span>&nbsp;&nbsp;
                  <span>状态</span> &nbsp; <span style="color: #000;">{{list.status_value}}</span>
                </li>

                <li class="link" @tap="lineCouponList(list.id)">
                  >
                </li>
                <li>
                  <input type="button" value="班级（6）" class="info_btn" />
                </li>
              </ul>
              <br style="clear: both;">
          </li>
        </ul>
      </div>

 <!--订单管理-->
      <div id="item2" class=" mui-control-content">
        <ul class="select">
          <li class="search_select" >
              <div id="inptext" style="padding-right:15px;" @tap="tigginput">订单编号</div>
              <span class="triangle laiyuan"></span>
          </li>
          <li class="search_select" >
            <select name="search_select"  class="search_select_option">
              <option>创建时间</option>
              <option>线索1</option>
              <option>线索来源2</option>
            </select>
            <span class="triangle laiyuan"></span>
          </li>

          <li class="search_select" >
            <select name="order_status" class="search_select_option" @change="orderStatus">
              <option value="">订单状态</option>
              <option value="0">已预订</option>
              <!-- <option value="10">已支付</option> -->
              <!-- <option value="20">已回访</option> -->
            </select>
            <span class="triangle laiyuan"></span>
          </li>

          <br style="clear: both;">
        </ul>
        <div id="search_div" class="search_class" style="display:none;">
          <div class="kongbaiBg"></div>
          <input type="text" name="order_sn"  value="">
          <input type="button" class="clisub" @tap="searchGo" value="搜索">
      </div>
        <div  style="clear: both;" class="kongbaiBg"></div>

        <ul class="Info">
          <li class="Info_all" v-for="list in info">
            <ul class="Info_name name">
              <li class="Info_name_NM">{{list.user_info.realname}}</li>
              <li class="Info_name_sex">{{list.user_info.tel}}</li>
            </ul>
            <ul class="Info_message reserve">
              <li class="Info_message_num " style="margin-top: 20px;margin-right: 28px;"  >
                <span>{{list.status==0?'已预定':list.status==10?'已支付':'已回访'}}</span>
              </li>
              <li class="Info_message_num " style="margin-top: 0;margin-right: 28px;">
                <span>{{list.addtime}}</span>
              </li>
              <li class="link" style="top: 25%;" @tap="lineListDeta(list.order_sn)">
                >
              </li>
            </ul>
            <br style="clear: both;">
          </li>
        </ul>
      </div>
<!--营销中心-->
      <div id="item3" class=" mui-control-content">

        <div class="kongbaiBg"></div>

        <ul style="background-color: #efeff4;">
          <li class="Coupon">
            <img src="../../../static/images/youhuijuan.png"/>
          </li>
          <li class="kongbaiBg"></li>
          <li class="Coupon">
            <img src="../../../static/images/youhuijuan.png"/>
          </li>
        </ul>

      </div>

    </div>


    <!--添加按钮-->
    <div class="add_btn" @tap="function () { addClass = 1 }">
      <img src="../../../static/images/add.png"  />
    </div>

    <div class="add_aleat" v-show="addClass === 1">
      <ul>
        <li class="add_aleat_close" @tap="function () {addClass = 0 }">X</li>
        <li class="add_aleat_add">
          <input type="button" value="分类管理"/>
        </li>
        <li class="add_aleat_add admin" @tap="lineChapterMan">
          <input type="button" value="章节管理 >"/>
        </li>
        <li class="add_aleat_add admin visit" @tap="lineNewCurriculum">
          <input type="button" value="新增课程"/>
        </li>
      </ul>
    </div>

    <!--回到顶部-->
    <div class="back_top" @tap="backTOP">
      <img src="../../../static/images/backTop.png"/>
    </div>
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
        addClass: 0,
        info: [],
        course: []
      }
    },
    methods: {
      backTOP () {
        $('.mui-scroll-wrapper').scrollTop(0)
      },
      lineCouponList (id) {
        this.$router.push({path: '/CourseDetails', query: {id: id}})
      },
      lineChapterMan () {
        this.$router.push('/ChapterManagement')
      },
      lineNewCurriculum () {
        this.$router.push('/NewCurriculum')
      },
      lineListDeta (order) {
        this.$router.push({path: '/ListDetails', query: {order_sn: order}})
      },
      /* 获取订单列表 */
      getOrderlist (condition) {
        axios.get('http://hxb.scpoo.com/hxb/index.php/index/Courseorder/getList?' + condition).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.info = res.data.data
            } else {
              confirm(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getCourse (wheredata) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/course_list', wheredata).then((res) => {
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
      /* 线索来源搜索（最新线索） */
      orderStatus () {
        var status = $('select[name="order_status"]').val()
        this.condition = '&status=' + status
        this.getOrderlist(this.condition)
      },
      kcStatus () {
        var kcstatus = $('select[name="kcstatus"]').val()
        this.kcstatus = {status: kcstatus}
        this.getCourse(this.kcstatus)
      },
      togginput () {
        $('#search_kcdiv').toggle()
      },
      /* 显示出文本输入框 */
      tigginput () {
        $('#search_div').toggle()
      },
      /* 点击搜索 */
      searchGo () {
        var ordersn = $('input[name="order_sn"]').val()
        this.condition = '&order_sn=' + ordersn
        this.getOrderlist(this.condition)
      },
      searchkcGo () {
        var kcname = $('input[name="kc_name"]').val()
        this.kc_name = {name: kcname}
        this.getCourse(this.kc_name)
      }
    },
    mounted () {
      /* 订单列表 */
      this.condition = ''
      this.getOrderlist(this.condition)
      this.wheredata = {}
      this.getCourse(this.wheredata)
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
  .search_class {
    height: 50px;
    input {
      float: left;
      width: 80%;
      display: inline-block;
      margin-bottom: 0px;
    }
    .clisub {
      width: 18%;
      height:80px;
      margin-left: 2%;
      float: left;
      background-color:#2c618b;
      color: #fff;
    }
  }
  .grop {
    background-color: #fff;
    .add_btn {
      position: fixed;
      right: 2%;
      bottom: 13%;
      z-index: 12;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .back_top {
      position: fixed;
      right: 2%;
      bottom: 4%;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left: 0;
      bottom: 0;
      right:0;
      z-index: 12;
      background-color: rgba(0, 0, 0, 0.5);
      .dele {
        position: absolute;
        font-size: 34px;
        width: 85%;
        top: 20%;
        left: 7%;
        padding-bottom:40px;
        background-color: #93c971;
        color: #fff;
        .add_aleat_close {
          position: absolute;
          right: 5px;
          top:5px;
          font-size: 40px;
          z-index: 12;
        }
        .msg {
          text-align: center;
          line-height: 50px;
          margin-left: 30px;
          margin-top: 50px;
        }
        .dele_btn {
          margin-left: 50px;
          margin-top: 50px;
          input {
            color: #fff;
            background-color: #93c971;
            width: 120px;
            height: 60px;
            border-color:#fff;
            margin-left: 100px;
          }
        }
      }
    }

    .add_aleat {
      width: 400px;
      height: 330px;
      position: fixed;
      left: 21%;
      bottom:13%;
      z-index: 10px;
      overflow: hidden;
      background-color: #93c971;
      color: white;
      .add_aleat_close {
        position: absolute;
        right: 5px;
        top:5px;
        font-size: 40px;
      }
      .add_aleat_add {
        input {
          color: #fff;
          background-color: #93c971;
          width: 324px;
          height: 60px;
          border-color:#fff;
        }
        margin-left: 30px;
        margin-top: 50px;
      }
      .admin {
        margin-top: 30px;
      }
    }
  }
  .mui-control-content{
    font-size: 34px;
    .select {
      .search_select {
        font-size: 34px;
        text-align: center;
        float: left;
        position: relative;
        width: 33%;
        line-height: 80px;
        .search_select_option {
          font-size: 34px;
        }
        .triangle {
          width: 0;
          height:0;
          position: absolute;
          top: 38%;
          left: 80%;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 20px solid #999999;
        }
        .laiyuan {
          top:32%;
          left: 75%;
        }
      }
      .search_input {
        width: 70%;
        height: 80px;
        margin-top: 15px;
        margin-left: 10%;
        background-color: rgba(46,46,46,0.22);
      }
      .search_button {
        margin-top: 15px;
        width: 15%;
        height: 80px;
        background-color: #93c971;
        color: #fff;
      }
    }
    .kongbaiBg {
      width: 100%;
      height: 22px;
      background-color: #eeeeee;
    }
    .Info {
      .Info_all {
        width: 100%;
        height: 180px;
        border-bottom: 1px solid #eeeeee;
        .Info_name {
          float: left;
          width: 22%;
          border-right:1px solid #eeeeee ;
          text-align: center;
          vertical-align: middle;
          overflow: hidden;
          .Info_name_NM {
            margin-top: 16%;
          }
          .Info_name_sex {
            color: #999999;
            font-size: 26px;
          }
        }
        .name {
          border: 0;
          width: 35%;
          text-align: left;
          margin-left: 30px;
          .Info_name_NM {
            margin-top: 18%;
          }
        }
        .Info_message {
          color: #999999;
          font-size: 26px;
          float: left;
          width: 74%;
          margin-left: 4%;
          overflow: hidden;
          line-height: 54px;
          position: relative;
          .Info_message_num {
            margin-top: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
          .link {
            position: absolute;
            right: 10px;
            top: 35%;
            font-size: 60px;
            font-weight: bold;
          }
          .info_btn {
            width:30%;
            margin-top:20px;
            border-color: #2c618b;
            color: #2c618b;
          }
        }
        .reserve {
          width: 45%;
          text-align: right;
          float: right;
          display: block;
        }
      }
    }
    .Coupon {
      width: 9rem;
      height: 200px;
      margin: 0 auto;
      img {
        width: 9rem;
        height: 200px;
      }
    }
  }
</style>
