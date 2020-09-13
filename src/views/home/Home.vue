<template>
  <div id="home">
    <!-- 顶部 -->
    <nav-bar class="home_nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="BackTopscroll"
      :pull-up-load="true"
      @pullingUp="loadmore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐页 -->
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" class="tab_control" @currutClick="currutClick"></tab-control>
      <!-- 商品 -->
      <goods-list :Goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backtop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommends from "./childComps/HomeRecommends";
import HomeFeature from "./childComps/HomeFeature";

import { getHomeMultiData, getHomeGoods } from "@/network/home";
import { watch } from "vue";
export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      Goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currutGoods: "pop",
      isShowBackTop: false,
    };
  },
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 组件方法
    currutClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currutGoods = "pop";
          break;
        case 1:
          this.currutGoods = "new";
          break;
        case 2:
          this.currutGoods = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    BackTopscroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    loadmore() {
      // console.log("222");
      this.getHomeGoods(this.currutGoods);

      this.$refs.scroll.scroll.refresh();
    },
    // 网络请求相关方法
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        // console.log(res.data.recommend.list);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.Goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.Goods[type].list.push(...res.data.list);
        this.Goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.Goods[this.currutGoods].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
.home_nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.tab_control {
  position: sticky;
  top: 44px;
  left: 0;
  right: 0;
}
.content {
  /* overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>