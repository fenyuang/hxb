<template>
  <div>
    
  </div>
</template>

<script>
export default {
	data: function(){
		return {
			students: []
		}
	},
	mounted: function() {
		this.getDate()
	},
	methods: {
		getDate: function(){
			_this = this
			axios.get('http://hxb.scpoo.com/hxb/index.php/index/user/user_list').then(function(rs){
				rs.data=rs
				if(rs.ret===100){
					rs.data=_this.students

				}else{

				}
			}).catch(function(error){
				console.log(error)

			})
		},
		getSearch: function(){
			_this=this
			axios.get('http://hxb.scpoo.com/hxb/index.php/index/user/user_list?realnameandtel='+_this.message).then(function(rs){
				rs.data=rs
				if(rs.data===100){
					_this.students=rs.data

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
