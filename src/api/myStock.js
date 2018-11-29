import request from './request'
// 获取二级商品信息列表
function getStockList(data){
    return request({
        method:'get',
        url:'bufanapi/api/admin/goods/stockList',
        data
    })
}
// 添加二级商品信息
function addStockMsg(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/goods/saveStock',
        data
    })
}
// 编辑修改二级商品信息
function editStockMsg(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/goods/updateStock',
        data
    })
}
// 删除二级商品信息
function delStockMsg(data){
    return request({
        method:'get',
        url:'bufanapi/api/admin/goods/delStock',
        data
    })
}
// 根据id查询商品信息
function findStockMsg(data){
    return request({
        method:'post',
        url:'bufanapi/api/admin/goods/goodsDetail api/admin/goods/goodsStockDetail',
        data
    })
}
export default{
    getStockList,
    addStockMsg,
    editStockMsg,
    delStockMsg,
    findStockMsg
}