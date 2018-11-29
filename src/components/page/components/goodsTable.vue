<template>
    <div class="goods-table">
        <el-table :data="mygoodsList" border style="width: 100%" height="500" 
        :cell-class-name="ishot" @expand-change="handleOpen">
          <el-table-column type="expand" >
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="价格">
                  <span>进价：{{ props.row.goods.priceIn }}</span>
                  <span>卖出价格：{{ props.row.goods.priceOut}}</span>
                  <span>当前价格：{{ props.row.goods.priceNow }}</span>
                </el-form-item>
                <el-form-item label="描述">
                  <span>{{ props.row.goods.desc }}</span>
                </el-form-item>
                <el-form-item label="型号">
                  <span> s型号: {{ props.row.goods.size_s }}</span>
                  <span> m型号: {{ props.row.goods.size_m }}</span>
                  <span> l型号: {{ props.row.goods.size_l }}</span>
                </el-form-item>
                <el-form-item label="颜色">
                  <span class="bgcolor" :style="{background:props.row.goods.color1}"
                  :title="props.row.goods.color1"></span>
                  <span class="bgcolor" :style="{background:props.row.goods.color2}"
                  :title="props.row.goods.color2"></span>
                  <span class="bgcolor" :style="{background:props.row.goods.color3}"
                  :title="props.row.goods.color3"></span>
                </el-form-item>
                <el-form-item label="库存" v-for="item of props.row.subList" :key="item.id">
                  <span> 剩余库存: {{item.count }}</span>
                    color:<span class="bgcolor" :style="{background:item.color}"
                      :title="item.color"></span>
                  <span> 型号: {{ item.size }}</span>
                  <el-button type="success" plain @click="handcleEdit(item)">编辑</el-button>
                  <el-button type="danger" plain @click="hancleDel(item.id,true)">删除</el-button>
                </el-form-item>
                <el-form-item label="商品页面html信息">
                  <span>{{ props.row.goods.content}}</span>
                </el-form-item>
                <el-row>
                  <el-button type="primary" plain @click="openAdd(props.row.goods.id)">添加二级信息</el-button>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="goods.addTime" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="goods.brandId" label="品牌"  width="150">
          </el-table-column>
          <el-table-column prop="goods.name" label="商品名称"  width="150">
          </el-table-column>
          <el-table-column prop="goods.hot" label="hot" width="120" >
          </el-table-column>
          <el-table-column prop="goods.img" label="banner图片" width="280" >
              <template scope='scope'>
                  <img class="banner" :src="editAdress + scope.row.goods.img1" alt="">
                  <img class="banner" :src="editAdress + scope.row.goods.img2" alt="">
                  <img class="banner" :src="editAdress + scope.row.goods.img3" alt="">
              </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                  <el-button size="mini" @click="openEdit(scope.row.goods)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="delGoodsMsg(scope.row.goods.id,false)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    props:[
        'mygoodsList',
        'editAdress',
        'uploadAdress',
        'stockGoods'
    ],
    methods:{
        openEdit(data){
          console.log(data)
            this.$emit('openEdit',data)
        },
        delGoodsMsg(id,flag){
            this.$emit('delGoodsMsg',id,flag)
        },
        ishot({row,rowIndex}){
            if(row.goods.hot == '热卖'){
                return 'hot123'
            }
        },
       handleOpen(row, expandedRows){
          this.$emit('handleOpen',row, expandedRows)
          console.log(row, expandedRows)
        },
        openAdd(addId){
          this.$emit('openAdd',addId)
        },
        handcleEdit(data){
          this.$emit('handcleEdit',data)
        },
        hancleDel(delId,flag){
          this.$emit('hancleDel',delId,flag)
        }
    }
}
</script>
<style scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.banner{
  width: 60px;
  height: 50px;
}
.banner1{
  width: 100%;
  height: 100%;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .bgcolor{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  >>>.hot123{
    color:red ;

}
</style>

