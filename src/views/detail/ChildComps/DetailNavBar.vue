<template>
  <div id="DetailNavBar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt />
        </div>
      </template>
      <template v-slot:center>
        <div class="titles">
          <div
            v-for="(item,index) in titles"
            :key="item.id"
            class="titles-item"
            @click="titleClick(index)"
            :class="{active:currutIndex === index}"
          >{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "评论", "参数", "推荐"],
      currutIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currutIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.titles {
  display: flex;
  font-size: 13px;
}
.titles-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 14px;
  width: 14px;
  height: 14px;
}
</style>