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
export function ShowTagsAll(page=1,rows=5) {
    return request({
        url: '/tags/showTagsAll',
        method: 'get',
        params: {
          page: page,
          rows: rows
        }
    })
} 

//添加标签
export function AddTags(tags) {
  return request({
      url: '/tags/addTags',
      method: 'post',
      params: tags
  })
} 

//模糊查询标签
export function ShowTagsBylike(tagsName, page=1, rows=5) {
  return request({
      url: '/tags/showTagsByLike',
      method: 'get',
      params: {
        tagsName: tagsName,
        page: page,
        rows: rows
      }
  })
} 
//删除标签
export function deleteTags(tagsId) {
  return request({
      url: '/tags/deleteTags',
      method: 'get',
      params: {
        tagsId: tagsId,
      }
  })
} 

//修改标签
export function updateTags(tags) {
  console.log("++**//",tags)
  return request({
      url: '/tags/updateTags',
      method: 'post',
      params: tags
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
