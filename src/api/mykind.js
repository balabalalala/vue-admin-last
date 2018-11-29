import request from './request'
//获取分类列表
function getKindList(data){
    return request({
        method:'get',
        url:'bufanapi/api/admin/kind/list',
        data
    })
}
//删除getKindList的每行数据
function delGetKind(data){
    console.log('res')
    return request({
        method:'get',
        url:'bufanapi/api/admin/kind/del',
        //向后台发送需要的参数，后台根据相应的参数删除数据
        data
    })
}
//添加父级分类列表
function addGetKind(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/kind/save',
        data
    })
}
//编辑修改父类的分类列表
function editGetKind(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/kind/update',
        data
    })
}

export default{
    getKindList,
    delGetKind,
    addGetKind,
    editGetKind,

}
    