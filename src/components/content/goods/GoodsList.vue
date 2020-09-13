<template>
  <div class="GoodsList">
    <goods-list-item v-for="item in Goods" :key="item.id" :GoodsList="item">{{Goods}}</goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    Goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style>
.GoodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 3px;
}
</style>