import api from './index'
// axios
import request from '@/utils/request'

// 注册
export function apiGetToken() {
  return request({
    url: '/token',
    method: 'GET',
    hideloading: false
  })
}
