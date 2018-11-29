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
                <el-button type="primary" plain @click="handcleAddGoods()">添加商品信息</el-button>
            </el-row>
        </div>
        <el-table :data="mygoodsList" border style="width: 100%">
          <el-table-column fixed prop="goods.addTime" label="日期" width="150">
          </el-table-column>
          <el-table-column prop="goods.brand" label="品牌"  width="150">
          </el-table-column>
          <el-table-column prop="goods.name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="goods.desc" label="描述" width="120">
          </el-table-column>
          <el-table-column prop="goods.priceIn" label="进价" width="120">
          </el-table-column>
          <el-table-column prop="goods.priceOut" label="卖出价格" width="120">
          </el-table-column>
          <el-table-column prop="goods.priceNow" label="当前价格" width="120">
          </el-table-column>
          <el-table-column prop="goods.hot" label="hot" width="120">
          </el-table-column>
          <el-table-column prop="goods.img" label="banner图片" width="300" >
              <template scope='scope'>
                  <img class="banner" :src="'http://192.168.0.109/'+scope.row.goods.img1" alt="">
                  <img class="banner" :src="'http://192.168.0.109/'+scope.row.goods.img2" alt="">
                  <img class="banner" :src="'http://192.168.0.109/'+scope.row.goods.img3" alt="">
              </template>
          </el-table-column>
          <el-table-column prop="goods.color1" label="颜色1" width="120">
          </el-table-column>
          <el-table-column prop="goods.color2" label="颜色2" width="120">
          </el-table-column>
          <el-table-column prop="goods.color3" label="颜色3" width="120">
          </el-table-column>
          <el-table-column prop="goods.size_s" label="s型号" width="120">
          </el-table-column>
          <el-table-column prop="goods.size_m" label="m型号" width="120">
          </el-table-column>
          <el-table-column prop="goods.size_l" label="l型号" width="120">
          </el-table-column>
          <el-table-column prop="goods.content" label="商品页面html信息" width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                  <el-button size="mini" @click="openEdit(scope.row.goods)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="delGoodsMsg(scope.row.goods.id)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
        <!-- 编辑弹出框 -->
            <el-dialog :title="this.title" :visible.sync="dialogFormVisible">
                <!-- 设置一个隐藏域  用来判断是保存还是编辑修改--> 
              <input type="text" id="saveType" v-model='inputValue' hidden>
                <el-form :model="form">
                    <el-form-item label="选择品牌" :label-width="formLabelWidth" >
                    <template>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in mykindlist" 
                        :key="item.goodsKind.id" 
                        :label="item.goodsKind.ctitle" 
                        :value="item.goodsKind.id">
                        </el-option>
                      </el-select>
                    </template>
                    </el-form-item>
                    <el-form-item label="名称" :label-width="formLabelWidth" >
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth">
                      <el-input v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="进价" :label-width="formLabelWidth">
                      <el-input v-model="form.priceIn"></el-input>
                    </el-form-item>
                    <el-form-item label="卖出价格" :label-width="formLabelWidth">
                      <el-input v-model="form.priceOut"></el-input>
                    </el-form-item>
                    <el-form-item label="当前价格" :label-width="formLabelWidth">
                      <el-input v-model="form.priceNow"></el-input>
                    </el-form-item>
                    <el-form-item label="hot" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.hot">
                          <el-radio :label="1">热卖</el-radio>
                          <el-radio :label="0">非热卖</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item>
                        <el-upload
                            class="avatar-uploader"
                            action="http://192.168.0.109/api/admin/upload" 
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="form.img1" :src="'http://192.168.0.109/'+form.img1" class="avatar" style="height:100%">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                            class="avatar-uploader"
                            action="http://192.168.0.109/api/admin/upload" 
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess2"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="form.img2" :src="'http://192.168.0.109/'+form.img2" class="avatar" style="height:100%">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-upload
                            class="avatar-uploader"
                            action="http://192.168.0.109/api/admin/upload" 
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess3"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="form.img3" :src="'http://192.168.0.109/'+form.img3" class="avatar" style="height:100%">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                    </el-form-item>
                    <el-form-item label="颜色1" :label-width="formLabelWidth">
                      <el-input v-model="form.color1"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色2" :label-width="formLabelWidth">
                      <el-input v-model="form.color2"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色3" :label-width="formLabelWidth">
                      <el-input v-model="form.color3"></el-input>
                    </el-form-item>
                    <el-form-item label="型号s" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.size_s">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="型号m" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.size_m">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="型号l" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.size_l">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="商品信息" :label-width="formLabelWidth">
                      <div class="container">
                          <quill-editor ref="myTextEditor" v-model="form.content"></quill-editor>
                      </div>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 删除弹出框 -->
        <el-button type="text"></el-button>
    </div>
