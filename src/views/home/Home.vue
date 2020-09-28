<template>
  <div id="home">
    <!-- 顶部 -->
    <nav-bar class="home_nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      class="tab_control"
      @currutClick="currutClick"
      ref="tab_control2"
      v-show="isTabcontrol"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="BackTopscroll"
      :pullUpLoad="true"
      @pullingUp="loadmore"
    >
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐页 -->
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature></home-feature>
      <tab-control
        :titles="['流行','新款','精选']"
        class="tab_control"
        @currutClick="currutClick"
        ref="tab_control1"
      ></tab-control>
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

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommends from "./childComps/HomeRecommends";
import HomeFeature from "./childComps/HomeFeature";

import { getHomeMultiData, getHomeGoods } from "@/network/home";
import { debounce } from "@/common/utils";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
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
  },
  data() {
    return {
      banners: [],
      recommends: [],
      Goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currutGoods: "pop",
      tabOffSetTop: 0,
      isTabcontrol: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getcurrentY();
    // console.log(this.saveY);
    // 2.取消全局事件监听
    this.$bus.$off("imgload", this.itemImgListener);
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
      this.$refs.tab_control1.currutIndex = index;
      this.$refs.tab_control2.currutIndex = index;
    },
    BackTopscroll(position) {
      this.listenerShowBackTop(position);
      this.isTabcontrol = -position.y > this.tabOffSetTop;
    },
    loadmore() {
      this.getHomeGoods(this.currutGoods);
    },
    swiperImageLoad() {
      this.tabOffSetTop = this.$refs.tab_control1.$el.offsetTop;

      // console.log(this.$refs.tab_control.$el.offsetTop);
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