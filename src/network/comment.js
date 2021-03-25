import { request } from './request'
// 文章

// 分页查询文章
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

