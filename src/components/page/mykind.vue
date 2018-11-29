<template>
<div class="my-kind">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>zaowu分类</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="add-box">
            <el-row>
                <el-button type="primary" @click="handleAdd()">添加一级分类</el-button>
            </el-row>
        </div>
        <el-table ref="multipleTable" :data="mykindlist" tooltip-effect="dark"  border style="width: 100%" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="goodsKind.title" label="title" width="150">
        </el-table-column>
        <el-table-column prop="goodsKind.ctitle" label="ctitle" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="goodsKind.img" label="img"  show-overflow-tooltip>
            <template scope="scope">
                <img @click="bigImg(scope.row.goodsKind)" :src="'http://192.168.0.171/'+scope.row.goodsKind.img" class="kindimg" alt="">
            </template>
        </el-table-column>
        <el-table-column label="子类标签" width="300" prop="list">
            <template scope="scope">
                <span  :key="tag.id"  v-for="tag in scope.row.list" @click="editTag(tag)">
                    <el-tag 
                     closable 
                     :disable-transitions="false" 
                     @close="delGoodsKind(tag.id)" >
                    {{tag.ctitle}}
                </el-tag>
                </span>
                
                <el-button class="button-new-tag" size="small" @click="addTag(scope.row.goodsKind.id)">+ 增加一个子类</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.goodsKind)">编辑</el-button>
                <el-button size="mini" type="danger" @click="delGoodsKind(scope.row.goodsKind.id,true)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
        <!-- 编辑弹出框 -->
            <el-dialog :title="this.title" :visible.sync="dialogFormVisible" width="60%">
                <!-- 设置一个隐藏域  用来判断是保存还是编辑修改--> 
                <input type="text" id="saveType" v-model='value' hidden>
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="英文名字" prop="title" label-width="100px">
                    <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="中文名字" prop="ctitle" label-width="100px">
                    <el-input v-model="form.ctitle"></el-input>
                    </el-form-item>
                     <el-form-item label="添加图片" v-show="imgShow" label-width="100px">
                      <el-upload class="upload-demo" drag action="http://192.168.0.171/api/admin/upload" 
                      :limit=1 :on-success='imgSuccess' multiple 
                      :on-exceed='maxImg' :on-remove='removeImg' >>
                        <i class="el-icon-upload" label-width="100px"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="selectId !== ''"   @click="updateSave">更新保存</el-button>
                <el-button type="primary" v-else @click="confirmSave">确定</el-button>
            </div>
        </el-dialog>
        <!-- 大图弹出框 -->
        <el-dialog title="图片" :visible.sync="dialogImgVisible">
                <img  :src="imgSrc" class="bigImg" alt="">
        </el-dialog>
        <!-- 删除弹出框 -->
        <el-button type="text"></el-button>
    </div>
    <button @click="dialog1=true">打开窗口</button>
    <test :dialog1.sync="dialog1"></test>
