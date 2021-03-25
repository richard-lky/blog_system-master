import { request } from './request'
// 文章

// 学习资源数据
export function ShowResourceAll() {
    return request({
        method: 'get',
        url: '/resource/showResourceAll'
    })
}
//学习资源类别数量数据
export function ShowResourceCount() {
    return request({
        url: '/resource/showResourceCount',
        method: 'get'
    })
} 
 //博主信息
export function ShowUser () {
  return request({
    url: '/about/showUser',
    method: 'get'
  })
}
 //文章信息
export function ShowArticleInfo () {
  return request({
    url: '/article/showArticleInfo',
    method: 'get'
  })
}

//查询友链信息
export function ShowFriendsAll(page = 1, rows = 5) {
  return request({
    method: 'get',
    url: '/links/showFriendsAll',
    params: {
      page: page,
      rows: rows
    }
  })
}
