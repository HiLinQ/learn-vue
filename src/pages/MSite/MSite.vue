<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-search"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categories.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArr">
            <a href="javascript:" class="link_to_food" v-for="(category, i) in categories">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else/>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from "../../components/ShopList/ShopList";
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted() {
      this.$store.dispatch('getCategories') //更新vuex的状态
      this.$store.dispatch('getShops') //更新vuex的状态
    },
    computed: {
      ...mapState(['address', 'categories']), //读取vuex的状态
      /*
      根据categories一维数组生成二维数组
       */
      categoriesArr(){
        const {categories} = this //对象结构
        const arr = []
        let minArr = []
        categories.forEach(c => {
          if(minArr.length === 8){
            minArr = []
          }
          if(minArr.length === 0){
            arr.push(minArr)
          }
          minArr.push(c)
        })
        return arr
      }
    },
    watch: { //监听categories的数据是否填充，填充之后再调用swiper. vue先更新数据，再异步更新界面
      categories (value){ // categories数组中有数据了
        this.$nextTick(() => {//一旦界面更新就立刻创建swiper对象
          //创建一个Swiper实例对象，要确保创建时页面已完成加载
          new Swiper('.swiper-container', {
            loop:true, //可以循环轮播
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      }
    },
    components: {
      ShopList,
      HeaderTop
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
