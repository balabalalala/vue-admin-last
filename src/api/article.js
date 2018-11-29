import request from './request'

//这里是获取文章列表
function getArticleList(data){
  return request ({
    url: '/api/article/list',
    method:'get',
    data
  })
}
//这里是获取文章列表
function getArticleById(data){
  return request ({
    url: '/api/article/getArticleById',
    method:'get',
    data
  })
}

//查看文章
function preview(data){
  return request({
    url:'/api/article/detail',
    method:'get',
    data
  })
}
//删除文章
function deleteArticle(data){
  return request({
    url:'/api/article/del',
    method:'get',
    data
  })
}
//编辑文章
function updateArticle(data){
  return request ({
    url: 'api/article/update',
    method: 'post',
    data
  })
}
function updateState(data){
  return request ({
    url: 'api/article/updateState',
    method: 'post',
    data
  })
}
//新增文章
function saveArticle(data){
  return request ({
    url: 'api/article/save',
    method: 'post',
    data
  }) 
}
export default {
  getArticleList,
  preview,
  updateArticle,
  saveArticle,
  deleteArticle,
  updateState,
  getArticleById
}
