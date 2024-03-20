<template>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3/>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.index" :index="item.index">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.index">
              <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    width: 200px;
    height: 100vh;
    /* height: 100%; */
  }

  .el-aside::-webkit-scrollbar {
    /* 加这里关闭滚动条真的是合适的吗 */
    display: none;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        menuData: [
          {
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          },
          {
            path: "/test",
            name: "test",
            label: "测试",
            icon: "edit",
            url: "Test/Test",
          },
          {
            // index用于未来的菜单排序。单独的菜单暂时只给10个名额吧
            index: "11",
            label: "日语",
            icon: "search",
            children: [
              {
                path: "/JpSearch",
                url: "JpStudy/JpSearch",
                label: "查词",
                name: "japanese-sear",
                index: "11-1"
              },
              {
                path: "/JpLite",
                url: "JpStudy/Jplite",
                label: "轻词本",
                name: "japanese-lite",
                index: "11-2"
              },
              {
                path: "/JpDetail",
                url: "JpStudy/JpDetail",
                label: "详情本",
                name: "japanese-detail",
                index: "11-3"
              },
              {
                path: "/JpCard",
                url: "JpStudy/JpCard",
                label: "单词卡",
                name: "japanese-card",
                index: "11-4"
              },
            ]
            
          }
        ]
      };
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      clickMenu(item) {
        console.log(item)
        if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
          this.$router.push(item.path)
        }
        
      }
    },
    computed: {
      noChildren() {
        return this.menuData.filter(item => !item.children)
      },
      hasChildren() {
        return this.menuData.filter(item => item.children)
      }
    }
  }
</script>