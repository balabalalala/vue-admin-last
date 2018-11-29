<template>
    <div class="test-main">
        <el-dialog
            title="提示"
            :visible.sync="dialog1"
            width="30%"
            :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
            </el-dialog>

    </div>
</template>
<script>
export default {
    name:'Test',
    props:['dialog1'],
    methods:{
        handleClose(){
            //不能直接修改父类传递的props
            // this.dialog1 = false;
            this.$emit('update:dialog1',false);
        }
    }

}
</script>

