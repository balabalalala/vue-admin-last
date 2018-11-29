<template>
    <div class="goods-edit">
      <!-- before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。
      如果你在 footer 具名 slot 里添加了用于关闭 Dialog 的按钮，
      那么可以在按钮的点击回调函数里加入 before-close 的相关逻辑。 -->
        <el-dialog :title="this.title" :visible.sync="dialogFormVisible" :before-close="close" width="800px"> 
            <!-- 设置一个隐藏域  用来判断是保存还是编辑修改--> 
            <input type="text" id="saveType" v-model='inputValue' hidden>
                <el-form :model="form" :rules="rules" ref='form'>
                    <el-form-item label="选择分类" prop="kindId" :label-width="formLabelWidth" >
                      <el-cascader expand-trigger="hover" :options="editGoodsKind"
                         v-model="form.kindList"
                         @change="handleChange">
                      </el-cascader>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brandId" :label-width="formLabelWidth" >
                      <el-input v-model="form.brandId"></el-input>
                    </el-form-item>
                    <el-form-item label="名称" prop='name'  :label-width="formLabelWidth" >
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" :label-width="formLabelWidth">
                      <el-input v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="进价" prop="priceIn" :label-width="formLabelWidth">
                      <el-input v-model.number="form.priceIn"></el-input>
                    </el-form-item>
                    <el-form-item label="卖出价格" prop="priceOut" :label-width="formLabelWidth">
                      <el-input v-model.number="form.priceOut"></el-input>
                    </el-form-item>
                    <el-form-item label="当前价格" prop="priceNow" :label-width="formLabelWidth">
                      <el-input v-model.number="form.priceNow"></el-input>
                    </el-form-item>
                    <el-form-item label="hot" prop="hot" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.hot">
                          <el-radio :label="1">热卖</el-radio>
                          <el-radio :label="0">非热卖</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="添加图片1" :label-width="formLabelWidth">
                      <el-upload :action=uploadAdress 
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1">
                        <img v-if="img1" :src="editAdress + img1" class="banner1">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="添加图片2" :label-width="formLabelWidth">
                      <el-upload class="avatar-uploader" :action=uploadAdress 
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2">
                        <img v-if="img2" :src="editAdress + img2" class="banner1">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="添加图片3" :label-width="formLabelWidth">
                      <el-upload class="avatar-uploader" :action=uploadAdress 
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3">
                        <img v-if="img3" :src="editAdress + img3" class="banner1">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="颜色1" prop="color1" :label-width="formLabelWidth">
                      <el-input v-model="form.color1"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色2" prop="color2" :label-width="formLabelWidth">
                      <el-input v-model="form.color2"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色3" prop="color3" :label-width="formLabelWidth">
                      <el-input v-model="form.color3"></el-input>
                    </el-form-item>
                    <el-form-item label="型号s" prop="size_s" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.size_s">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="型号m" prop="size_s" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="form.size_m">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="型号l" prop="size_s" :label-width="formLabelWidth">
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
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </div>
        </el-dialog>
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
        quillEditor,
    },
    props:[
        'inputValue',
        'title',
        'img1',
        'img2',
        'img3',
        'form',
        'editAdress',
        'uploadAdress',
        'formLabelWidth',
        'mykindlist',
        'editGoodsKind',
        'dialogFormVisible'
    ],
    data(){
      var colorReg = /^#[0-9a-fA-F]{3,6}$/
      var validateColor = (rule,value,callback)=>{
        if(!value){
          callback(new Error('不可以为空！！！'))
        }
        setTimeout(()=>{
          if(!colorReg.test(value)){
            callback(new Error('格式有误'))
          }else{
            callback()
          }
        },1000)
      }
        return {
           // 表单验证
          rules: {
              kindId: [
                { required: true, message: '请选择分类', trigger: 'change' }
              ],
              brandId: [
                  { required: true, message: '请填写品牌', trigger: 'blur' },
              ],
              name: [
                  { required: true, message: '必填项', trigger: 'blur' }
              ],
              hot:[
                { required: true, message: '请选择', trigger: 'change' }
              ],
              priceIn:[
                { required: true, message: '必填项'},
                { type: 'number', message: '价格必须为数字值'}
              ],
              priceOut:[
                { required: true, message: '必填项'},
                { type: 'number', message: '价格必须为数字值'}
              ],
              priceNow:[
                { required: true, message: '必填项'},
                { type: 'number', message: '价格必须为数字值'}
              ],
              color1: [
                  { validator:validateColor,required: true, trigger: 'blur' },
              ],
              color2: [
                  { validator:validateColor,required: true, trigger: 'blur' },
              ],
              color3: [
                  { validator:validateColor,required: true, trigger: 'blur' },
              ],
              size_s:[
                { required: true, message: '请选择s型号', trigger: 'change' }
              ],
          }
        }
    },
    watch:{
      dialogFormVisible(){
        if(this.dialogFormVisible==true){
          this.$nextTick(function(){
            this.$refs.form.clearValidate()
          })
        }
      }
    },
    methods:{
        // 点击确定的时候是编辑修改保存
        confirmEdit(){
          this.$emit('confirmEdit')
        },
        // 在父类传值的时候,.sync可以双向绑定，然后可以在子类直接修改
        closeDia(){
          this.$emit('update:dialogFormVisible',false);
        },
        close(){
           this.$nextTick(function(){
            this.$refs.form.clearValidate()
          })
          this.$emit('close')
        },
        // 点击确定的时候是增加保存
        confirmSave(){
          this.$emit('confirmSave')
        },
        // 点击确定判断是添加保存还是编辑修改
        confirm(){
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.$emit('confirm')
            } else {
               return false;
           }
          });
         
        },
        // 弹窗添加或编辑修改图片的操作
        handleAvatarSuccess1(res, file) {
          this.$emit('handleAvatarSuccess1',res, file)
        },
        handleAvatarSuccess2(res, file) {
          this.$emit('handleAvatarSuccess2',res, file)
        },
        handleAvatarSuccess3(res, file) {
          this.$emit('handleAvatarSuccess3',res, file)
      },
      beforeAvatarUpload(file){
        this.$emit('beforeAvatarUpload',file)
      },
       handleChange(value) {
         this.$emit('handleChange',value);
        console.log(value);
      }
    }
}
</script>
<style scoped>
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
  .container{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
