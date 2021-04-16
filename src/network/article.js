import { request } from './request'
// 文章

// 查询文章分类个数
export function showCategoryCount() {
    return request({
        method: 'get',
        url: '/article/showCategoryCount'
    })
}

// 根据id查询文章
export function ShowArticleById(articleId) {
  return request({
      url: '/article/selectArticleById',
      method: 'get',
      params: {
        articleId: articleId
      }
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

//根据文章ID查询分类
export function ShowCategory(page=1,rows=100) {
  return request({
    url: '/category/showCategoryAll',
    method: 'get',
    params: {
      page: page,
      rows: rows
    }
  })
}
//根据分类和标签查询
export function ShowArticleByCategoryAndTags(categoryId, tagsId, page = 1, rows = 5) {
  console.log(categoryId,"+++",tagsId)
  return request({
    url: '/article/showArticleByCategoryAndTags',
    method: 'get',
    params: {
      categoryId: categoryId,
      tagsId: tagsId,
      page: page,
      rows: rows
    }
  })
}

//根据标题模糊查询
export function ShowArticleByLike(articleTitle, page = 1, rows = 5) {
  return request({
    url: '/article/showArticleByLike',
    method: 'get',
    params: {
      articleTitle: articleTitle,
      page: page,
      rows: rows
    }
  })
}

//删除文章
export function deleteArticle(articleId) {
  return request({
    url: '/article/deleteArticle',
    method: 'get',
    params: {
      articleId: articleId
    }
  })
}

//更改发布状态
export function changeToDraft(articleId,value) {
  return request({
    url: '/article/changeToDraft',
    method: 'get',
    params: {
      articleId: articleId,
      value: value
    }
  })
}


//发布文章
export function publishArticle(Article) {
  console.log("+++",Article)
  return request({
    url: '/article/insertArticle',
    method: 'post',
    params: Article
  })
} 

//删除编辑器中的图片
export function deleteImage(file) {
  console.log("+++",file)
  return request({
    url: '/upload/deleteImage',
    method: 'get',
    // async: false,
    // cache: false,
    // contentType: false,
    // processData: false,
    params: {
      key: file,
      }
  })
} 

//增加文章被点击数
export function addArticleViews(articleId,views) {
  return request({
    url: '/article/addArticleViews',
    method: 'get',
    params: {
      articleId: articleId,
      views: views,
      }
  })
} 

//根据文章的查询次数查询文章
export function ShowArticleByViews() {
  return request({
    url: '/article/showArticleByViews',
    method: 'get',
  })
} 

