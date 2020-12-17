<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" @click-left="onClickLeft" left-text="返回" left-arrow>
      <template #title>
        <div class="title">{{matchUser.nickname}}</div>
      </template>
      <template #left @click="onClickLeft">
        <van-icon name="arrow-left" size="18" />
      </template>
      <template #right>
        <van-icon name="user-o" size="18" @click="showMatchUser" />
      </template>
    </van-nav-bar>

    <!-- 消息列表 -->
    <div class="message-box">
      <van-list v-model="loading" :finished="finished">
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

    <!-- 输入框 -->
    <div class="control-bottom">
      <van-icon class="emoji-btn" name="smile-o" size="20" />

      <van-field class="input" v-model="msg" placeholder="输入消息" @keyup.enter="send" :disabled="disabled" />

      <van-button class="send-btn" size="small" type="primary" @click="send">发送</van-button>

    </div>

    <!-- 用户信息弹出框 -->
    <van-dialog v-model="showMatchUserInfo" title="对方信息" :overlay="false">
      <div class="match-user-info">
        <div class="img">
          <van-image round width="1.5rem" height="1.5rem" :src="matchUser.avatar" />
        </div>
        <div>昵称：{{ matchUser.nickname}}</div>
        <div>性别：
          <van-icon class-prefix="my-icon" :name="matchUser.gender=='男'?'nan':'nv'" />
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { getUser } from '@/api/user'
import { Dialog, Toast } from 'vant';

export default {
  name: 'Chat',
  data() {
    return {
      userInfo: store.getters.userInfo,
      myId: store.getters.userInfo.id,
      list: [
      ],
      msg: '',
      loading: false,
      finished: true,
      matchUser: {},
      showMatchUserInfo: false,
      // 禁用输入
      disabled: false
    }
  },
  mounted() {
    //获取用户信息
    this.getMatchUser();
    //发送一个测试信息，否则对方发送的信息将被其他文件的实例接收
    let message = {
      type: 'TEST',
    }
    this.handleMsg(JSON.stringify(message));
  },
  methods: {
    //得到匹配的人信息
    getMatchUser() {
      getUser(this.$route.params.id).then(resp => {
        console.log(resp)
        this.matchUser = resp.data.userInfo
      })
    },
    // 显示匹配用户的信息
    showMatchUser() {
      this.showMatchUserInfo = true
    },
    onClickLeft() {
      //如果对方没有退出，
      if (this.disabled == false) {
        this.quit();
      }
      this.$router.go(-1);
    },
    //退出聊天，通知对方
    quit() {
      let message = {
        type: 'QUIT',
        targetId: this.$route.params.id
      }
      //序列化json对象为字符串
      this.handleMsg(JSON.stringify(message));
    },
    send() {
      if (this.msg == '') {
        return
      }
      let content = {
        id: this.myId,
        avatar: this.userInfo.avatar,
        msgType: 'text',
        content: this.msg,
        time: new Date()
      }

      let message = {
        type: 'SEND',
        content,
        targetId: this.$route.params.id
      }
      //序列化json对象为字符串
      this.handleMsg(JSON.stringify(message));
      this.list.push(content)

      //清空输入框
      this.msg = ''
    },
    handleMsg(msg) {
      let that = this;
      if (that.$global.ws && that.$global.ws.readyState == 1) {
        console.log("发送信息", msg);
        that.$global.ws.send(msg);
      }
      that.$global.ws.onmessage = function(res) {
        let msg = JSON.parse(res.data);
        console.log("收到服务器内容", msg);
        if (msg.type == 'SEND') {
          that.list.push(msg.content)
        } else if (msg.type == 'QUIT') {
          that.msg = ''
          that.disabled = true
          Toast({
            message: `对方已经离开`,
            position: 'bottom'
          });

        }
      };
    }
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
    flex-direction: column;
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
        word-wrap: break-word;
        max-width: 100%;
        overflow-x: hidden;
        font-size: 16px;
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
        margin-left: 4px;
        word-wrap: break-word;
        max-width: 100%;
        overflow-x: hidden;
        font-size: 16px;
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
  .van-dialog {
    background-color: #f2f3f5;
    /deep/ .van-button--default {
      color: rgba(0, 0, 0, 0.7) !important;
      background: #f2f3f5 !important;
    }
  }
  // 用户信息弹出框
  .match-user-info {
    .img {
      background: #fff;
      border-radius: 50%;
      width: 1.55rem;
      height: 1.55rem;
      margin: 12px auto;
    }
    div {
      margin-bottom: 12px;
    }
    padding: 0.32rem;
    font-size: 18px;
  }
}
</style>