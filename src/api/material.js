import request from '@/api/request'

//获取所有的图片
function getMaterialList(data) {
  return request({
    url: '/api/material/list',
    method:'get',
    data
  })
}
//删除图片
function delMaterialImg(data) {
  return request({
    url: '/api/material/del',
    method:'get',
    data
  })
}
//添加图片
function addMaterialImg(data){
  return request({
    url: '/api/material/add',
    method:'post',
    data
  })
}

//更改图片title
function materialRTitle(data){
  return request({
    url: '/api/material/materialRTitle',
    method:'post',
    data
  })
}

//更新素材
//更改图片title
function updateMaterial(data){
  return request({
    url: '/api/material/update',
    method:'post',
    data
  })
}

//获取所有分组
function getGroupList() {
  return request({
    url: '/api/group/list',
    method: 'get'
  })
}
//添加分组
function addGroup(data) {
  return request({
    url: '/api/group/add',
    method: 'post',
    data
  })
}
//删除分组
function delGroup(data){
  return request({
    url:'/api/group/del/',
    method: 'get',
    data
  })
}
//重命名分组
function renameGroup(data){
  return request({
    url: '/api/group/reName',
    method: 'post',
    data
  })
}
//移动分组
function changeGroup(data){
  return request({
    url: '/api/material/changeGroup',
    method:'post',
    data
  })
}
//获取标签
function getTag(data){
  return request({
    url:"/api/tag/list",
    method:'get',
    data
  })
}
//更改标签
function renameTag(data){
  return request({
    url:"/api/tag/reName",
    method:'post',
    data
  })
}
//删除标签
function delTag(data){
  return request({
    url:'/api/tag/del',
    method:'get',
    data
  })
}
//增加标签
function addTag(data){
  return request({
    url:"/api/tag/add",
    method:'post',
    data
  })
}
// 标签列表
function tagList(data){
  return request({
    url:"/api/tag/list",
    method:'get',
    data
  })
}
function saveTag(data){
  return request({
    url:"/api/tag/save",
    method:'post',
    data
  })
}


function updateTag(data){
  return request({
    url:"/api/tag/update",
    method:'post',
    data
  })
}

export var materialApi = {
  getMaterialList,
  delMaterialImg,
  addMaterialImg,
  materialRTitle,
  updateMaterial


} 
export var groupApi = {
  getGroupList,
  addGroup,
  delGroup,
  renameGroup,
  changeGroup



} 
export var tagApi = {
  getTag,
  renameTag,
  delTag,
  addTag,
  tagList,
  saveTag,
  updateTag
} 

// export default({
//   getGrouping,
//   addGroup,
//   delGroup,
//   getMaterialList,
//   renameGroup,
//   addMaterialImg,
//   changeGroup,
//   delMaterialImg,
//   tagList,
//   saveTag,
//   delTag,
//   updateTag
// })

