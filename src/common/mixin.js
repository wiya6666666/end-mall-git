import {
  debounce
} from "@/common/utils";
import BackTop from "@/components/content/backtop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("imgload", this.itemImgListener);
    // console.log('我是混入的内容');
  },
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  },
  components: {
    BackTop
  }
}