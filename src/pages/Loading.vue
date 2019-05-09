<template>
  <div class="loading-container flex-c">
    <van-loading type="spinner" color="#333"/>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        show: true
      }
    },
    created() {
      console.log(this.$cookies.get('token'))
      if (!this.$cookies.get('token') || !this.$route.query.appKey) {
        sessionStorage.setItem('operType', 1)
        this.$router.push('/login')
      } else {
        this.getUserInfo()
      }

    },
    mounted() {

    },
    //keep-alive 组件激活时调用
    activated() {

    },
    //keep-alive 组件停用时调用。
    deactivated() {

    },
    //方法
    methods: {
      getUserInfo() {

      }
    },
    //计算属性
    computed: {},
    watch: {}
  }
</script>
<style scoped lang="stylus">

</style>
