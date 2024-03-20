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