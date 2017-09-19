<template>
  <HeaderNav :classify=0 :searchIcon=0>
  <div class="Clue_hierarchy">
      <table cellspacing="0" cellpadding="2" border="1" >
         <tr v-for="(list, index) in ClueMan">
           <td class="Clue_hierarchy_name">
             0{{index+1}}
           </td>
           <td class="Clue_hierarchy_num">
            {{list.name}}
           </td>
           <td class="Clue_hierarchy_btn">
             <input type="button"  value="移除" @click="removeGrad(list.id)" id="aleat"/>
           </td>
         </tr>
      </table>
       <h4 v-if="prompt === 1">该等级下没有线索哦！</h4>
  </div>
  </HeaderNav>
</template>

<script>
  import HeaderNav from '../../components/HeaderNav'
  import axios from 'axios'
  export default {
    data () {
      return {
        ClueMan: [],
        prompt: 0
      }
    },
    mounted () {
      axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_list', {grade: this.$route.query.id}).then((res) => {
        if (res.data.ret === 100) {
          if (res.data.data.length === 0) {
            this.prompt = 1
          } else {
            this.ClueMan = res.data.data
          }
        } else {
          alert(res.data.msg)
        }
      }).catch((err) => {
        console.log(err.data)
      })
    },
    methods: {
      removeGrad (id) {
        if (confirm('确定移除此条信息？')) {
          axios.post('http://hxb.scpoo.com/hxb/index.php/index/clue/clue_remove', {id: id}).then((res) => {
            if (res.data.ret === 100) {
              confirm('移除成功')
              location.reload([true])
            } else {
              alert(res.data.msg)
            }
          }).catch((err) => {
            console.log(err.data)
          })
        }
      }
    },
    components: {
      HeaderNav
    }
  }
</script>

<style scoped lang="less">
.Clue_hierarchy {
  h4 {
    text-align: center;
  }
  table {
    font-size: 32px;
    width: 100%;
    background-color: #fff;
    margin-top: 40px;
    text-align: center;
    border-color:#eeeeee;
    tr {
      height: 150px;
      border: 1px solid #eee;
      .Clue_hierarchy_name {
        white-space: normal;
        text-align: center;
        width: 24%;
      }
      .Clue_hierarchy_num {
        width: 50%;
        .clue {
          color: #999999;
        }
      }
      .Clue_hierarchy_btn {
        width: 24%;
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
