<template>
    <!-- <h1>查词</h1> -->
    <div class = "searchBackground">
        <div>
            <input type="text" id="word" placeholder="请输入日语单词" v-model="JpWord" class="searchInput">
            <button type="button" @click="stranslate()" class="searchButton">翻译</button>
        </div>
        <div v-if="IsTranslated" class="result">
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="word"
                label="单词"
                width="180">
            </el-table-column>
            <el-table-column
                prop="spell"
                label="拼写"
                width="180">
            </el-table-column>
            <el-table-column
                prop="translation"
                label="翻译"
                width="800">
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style>
    .searchBackground {
      /* background-image: url("file:///D:/Blessing/从零开始的前端学习/translasan/opacity2.png"); */
      background-image: url("../../assets/img/opacity.png");
      background-repeat: no-repeat;
      background-size: cover;
      /* background-color: rgba(255,255,255,0.03); */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: auto;
      height: 100vh;
    }

    .searchInput[type=text] {
      width: 200px;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
    }

    .searchButton[type=button] {
      background-color: #4CAF50;
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    /* .button[type=button]:hover {
      background-color: #45a049;
    } */

    .result {
      background-color: none;
      opacity: 0.8;
      /* border: 1px solid #ddd; */
      /* padding: 10px; */
      /* margin-bottom: 10px; */
    }

    /* .form {
      display: flex;
      flex-direction: column;
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    } */
    
</style>

<script>
import HttpRequest from '../../http/http_request'

export default {
    data() {
        return {
            JpWord: "",
            IsTranslated: false,
            tableData: [],
        }
    },
    methods: {
        async stranslate() {
            this.IsTranslated = false
            this.tableData = []
            var req = {
                "word": this.JpWord
            }
            var data = await HttpRequest.commonRequest("/lookup", req)

            data.WordList.forEach(element => {
                this.tableData.push(element)
            });
            this.IsTranslated = true
        }
    }
}
</script>