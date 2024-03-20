<template>
    <div>
        <!-- <router-view/> -->
        <el-container>
            <el-aside width="200px">
                <self-aside />
            </el-aside>
            <el-container>
                <el-header class="web-el-header">
                    <self-header />
                </el-header>
                <el-main class="web-el-main">
                    <router-view/>
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </div>
</template>

<script>
import SelfAside from '../components/SelfAside.vue'
import SelfHeader from '../components/SelfHeader.vue'
export default {
    data(){
        return {}
    },
    created() {
        // 模拟登录成功了

        // 这应该是从服务器获取的实际用户ID。目前先用我自己的
        const userId = 296099941;   
  
        // 将用户ID存储到LocalStorage中  
        localStorage.setItem('userId', userId);
    },
    components: {
        SelfAside,
        SelfHeader
    }
}
</script>
<style scoped>
.web-el-header {
    padding: 0%
}
.web-el-main {
    padding: 0%
}
</style>