<template>
<div class="my-goods">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-present"></i>商品信息列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="add-box">
            <el-row>
                <el-button type="primary"  plain @click="handcleAddGoods('form')">添加商品信息</el-button>
            </el-row>
            <span class="total-msg">共 {{total}} 条信息</span>
        </div>
        <!-- 表格 -->
        <goods-table
        :mygoodsList="mygoodsList"
        :editAdress="editAdress"
        :uploadAdress="uploadAdress"
        :stockGoods="stockGoods"
        @openEdit="openEdit"
        @delGoodsMsg="delGoodsMsg"
        @openAdd="openAdd"
        @handcleEdit="handcleEdit"
        @hancleDel="hancleDel"></goods-table>
      <!-- 分页 -->
       <div class="pagination">
         <el-pagination @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNumber"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
         </el-pagination>
      </div>
    </div>
  <!-- 编辑弹出框 -->
    <goods-edit 
      :inputValue='inputValue' 
      :title='title'
      :dialogFormVisible.sync="dialogFormVisible"
      :form='form' 
      :formLabelWidth='formLabelWidth'
      :mykindlist='mykindlist'
      :img1='img1'
      :img2='img2'
      :img3='img3'
      :editGoodsKind='editGoodsKind'
      :editAdress="editAdress"
      :uploadAdress="uploadAdress"
      @confirmEdit='confirmEdit'
      @confirmSave='confirmSave'
      @confirm='confirm'
      @close="close"
      @handleAvatarSuccess1='handleAvatarSuccess1'
      @handleAvatarSuccess2='handleAvatarSuccess2'
      @handleAvatarSuccess3='handleAvatarSuccess3'
      @handleChange='handleChange'>
    </goods-edit>
    <!-- 二级编辑弹出框 -->
    <stock-edit
    :form="form"
    :stockForm="stockForm"
    :formLabelWidth='formLabelWidth'
    :inputValue2='inputValue2'
    :title='title'
    :dialogStockVisible.sync="dialogStockVisible"
    @closeStock='closeStock'
    @confirmStock='confirmStock'></stock-edit>
    <!-- 删除弹出框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import goodsApi from '@/api/mygoods'
