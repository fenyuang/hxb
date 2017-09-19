<template>
  <div class="add_clue_grade">
    <div class="add_clue_grade_btn">
      <input type="button" value="新增状态"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="text" placeholder="单元名称"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="submit" class="sub" value="提交"/>
    </div>
  </div>
</template>
<script>
  export default {

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
