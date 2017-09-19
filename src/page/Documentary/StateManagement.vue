<template>
  <HeaderNav :classify =0 :searchIcon = 0>
  <div class="Clue_hierarchy">
      <table cellspacing="0" cellpadding="2" border="1" >
         <tr v-for="list in ClueMan">
           <td class="Clue_hierarchy_name">
             高对比，意向强，近期可能报名
           </td>
           <td class="Clue_hierarchy_num">
             <span class="clue">回访</span>
             <span class="num">{{list.clue_count}}</span>
           </td>
           <td class="Clue_hierarchy_btn">
             <input type="button"  value="移除回访" @tap="remove(list.id)"/>
             <input type="button" class="dele" value="删除" @tap="delClueGra(list.id)"/>
           </td>
         </tr>
      </table>

    <!--添加按钮-->
    <div class="add_btn" @click="addClueGra">
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
        ClueMan: []
      }
    },
    mounted () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_grade_list').then((res) => {
        console.log(res)
        if (res.data.ret === 100) {
          this.ClueMan = res.data.data
        } else {
          alert(res.data.msg)
        }
      })
    },
    methods: {
      addClueGra () {
        this.$router.push('/AddClueGrade')
      },
      remove (id) {
        this.$router.push({path: '/RemoveVisit', query: {id: id}})
      },
      delClueGra (id) {
        axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/visit_remove', {id: id}).then((res) => {
          if (res.data.ret === 100) {
            confirm(res.data.msg)
            location.reload([true])
          } else {
            alert(res.data.msg)
          }
        })
      }
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
.Clue_hierarchy {
  table {
    font-size: 32px;
    width: 100%;
    background-color: #fff;
    margin-top: 40px;
    text-align: center;
    border-color:#eeeeee;
    tr {
      height: 200px;
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
