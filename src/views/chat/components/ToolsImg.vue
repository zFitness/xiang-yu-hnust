<template>
  <div class="tools-item">
    <van-uploader v-model="fileList" :preview-image="false" capture="camera"
                  :after-read="readFile">
      <div class="tools-item-img">
        <van-icon name="photo-o" size="22px" />
      </div>
    </van-uploader>
    <div>图片</div>
  </div>
</template>


<script>
import { apiGetToken } from '@/api/qiniu'
import * as qiniu from 'qiniu-js'
import { getUUID } from '@/utils/uuid'
import { qiNiuUrl } from '@/config'

export default {
  name: 'ToolsImg',
  props: {
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
      //文件上传
      fileList: [],
      qiniuToken: ''
    }
  },
  mounted () {
    // 获取token
    this.getToken()
  },
  methods: {
    // 获取 token
    getToken () {
      apiGetToken().then(resp => {
        console.log(resp)
        this.qiniuToken = resp.data
      })
    },
    readFile (file) {
      console.log('读了文件: {}', file)
      // 上传后文件资源名以设置的 key 为主，如果 key 为 null 或者 undefined，则文件资源名会以 hash 值作为资源名。
      const key = getUUID() + '.' + file.file.name.split('.')[1]
      console.log(key)
      // 七牛云配置
      let config = {
        useCdnDomain: true, //表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
        region: qiniu.region.z0 // 根据具体提示修改上传地区,当为 null 或 undefined 时，自动分析上传域名区域
      }

      let putExtra = {
        fname: '', //文件原文件名
        params: {}, //用来放置自定义变量
        mimeType: null //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
      }

      let observable = qiniu.upload(file.file, key, this.qiniuToken, putExtra, config)
      observable.subscribe({
        next: result => {
          // 主要用来展示进度
          console.log(result)
        },
        error: errResult => {
          // 失败报错信息
          console.log(errResult)
        },
        complete: result => {
          // 接收成功后返回的信息
          let url = qiNiuUrl + '/' + result.key;
          this.send(url)
        }
      })
    },
    send (url) {
      let content = {
        id: this.userInfo.id,
        avatar: this.userInfo.avatar,
        msgType: 'img',
        content: url,
        time: new Date()
      }
      this.$emit("send", content)
    },
  }
}
</script>

<style lang="scss" scoped>
.tools-item {
  flex-direction: column;
  align-items: center;
  display: flex;
  .tools-item-img {
    padding: 0.32rem;
    box-sizing: border-box;
    border-radius: 16px;
    background: #fff;
    margin-bottom: 8px;
  }
}
</style>