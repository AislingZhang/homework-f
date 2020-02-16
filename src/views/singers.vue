<template>
    <div>
        <div id="app">
            <div id="nav">
                <router-link to="/albums">音乐专辑查询</router-link>|
                <router-link to="/singers">歌手查询</router-link>



            </div>
            <router-view/>
        </div>




        <h1>歌手查询</h1>

        <div class="search-box">
            <el-input placeholder="请输入歌手名" v-model="searchContent" class="input-with-select">
                <el-button slot="append" type="primary" icon="el-icon-search" @click="searchSingers"></el-button>
            </el-input>
        </div>



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