<template>
  <HeaderNav :classify = 0  :searchIcon = 0>
  <div class="addGrop">
    <div class="add_clue_btn">
      <input type="button" value="回访登记"/>
    </div>

    <form name="visit">
      <div class="add_clue_form">
        <div class="form_name">
          <label for="name">回访人</label><input id="name" type="text" name="name"/>
        </div>
        <div class="form_name">
          <label for="time">回访时间</label>
          <input id="time" type="date" name="time"/>
        </div>
        <div class="form_name">
          <label for="mode">回访方式</label>
          <select id="mode" name="type">
            <option value="1">电话</option>
            <option value="2">短信</option>
            <option value="3">微信</option>
            <option value="4">QQ</option>
            <option value="4">其他</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <label for="occupation">当前状态</label>
          <select id="occupation" name="status">
            <option :value="list.id" v-for="list in visitState">{{list.name}}</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <label for="clueRank">请选择班级</label>
          <select id="clueRank" name="class_id" >
            <option :value="list.id" v-for="list in visitState">{{list.name}}</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <label for="clueDetails">备注</label><input id="clueDetails" name="remark" type="text" />
        </div>
        <div class="form_name" style="display: none">
          <input   name="type" type="text" value="3"/>
        </div>
      </div>
      <div class="add_clue_sub">
        <input type="button" value="提交" @tap="visitAdmin" />
      </div>
    </form>

    <!--添加按钮-->
    <div class="add_btn" @tap="lineConver">
      <img src="../../../static/images/add.png"/>
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
        visitState: [],
        classList: []
      }
    },
    methods: {
      lineConver () {
        this.$router.push('/Conversion')
      },
      visitAdmin () {
        var name = $('input[name="name"]').val()
        var time = $('input[name="time"]').val()
        var type = $('select[name="type"]').val()
        var status = $('select[name="status"]').val()
        var classid = $('select[name="class_id"]').val()
        var remark = $('input[name="remark"]').val()
        var condition = {clue_id: this.$route.query.id, name: name, time: time, type: type, status: status, class_id: classid, remark: remark}
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/visit_add', condition).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              if (confirm('提交成功')) {
                this.$router.push({path: '/Conversion'})
              }
            }
            return false
          } else {
            confirm(res.data.msg)
          }
        }).catch((err) => {
          confirm(err)
          return false
        })
      }
    },
    mounted () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/visit_status_list').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.visitState = res.data.data
          }
          return false
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Course/class_list').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.classList = res.data.data
          }
          return false
        }
      }).catch((err) => {
        console.log(err)
        return false
      })
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
  .addGrop {
    .add_clue_btn{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      input {
        width: 176px;
        line-height: 60px;
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
        label {
          margin-left: 32px;
        }
        .triangle {
          width: 0;
          height:0;
          position: absolute;
          top: 20%;
          right: 12%;
          border-left: 16px solid transparent;
          border-right: 16px solid transparent;
          border-top: 32px solid #999999;
        }
        input, select {
          width: 70%;
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
    .add_btn {
      position: fixed;
      right: 2%;
      bottom: 13%;
      img {
        width: 80px;
        height: 80px;
      }
    }

    .add_aleat {
      width: 400px;
      height: 300px;
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
</style>
