import { request } from './request'
// 文章

// 学习资源数据
export function ShowResourceAll(page=1,rows=5) {
    return request({
        method: 'get',
        url: '/resource/showResourceAll',
        params: {
          page: page,
          rows: rows
        }
    })
}
//学习资源类别数量数据
export function ShowResourceCount() {
    return request({
        url: '/resource/showResourceCount',
        method: 'get'
    })
} 
 //博主信息
export function ShowUser () {
  return request({
    url: '/about/showUser',
    method: 'get'
  })
}
 //文章信息
export function ShowArticleInfo () {
  return request({
    url: '/article/showArticleInfo',
    method: 'get'
  })
}

//查询所有公告
export function ShowNotice(page = 1, rows = 5) {
  return request({
    method: 'get',
    url: '/notice/showNoticeAll',
    params: {
      page: page,
      rows: rows
    }
  })
}

// 添加公告
export function AddNotice (Notice) {
  console.log(Notice)
  return request({
    url: 'notice/AddNotice',
    method: 'post',
    params: Notice
  })
}

//模糊查询公告
export function showNoticeByContent (noticeContent, page = 1, rows = 5) {
  // rows = 2
  // console.log(noticeName, page, rows)
  return request({
    url: 'notice/showNoticeByContent',
    method: 'get',
    params: {
      noticeContent: noticeContent,
      page: page,
      rows: rows
    }
  })
}
// 删除公告
export function deleteNotice (noticeId) {
  return request({
    url: 'notice/deleteNoticeById',
    method: 'get',
    params: {
      noticeId: noticeId
    }
  })
}

//查询友链信息
export function ShowFriendsAll(page = 1, rows = 5) {
  return request({
    method: 'get',
    url: '/links/showFriendsAll',
    params: {
      page: page,
      rows: rows
    }
  })
}

// 添加友链
export function addLink (Link) {
  console.log(Link)
  return request({
    url: 'links/addLink',
    method: 'post',
    params: Link
  })
}

// 修改友链
export function updateLinks (Link) {
  console.log(Link)
  return request({
    url: 'links/updateLinks',
    method: 'post',
    params: Link
  })
}

// 删除友链
export function deleteLinks (linksId) {
  return request({
    url: 'links/deleteLinksById',
    method: 'get',
    params: {
      linksId: linksId
    }
  })
}

//查询照片墙信息
export function ShowPhotoAll(page = 1, rows = 5) {
  return request({
    method: 'get',
    url: 'photo/showPhotoAll',
    params: {
      page: page,
      rows: rows
    }
  })
}

// 添加照片墙
export function addPhoto (Photo) {
  console.log(Photo)
  return request({
    url: 'photo/addPhoto',
    method: 'post',
    params: Photo
  })
}

// 修改照片墙
export function updatePhoto (Photo) {
  console.log(Photo)
  return request({
    url: 'photo/updatePhoto',
    method: 'post',
    params: Photo
  })
}

// 删除照片墙
export function deletePhoto (photoId) {
  return request({
    url: 'photo/deletePhotoById',
    method: 'get',
    params: {
      photoId: photoId
    }
  })
}

// 添加资源
export function addResource (Resource) {
  console.log(Resource)
  return request({
    url: 'resource/addResource',
    method: 'post',
    params: Resource
  })
}

// 修改资源
export function updateResource (Resource) {
  console.log(Resource)
  return request({
    url: 'resource/updateResource',
    method: 'post',
    params: Resource
  })
}

// 删除资源
export function deleteResource (resourceId) {
  return request({
    url: 'resource/deleteResourceById',
    method: 'get',
    params: {
      resourceId: resourceId
    }
  })
}
//查询资源分类信息
export function ShowResourceCategory() {
  return request({
    method: 'get',
    url: 'resource/showResourceCategory',
  })
}

//根据资源分类查询信息
export function ShowResourceByCategory(resourceCategory,page = 1,rows = 5) {
  console.log(resourceCategory)
  return request({
    method: 'get',
    url: 'resource/showResourceByCategory',
    params: {
      resourceCategory: resourceCategory,
      page: page,
      rows: rows
    }
  })
}
