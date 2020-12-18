import store from '@/store'
import { getUser } from '@/api/user'
import { Dialog, Toast } from 'vant'
import { emoji } from '@/utils/emoji'
import ToolsMusic from './components/ToolsMusic.vue'

export default {
  name: 'Chat',
  data() {
    return {
      userInfo: store.getters.userInfo,
      myId: store.getters.userInfo.id,
      list: [],
      msg: '',
      loading: false,
      finished: true,
      matchUser: {},
      showMatchUserInfo: false,
      // 禁用输入
      disabled: false,
      emoji: emoji,
      emojiShow: false,
      emojiTools: false
    }
  },
  components: {
    ToolsMusic
  },
  mounted() {
    //获取用户信息
    this.getMatchUser()
    //发送一个测试信息，否则对方发送的信息将被其他文件的实例接收
    let message = {
      type: 'TEST'
    }
    this.handleMsg(JSON.stringify(message))
  },
  methods: {
    // 发送音乐
    handleMusicSend(content) {
      let message = {
        type: 'SEND',
        content,
        targetId: this.$route.params.id
      }
      //序列化json对象为字符串
      this.handleMsg(JSON.stringify(message))
      this.list.push(content)

      //清空输入框
      this.msg = ''
    },
    // 打开emoji栏
    openEmoji() {
      this.emojiShow = !this.emojiShow
      this.emojiTools = false
    },
    // 打开消息工具栏
    openTools() {
      this.emojiTools = !this.emojiTools
      this.emojiShow = false
    },
    closeTools() {
      this.emojiShow = false
      this.emojiTools = false
    },
    addEmoji(item) {
      this.msg += item
    },
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
        this.quit()
      }
      this.$router.go(-1)
    },
    //退出聊天，通知对方
    quit() {
      let message = {
        type: 'QUIT',
        targetId: this.$route.params.id
      }
      //序列化json对象为字符串
      this.handleMsg(JSON.stringify(message))
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
      this.handleMsg(JSON.stringify(message))
      this.list.push(content)

      //清空输入框
      this.msg = ''
    },
    handleMsg(msg) {
      let that = this
      if (that.$global.ws && that.$global.ws.readyState == 1) {
        console.log('发送信息', msg)
        that.$global.ws.send(msg)
      }
      that.$global.ws.onmessage = function (res) {
        let msg = JSON.parse(res.data)
        console.log('收到服务器内容', msg)
        if (msg.type == 'SEND') {
          that.list.push(msg.content)
        } else if (msg.type == 'QUIT') {
          that.msg = ''
          that.disabled = true
          Toast({
            message: `对方已经离开`,
            position: 'bottom'
          })
        }
      }
    }
  }
}
