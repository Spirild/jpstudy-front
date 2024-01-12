<template>
    <div class="card-container">
        <el-card>
            <img src="image1.jpg">
            <div class="card-body">
            <h3>Card Title</h3>
            <p>Card description</p>
            </div>
        </el-card>
        <el-card>
            <img src="image2.jpg">
            <div class="card-body">
            <h3>Card Title</h3>
            <p>Card description</p>
            </div>
        </el-card>
        <el-card>
            <img src="image3.jpg">
            <div class="card-body">
            <h3>Card Title</h3>
            <p>Card description</p>
            </div>
        </el-card>
        <el-card>
            <img src="image4.jpg">
            <div class="card-body">
            <h3>Card Title</h3>
            <p>Card description</p>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.el-card {
  width: 25%;
  margin: 10px;
}

</style>