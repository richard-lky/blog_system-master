import { request } from './request'
// 文章

// 根据文章Id查询评论
export function ShowCommentById(articleId, page = 1, rows = 5) {
    return request({
        method: 'get',
        url: '/comment/showById',
        params: {
          articleId: articleId,
          page: page,
          rows: rows
        },
    })
}

// 分页查询所有评论
export function ShowCommentAll(page = 1, rows = 5) {
  return request({
      method: 'get',
      url: '/comment/showCommentAll',
      params: {
        page: page,
        rows: rows
      },
  })
}

// 分页查询所有评论
export function SelectByArticleTitleOrContent(commentContent,page = 1, rows = 5) {
  console.log(commentContent);
  return request({
      method: 'get',
      url: '/comment/selectByArticleTitleOrContent',
      params: {
        commentContent: commentContent,
        page: page,
        rows: rows
      },
  })
}

// 分页查询所有评论
export function deleteComment(commentId) {
  return request({
      method: 'get',
      url: '/comment/deleteCommentByCommentId',
      params: {
        commentId: commentId
      },
  })
}