import kindApi from '@/api/mykind'
import stockApi from '@/api/myStock'
import goodsEdit from './components/goodsEdit'
import goodsTable from './components/goodsTable'
import stockEdit from './components/stockEdit'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    components: {
        quillEditor,
        goodsEdit,
        goodsTable,
        stockEdit
    },
    data() {
      return {
        editAdress:'http://192.168.0.171/',
        uploadAdress:'http://192.168.0.171/api/admin/upload',
        pageMsg:{
          start:1,
          limit:10,
        },
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        // 隐藏域，判断是编辑还是添加
        inputValue:'',
        isStock:true,//判断是谁调用的删除
        inputValue2:'',
        editGoodsKind:[],
        title:'',
        centerDialogVisible: false,
        dialogFormVisible: false,
        dialogStockVisible: false,
        delVisible:false,
        isActive:false,
        mygoodsList:[],
        mykindlist:[],
        stockList:{},
        stockGoods:[],
        delStockId:'',
        delgoodsId:'',
        editId:'',
        img1:'',
        img2:'',
        img3:'',
        form:{},
        stockForm:{},
        formLabelWidth: '100px',
      }
    },
    created(){
      this.getGoodsList(this.pageMsg)
    },
    methods: {
      close(){
        this.getGoodsList();
        this.dialogFormVisible = false;
      },
      // 封装的商品信息的方法
      getGoodsList(data){
        goodsApi.getGoodsList(data)
        .then(res=>{
          var regex = /^size/;
          this.pageNumber = res.data.data.pageNumber;
          this.total = res.data.data.totalRow;
          this.mygoodsList = res.data.data.list;
          for(let i = 0; i < this.mygoodsList.length;i++){
            var goodsItem = this.mygoodsList[i].goods;
            for(let item in goodsItem){
              if(regex.test(item)){
                goodsItem[item] === '1'? goodsItem[item] = '有库存': goodsItem[item] = '无库存';
              }
              if(item === 'hot'){
                goodsItem[item] === '1'? goodsItem[item] = '热卖': goodsItem[item] = '非热卖';
              }
            }
          }
        })
      },
      // 将字转换回1和0
      changeWord(){
        var regex = /^size/;
          for(let i = 0; i < this.mygoodsList.length;i++){
            var goodsItem = this.mygoodsList[i].goods;
            for(let item in goodsItem){
              if(regex.test(item)){
                goodsItem[item] === '有库存'? goodsItem[item] = 1: goodsItem[item] = 0;
              }
              if(item === 'hot'){
                goodsItem[item] === '热卖'? goodsItem[item] = 1: goodsItem[item] = 0;
              }
            }
          }
          console.log(this.mygoodsList)
      },
      // 添加和编辑选择分类所需要的数据
      getKindList(){
        kindApi.getKindList()//不带this指的是引用api中的方法。
        .then(res=>{
          this.mykindlist = res.data.data
          // 根据弹窗的级联样式表，需要把数据转换
          for(let i = 0;i<this.mykindlist.length;i++){
            this.editGoodsKind.push(this.mykindlist[i].goodsKind);
            this.editGoodsKind[i].children = this.mykindlist[i].list;
            this.editGoodsKind[i].value = this.editGoodsKind[i].id;
            this.editGoodsKind[i].label = this.editGoodsKind[i].ctitle;
            var editList = this.editGoodsKind[i].children;
            for(let j=0;j < editList.length;j++){
              if(this.inputValue == 1){
                if(this.form.kindId == editList[j].id){
                  this.form.kindList = [editList[j].pid,editList[j].id];
                }
              }
               editList[j].value = editList[j].id ;
               editList[j].label = editList[j].ctitle;
            }
          }
          console.log(this.mykindlist)
          console.log(this.editGoodsKind)
        })
      },
      // 父类打开删除弹窗,根据传过来的flag的值来判断是父类删除还是二级商品删除
      delGoodsMsg(id,flag){
        this.delVisible = true;
        this.isStock = flag
        this.delgoodsId = id;
      },
      //点击确定删除
      deleteRow(){
        if(this.isStock){
          stockApi.delStockMsg({id:this.delStockId})
          .then(res=>{
            this.getGoodsList(this.pageMsg)
          })
        }else{
          goodsApi.deleGoodsMsg(
              {id:this.delgoodsId}
          )
          .then(res=>{
              this.getGoodsList();
          })
        }
         this.delVisible = false;
            // 删除成功的弹出框
          this.$message({
              type: 'success',
              message: '删除成功!'
          }); 
      },
      //添加商品信息,打开弹窗
      handcleAddGoods(){
        // 因为弹出框绑定的是全局的img1,img2,img3,不是form的，所以要清空全局的img123
          this.img1 = '';
          this.img2 = '';
          this.img3 = '';
          this.title = '添加';
          this.dialogFormVisible = true;
          this.form = {};
          this.inputValue = '0';
          this.getKindList();
      },
       //编辑打开弹窗，并赋值
      openEdit(data){
        console.log(this.form)
        // 在打开编辑的时候把有库存等转回1和0
        this.changeWord();
        this.getKindList();
        // 因为在打开添加弹窗的时候，把绑定的全局img123清空了，所以要重新赋值
        this.form = Object.assign({}, data);
        this.img1 = data.img1
        this.img2 = data.img2
        this.img3 = data.img3
         this.title = '编辑' 
        this.inputValue = '1';
        this.dialogFormVisible = true;
       
          // 给form赋值，全局赋值，需要深拷贝
        
        console.log('====================')
        console.log(data)
        // 把我们不能修改的数据删除
        delete this.form.addTime;
        delete this.form.count;
        delete this.form.kindList;
      },
      // 点击确定的时候是编辑修改保存
      confirmEdit(){
        delete this.form.kindList;
          goodsApi.EditGoodsMsg({
            goods:this.form
          })
          .then(res=>{
            if(res.data.code === 'S'){
              this.getGoodsList();
              this.$message.success('修改成功')
            }
          })
      },
       // 点击确定的时候是增加保存
      confirmSave(){
        // 点击确定的时候把后台不需要的数据删了
        delete this.form.kindList;
        goodsApi.AddGoodsMsg({
          goods:this.form
        })
        .then(res=>{
            if(res.data.code == 'S'){
                this.getGoodsList()
                this.$message.success('添加成功')
            }
        })
      },
      // 点击确定判断是添加保存还是编辑修改
      confirm(){
          if(this.inputValue=='0'){
              this.confirmSave();
          }else{
            this.confirmEdit();
          }
            this.dialogFormVisible = false;
      },
      // 弹窗添加或编辑修改图片的操作
      handleAvatarSuccess1(res, file) {
        console.log(res, file)
        // 把图片的路径赋给form里面的img
        this.img1 = file.response.data;
        this.form.img1 = this.img1;
        if(file.response.code==='S'){
          this.$message({
                  type: 'success',
                  message: '图片添加成功!'
              })
        }
        console.log(this.form.img1)
      },
      handleAvatarSuccess2(res, file) {
        console.log(file)
         this.img2 = file.response.data;
        this.form.img2 = this.img2;
        if(file.response.code==='S'){
          this.$message({
                  type: 'success',
                  message: '图片添加成功!'
              })
        }
        console.log(this.form.img2)
      },
      handleAvatarSuccess3(res, file) {
        console.log(file)
        this.img3 = file.response.data;
        this.form.img3 = this.img3;
        if(file.response.code==='S'){
          this.$message({
                  type: 'success',
                  message: '图片添加成功!'
              })
        }
      },
      // 分页
      handleSizeChange(val) {
         console.log(val);
      },
      // 当前页发生改变会触发
      handleCurrentChange(val) {
        this.pageMsg.start = val;
        // 当前页发生改变时，重新渲染一下页面
        this.getGoodsList(this.pageMsg);
         console.log(val);
      },
      // 给后台传的kindId
      handleChange(value){
        console.log(value);
        var id = value[value.length - 1];
        this.form.kindId = id;
        console.log(this.form)
      },
      //二级商品
      //打开添加窗口
      openAdd(addId){
        this.stockForm = {};
        this.stockForm.goodsId  = addId;
        this.title = '添加';
        this.inputValue2 = 0;
        this.dialogStockVisible = true;
        this.formData(addId);
        console.log(this.mygoodsList)
      },
      // 封装的给form赋值的方法
      formData(objId){
        for(let i = 0; i < this.mygoodsList.length;i++){
            this.stockList = this.mygoodsList[i].goods;
            if(this.stockList.id == objId){
              this.form = this.stockList
              console.log(this.stockList)
            }
          }
      },
      // 点击确定的时候是添加保存
      stockSave(){
        stockApi.addStockMsg({
            goodsStock:this.stockForm
          })
          .then(res=>{
             console.log(res)
            if(res.data.code == 'S'){
              // 调用方法重新刷新页面
                this.getGoodsList(this.stockForm.goodsId);
                this.dialogStockVisible = false;
                this.$message.success('添加成功')
            }
        })
      },
       // 打开编辑弹窗
      handcleEdit(data){
        this.title = '编辑';
        // 因为编辑和添加中显示的都是父类form的值，所以这时要给form赋值
        this.formData(data.goodsId);
        this.inputValue2 = 1;
        this.stockForm = Object.assign({}, data);
        this.dialogStockVisible = true;
        // 给stockForm赋值，全局赋值，需要深拷贝，弹出框绑定提交的是stockForm
        
        delete this.stockForm.addTime;
        console.log(this.stockForm)
      },
      // 点击确定的时候是编辑保存
      stockEdit(){
        stockApi.editStockMsg({
          goodsStock:this.stockForm
        })
        .then(res=>{
          console.log(this.stockForm)
          if(res.data.code == 'S'){
                this.getGoodsList(this.stockForm.goodsId);
                this.dialogStockVisible = false;
                this.$message.success('编辑修改成功')
            }
        })
      },
      // 点击确定的时候是添加保存还是编辑修改保存
      confirmStock(){
        if(this.inputValue2 == 0){
          this.stockSave();
        }else{
          this.stockEdit();
        }
      },
      // 点击删除打开删除弹窗，和父类用的是同一个删除框，所以需要判断
      hancleDel(delId,flag){
        this.delVisible = true;
        this.delStockId = delId;
        this.isStock = flag;
        console.log(this.delStockId)
      },
       // 关闭二级商品的编辑弹窗
      closeStock(){
        this.dialogStockVisible = false;
      },
    }
}
</script>
<style scoped>
.add-box{
    margin-bottom:20px;
}
.add-box .total-msg{
  float: right;
}
.delete-content{
    margin-left: 80px;
}
>>>.hot123{
    color:red ;

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

</style>

