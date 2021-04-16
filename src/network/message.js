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
// 发表留言
export function AddMessage(Words) {
    return request({
        method: 'post',
        url: '/words/insertMessageReply',
        params: Words
    })
}
// 回复留言
export function AddMessageReply(Words) {
    return request({
        method: 'post',
        url: '/words/insertMessageReply',
        params: Words
    })
}

// 后台-查询留言
export function ShowMessageAll(page = 1, rows = 10) {
    return request({
        method: 'get',
        url: '/words/showMessageAll',
        params: {
            page: page,
            rows: rows
        }
    })
}

// 后台-根据留言者姓名或者内容查询留言
export function SelectByWordNameOrContent(woredsName,page = 1, rows = 10) {
    return request({
        method: 'get',
        url: '/words/selectByWordNameOrContent',
        params: {
            woredsName: woredsName,
            page: page,
            rows: rows
        }
    })
}
// 后台-根据留言ID添加回复
export function addWordsReply(WordsReply) {
    return request({
        method: 'post',
        url: '/words/insertIntoWoredsReplyByWoredsId',
        params: WordsReply
    })
}

// 后台-根据留言ID删除回复
export function DeleteWordReplyByReplyId(replyId) {
    return request({
        method: 'get',
        url: '/words/deleteWordReplyByReplyId',
        params: {
            replyId: replyId
        }
    })
}
