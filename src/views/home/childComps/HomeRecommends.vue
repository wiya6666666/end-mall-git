<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.id" class="recommends_item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommends {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 30px 0;
  border-bottom: 10px solid #eeeeee;
}
.recommends_item {
  flex: 1;
}
.recommends_item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>