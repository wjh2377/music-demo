//搜索模块
import request from "@/utils/request"
//热搜关键字
export const searchList = params => request({
    method: 'get',
    url: '/search/hot',
    params
})
//搜索结果
export const search = params => request({
    method: 'get',
    url: '/cloudsearch',
    params
})