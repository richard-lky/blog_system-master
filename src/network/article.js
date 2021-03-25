import { request } from './request'
// 文章

// 查询文章分类个数
export function showCategoryCount() {
    return request({
        method: 'get',
        url: '/article/showCategoryCount'
    })
}

// 分页查询文章
export function ArticleShow(page = 1,rows = 5) {
    return request({
        url: '/article/articleShow',
        method: 'get',
        params: {
          page: page,
          rows: rows
        }
    })
} 

//查询每月文章总数
export function ShowMonthArticleCount () {
  return request({
    method: 'get',
    url: '/article/showMonthArticleCount'
  })
}
