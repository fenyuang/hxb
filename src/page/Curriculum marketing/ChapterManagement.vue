<template>
  <HeaderNav :classify = 0  :searchIcon = 0>
  <div class="Chapter_management">
    <table cellspacing="0" cellpadding="2" border="1" >

          <tr v-for="list in viewlist">
            <td class="Clue_hierarchy_name">{{list.name}}</td>
            <td class="Clue_hierarchy_num">
              <span class="clue" @tap="xiaojie(list.id)" >小节</span>
              <span class="num">{{list.section.length}}</span>
            </td>
            <td class="Clue_hierarchy_btn">
              <input type="button"  value="编辑" @tap="newUnit(list.id)" />
              <input type="button"  value="删除" @tap="tsDel($event.target)" :dataid="list.id" class="dele" />
            </td>
          </tr>

    </table>

    <!--添加按钮-->
    <div class="add_btn"  @tap="newUnit(0)">
    <img src="../../../static/images/add.png"/>
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
        viewlist: [],
        flag: false
      }
    },
    methods: {
      ddd () {
      },
      xiaojie (id) {
        this.$router.push('/SubsectionManagement?chapter_id=' + id)
      },
      newUnit (pstype) {
        if (!pstype) {
          this.$router.push('/NewUnit')
        } else {
          this.$router.push('/NewUnit?id=' + pstype)
        }
      },
      backTop () {
        $('.mui-scroll-wrapper').scrollTop(0)
      },
      getViewlist () {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/chapter_list').then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              this.viewlist = res.data.data
            } else {
              alert(res.data.msg)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      tsDel (target) {
        var dataid = $(target).attr('dataid')
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/course/chapter_delete', {id: dataid}).then((res) => {
          if (res.status === 200) {
            if (res.data.ret === 100) {
              $(target).parents('td').parents('tr').remove()
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
      this.getViewlist()
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
        height: 160px;
        border: 1px solid #eee;
        .Clue_hierarchy_name {
          white-space: normal;
          text-align: center;
          width: 24%;
        }
        .Clue_hierarchy_num {
          width: 24%;
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
      position: absolute;
      right: 2%;
      bottom: 13%;
      z-index: 2000;
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
  }
</style>
