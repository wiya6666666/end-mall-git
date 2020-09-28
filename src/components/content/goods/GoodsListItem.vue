<template>
  <div class="GoodsListItem" @click="itemClick">
    <img v-lazy="showImg" @load="imageload" />
    <div class="GoodsInfo">
      <p>{{ GoodsList.title }}</p>
      <span class="price">{{ GoodsList.price }}</span>
      <span class="collect">{{ GoodsList.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    GoodsList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImg() {
      return this.GoodsList.image || this.GoodsList.show.img;
    },
  },
  methods: {
    imageload() {
      this.$bus.$emit("imgload");
    },
    itemClick() {
      this.$router.push("/detail/" + this.GoodsList.iid);
    },
  },
};
</script>

<style>
.GoodsListItem {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.GoodsListItem img {
  width: 100%;
  border-radius: 5px;
}

.GoodsInfo {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.GoodsInfo p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.GoodsInfo .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.GoodsInfo .collect {
  position: relative;
}

.GoodsInfo .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>