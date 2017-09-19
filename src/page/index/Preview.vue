<template>
	<div>
		<div>
			<iframe class="previewSrc" :src="previewSrc"></iframe>
		  <section>
		  	<router-link :to="{ name: 'Editor', params: { id: editorSrc }}">使用</router-link>
		  </section>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      previewSrc: 'http://114.215.97.88:3000/pages/' + this.$router.currentRoute.params.id + '.html',
      editorSrc: this.$router.currentRoute.params.id
    }
  },
  mounted () {
    document.querySelector('.previewSrc').style.height = window.outerHeight + 'px'
    console.log(this.$router.currentRoute)
  }
}
</script>

<style scoped>
	iframe { border: 0; width: 100%;}
	section { background: rgb(76, 217, 100); color: #ffffff; line-height: 1.5rem; text-align: center; width: 1.5rem; height: 1.5rem; position: absolute; bottom: 1rem; left: 4.25rem; border-radius: 50%;}
	section a { color: #fff; font-size: 0.4rem;}
</style>