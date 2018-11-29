import request from './request'
function getKindList(data){
	return request({
		method:'get',
		url:'bufanapi/api/admin/kind/list',
		data
	})
}
//删除
function delKind(data){
	return request({
		method:'get',
		url:"bufanapi/api/admin/kind/del",
		data
	})
}
//添加
function addKind(data){
	return request({
		method:'post',
		url:'bufanapi/api/admin/kind/save',
		data
	})
}

export default {
	getKindList,
	delKind,
	addKind
}