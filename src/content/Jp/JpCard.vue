<template>
    <div>
        <el-button @click="loadCardData" class="card-button">换一批</el-button>
        <div class="card-container">
            <el-card v-for="word in getData" :key="word.wordid">
                <!-- <img src="image1.jpg"> -->
                <div class="card-body">
                <h3>{{ word.word }}</h3>
                <p>{{ word.spell }}</p>
                <p>{{ word.translation }}</p>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import HttpRequest from '../../http/http_request'

export default {
    data() {
        // 之后尝试通过proto获取
        return {
            cardData: [
                // {
                //     wordid: "1",
                //     word: "約束",
                //     spell: "やくそく",
                //     translation: "约定"
                // }
            ]
        }
    },
    created() {
        this.loadCardData()
    },
    computed: {
        getData() {
            return this.cardData
        }
    },
    methods: {
        async loadCardData( ) {
            var req = {
                // hardcode tmp
                "size": 6
            }
            var data = await HttpRequest.commonRequest( "/getJpCard", req )
            this.cardData = []
            data.JpWordList.forEach(item => {
                this.cardData.push(item)
            })
        },
    }
}
</script>
<style>
.card-button {
    border: none;
    color: #41bae2;
    display: flex;
    justify-content: start;
}
.card-container {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
}

.el-card {
    width: 25%;
    margin: 10px;
}

</style>