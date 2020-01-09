<template>
    <div class="about">
        <h1>音乐接口测试代码</h1>
        <pre>
       GET http://39.99.192.85:3000/books
       Accept: application/json

        ###

        POST http://39.99.192.85:3000/books
        Content-Type: application/json

        {
          "album_id": 3751333,
          "album_name": "测试唱片9",
          "price": 888
        }

        ###

        DELETE http://39.99.192.85:3000/books/5e1693d6a54cb3155c1aa8af
        Accept: application/json

        ###

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