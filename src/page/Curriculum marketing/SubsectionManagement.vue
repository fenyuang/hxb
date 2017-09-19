<template>
  <HeaderNav :classify = 0   :searchIcon = 0>
  <div class="Chapter_management">
    <table cellspacing="0" cellpadding="2" border="1" >
      <tr v-for="list in list">
        <td class="Clue_hierarchy_name">
          {{list['id']}}
        </td>
        <td class="Clue_hierarchy_num">
          {{list['name']}}
        </td>
        <td class="Clue_hierarchy_btn">
          <input type="button" @tap="update(list.id)"  value="编辑" />
          <input type="button" @tap="dele(list.id)" class="dele" value="删除"/>
        </td>
      </tr>
    </table>

    <!--添加按钮-->
    <div class="add_btn"  @tap="Addsection">
      <img src="../../../static/images/add.png"/>
    </div>

  </div>
  </HeaderNav>
</template>
<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  export default {
    data () {
      return {
        chapter_id: this.$route.query.chapter_id,
        list: []
      }
    },
    methods: {
      Addsection () {
        this.$router.push('/AddSection?chapter_id=' + this.chapter_id)
      },
      backTop () {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      },
      /* 编辑 */
      update (id) {
        var url = '/AddSection?chapter_id=' + this.chapter_id + '&id=' + id
        this.$router.push(url)
      },
      /* 小节删除 */
      dele (id) {
        if (confirm('确认删除吗？')) {
          axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/section_delete', {chapter_id: this.chapter_id, id: id}).then((res) => {
            if (res.status === 200) {
              alert(res.data.msg)
              if (res.data.ret === 100) {
                window.location.reload()
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    },
    mounted () {
      /* 小节列表 */
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/section_list', {chapter_id: this.chapter_id}).then((res) => {
        if (res.status === 200) {
          if (res.data.ret === 100) {
            this.list = res.data.data
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
  .Chapter_management {
    font-size: 32px;
    table {
      font-size: 32px;
      width: 100%;
      background-color: #fff;
      margin-top: 20px;
      text-align: center;
      border-color:#eeeeee;
      tr {
        height: 120px;
        border: 1px solid #eee;
        .Clue_hierarchy_name {
          white-space: normal;
          text-align: center;
          width: 15%;
        }
        .Clue_hierarchy_num {
          width: 35%;
          .clue {
            color: #999999;
          }
        }
        .Clue_hierarchy_btn {
          width: 50%;
          input {
            width: 37%;
            background-color: #2c618b;
            color: #fff;
          }
          .dele {
            background-color: #999999;
          }
        }
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

  }
</style>
