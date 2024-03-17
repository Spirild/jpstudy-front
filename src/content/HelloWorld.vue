<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <div class="index-content">
        <h2>←侧边栏说明</h2>
        <p>测试：搭载了gpt的起居页面，有问题有计划直接问直接写（未来是用于开发新页面的测试页）</p>
        <p>日语：个人学习用单词表</p>
        <p>——查词，结果会存入轻词表</p>
        <p>——轻词表，类似于内存，会根据等级不断让自己加深记忆的单词表</p>
        <p>——详情表，类似于词典</p>
        <p>——单词卡，计划随机抽6个单词来测试的页面</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: '欢迎访问（施工中）'
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .hello {
      background-image: url("../assets/img/index.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      /* display: flex;
      flex-direction: column;
      justify-content: center; */
      align-items: center;
      width: auto;
      height: 100vh;
    }

  h1, h2 {
    font-weight: normal;
    margin: 0%;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .index-content {
    display: flex;
    text-align: left;
    flex-direction: column;
  }
  </style>
  