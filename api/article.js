import {request} from '../plugins/request';

// 获取公共文章列表
export const getArticles = params => {
    return request({
      method: 'GET',
      url: '/api/articles',
      params
    })
  }
  
// 获取关注文章列表
export const getYourFeedArticles = params => {
    return request({
      method: 'GET',
      url: '/api/articles/feed',
      params,
    //   headers: {
        // 添加用户身份，数据格式：Token空格Token数据
        // Authorization: "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjE1Nzc2Nzg4NTBAcXEuY29tIiwidXNlcm5hbWUiOiJraXp6enQiLCJpYXQiOjE2NTU0NjAwNDEsImV4cCI6MTY2MDY0NDA0MX0.x_zFBAI8z7s-bJ0dBKT32cNIJJPwVEIve-UmIO-ePMw"
    //   }
    })
}
  
// 添加点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

// 取消点赞
export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}