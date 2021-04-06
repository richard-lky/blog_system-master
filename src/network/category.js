import { request } from './request'
// 文章

// 分类数据
export function ShowCategoryCount() {
    return request({
        method: 'get',
        url: '/category/showCategoryCount'
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
export function ShowArticleInfo () {
  return request({
    url: '/article/showArticleInfo'
  })
}

 //查询所有分类信息
 export function ShowCategoryAll (page=1, rows=5) {
  return request({
    url: '/category/showCategoryAll',
    method: 'get',
    params: {
      page: page,
      rows: rows
    }

  })
}
