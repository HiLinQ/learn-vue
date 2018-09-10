<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide'

  export default {
    mounted (){
      // this.$store.dispatch('getAddress') //方法一 直接使用
      this.getAddress() //方法二 通过映射方法更新vuex状态
    },
    methods: {
      ...mapActions(['getAddress']), //获取地址是全局的所以放在APP里面直接操作
    },
    components: {FooterGuide}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
