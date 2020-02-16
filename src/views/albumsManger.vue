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

        <el-dialog title="添加唱片" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="album" class="demo-form-inline">
                <el-form-item label="唱片ID">
                    <el-input v-model="album.album_id" type="number" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item label="唱片名称">
                    <el-input v-model="album.album_name" placeholder="请输入唱片名称"></el-input>
                </el-form-item>
                <el-form-item label="唱片价格">
                    <el-input v-model.number="album.price" type="number" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item label="发行时间">
                    <el-input v-model="album.public_time" placeholder="请输入发行时间"></el-input>
                </el-form-item>
                <el-form-item label="发行周">
                    <el-input v-model.number="album.week" type="number" placeholder="请输入周期"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAlbum(),dialogFormVisible = false" >确 定</el-button>
            </div>
        </el-dialog>



        <h1>音乐专辑管理</h1>

        <div class="search-box">
            <el-input placeholder="请输入完整唱片名" v-model="searchContent" class="input-with-select">
                <el-button slot="append" type="primary" icon="el-icon-search" @click="searchAlbums"></el-button>
            </el-input>
        </div>

        <el-button type="text" @click="dialogFormVisible = true">添加专辑</el-button>


        <el-table
                :data="albums"
                style="width: 80%">

            <el-table-column
                    prop="album_id"
                    label="唱片ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="album_name"
                    label="唱片名称"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="唱片价格"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="week"
                    label="发行周期"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="album">
                    <el-button @click="dialogVisible=true" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteAlbum(album)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>



        </el-table>


    </div>


</template>

<script>

    export default {
        name: "albumsManger",
        created() {
            fetch(this.url,{type:"GET"})
                .then(res=>res.json())
                .then(bks=>this.albums=bks)
        },
        data(){
            return {
                url:"http://localhost:3000/albums",//数据源的路径，前后端合并时秩序保留相对路径
                maxId:2,
                album:{album_id:'',album_name:'',price:'',public_time:'',week:''},
                dialogVisible:false,
                dialogFormVisible:false,
                searchContent: '',
                albums:[]
            }
        },
        methods:{
            deleteAlbum(album1){

                let album=album1.row;
                fetch(this.url+"/"+album._id,{method:"DELETE"})
                    .then(res=>res.json())
                    .then(()=>{
                        let index=this.albums.findIndex(item=>item._id==album._id)
                        this.albums.splice(index,1)
                    })
            },

            addAlbum(){
                fetch(this.url,{
                    method:"POST",headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(this.album)
                }).then(res=>res.json())
                    .then(nb=>this.albums.push(nb))
            },
            searchAlbums() {
                let url1 = '';
                if (!this.searchContent) {
                    url1 = '/';
                } else {
                    url1 = '/getAlbumsByName/?name=' + this.searchContent
                }
                    fetch(this.url+url1).then(response => response.json()).then(response => {
                    this.albums = response;
                    this.showSingersResults = true;
                })
            },
            handleClose(){
                console.log(123);
            }
        },
        computed:{
            priceTotal(){
                return this.albums.reduce((prev,album)=>prev+album.price,0)
            }
        }
    }
</script>

<style scoped>

