<template>
    <div class="stock-edit">
        <el-dialog :title="this.title" :visible.sync="dialogStockVisible" :before-close="closeStock"> 
            <!-- 设置一个隐藏域  用来判断是保存还是编辑修改--> 
            <input type="text" id="saveType" v-model='inputValue2' hidden>
                <el-form :model="stockForm" :rules="rules" ref='stockForm'>
                    <el-form-item label="颜色" prop="color" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="stockForm.color">
                            <el-radio v-if='form.color1' :label="form.color1"></el-radio>
                            <el-radio v-if='form.color2' :label="form.color2"></el-radio>
                            <el-radio v-if='form.color3' :label="form.color3"></el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="型号" prop="size" :label-width="formLabelWidth">
                      <template>
                        <el-radio-group v-model="stockForm.size">
                          <el-radio v-if='form.size_s == "有库存"' label="s">S</el-radio>
                          <el-radio v-if='form.size_m == "有库存"' label="m">m</el-radio>
                          <el-radio v-if='form.size_l == "有库存"' label="l">l</el-radio>
                        </el-radio-group>
                      </template>
                    </el-form-item>
                    <el-form-item label="剩余库存" prop="count" :label-width="formLabelWidth">
                      <el-input v-model.number="stockForm.count"></el-input>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="closeStock">取 消</el-button>
                <el-button type="primary"  @click="confirmStock()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            rules: {
               color:[
                { required: true, message: '请选择颜色', trigger: 'change' }
              ],
              size:[
                { required: true, message: '请选择型号', trigger: 'change' }
              ],
              count:[
                { required: true, message: '请填写剩余库存'},
                { type: 'number', message: '库存必须为数字值'}
              ],
          }
        }
    },
    props:[
        'form',
        'stockForm',
        'formLabelWidth',
        'dialogStockVisible',
        'inputValue2',
        'title'
    ],
     watch:{
        //  监听弹窗的变化，当弹窗打开的时候把验证的东西清空
      dialogStockVisible(){
        if(this.dialogStockVisible==true){
          this.$nextTick(function(){
            this.$refs.stockForm.clearValidate()
          })
        }
      }
    },
    methods:{
        closeStock(){
            this.$nextTick(function(){
            this.$refs.stockForm.clearValidate()
          })
            this.$emit('closeStock');
        },
        confirmStock(){
            this.$refs.stockForm.validate((valid) => {
                if (valid) {
                this.$emit('confirmStock')
                } else {
                return false;
            }
            });
        }
    }
}
</script>
<style scoped>

</style>

