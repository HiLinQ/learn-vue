/*
通过mutation间接更新【state的多个方法】的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategories,
  reqShops
} from '../api'

export default {
  //异步获取地址
  async getAddress({commit, state}){
    //发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    //提交一个mutation
    if(result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  //异步获取食品分类列表
  async getCategories({commit}){
    //发送异步ajax请求
    const result = await reqFoodCategories()
    //提交一个mutation
    if(result.code === 0){
      const categories = result.data
      commit(RECEIVE_CATEGORIES, {categories})
    }
  },
  //异步获取商家列表
  async getShops({commit, state}){
    //发送异步ajax请求
    const result = await reqShops(state.latitude, state.longitude)
    //提交一个mutation
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
}