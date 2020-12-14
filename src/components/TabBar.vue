<template>
  <van-tabbar fixed route v-model="active" @change="handleChange" class="tabbar">
    <van-tabbar-item icon="chat-o" to="/home"></van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/profile"></van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      active: this.defaultActive
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabbar {
  height: 48px;
  background: #ededed;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
