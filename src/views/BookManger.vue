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


        <h1>音乐专辑管理</h1>
        <el-form :inline="true" :model="book" class="demo-form-inline">
            <el-form-item label="唱片ID">
                <el-input v-model="book.album_id" type="number" placeholder="请输入id,7位数字"></el-input>
            </el-form-item>
            <el-form-item label="唱片名称">
                <el-input v-model="book.album_name" placeholder="请输入唱片名"></el-input>
            </el-form-item>
            <el-form-item label="唱片价格">
                <el-input v-model.number="book.price" type="number" placeholder="请输入价格"></el-input>
            </el-form-item>
            <el-form-item label="发行时间">
                <el-input v-model="book.public_time" placeholder="请输入发行时间"></el-input>
            </el-form-item>
            <el-form-item label="发行周">
                <el-input v-model.number="book.week" type="number" placeholder="请输入周期"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addBook">添加唱片</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="books"
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
                    label="唱片价格">
            </el-table-column>
            <el-table-column
                    prop="singers"
                    label="歌手名">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="book">
                    <el-button @click="dialogVisible=true" type="text" size="small">详细内容</el-button>
                    <el-button @click="dialogVisible=true" type="text" size="small">编辑</el-button>
                    <el-button @click="dialogVisible=true" type="text" size="small">追加歌手</el-button>
                    <el-button @click="deleteBook(book)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <h2>总价格： {{priceTotal}}</h2>

    </div>
</template>

<script>

    export default {
        name: "BookManger",
        created() {
            fetch(this.url,{type:"GET"})
              .then(res=>res.json())
              .then(bks=>this.books=bks)
        },
        data(){
            return {
                url:"/books",//数据源的路径，前后端合并时秩序保留相对路径
                maxId:2,
                book:{album_name:'',price:'',singers:''},
                dialogVisible:false,
                // books:[{id:1,name:"book1",price:200},
                //     {id:2,name:"book2",price:230}]
                 books:[]
            }
        },
        methods:{
            deleteBook(book1){
                // let index=this.books.findIndex(item=>item.id==book.id)
                // this.books.splice(index,1)
                let book=book1.row;
                fetch(this.url+"/"+book._id,{method:"DELETE"})
                .then(res=>res.json())
                .then(()=>{
                    let index=this.books.findIndex(item=>item._id==book._id)
                    this.books.splice(index,1)
                    })
            },
            addBook(){
                // this.book.id=++this.maxId
                // let bk=_.cloneDeep(this.book)
                // this.books.push(bk)
                fetch(this.url,{
                    method:"POST",headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(this.book)
                }).then(res=>res.json())
                .then(nb=>this.books.push(nb))
            },
            handleClose(){
                console.log(123);
            }
        },
        computed:{
            priceTotal(){
                return this.books.reduce((prev,book)=>prev+book.price,0)
            }
        }
    }
</script>

<style scoped>

</style>