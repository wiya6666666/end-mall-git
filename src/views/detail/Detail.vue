<template>
  <div id="Detail">
    <detail-nav-bar
      class="nav-bar"
      @titleClick="titleClick"
      ref="detailNavBar"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <goods-list :Goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./ChildComps/DetailNavBar";
import DetailSwiper from "./ChildComps/DetailSwiper";
import DetailBaseInfo from "./ChildComps/DetailBaseInfo";
import DetailShopInfo from "./ChildComps/DetailShopInfo";
import DetailGoodsInfo from "./ChildComps/DetailGoodsInfo";
import DetailParamInfo from "./ChildComps/DetailParamInfo";
import DetailCommentInfo from "./ChildComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "./ChildComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/Detail";
import { debounce } from "@/common/utils";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import { mapActions } from "vuex";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {
        user: {
          avatar: {},
        },
      },
      recommends: [],
      themeTopYs: [],
      currutIndex: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted() {},
  destroyed() {
    this.$bus.$off("imgload", this.itemImgListener);
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 获取数据
      const data = res.result;
      // 取出轮播图数据
      this.topImages = data.itemInfo.topImages;
      //  创建商品对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺的对象
      this.shop = new Shop(data.shopInfo);
      // 取出详情的信息
      this.detailInfo = data.detailInfo;
      // 创建参数的对象
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    detailScroll(position) {
      // console.log(position);
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      // 1.普通做法
      // for (let i = 0; i < length; i++) {
      //   // if (
      //   //   positionY > this.themeTopYs[i] &&
      //   //   positionY < this.themeTopYs[i + 1]
      //   // ) {
      //   //   console.log(i);
      //   // }
      //   if (
      //     this.currutIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.currutIndex = i;
      //     // console.log(this.currutIndex);
      //     this.$refs.detailNavBar.currutIndex = this.currutIndex;
      //   }
      // }

      // 2.hack做法
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currutIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currutIndex = i;
          this.$refs.detailNavBar.currutIndex = this.currutIndex;
        }
      }
      this.listenerShowBackTop(position);
    },
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000);
        // console.log(res);
      });

      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
#Detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content {
  /* position: absolute;
  top: 44px;
  right: 0;
  left: 0; */
  /* height: 500px; */
  height: calc(100% - 44px - 49px);
}
</style>