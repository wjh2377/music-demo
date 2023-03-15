// api文件夹下 各个请求模块js, 都统一来到index.js再向外导出
import { recommendMusic, recommendsMusic } from './Home'
import { searchList, search } from './Search'
import { getSongById, getLyricById } from './Play'


export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出
export const recommendsMusicAPI = recommendsMusic // 请求推荐歌曲的方法导出
export const searchListAPI = searchList  //热门搜索的方法导出
export const searchAPI = search  //搜索的方法导出
export const getSongByIdAPI = getSongById //播放页面获取歌曲方法导出
export const getLyricByIdAPI = getLyricById  //播放页面获取歌词方法导出

