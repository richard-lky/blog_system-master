import { request } from './request'
// 文章

// 公告数据
export function ShowNotice() {
    return request({
        method: 'get',
        url: '/notice/showNotice'
    })
}
//标签数据
export function ShowTagsAll() {
    return request({
        url: '/tags/showTagsAll',
        method: 'get'
    })
} 
 //博主信息
export function ShowUser () {
  return request({
    url: '/about/showUser'
  })
}
 //文章信息
export function ShowArticleInfo (page=1, rows=10) {
  return request({
    url: '/article/showArticleInfo',
    method: 'get',
    params: {
      page: page,
      rows: rows
    }
  })
}
