<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <!-- 商品 -->
    <cart-list></cart-list>
    <!-- 底部 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>