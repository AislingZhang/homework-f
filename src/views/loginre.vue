<template>
    <div                     align="center"
                             valign="center">



        <el-dialog title="注册" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="user" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password" placeholder="请输入密码"  clearable  show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="user.password2" placeholder="请再次输入输入密码"  clearable  show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser()" >确 定</el-button>
            </div>
        </el-dialog>



        <h1>登录</h1>

        <div class="search-box">

            <el-form :inline="true" :model="user" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="user.username1" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password1" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="">
                     <el-button type="primary" @click="login()" >登录</el-button>
                </el-form-item>
            </el-form>

        </div>
        <el-button type="text" @click="dialogFormVisible = true">注册用户</el-button>

    </div>


</template>

<script>

    export default {
        name: "singersManger",
        created() {
            fetch(this.url,{type:"GET"})
              .then(res=>res.json())
              .then(bks=>this.singers=bks)
        },
        data(){
            return {
                url:"http://localhost:3000/users",//数据源的路径，前后端合并时秩序保留相对路径
                maxId:2,
                user:{username:'',password:''},
                dialogVisible:false,
                dialogFormVisible:false,
                password2:'',

            }
        },
        methods:{
            showLoginDialog() {
                this.dialogFormVisible = true;
            },
            hideDialog() {
                this.dialogFormVisible = false;
            },

            login(){



                this.$message({
                    showClose: true,
                    message: '登录成功',
                    type: 'success'
                });
                setTimeout(() => {

                    this.$router.push({
                        path: '/albums'
                    });
                }, 2000);
            },

            addUser(){
                if (!this.user.username ) {
                    this.$message({
                        showClose: true,
                        message: '用户名不能为空',
                        type: 'error'
                    });
                    this.showLoginDialog();
                    return;

                }
                if ( !this.user.password  ) {
                    this.$message({
                        showClose: true,
                        message: '密码不能为空',
                        type: 'error'
                    });
                    this.showLoginDialog();
                    return;

                }
                if ( !this.user.password2  ) {
                    this.$message({
                        showClose: true,
                        message: '请确认密码',
                        type: 'error'
                    });
                    this.showLoginDialog();
                    return;
                }

                if ( this.user.password !== this.user.password2  ) {
                    this.$message({
                        showClose: true,
                        message: '两次输入的密码不一致',
                        type: 'error'
                    });
                    this.showLoginDialog();
                    return;
                }



                fetch(this.url,{
                    method:"POST",headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(this.user)
                }).then(res=>res.json())
                .then(res => {
                   // this.loading = false;
                    if (res.code == 0) {
                          this.hideDialog()
                        this.$message({
                           // showClose: true,
                            message: '注册成功',
                            type: 'success'

                        });

                    }
                })



            },

            handleClose(){
                console.log(123);
            }
        },

    }
</script>

<style scoped>

</style>