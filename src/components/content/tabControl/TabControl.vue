<template>
  <div id="tabcontrol">
    <div
      v-for="(item,index) in titles"
      :key="item.id"
      class="tabcontrol_item"
      :class="{active:currutIndex === index}"
      @click="currutClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabcontrol",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currutIndex: 0,
    };
  },
  methods: {
    currutClick(index) {
      this.currutIndex = index;
      this.$emit("currutClick", index);
    },
  },
};
</script>

<style>
#tabcontrol {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background-color: #ffffff;
  z-index: 9;
}
.tabcontrol_item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
  padding: 4px;
}
</style>