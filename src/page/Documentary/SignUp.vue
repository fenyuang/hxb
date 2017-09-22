<template>
  <div class="signUp">

    <form name="signUp">
      <div class="singUp_form">
        <h3>报名</h3>
        <div class="singUp_form_name">
          <label for="name">姓名</label><input type="text" name="name" id="name" :placeholder="curri.name"/>
        </div>
        <div class="singUp_form_name">
          <label for="curriculum">选择课程</label>
          <select id="curriculum" name="curriculum" @change="slectClass">
            <option  value="2">选择课程</option>
            <option :value="list.id" v-for="list in curri">{{list.name}}</option>
          </select>
        </div>

        <div class="singUp_form_name">
          <label for="curriculum">选择班级</label>
        <select  name="class">
            <option :value="list.id" v-for="list in classSele">{{list.name}}</option>
          </select>
        </div>

        <div class="singUp_form_name submit">
          <input type="button"  value="立即报名" @tap="singUp"/>
        </div>
      </div>
    </form>
  </div>

</template>
<script>
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    data () {
      return {
        curri: [],
        classSele: []
      }
    },
    methods: {
      slectClass () {
        let courseId = $('select[name = "curriculum"]').val()
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/Course/class_list', {id: courseId}).then((res) => {
          if (res.data.ret === 100) {
            this.classSele = res.data.data
          } else {
            alert(res.data.msg)
          }
        })
      },
      singUp () {
        let applicant = $('input[name = "name"]').val()
        let courseId = $('select[name = "curriculum"]').val()
        let classId = $('select[name = "class"]').val()
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/Clue/clue_edit', {id: this.$route.query.id, applicant: applicant, course_id: courseId, class_id: classId}).then((res) => {
          if (res.data.ret === 100) {
            if (confirm(res.data.msg)) {
              this.$router.push('/Conversion')
            }
          } else {
            alert(res.data.msg)
          }
        })
      }
    },
    mounted () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/Clue/clue_info', {id: this.$route.query.id}).then((res) => {
        if (res.data.ret === 100) {
          this.curri = res.data.data
        } else {
          alert(res.data.msg)
        }
      })
    }
  }
</script>

<style scoped lang="less">
.signUp{
  overflow: hidden;
   h3 {
     margin-top: 50px;
     text-align: center;
     padding-bottom: 50px;
   }
  .singUp_form {
    background-color: #fff;
    overflow: hidden;
    width: 9rem;
    margin: 20px auto;
    .singUp_form_name {
      font-size: 32px;
      color: #999999;
      margin-top: 30px;
      border-bottom: 1px solid #eeeeee;
      select {
        width: 70%;
        -webkit-appearance: menulist;
      }
      label {
        margin-left: 38px;
      }
      input {
        margin-left: 80px;
        width: 70%;
        border:0;
      }
    }
    .submit {
      margin-top: 150px;
      padding-bottom: 50px;
      input {
        color:#fff;
        background-color: #2c618b;
      }
    }
  }
}
</style>
