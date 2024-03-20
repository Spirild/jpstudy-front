<template>
   <div class="header-container">
    <!-- <el-button @click="handleClick">test</el-button> -->
        <div class="l-content"></div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user" :src="currentUserImg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="a">切换用户</el-dropdown-item>
                    <!-- <el-dropdown-item>退出</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
            <el-dialog  
            title="选择用户"  
            :visible.sync="dialogVisible"  
            width="30%"  
            @close="dialogVisible = false"  
            >  
                <div class="my-dialog-body">
                    <el-button 
                        v-for="user in userList"  
                        :key="user.id"
                        @click="selectUser(user.id)"
                        class="avatar-container">
                        <div class="user-style">  
                            <img :src="user.image" class="avatar-circle" />  
                            <span>{{ user.name }}</span>  
                        </div>  
                    </el-button>
                </div>
                <!-- </el-select> -->
                <span slot="footer" class="dialog-footer">  
                    <el-button @click="dialogVisible = false">取消</el-button>  
                    <el-button type="primary" @click="confirmSelection">确定</el-button>  
                </span>  
            </el-dialog>  
        </div>
   </div>
</template>
<script>
export default {
    data() {
        return {
            dialogVisible: false,  
            selectedUserId: "",
            wantSelectUserId: "",
            currentUserImg: "",
            userList: [  
                // 未来还是得从后端拿
                { id: "296099941", name: '饭团', image: require('@/assets/img/user1.jpg')},  
                { id: "604367882", name: '超越', image: require('@/assets/img/user2.jpg')},  
                // 如果有更多用户，继续添加...  
            ]
        }
    },
    created() {
        this.selectedUserId = localStorage.getItem('userId');
        let currentUser = this.userList.find(user => user.id === this.selectedUserId)
        // currentUser.isSelected = true
        this.currentUserImg = currentUser.image;
    },
    methods: {
        handleCommand( command ) {
            if (command === 'a') {  
                // 处理选项A的点击逻辑  
                this.changeUser()
            }
        },
        changeUser() {
            this.wantSelectUserId = ""
            this.dialogVisible = true
        },
        confirmSelection() {  
            if (this.wantSelectUserId) {  
                const selectedUser = this.userList.find(user => user.id === this.wantSelectUserId);  
                if (selectedUser) {  
                    this.$message({  
                        type: 'success',  
                        message: '切换用户为: ' + selectedUser.name  
                    });
                    this.currentUserImg = selectedUser.image
                    this.selectedUserId = selectedUser.id
                    localStorage.setItem('userId', selectedUser.id);
                }  
                this.dialogVisible = false;  
            } else {  
                this.$message({  
                type: 'warning',  
                message: '请选择一个用户'  
                });  
            }  
        },
        selectUser(userId) {
            // let currentUser = this.userList.find(user => user.id === this.selectedUserId)
            // currentUser.isSelected = false
            // let wantSelectUser = this.userList.find(user => user.id === userId)
            // wantSelectUser.isSelected = true
            this.wantSelectUserId = userId
        },
    }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        margin-left: auto;
    }
}
.avatar-circle {  
  width: 50px;  
  height: 50px;  
  border-radius: 50%;  
  object-fit: cover;  
  margin-right: 10px;  
}
.avatar-container {  
  border: 2px solid transparent; /* 初始边框透明 */  
  margin: 5px;
//   width: fit-content;
//   cursor: pointer;
//   position: relative; /* 为了定位伪元素或子元素 */  
//   transition: border-color 0.3s ease, border-width 0.3s ease; /* 添加过渡效果到边框颜色和宽度 */
}
.user-style {
    display: flex; /* 使用Flexbox布局 */  
    justify-content: center; /* 水平居中 */  
    align-items: center; /* 垂直居中 */
}  
  
.avatar-container.selected {  
  border-color: #3b8deb; /* 选中时的边框颜色 */
  border-width: 3px;
} 
</style>