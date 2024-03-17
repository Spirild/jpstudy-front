<template>
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
</template>
<script>
export default {
    data() {
        // 后续data应该是从后端拿, 此处先捏一个测试数据吧
        // 之后尝试通过proto获取
        return {
            testData: [
                // 理论上应该是词、翻译、例句
                {
                    wordid: "1",
                    word: "約束",
                    spell: "やくそく",
                    translation: "约定"
                }
            ]
        }
    },
    computed: {
        getData() {
            return this.testData
        }
    }
}
</script>
<style>
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