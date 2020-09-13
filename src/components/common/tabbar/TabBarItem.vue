<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isShow">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isShow: true,
    };
  },
  computed: {
    isShow() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isShow ? { color: this.activeColor } : {};
    },
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "Deeppink",
    },
  },
  methods: {
    itemClick() {
      // console.log("111");
      // 防止连点报错
      if (this.path !== this.$route.path) {
        this.$router.replace(this.path);
      }
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* .active {
  color: #a8a8a2;
} */
</style>