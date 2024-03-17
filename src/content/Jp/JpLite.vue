<template>
    <div class="liteMain">
        <search class="search">
            <span>等級: </span>
            <input
                id="levelInput"
                placeholder=""
                class="chose"
                v-model="levelInputValue"
            >
            <span>単語: </span><input id="wordInput" placeholder="" class="chose" v-model="wordInputValue">
            <button @click="selectTable()" class="liteButton">調べる</button>
            <button type="text" @click="addRow" class="liteButton">増す</button>
        </search>
        <div class="levelExpress">
            <p>現在の等級: {{ getCurrentLevel() }}</p>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        class="selfTable">
        <el-table-column
            prop="word"
            label="単語"
            width="180">
            <template slot-scope="scope">
                <span v-if="!scope.row.isEditing">{{ scope.row.word }}</span>  
                <el-input v-else v-model="scope.row.word"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            prop="spell"
            label="50トーン"
            width="180">
            <template slot-scope="scope">
                <span v-if="!scope.row.isEditing">{{ scope.row.spell }}</span>  
                <el-input v-else v-model="scope.row.spell"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            prop="translation"
            label="翻訳"
            width="180">
            <template slot-scope="scope">
                <span v-if="!scope.row.isEditing">{{ scope.row.translation }}</span>  
                <el-input v-else v-model="scope.row.translation"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            prop="example"
            label="用例">
            <template slot-scope="scope">
                <span v-if="!scope.row.isEditing">{{ scope.row.example }}</span>  
                <el-input v-else v-model="scope.row.example"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Edit"
            width="300">
            <template slot-scope="scope">
                <div v-if="scope.row.isEditing">
                    <el-button @click="saveRow(scope.row)" type="text" size="small">Save</el-button>
                    <el-button @click="cancelEdit(scope.row)" type="text" size="small">Cancel</el-button>
                </div>
                <div v-else>
                    <el-button @click="editRow(scope.row)" type="text" size="small">修正</el-button>
                    <el-button @click="rememberRow(scope.row)" type="text" size="small">記する</el-button>
                    <el-button @click="forgetRow(scope.row)" type="text" size="small">忘る</el-button>
                    <el-button @click="deleteRow(scope.row)" type="text" size="small">削除</el-button>
                </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- <span class="demonstration">页数较少时的效果</span> -->
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
    </div>
<!-- <div class="block">
    
  </div> -->
  <!-- <div class="block">
    <span class="demonstration">大于 7 页时的效果</span>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
</div> -->
</template>

<style>
    .liteMain {
        padding: 20px
    }
    .levelExpress {
        display: flex;
        justify-content: flex-start;
    }
    .search {  
        display: flex;  
        justify-content: flex-start;
        margin-bottom: 20px;
    }
    .chose {
        margin-left: 10px;
        margin-right: 20px;
    }
    .selfTable {
        margin-bottom: 20px;
    }
    .liteButton {
        margin-right: 20px;
    }
</style>

<script>
    // import * as pbdata from "@/proto/message_pb"
    import HttpRequest, { JpLiteHttpRequest } from '../../http/http_request';

    export default {
      data() {
        return {
            tableData: [],
            currentPage: 1,
            expressLevel: 1,
            pageSize: 10,
            total: 0, 
            levelInputValue: "",
            wordInputValue: "",
        }
      },
      created() {
        this.selectTable()
      },
      methods: {
        editRow(row) {
            this.$set(row, 'isEditing', true);
        },

        cancelEdit(row) {
            if (row.wordid === "") {
                this.testData.pop()
            } else {
                this.$set(row, 'isEditing', false)
            }
        },

        getCurrentLevel() {
            return this.expressLevel
        },

        rememberRow(row) {
            var wordid = row.word_id
            var req = JSON.stringify({
                "word_id": wordid
            })
            HttpRequest.commonRequest('/jplevelup', req)
            this.resetTableParam()
            this.selectTable()
        },

        forgetRow(row) {
            var wordid = row.word_id
            var req = JSON.stringify({
                "word_id": wordid
            })
            HttpRequest.commonRequest('/jpleveldown', req)
            this.resetTableParam()
            this.selectTable()
        },

        saveRow(row) {
            var req = {
                "jp_word": row
            }
            HttpRequest.commonRequest('/jpinsertupdate', req)
            this.resetTableParam()
            this.selectTable()
        },

        handleCurrentChange(val) {  
            this.currentPage = val;  
            this.selectTable(); // 重新获取数据  
        },  

        addRow() {
            this.tableData.push(
                {
                    wordid: "",
                    word: "",
                    spell: "",
                    translation: "",
                    example: "",
                    isEditing: true
                }
            )
        },

        deleteRow(row) {
            var req = {
                "word_id": row.word_id
            }
            debugger
            HttpRequest.commonRequest('/jpdelete', req)
            this.resetTableParam()
            this.selectTable()
        },

        async loadTable( param ) {
            var data = await JpLiteHttpRequest.getJpLiteTable(param)
            this.tableData = []
            data.JpWordList.forEach(item => {
                item.isEditing = false
                this.tableData.push(item)
            })
            this.total = data.Common.total
        },

        selectTable() {
            var level = 1
            if(this.levelInputValue != "") {
                level = Number(this.levelInputValue)
            }
            var word = ""
            if(this.wordInputValue != "") {
                word = this.wordInputValue
            }
            var page = this.currentPage

            var tjson = {
                'level': level,
                'word': word,
                'common': {
                    'page': page,
                    'size': 10 // hard code tmp
                }
            }
            
            this.expressLevel = level
            this.loadTable( tjson )
        },

        resetTableParam() {
            this.currentPage = 1
        }
      }
    }

</script>