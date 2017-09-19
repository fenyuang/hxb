<template>
  <HeaderNav :classify = 0  :searchIcon = 0>
  <div class="add_clue_grade">
    <div class="add_clue_grade_btn">
      <input type="button" v-model="title"/>
    </div>
    <div class="add_clue_grade_name">
      <input name="name" type="text"  placeholder="小节名称"/>
    </div>
    <div class="add_clue_grade_name">
      <input type="button" @tap="save_section" class="sub" value="提交"/>
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
        chapter_id: this.$route.query.chapter_id,
        id: this.$route.query.id,
        info: null,
        condiiton: null,
        url: '',
        title: '新增小节'
      }
    },
    methods: {
      /* 小节保存/修改ajax */
      ajax_section () {
        axios.post(this.url, this.condition).then((res) => {
          if (res.status === 200) {
            alert(res.data.msg)
            if (res.data.ret === 100) {
              var successUrl = '/SubsectionManagement?chapter_id=' + this.chapter_id
              this.$router.push(successUrl)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /* 提交 */
      save_section () {
        var name = $('input[name="name"]').val()
        if (this.id) {
          this.url = 'http://hxb.scpoo.com/hxb/index.php/index/course/section_update'
          this.condition = {name: name, chapter_id: this.chapter_id, id: this.id}
        } else {
          this.url = 'http://hxb.scpoo.com/hxb/index.php/index/course/section_add'
          this.condition = {name: name, chapter_id: this.chapter_id}
        }
        this.ajax_section()
      }
    },
    mounted () {
      if (this.id) {
        this.title = '修改小节'
        /* 小节详情 */
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/section_info', {chapter_id: this.chapter_id, id: this.id}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.info = res.data.data
            } else {
              alert(res.data.msg)
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
      color: #fff;
      font-size: 40px;
      background-color: #2c618b;
    }
  }
}
</style>