</div>
</template>
<script>
import test from './components/test';
import kindApi from '@/api/mykind'
export default {
    components:{
        test
    },
    data() {
      return {
        dialog1:false,
        value:'',
        title:'',
        centerDialogVisible: false,
        //定义一个空数组，接收从后台传过来的数据
        mykindlist:[],
        // 删除父类type=0,删除子类type=1,默认1
        delType:1,
        // 通过id来判断是添加的确定按钮，还是编辑更新的按钮，因为编辑的时候有id,刚添加数据的时候里面没有id
        // 所以定义初始的id为空，然后判断
        selectId:'',
        //设置一个type,用来判断删除的是子类还是父类，删除父类type=0,删除子类type=1,默认1
        type:'',
        delGetKindId:'',
        imgShow:false,
        dialogFormVisible: false,
        dialogImgVisible:false,
        imgSrc:'',
        form: {
          title: '',
          ctitle: '',
          pid: 0,
        },
        formLabelWidth: '50px',
        // 设置一个临时的index变量，为了将数据中的index的值赋给临时变量，便于下面调用
        currentIndex:0,
        // 表单验证
        rules: {
            title: [
                { required: true, message: '必填项', trigger: 'blur' },
            ],
            ctitle: [
                { required: true, message: '必填项', trigger: 'blur' }
            ]
        }
      }
    },
   
    // 1.在创建完毕后获取数据
    created(){
        this.getKindList()//这里加上this指的是引用的当前的方法。
    },
    methods: {
        // 封装的获取数据的方法，便于更新
        getKindList(){
            kindApi.getKindList()//不带this指的是引用api中的方法。
            .then(res=>{
                this.mykindlist = res.data.data
                console.log(this.mykindlist)
                })
        },
        // 2.删除每行的父类数据
        delGoodsKind(id,flag){
            //根据传入的flag的参数值判断打开的是父类还是子类的删除框
            if(flag){
                // 删除父类type=0,删除子类type=1,默认1
                this.type = 0;
            }
            else{
                this.type = 1;
            }
            this.$confirm('删除不可恢复，是否确定删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
            
                // .then是执行的确定
            }).then(() => {
            this.delGetKindId = id;
            let data = {
                id:this.delGetKindId,
                type:this.delType
            }
            kindApi.delGetKind(
                data
            )
            //点击确定的时候删除
            .then(res=>{
                console.log(res)
                this.getKindList()
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
        // 3.添加父类的每行数据,打开弹窗
        handleAdd(){
            this.imgShow = true;
            // 点开弹窗的时候，把数据清空
          this.selectId = '';
          this.form = {};
          this.title = '添加'
          this.dialogFormVisible = true;
        },
         //4.添加子类的数据
        addTag(id){
            console.log(id)
            // 打开弹窗。清空数据
            this.handleAdd();
            this.imgShow = false;
            // 添加子类必须有父类id
            if(id){
                this.form.pid = id;
            }
        },
        //5.添加确定保存 表单验证的方法
        confirmSave(obj){
            this.$refs.form.validate((valid) => {
            if (valid) {
                kindApi.addGetKind({
                    goodsKind:this.form
                })
                .then(res=>{
                    if(res.data.code === 'S'){
                        this.$message.success('添加成功')
                        this.getKindList()
                        this.dialogFormVisible = false;
                    }
                })
            } else {
                return false;
            }
            });
        },
        // 6.编辑修改父类的每行数据，和添加共用一个弹出框，需要判断点击确定的时候是添加保存还是编辑修改
        handleEdit(data) {
            this.imgShow = true;
            // 给selectId赋值，让更新保存按钮出现
            this.selectId = data.id;
            this.dialogFormVisible = true;
            this.title = '编辑'
        //   给form赋值，全局赋值
        // this.form = data;
        //实现深度clone的方法 
        //assign浅拷贝
        this.form = Object.assign({},data)
          this.form = {
            'title': data.title,
            'ctitle': data.ctitle,
            'img': data.img,
          }
        },
        // 编辑添加图片
         // 上传图片成功后的操作
      imgSuccess(response, file, fileList){
          console.log(response, file, fileList)
            if(fileList[0].response.code ==='S'){
              this.$message({
                  type: 'success',
                  message: '图片添加成功!'
              })
        }
        this.form.img = fileList[0].response.data;
      },
      //添加超过1张图片的操作
      maxImg(file, fileList){
        console.log(file, fileList);
        this.form.img = '';
                if(fileList[0].response.code==='S'){
                    this.$message({
                    type: 'error',
                    message: '只能添加1张图片哦!'
                    })
                }
        this.form.img = fileList[0].response.data;
      },
    // 移除图片
     removeImg(file, fileList){
         console.log(file, fileList)
              this.$message({
                  type: 'error',
                  message: '删除成功'
              })
      },
        // 7.编辑修改保存
        updateSave(){
            //点击更新保存的时候把id发给后台,让后台知道我更新的是哪条数据 ，更新的时候必须发id
            this.form.id = this.selectId
             this.$refs.form.validate((valid) => {
                if (valid) {
                    kindApi.editGetKind({
                    goodsKind:this.form
                })
                .then(res=>{
                    if(res.data.code == 'S'){
                        this.$message.success('修改成功')
                        this.getKindList()
                    }
                })
                this.dialogFormVisible = false;
            } else {
                return false;
            }
            });
        },
       //8.编辑修改子类的数据
       editTag(tag){
           this.imgShow=false;
            this.selectId = tag.id;
            this.dialogFormVisible = true;
            this.title = '编辑'
            //   给form赋值，全局赋值
            this.form = {
                'title': tag.title,
                'ctitle': tag.ctitle,
                }
       },
        // 点击图片的时候显示大图
        bigImg(imgData){
            this.dialogImgVisible = true;
            this.imgSrc='http://192.168.0.171/'+imgData.img;
            console.log(imgData)
        }
    }
}
</script>
<style scoped lang='styl'>
.add-box{
    margin-bottom:20px;
}
    .delete-content{
        margin-left: 80px;
    }
    .kindimg{
        width: 100px;
        height: 50px;
    }
    .bigImg{
        width: 300px;
        height: 300px;
        margin-left: 150px;
    }
</style>

