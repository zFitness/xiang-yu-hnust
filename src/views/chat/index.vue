<template>
  <div class="chat-container">
    <van-nav-bar class="nav-bar" @click-left="onClickLeft" left-text="返回" left-arrow>
      <template #title>
        <div class="title">张三</div>
      </template>
      <template #left @click="onClickLeft">
        <van-icon name="arrow-left" size="18" />
      </template>
      <template #right>
        <van-icon name="user-o" size="18" />
      </template>
    </van-nav-bar>

    <div class="message-box">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div class="message-item" v-for="(item,index) in list" :key="index">
          <div class="message-item-content" v-if="item.id != myId">
            <van-image class="avatar" round width="1rem" height="1rem" :src="item.avatar" />
            <div class="message-content">
              {{item.content}}
            </div>
          </div>
          <div class="message-item-content-me" v-else>
            <van-image class="avatar" round width="1rem" height="1rem" :src="item.avatar" />
            <div class="message-content">
              {{item.content}}
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <div class="control-bottom">
      <van-icon class="emoji-btn" name="smile-o" size="20" />

      <van-field class="input" v-model="msg" placeholder="输入消息" />

      <van-button class="send-btn" size="small" type="primary" @click="send">发送</van-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      myId: 2,
      list: [
      ],
      msg: '',
      loading: false,
      finished: true,
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
    },
    send() {
      let item = {
        id: this.myId,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        msgType: 'text',
        content: this.msg,
        time: new Date()
      }
      this.list.push(item)
    },
    onLoad() {
      for (let i = 1; i < 20; i++) {
        let item;
        if (i % 2 == 1) {
          item = {
            id: 1,
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
            msgType: 'text',
            content: `你好，我是一个好人${i}`,
            time: '2020-11-20 11:11:11'
          }
        } else {
          item = {
            id: 2,
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
            msgType: 'text',
            content: `你好，我是一个好人${i}`,
            time: '2020-11-20 11:11:11'
          }
        }
        this.list.push(item)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.chat-container {
  height: 100%;
  .nav-bar {
    background: $m-primary;
    color: #fff;
    height: 48px;
    .title {
      color: #fff;
      font-size: 16px;
    }
    .van-nav-bar__title {
      color: #fff !important;
    }
    .van-icon {
      color: #fff !important;
    }
  }

  .message-box {
    padding: 0.32rem;
    height: calc(100% - 96px);
    box-sizing: border-box;
    overflow-x: scroll;
    display: flex;
    flex-direction: column-reverse;
    .message-item-content {
      height: 64px;
      display: flex;
      padding: 0.1rem;
      align-items: center;
      .message-content {
        background: #ededed;
        padding: 0.32rem;
        border-radius: 4px;
        margin-left: 4px;
      }
    }

    .message-item-content-me {
      height: 64px;
      display: flex;
      flex-direction: row-reverse;
      padding: 0.1rem;
      align-items: center;
      .message-content {
        background: #528fff;
        color: #fff;
        padding: 0.32rem;
        border-radius: 4px;
        margin-right: 4px;
      }
    }
  }

  .control-bottom {
    height: 48px;
    position: fixed;
    background: #fff;
    bottom: 0;
    width: 100%;
    border-top: 2px solid #ebedf0;
    display: flex;
    align-items: center;
    padding: 0 0.32rem;
    box-sizing: border-box;
    .emoji-btn {
      font-size: 30px;
    }

    .input {
    }

    .send-btn {
      padding-left: 16px;
      padding-right: 16px;
      width: 80px;
    }
  }
}
</style>