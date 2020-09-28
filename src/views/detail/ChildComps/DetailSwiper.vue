<template>
  <swiper>
    <swiper-item v-for="item in topImages" :key="item.id" class="detail-swiper">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper/index";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.detail-swiper {
  height: 300px;
}
</style>