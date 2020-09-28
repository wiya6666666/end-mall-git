<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button
        class="check-btn"
        :is-check="itemInfo.checked"
        @click.native="checkClick"
      ></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">×{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    },
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
#shop-item:after {
  content: "."; /*加一段内容*/
  display: block; /*让生成的元素以块级元素显示，占满剩余空间*/
  height: 0; /*避免生成的内容破坏原有布局高度*/
  clear: both; /*清除浮动*/
  visibility: hidden; /*让生成的内容不可见*/
}
#shop-item {
  zoom: 1; /*为IE6，7的兼容性设置*/
}
.item-selector {
  float: left;
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-btn {
  position: relative;
  top: 45px;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  width: 20%;
  padding: 5px;
  float: left;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  width: 67%;
  height: 110px;
  float: right;
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 16px;
  right: 0px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>