import request from './request'
// 获取商品信息列表
function getGoodsList(data){
    return request({
        method:'get',
        url:'bufanapi/api/admin/goods/list',
        data
    })
}
// 删除商品信息
function deleGoodsMsg(data){
    return request({
        method:'get',
        url:'bufanapi/api/admin/goods/del',
        data
    })
}
// 添加商品信息
function AddGoodsMsg(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/goods/save',
        data
    })
}
// 编辑修改商品信息
function EditGoodsMsg(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/goods/update',
        data
    })
}
export default{
    getGoodsList,
    deleGoodsMsg,
    AddGoodsMsg,
    EditGoodsMsg
}