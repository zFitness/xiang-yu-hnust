<template>
  <div class="match-container">
    <div class="navbar">
      <van-icon name="arrow-left" />
      <div>寻找新朋友...</div>
    </div>
    <div class="start-btn">
      <van-button size="large" class="btn" to="/match">离开</van-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Match',
  methods: {
    onClickLeft() {

    }
  }
}
</script>

<style lang="scss" scoped>
.match-container {
  height: 100%;
  .navbar {
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 18px;
    padding-left: 0.64rem;
    box-sizing: border-box;
    .van-icon {
      color: #666666 !important;
    }
    div {
      margin-left: 20px;
    }
  }
}
</style>