</div>
</template>
<script>
import goodsApi from '@/api/mygoods'
import kindApi from '@/api/mykind'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    components: {
        quillEditor
    },
    data() {
      return {
        // 隐藏域，判断是编辑还是添加
        inputValue:'',
        value:'',
        title:'',
        centerDialogVisible: false,
        dialogFormVisible: false,
        mygoodsList:[],
        mykindlist:[],
        delgoodsId:'',
        editId:'',
        imageUrl1:'',
        imageUrl2:'',
        imageUrl3:'',
         imageUrl: '',
        form: {
          brand:'',
          name: '',
          desc:'',
          priceIn:'',
          priceNow:'',
          priceOut:'',
          lastCount:'',
          hot:'0',
          img:'',
          img1:'',
          img2:'',
          img3:'',
          color1:'',
          color2:'',
          color3:'',
          size_s:'0',
          size_m:'0',
          size_l:'0',
          content:'',
        },
        
        formLabelWidth: '100px',
        // 设置一个临时的index变量，为了将数据中的index的值赋给临时变量，便于下面调用
        currentIndex:0,
        imgList:[]
      }
    },
    created(){
      this.getGoodsList()
    },
    methods: {
         handleAvatarSuccess(res, file) {
             console.log(file)
        this.form.img1 = file.response.data;
        console.log(this.form.img1)
      },
      handleAvatarSuccess2(res, file) {
        this.form.img2 = file.response.data;
      },
      handleAvatarSuccess3(res, file) {
        this.form.img3 =file.response.data;
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },







      getGoodsList(){
        goodsApi.getGoodsList()
        .then(res=>{
           this.mygoodsList = res.data.data.list;
           console.log(this.mygoodsList)
        })
      },
      getKindList(){
            kindApi.getKindList()//不带this指的是引用api中的方法。
            .then(res=>{
                this.mykindlist = res.data.data
                console.log(this.mykindlist)
                })
        },
      // 删除商品信息
      delGoodsMsg(id){
          this.$confirm('删除不可恢复，是否确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
              // .then是执行的确定
          }).then(() => {
          this.delgoodsId = id;
          let data = {
              id:this.delgoodsId,
          }
          goodsApi.deleGoodsMsg(
              data
          )
          //点击确定的时候删除
          .then(res=>{
              console.log(res)
              this.getGoodsList()
              // 删除成功的弹出框
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
          })
              // .catch是执行的取消的事件
          }).catch(() => {
          this.$message({
              type: 'info',
              message: '已取消删除'
          });
          });
      },
      //添加商品信息,打开弹窗
      handcleAddGoods(){
          this.getKindList()
          this.title = '添加'
          this.dialogFormVisible = true;
          this.form = {};
          this.imageUrl1='';
          this.imageUrl2='';
          this.imageUrl3='';
          this.inputValue = '0';
      },
      // 上传图片成功后的操作
      imgSuccess(response, file, fileList){
        for(let i = 0 ; i < fileList.length ; i++){
            if(fileList[i].response.code==='S'){
              this.$message({
                  type: 'success',
                  message: '图片'+(i+1)+'添加成功!'
              })
            }
        }
         this.formImg(fileList);
      },
      //添加超过3张图片的操作
      maxImg(file, fileList){
        console.log(file, fileList);
        this.form.img1 = '';
        this.form.img2 = '';
        this.form.img3 = '';
        for(let i = 0 ; i < fileList.length ; i++){
            if(fileList[i].response.code==='S'){
              this.$message({
                type: 'error',
                message: '只能添加3张图片哦!'
              })
            }
        }
         this.formImg(fileList);
      },
    // 移除图片
      removeImg(file, fileList){
        for(let i = 0 ; i < fileList.length ; i++){
            if(fileList[i].response.code==='S'){
              this.$message({
                  type: 'error',
                  message: '删除成功'
              })
            }
        }
      },
      // 封装的添加图片的方法，把添加或删除后的结果赋给form
      formImg(data){
        for(let i = 0 ; i < data.length ; i++){
            if(data[i].response.code==='S'){
              
              if(i==0){
                this.form.img1 = data[i].response.data;
              }else if(i==1){
                this.form.img2 = data[i].response.data;
              }else{
                this.form.img3 = data[i].response.data;
              }
            }
        }
      },
      // 点击确定的时候是增加保存
      confirmSave(){
        // 使添加的index++
        this.currentIndex++ ;
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
      //编辑打开弹窗，并赋值
      openEdit(data){
           this.dialogFormVisible = true;
            this.title = '编辑'
            this.inputValue = '1';
        //   给form赋值，全局赋值
          this.form = {
            "id":data.id,
            'brand': data.brand,
            'name': data.name,
            'desc': data.desc,
            'priceIn': data.priceIn,
            'priceNow': data.priceNow,
            'priceOut': data.priceOut,
            'lastCount': data.lastCount,
            'hot': data.hot,
            'img1': data.img1,
            'img2': data.img2,
            'img3': data.img3,
            'color1': data.color1,
            'color2': data.color2,
            'color3': data.color3,
            'size_s': data.size_s,
            'size_m': data.size_m,
            'size_l': data.size_l,
            'content': data.content,
          }
          this.imageUrl1 = 'http://192.168.0.109/' + this.form.img1;
          this.imageUrl2 = 'http://192.168.0.109/' + this.form.img2;
          this.imageUrl3 = 'http://192.168.0.109/' + this.form.img3;
            console.log(this.imageUrl1)
      },
      // 点击确定的时候是编辑修改保存
      confirmEdit(){
          goodsApi.EditGoodsMsg({
            goods:this.form
          })
          .then(res=>{
            if(res.data.code === 'S'){
              this.getGoodsList()
              this.$message.success('修改成功')
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
    
      },
  }
</script>
<style>
.add-box{
    margin-bottom:20px;
}
.delete-content{
    margin-left: 80px;
}
.banner{
  width: 60px;
  height: 50px;
}
</style>

