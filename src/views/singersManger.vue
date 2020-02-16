<template>
    <div>
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

        <el-button type="text" @click="dialogFormVisible = true">添加歌手</el-button>


            <el-table
                    :data="singers"
                    style="width: 80%">

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

            addSinger(){
                // this.singer.id=++this.maxId
                // let bk=_.cloneDeep(this.singer)
                // this.singers.push(bk)
                fetch(this.url,{
                    method:"POST",headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(this.singer)
                }).then(res=>res.json())
                .then(nb=>this.singers.push(nb))

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