<template>
  <div>
    
  </div>
</template>

<script>
export default {
  name: '',
  data: function (){
  	return{

  	}
  },
  data: function(){
  	return{
  		students: []
  	}
  },
  data: function(){
  	return{
  		students: []
  	}
  },
  data: function(){
  	return{

  	}
  },
  mounted: function(){
  	this.getDate()
  },
  methods:{
  	getDate: function(){
  		var _this=this
  		aixos.get('http://hxb.scpoo.com/hxb/index.php/index/user/user_list').then(function(rs){
  			rs=rs.date
  			if(rs.ret==100){
  				_this.students=rs.date

  			}
  			else{

  			}

  		}).catch(function(error){
  			console.log(error)

  		})
  	}
  }
 
}
</script>

<style scoped>

</style>
