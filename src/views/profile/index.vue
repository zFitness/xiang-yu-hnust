<template>
  <div class="profile-container">
    <div class="info-bg">
      <div class="info">
        <div class="head_card_info">
          <div class="name">{{userInfo.nickname}}</div>
          <div class="num">email：{{userInfo.email}}</div>
        </div>
        <div class="img">
          <van-image round width="1.5rem" height="1.5rem" :src="userInfo.avatar" />
        </div>

      </div>
    </div>

    <div class="menu">
      <van-cell title="修改信息" icon="user-o" size="large" is-link />
      <van-cell title="软件设置" icon="setting-o" size="large" is-link />
    </div>
  </div>
</template>


<script>
import store from '@/store'

export default {
  name: 'Profile',
  data() {
    return {
      userInfo: store.getters.userInfo
    }
  }
}
</script>


<style lang="scss" scoped>
.profile-container {
  .info-bg {
    width: 100%;
    height: 160px;
    background: #52a7fc;
    padding: 0.64rem;
    box-sizing: border-box;
    width: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        font-size: 20px;
      }
      .num {
        font-size: 12px;
      }
      .img {
        background: #fff;
        border-radius: 50%;
        width: 1.55rem;
        height: 1.55rem;
        display: flex;
        justify-content: center;
        overflow: hidden;
        align-items: center;
        // -webkit-animation: living 3s linear infinite;
      }
    }
  }

  .menu {
    margin-top: 16px;
  }
}
</style>