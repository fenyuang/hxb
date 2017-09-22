<template>
  <HeaderNav :classify = 0 :searchIcon = 0>
  <div class="add_clue_grade">
    <div class="add_clue_grade_btn">
      <input type="button" value="新增状态"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="text" placeholder="单元名称" name="unit"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="submit" class="sub" value="提交" @tap="addSta"/>
    </div>
  </div>
  </HeaderNav>
</template>
<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    methods: {
      addSta () {
        let name = $('input[name = "unit"]').val()
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/visit_status_add', {name: name}).then((res) => {
          if (res.status === 200) {
            confirm(res.data.msg)
            if (res.data.ret === 100) {
              this.$router.push('/StateManagement')
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
.add_clue_grade {
  font-size: 32px;
  .add_clue_grade_btn {
    padding-top: 32px;
    padding-bottom: 32px;
    text-align: center;
    input {
      color: #2c618b;
      border-color: #2c618b;
      background-color: #eeeeee;
    }
  }
  .add_clue_grade_name {
    margin: 0 auto;
    width: 8rem;
    input{
      background-color: #fff;
      width: 8rem;
      height: 100px;
      border: 0;
    }
    .sub  {
      font-size: 40px;
      background-color: #2c618b;
    }
  }
}
</style>
