<template>
  <HeaderNav :classify = 0   :searchIcon = 0>
  <div class="grop">
    <div style="padding: 10px 10px;">
      <div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
          <a class="mui-control-item mui-active" href="#item1" >
            最新线索
          </a>
          <a class="mui-control-item"  id="trigger" href="#item2">
            线索管理
          </a>
      </div>
    </div>

    <div>
      <div id="item1" class="mui-control-content mui-active">
          <ul class="select">
            <li class="search_select" @tap="function () {searchInfo = 1}">姓名 <span class="triangle"></span></li>
            <li class="search_select" >
              <select name="item1_type"  class="search_select_option" @change="search_type1">
			    <option value="">线索来源</option>
                <option value="1">报名线索</option>
                <option value="2">订单线索</option>
                <option value="3">新增线索</option>
              </select>
              <span class="triangle laiyuan"></span>
            </li>

            <li class="search_select" >
              <select name="item1_grade" class="search_select_option" @change="search_grade1">
                <option value="">线索等级</option>
                <option v-for="grade in clue_grade" :value="grade.id">{{grade.name}}</option>
              </select>
              <span class="triangle laiyuan"></span>
            </li>
            <li v-if="searchInfo === 1">
              <input type="text" name="item1_name" class="search_input" placeholder="请输入姓名"/>
              <input type="button" class="search_button" value="确定" @click="search_name1"/>
            </li>
            <br style="clear: both;">
          </ul>
        <div class="kongbaiBg"></div>

        <ul class="Info" @tap.stop = "function () {searchInfo = 0}">
          <li class="Info_all" v-for="list in info">
            <ul class="Info_name">
              <li class="Info_name_NM">{{list.name}}</li>
              <li class="Info_name_sex">（{{list.sex_value}}）</li>
            </ul>
            <ul class="Info_message">
              <li class="Info_message_num">
                <span>{{list.phone}}</span>&nbsp;&nbsp;
                <span>{{list.type_value}}</span>&nbsp;&nbsp;
                <span>{{list.create_time}}</span>
              </li>
              <li>
                 {{list.info}}
              </li>
              <li>
                <input type="button" value="回访" class="info_btn"  @tap="Linevisit(list.id)"/>
                <input type="button" value="编辑"  class="info_btn" @tap="lineEdito(list.id)"/>
                <input type="button" value="报名"  class="info_btn" @tap="signUp(list.id)" />
                <input type="button" value="作废"  class="info_btn"style="background-color: #999999;" @tap="showMask(list.id)"/>
              </li>
            </ul>
            <br style="clear: both;">
          </li>
        </ul>
      </div>

      <div id="item2" class=" mui-control-content">
        <ul class="select">
          <li class="search_select" @tap.prevent="function () {searchInfo = 2}">姓名 <span class="triangle"></span></li>
          <li class="search_select" >
            <select name="item2_type"  class="search_select_option" @change="search_type2" @tap="function () {searchInfo = 0}">
              <option value="">线索来源</option>
              <option value="1">报名线索</option>
              <option value="2">订单线索</option>
              <option value="3">新增线索</option>
            </select>
            <span class="triangle laiyuan"></span>
          </li>

          <li class="search_select" >
            <select name="item2_grade" class="search_select_option" @change="search_grade2" @tap="function () {searchInfo = 0}">
			  <option value="">线索等级</option>
              <option v-for="grade in clue_grade" :value="grade.id">{{grade.name}}</option>
            </select>
            <span class="triangle laiyuan"></span>
          </li>
          <li v-if="searchInfo === 2">
            <input type="text" name="item2_name" class="search_input" placeholder="请输入姓名"/>
            <input type="button" class="search_button" value="确定" @tap="search_name2"/>
          </li>
          <br style="clear: both;">
        </ul>
        <div class="kongbaiBg"></div>

        <ul class="Info" @tap.stop = "function () {searchInfo = 0}">
          <li class="Info_all" v-for="list in visit">
            <ul class="Info_name">
              <li class="Info_name_NM">{{list.name}}</li>
              <li class="Info_name_sex">（{{list.sex_value}}）</li>
            </ul>
            <ul class="Info_message">
              <li class="Info_message_num">
                <span>{{list.phone}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{list.type_value}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{list.create_time}}</span>
              </li>
              <li>
                {{list.info}}
              </li>
              <li>
                <input type="button" value="回访" class="info_btn"  @tap="LinevisitAdmin(list.id)"/>
                <input type="button" value="编辑"  class="info_btn" @tap="lineEditoVisit(list.id)"/>
              </li>
            </ul>
            <br style="clear: both;">
          </li>
        </ul>
      </div>

    </div>

    <div class="mask" v-show="message === 1">
      <div class="dele" >
        <ul>
          <li class="add_aleat_close" @tap="function () {message = 0 }">X</li>
          <li class="msg">
            您将报废此条线索，作废后无法恢复，
            是否确认作废？
          </li>
          <li class="dele_btn">
            <input type="button" value="确认" @tap="dele"/>
            <input type="button" value="取消" @tap="function () { message = 0}"/>
          </li>
        </ul>
      </div>
    </div>


    <!--添加按钮-->
    <div class="add_btn" @tap="function () {searchInfo = 4 }">
      <img src="../../../static/images/add.png"/>
    </div>

    <div class="add_aleat" v-if="searchInfo === 4">
        <ul>
          <li class="add_aleat_close" @tap="function () {searchInfo = 0 }">X</li>
          <li class="add_aleat_add" @tap="addcLue">
            <input type="button" value="新增线索"/>
          </li>
          <li class="add_aleat_add admin" @tap="clueHiMa">
            <input type="button" value="线索等级管理 >"/>
          </li>
          <li class="add_aleat_add admin visit" @tap="LinevisitState">
            <input type="button" value="回访状态管理 >"/>
          </li>
        </ul>
    </div>

    <!--回到顶部-->
    <div class="back_top" @tap="backTop">
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
        searchInfo: 0,
        message: 0,
        status: 0,
        info: [],
        visit: [],
        clue_grade: [],
        condition: {},
        id: 0
      }
    },
    methods: {
      LinevisitState () {
        this.$router.push('/StateManagement')
      },
      addcLue () {
        this.$router.push('/AddClue')
      },
      clueHiMa () {
        this.$router.push('/ClueHierarchyManagement')
      },
      lineEdito (id) {
        this.$router.push({path: '/EditClue', query: {id: id}})
      },
      dele () {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_delete', {id: this.id}).then((res) => {
          if (res.data.ret === 100) {
            location.reload([true])
          } else {
            alert(res.data.msg)
          }
        }).catch((err) => {
          console.log(err.data)
        })
      },
      LinevisitAdmin (id) {
        this.$router.push({path: '/VisitAdmin', query: {id: id}})
      },
      lineEditoVisit (id) {
        this.$router.push({path: '/EditVisit', query: {id: id}})
      },
      Linevisit (id) {
        this.$router.push({path: '/Visit', query: {id: id}})
      },
      /* 线索列表ajax（最新线索） */
      ajax_clue_list (condition) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_list', condition).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.info = res.data.data
              this.searchInfo = 0
              return true
            } else {
              alert(res.data.msg)
              return false
            }
          }
        }).catch((err) => {
          console.log(err)
          return false
        })
      },
      /* 线索列表ajax（已回访） */
      ajax_clue_list_two (condition) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_list', condition).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.visit = res.data.data
              this.searchInfo = 0
              return true
            } else {
              alert(res.data.msg)
              return false
            }
          }
        }).catch((err) => {
          console.log(err)
          return false
        })
      },
      signUp (id) {
        this.$router.push({path: '/SignUp', query: {id: id}})
      },
      showMask (id) {
        this.message = 1
        this.id = id
      },
      backTop () {
//        document.body.scrollTop = document.documentElement.scrollTop = 0
        $('.mui-scroll-wrapper').scrollTop(0)
      },
      /* 线索名称搜索（最新线索） */
      search_name1 () {
        var name = $('input[name="item1_name"]').val()
        this.condition = {name: name, status: '1'}
        this.ajax_clue_list(this.condition)
      },
      /* 线索来源搜索（最新线索） */
      search_type1 () {
        var type = $('select[name="item1_type"]').val()
        this.condition = {type: type, status: '1'}
        this.ajax_clue_list(this.condition)
      },
      /* 线索等级搜索（最新线索） */
      search_grade1 () {
        var grade = $('select[name="item1_grade"]').val()
        this.condition = {grade: grade, status: '1'}
        this.ajax_clue_list(this.condition)
      },
      /* 线索名称搜索（已回访线索） */
      search_name2 () {
        var name = $('input[name="item2_name"]').val()
        this.condition = {name: name, status: '2,4'}
        this.ajax_clue_list_two(this.condition)
        this.searchInfo = 0
      },
      /* 线索来源搜索（已回访线索） */
      search_type2 () {
        var type = $('select[name="item2_type"]').val()
        this.condition = {type: type, status: '2,4'}
        this.ajax_clue_list_two(this.condition)
      },
      /* 线索等级搜索（已回访线索） */
      search_grade2 () {
        var grade = $('select[name="item2_grade"]').val()
        this.condition = {grade: grade, status: '2,4'}
        this.ajax_clue_list_two(this.condition)
      }
    },
    mounted () {
      /* 最新线索 */
      this.condition = {status: '1'}
      this.ajax_clue_list(this.condition)

      /* 线索管理（已回访线索） */
      this.condition = {status: '2,4'}
      this.ajax_clue_list_two(this.condition)

      /* 线索等级列表 */
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_grade_list').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.clue_grade = res.data.data
          } else {
            alert(res.data.msg)
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
  .grop {
    background-color: #fff;
    .add_btn {
      position: fixed;
      right: 2%;
      bottom: 13%;
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
        left: 68%;
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
      height: 224px;
      border-bottom: 1px solid #eeeeee;
      .Info_name {
        float: left;
        width: 28%;
        height: 196px;
        border-right:1px solid #eeeeee ;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        .Info_name_NM {
        margin-top: 28%;
        }
        .Info_name_sex {
          color: #999999;
          font-size: 26px;
        }
      }
      .Info_message {
        color: #999999;
       font-size: 26px;
        float: left;
        width: 68%;
        height: 196px;
        margin-left: 4%;
        overflow: hidden;
        line-height: 54px;
        .Info_message_num {
          margin-top: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
        .info_btn {
          width:20%;
          background-color: #2c618b;
          color: #fff;
        }
      }
    }
  }
}
</style>
