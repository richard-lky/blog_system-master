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

 //模糊查询分类信息
 export function ShowCategoryBylike (categoryName, page=1, rows=5) {
  return request({
    url: '/category/showCategoryByLike',
    method: 'get',
    params: {
      categoryName: categoryName,
      page: page,
      rows: rows
    }
  })
}

 //添加分类信息
 export function AddCategory (Category) {
   console.log("*//**/55555",Category)
  return request({
    url: '/category/insertCategory',
    method: 'post',
    params: Category
    
  })
}

 //修改分类信息
 export function updateCategory (Category) {
  return request({
    url: '/category/updateCategory',
    method: 'post',
    params: Category
    
  })
}

 //删除分类信息
 export function deleteCategory (categoryId) {
  return request({
    url: '/category/deleteCategory',
    method: 'get',
    params: {
      categoryId: categoryId,
    }
  })
}