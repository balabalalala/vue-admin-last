<template>
<div class="my-table">
    <el-row>
        <el-button type="primary" plain @click="handAdd()">增加</el-button>
    </el-row>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"  border style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column label="日期" width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip>
    </el-table-column>
    <el-table-column label="操作" width="200">
        <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
    <!-- 编辑弹出框 -->
        <el-dialog :title="this.title" :visible.sync="dialogFormVisible">
            <!-- 设置一个隐藏域  用来判断是保存还是编辑修改--> 
	        <input type="text" id="saveType" v-model='value' hidden>
            <el-form :model="form">
                <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期"  value-format="yyyy-MM-dd">
                </el-date-picker>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address"></el-input>
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
</template>
<script>
export default {
    data() {
      return {
        value:'',
        title:'',
        centerDialogVisible: false,
        tableData: [
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, 
            {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }
        ],
        multipleSelection: [],
        dialogFormVisible: false,
        form: {
          name: '',
          date: '',
          adress: '',
        },
        formLabelWidth: '50px',
        // 设置一个临时的index变量，为了将数据中的index的值赋给临时变量，便于下面调用
        currentIndex:0,
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    //   增加事件 打开弹窗 清空form
      handAdd(){
          this.title = '添加'
          this.dialogFormVisible = true;
          this.form = {};
          this.value = '0';
      },
      
        // 点击编辑的时候把数据传到dialog的弹出框，点击的时候传了参数@click="handleDelete(scope.$index, scope.row)"
      handleEdit(index, row) {
          this.title = '编辑'
        //   将tableData里数据的index赋给临时变量，全局的
          this.currentIndex = index;
          this.dialogFormVisible = true;
          var item =  this.tableData[index];
          //5.设置隐藏域的值为1; 认为如果1,则为更新,如果为0,则为保存
          this.value = '1';
        //   给form赋值，全局赋值
          this.form = {
            name: item.name,
            date: item.date,
            address: item.address,
         }
      },
        // 点击确定的时候判断是编辑保存还是增加保存
        confirm(){
            if(this.value=='0'){
                // 使添加的index++
                this.currentIndex++ ;
                //push到表格的最后
                this.tableData.push(this.form);
                // this.dialogFormVisible = false;
    		}else{
    			this.$set(this.tableData, this.currentIndex, this.form);
                // 修改成功之后的提示
                this.$message.success(`修改第 ${this.currentIndex+1} 行成功`);
    		}
                this.dialogFormVisible = false;
        },
      handleDelete(index, row) {
        this.$confirm('删除不可恢复，是否确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
            // .then是执行的确定
        }).then(() => {
            //点击确定的时候删除
          this.tableData.splice(index, 1);
            // 删除成功的弹出框
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            // .catch是执行的取消的事件
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>
<style scoped lang='styl'>
    .delete-content{
        margin-left: 80px;
    }
</style>
