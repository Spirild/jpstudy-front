<template>
    <div class="detailMain">
        
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
            prop="example"
            label="用例">
            <template slot-scope="scope">
                <span v-if="!scope.row.isEditing">{{ scope.row.example }}</span>  
                <el-input v-else v-model="scope.row.example"></el-input>
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
</template>

<style>
.detailMain {
    padding: 20px;
}
</style>

<script>
import HttpRequest from '../../http/http_request'
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0, 
        }
    },
    created() {
        this.loadTable()
    },

    methods: {
        async loadTable() {
            var req = {
                "common": {
                    "page": this.currentPage,
                    "size": this.pageSize
                }
            }
            var data = await HttpRequest.commonRequest("/selectDetailTable", req)
            this.tableData = []
            data.JpWordList.forEach(item => {
                this.tableData.push(item)
            })
            this.total = data.Common.total
        },

        handleCurrentChange(val) {  
            this.currentPage = val;  
            this.loadTable(); // 重新获取数据  
        },  
    }
}
</script>