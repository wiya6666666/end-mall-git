<template>
  <div class="checkbtn" :class="{ check: isCheck }">
    <img src="~@/assets/img/cart/tick.svg" v-show="isCheck" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
div {
  width: 25px;
  height: 16px;
}
.checkbtn {
  border-radius: 50%;
  border: 2px solid #aaaaaa;
}
.check {
  border-color: var(--color-high-text);
  background-color: var(--color-high-text);
}
</style>