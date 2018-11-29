<template>
	<div class="test-main">
		<h1>测试页面</h1>
		<ul>
			<li @click="del(goods)" v-for="goods in goodsList">{{goods}}</li>
		</ul>
		<button @click="getKindList">获取所有列表</button>
		<button @click="add">添加</button>
	</div>
	
</template>

<script>
	import kindApi from '@/api/kind3.js'
	export default {
		name:'Test',
		data(){
			return {
				goodsList:[]

			}
		},
		methods:{
			getKindList(){
				kindApi.getKindList()
					.then(res=>{
						console.log(res);
						this.goodsList = res.data.data;
					})
			},
			del(obj){
				var id = obj.goodsKind.id;
				var type = '0';
				kindApi.delKind({
					id,
					type
				}).then(res=>{
					// alert(res.data.code);
					if(res.data.code == 'S'){
						this.$message.success('删除成功！');
						this.getKindList();
					}
				})
			},
			add(){
				// kindApi.addKind({
				// 	id:'xx',
				// 	title:'xx'
				// })
				kindApi.addKind({
					goodsKind:{
						title:'热风',
						ctitle:'就是热风'
					}
				}).then(res=>{
					if(res.data.code=="S"){
						this.$message.success('保存成功！');
						this.getKindList();
					}else{
						this.$message.error('保存失败！');
					}
				})
			}

		}
	}
</script>