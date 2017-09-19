<template>
  <HeaderNav :classify =  0  :searchIcon =  0>
  <div class="NewUnit">
    <div class="add_clue_btn">
      <input v-if="flag" type="button" value="新建单元"/>
      <input v-else="" type="button" value="修改单元"/>
    </div>

    <form name="newUnit">
      <div class="add_clue_form">
        <div class="form_name">
          <label for="name">单元名称</label><input id="name" type="text" :value="viewinfo.name" />
        </div>
        <div class="form_name">
          <label for="mode">单元分类</label>
          <select id="mode" name="occupation">
            <option v-for="list in classlist"  :selected="list.id===viewinfo.category" :value="list.id">{{list.name}}</option>
          </select>
          <span class="triangle"></span>
        </div>
        <div id="xjdiv">
          <div class="form_name" v-for="lists in viewinfo.section">
            <label >小节名称</label><input class="clueDetails"  :value="lists.name" name="clueDetails[]" type="text" />
          </div>
        </div>
        <div class="form_name">
          <label @tap="addxjie">添加小节</label>
        </div>
      </div>
      <div class="add_clue_sub">
        <input type="button" value="提交" @tap="subEditview" />
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
        viewinfo: [],
        classlist: [],
        flag: true
      }
    },
    methods: {
      addxjie () {
        var xjsrt = '<div class="form_name" style=" line-height: 26px;border-bottom: 1px solid #eeeeee;margin-top: 22px;position: relative;"><label for="clueDetails" style="margin-left: 15px;">小节名称</label><input class="clueDetails" style="width: 70%;border: 0;" name="clueDetails[]" value="" type="text" /></div>'
        $('#xjdiv').append(xjsrt)
      },
      getViewinfo () {
        if (this.$route.query.id) {
          axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/chapter_info', {id: this.$route.query.id}).then((res) => {
            if (res.status === 200) {
              if (res.data.ret === 100) {
                this.viewinfo = res.data.data
              } else {
                alert(res.data.msg)
              }
            }
          }).catch((err) => {
            console.log(err)
          })

          this.flag = false
        }
      },
      getClasslsit () {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/parent_category_common_list').then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.classlist = res.data.data
            } else {
              alert(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      subEditview () {
        var ename = $('#name').val()
        var mode = $('#mode').val()
        var arr = []
        $('.clueDetails').each(function (index, item) {
          arr[index] = $(this).val()
        })
        if (this.$route.query.id) {
          var crdata = {id: this.$route.query.id, name: ename, category: mode, section: arr}
          var curl = 'http://hxb.scpoo.com/hxb/index.php/index/course/chapter_update'
        } else {
          crdata = {name: ename, category: mode, section: arr}
          curl = 'http://hxb.scpoo.com/hxb/index.php/index/course/chapter_add'
        }
        axios.post(curl, crdata).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.$router.push('/ChapterManagement?id=' + this.$route.query.id)
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
      this.getViewinfo()
      this.getClasslsit()
    },
    components: {
      HeaderNav
    }
  }
</script>
<style scoped lang="less">
  .NewUnit {
    font-size: 32px;
    .add_clue_btn{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      input {
        width: 176px;
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
          top: 30%;
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
