<template>
  <HeaderNav :classify=0 :searchIcon=0>
  <div class="addGrop">
    <div class="add_clue_btn">
      <input type="button" value="编辑线索"/>
    </div>

    <form >
    <div class="add_clue_form">
        <div class="form_name">
          <label for="name">回访人</label><input id="name" type="text" name="name"/>
        </div>
        <div class="form_name">
          <label for="sex">性别</label>
          <select name="sex" id="sex">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <label for="phone">电话</label>
          <input id="phone" type="text" name="phone"/>
        </div>
        <div class="form_name">
          <label for="occupation">职业</label>
          <select id="occupation" name="occupation">
             <option value="1">学生</option>
            <option value="2">上班</option>
            <option value="3">待业</option>
            <option value="4">其他</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <label for="clueRank">线索等级</label>
          <select id="clueRank" name="grade" >
            <option :value="list.id" v-for="list in clueGrad">{{list.name}}</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div class="form_name">
          <label for="clueDetails">线索详情</label><input id="clueDetails" name="info" type="text" />
        </div>
        <div class="form_name" style="display: none">
          <input   name="type" type="text" value="3"/>
        </div>
    </div>
    <div class="add_clue_sub">
      <input type="button" value="保存" @tap="editClue"/>
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
        clueGrad: []
      }
    },
    methods: {
      editClue () {
        var name = $('input[name="name"]').val()
        var sex = $('select[name="sex"]').val()
        var phone = $('input[name="phone"]').val()
        var occupation = $('select[name="occupation"]').val()
        var grade = $('select[name="grade"]').val()
        var info = $('input[name="info"]').val()
        var condition = {id: this.$route.query.id, name: name, sex: sex, phone: phone, occupation: occupation, grade: grade, info: info}
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_update', condition).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              if (confirm(res.data.msg)) {
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
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_grade_list').then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.clueGrad = res.data.data
          }
          return false
        } else {
          confirm(res.data.msg)
        }
      }).catch((err) => {
        confirm(err)
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
  font-size: 32px;
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
}
</style>
