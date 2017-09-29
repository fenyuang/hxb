<template>
    <div class="layer">
      {{Content}}
  </div>
</template>

<script>
  export default {
    props: {
      Content: {
        type: String,
        require: true
      }
    }
  }
</script>

<style scoped >
  .layer {
    position: fixed;
    width: 8rem;
    height: 2rem;
    top: 6rem;
    left: 10%;
    background: #000;
    opacity: 0.6;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 50px;
    text-align: center;
    line-height: 2rem;
  }
</style>
