import { request } from './request'
// 留言

// 查询留言
export function ShowWordsAll(page = 1, rows = 10) {
    return request({
        method: 'get',
        url: '/words/showWordsAll',
        params: {
            page: page,
            rows: rows
        }
    })
}
