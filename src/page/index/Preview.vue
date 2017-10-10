<template>
	<div>
		<div>
			<div id="iframe-box">
				<iframe id="ifram" class="previewSrc" :src="previewSrc"></iframe>
			</div>
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
    document.querySelector('.previewSrc').style.height = window.screen.availHeight + 'px'
    console.log(this.$router.currentRoute)
    let ifram = document.getElementById('ifram')
    if (navigator.userAgent.match(/iPad|iPhone/i)) {
      let iframeBox = document.getElementById('iframe-box')
      iframeBox.style.width = 100 + '%'
      iframeBox.style.overflowX = 'hidden'
      iframeBox.style.overflowY = 'scroll'
      iframeBox.style.webkitOverflowScrolling = 'touch'
      ifram.setAttribute('scrolling', 'no')
      iframeBox.appendChild(ifram)
    }
  }
}
</script>

<style scoped>
	iframe { border: 0; width: 100%; height: 100%;}
	section { background: rgb(76, 217, 100); color: #ffffff; line-height: 1.5rem; text-align: center; width: 1.5rem; height: 1.5rem; position: absolute; bottom: 1rem; left: 4.25rem; border-radius: 50%;}
	section a { color: #fff; font-size: 0.4rem;}
</style>