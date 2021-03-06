/*
直接更新【state的多个方法】的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}){
    state.address = address
  },
  [RECEIVE_CATEGORIES] (state, {categories}){
    state.categories = categories
  },
  [RECEIVE_SHOPS] (state, {shops}){
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state, {userInfo}){
    state.userInfo = userInfo
  },
}
