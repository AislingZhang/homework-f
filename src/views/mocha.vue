<template>
    <div class="about">
        <h1>Mocha测试代码</h1>
        <pre>
        const mongoose=require('mongoose')
        require('../model')
        let bookDao=require('../dao/BookDao');
        const assert=require('assert')

        describe("测试BookDao",function () {
        before(function () {
        mongoose.connect('mongodb://39.99.192.85:27017/demo01',function (err) {

        })
        })
        after(function () {
        mongoose.disconnect()
        })

        it("测试添加一张唱片",function (done) {
        let book={album_id: "3751222", album_name: "测试唱片"}
        bookDao.addBook(book,function (nb) {

        assert.ok(nb._id!=null)
        done()
        })
        })
        it('测试查询所有唱片',function (done) {
        bookDao.findAllBooks(function (books) {
        assert.ok(books.length>0)
        books.forEach(book=>console.log(book._id))
        done()
        })
        })
        it("测试删除唱片",function (done) {
        bookDao.deleteBook("5e1683b9ccec4914dc8d2fdc",function ({}) {
        console.log({})
        done()
        })
        })


        })
            </pre>
    </div>

</template>

<script>
    export default {
        name: "mocha"
    }
</script>

<style scoped>

</style>