<template>


    <div align="center"
         valign="center">
        <div id="app">
            <div id="nav">
                <router-link to="/albums">音乐专辑查询</router-link>|
                <router-link to="/singers">歌手查询</router-link>
                <!--      <router-link to="/about">爬虫程序</router-link> |-->
                <!--      <router-link to="/about">存入程序</router-link> |-->
                <!--      <router-link to="/mocha">mocha测试</router-link> |-->
                <!--      <router-link to="/httptest">音乐专辑接口测试</router-link>-->

            </div>
            <router-view/>
        </div>






        <h1>音乐专辑查询</h1>

        <div class="search-box">

            <el-form :inline="true" :model="album" class="demo-form-inline">
                <el-form-item label="">
                    <el-input placeholder="请输入完整唱片名" v-model="searchContent" class="input-with-select">
                        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchAlbums"></el-button>
                    </el-input>
                </el-form-item>

            </el-form>
        </div>

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

