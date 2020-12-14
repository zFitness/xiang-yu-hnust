<!-- home -->
<template>
  <div class="index-container">
    <div class="index-title">
      <h3>聊天</h3>

      <van-button icon="friends-o" type="info" color="btn" size="small" class="btn" @click="handlePeopleClick">
        10
      </van-button>
    </div>
    <div class="wrapper">
      <div class="new-bg">
        <img class="img" src="https://img.zmblog.wang/blog/20201214/kFYutJ9gP6Fv.png?imageslim" alt="">
        <p>开始一个新的聊天</p>
      </div>

    </div>
    <div class="start-btn">
      <van-button size="large" class="btn" to="/chat">快速匹配</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {

    }
  },

  computed: {},

  mounted() { },

  methods: {
    handlePeopleClick() {
      Toast({
        message: '在线人数：10',
        position: 'bottom'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  height: 100%;
  .index-title {
    height: 64px;
    padding: 0 0.64rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      font-size: 14px;
    }
    h3 {
      font-size: 20px;
    }
  }

  .wrapper {
    width: 100%;
    height: calc(100% - 64px);
    .new-bg {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .img {
        display: block;
        width: 200px;
        height: 200px;
      }
      p {
        font-size: 20px;
      }
    }
  }

  .start-btn {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.1rem;
    bottom: 48px;
    .btn {
      background: $m-primary;
      color: #fff;
      font-size: 17px;
    }
  }
}
</style>
