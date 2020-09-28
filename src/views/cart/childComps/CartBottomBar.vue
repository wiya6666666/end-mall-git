<template>
  <div class="bottom-bar">
    <div class="total-btn">
      <check-button
        class="check-btn"
        :is-check="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:{{ totalPrice }}</div>
    <div class="total-count" @click="countClick">去结算({{ totalCount }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "¥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    totalCount() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      } else {
        // 1.使用filter方法
        // return !this.$store.state.cartList.filter((item) => !item.checked)
        //   .length;
        // 2.使用find方法
        return !this.$store.state.cartList.find((item) => !item.checked);
      }
      // 3.普通遍历
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    countClick() {
      if (this.totalCount === 0) {
        this.$toast.show("请选择需要购买的商品");
      }
    },
  },
};
</script>

<style>
.bottom-bar {
  height: 40px;
  background-color: #eeeeee;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.total-btn {
  display: flex;
  align-items: center;
  margin-left: 10px;
  line-height: 20px;
}
.total-btn .check-btn {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.total-price {
  flex: 1;
  margin-left: 20px;
}
.total-count {
  width: 90px;
  text-align: center;
  background-color: var(--color-high-text);
  color: #ffffff;
}
</style>