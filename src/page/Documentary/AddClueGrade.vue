<template>
  <HeaderNav :classify=0 :searchIcon=0>
  <div class="add_clue_grade">
    <div class="add_clue_grade_btn">
      <input type="button" value="添加线索等级"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="text" placeholder="请输入线索等级名称" id="clueGra"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="button" class="sub" value="提交" @tap="addClueGra"/>
    </div>
  </div>
  </HeaderNav>
</template>
<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  export default {
    methods: {
      addClueGra () {
        let clueGr = document.getElementById('clueGra').value
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_grade_add', {name: clueGr}).then((res) => {
          if (res.data.ret === 100) {
            confirm(res.data.msg)
            this.$router.push('/ClueHierarchyManagement')
          } else {
            alert(res.data.msg)
          }
        }).catch((err) => {
          console.log(err.data)
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
      color: #fff;
      background-color: #2c618b;
    }
  }
}
</style>
