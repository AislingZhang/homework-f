<template>
    <div                     align="center"
                             valign="center">
        <div id="app">
            <div id="nav">
                <router-link to="/albumsManager">音乐专辑管理</router-link>|
                <router-link to="/singersManager">歌手管理</router-link>
                <!--      <router-link to="/about">爬虫程序</router-link> |-->
                <!--      <router-link to="/about">存入程序</router-link> |-->
                <!--      <router-link to="/mocha">mocha测试</router-link> |-->
                <!--      <router-link to="/httptest">音乐专辑接口测试</router-link>-->

            </div>
            <router-view/>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>这是一段信息</span>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog title="添加歌手" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="singer" class="demo-form-inline">
                <el-form-item label="歌手ID">
                    <el-input v-model="singer.singer_id" type="number" placeholder="请输入id,7位数字"></el-input>
                </el-form-item>
                <el-form-item label="歌手名字">
                    <el-input v-model="singer.singer_name" placeholder="请输入歌手名"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSinger(),dialogFormVisible = false" >确 定</el-button>
            </div>
        </el-dialog>



        <h1>歌手管理</h1>

        <div class="search-box">


            <el-form :inline="true" :model="singer" class="demo-form-inline">
                <el-form-item label="">
                    <el-input placeholder="请输入歌手名" v-model="searchContent" class="input-with-select">
                        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchSingers"></el-button>
                    </el-input>
                </el-form-item>

            </el-form>

        </div>
        <el-button type="text" @click="dialogFormVisible = true">添加歌手</el-button>
        <el-button type="text" @click="initSingers">初始化歌手数据</el-button>

            <el-table
                    :data="singers"
                    style="width: 50%"
                    max-height="500"
                    align="center"
                    valign="center" >

                <el-table-column
                        prop="singer_id"
                        label="歌手ID"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="singer_name"
                        label="歌手姓名"
                        width="300">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="singer">
                        <el-button @click="dialogVisible=true" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteSinger(singer)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>



            </el-table>


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
                url:"http://localhost:3000/singers",//数据源的路径，前后端合并时秩序保留相对路径
                maxId:2,
                singer:{singer_id:'',singer_name:''},
                dialogVisible:false,
                dialogFormVisible:false,
                searchContent: '',
                 singers:[]
            }
        },
        methods:{
            deleteSinger(singer1){
                let singer=singer1.row;
                fetch(this.url+"/"+singer._id,{method:"DELETE"})
                .then(res=>res.json())
                .then(()=>{
                    let index=this.singers.findIndex(item=>item._id==singer._id)
                    this.singers.splice(index,1)
                    })
            },
            searchSingers() {

                let url1 = '';
                if (!this.searchContent) {
                    url1 = '/';

                } else {
                    url1 = '/getSingersByName/?name=' + this.searchContent
                }
            //   let url1 = '/getSingersByName/?name='+this.searchContent;
                fetch(this.url+url1).then(response => response.json()).then(response => {
                    this.singers = response;
                    this.showSingersResults = true;
                })
            },

            addSinger(){

                fetch(this.url,{
                    method:"POST",headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(this.singer)
                }).then(res=>res.json())
                .then(nb=>this.singers.push(nb))

            },
            initSingers() {
                this.$confirm('确定要初始化歌手数据吗', '歌手数据初始化', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {

                    fetch(this.url+'/init', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => response.json()).then(response => {
                     //   this.loadingSwitch(false);
                        if (response.code == 0) {
                            this.singers = response.singers;
                            this.$message({
                                showClose: true,
                                message: response.msg,
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: response.msg,
                                type: 'error'
                            });
                        }
                    })
                }).catch(() => {
                //    this.loadingSwitch(false);
                    console.log('init cancel');
                })
            },
            handleClose(){
                console.log(123);
            }
        },
        computed:{
            priceTotal(){
                return this.singers.reduce((prev,singer)=>prev+singer.price,0)
            }
        }
    }
</script>

<style scoped>

</style>