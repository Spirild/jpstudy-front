<template>  
    <div class="chat-bot">  
      <div class="chat-messages">  
        <div class="message" :class="{'user-message': message.from === 'user', 'bot-message': message.from === 'bot'}" v-for="message in allMessages" :key="message.id">  
            {{ message.text }}  
        </div>
      </div>  
      <div class="input-area">  
        <input type="text" v-model="userInput" placeholder="どうしようかな..." @keyup.enter="sendMessage" />  
        <!-- <el-button type="primary" round @click="sendMessage"></el-button> -->
        <el-button type="primary" icon="el-icon-edit" circle @click="sendMessage"></el-button>
      </div>  
    </div>  
  </template>  
    
<script>
import HttpRequest from '../http/http_request';

export default {
    data() {  
      return {  
        userInput: '',
        allMessages: [],
      };  
    },  
    methods: {  
      async sendMessage() {  
        if (this.userInput) {  
            const userMessage = {  
                id: Date.now(), // 使用时间戳作为唯一标识符  
                from: 'user',  
                text: this.userInput,  
            };  
            this.allMessages.push(userMessage); // 添加到消息列表  
            // 假设这是从后端API获取的机器人回复
            var botRes = await this.generateBotReply(this.userInput)
            const botMessage = {  
                id: Date.now(),  
                from: 'bot',  
                text: botRes,  
            };  
            this.allMessages.push(botMessage); // 添加到消息列表  
            this.userInput = ''; // 清空输入框  
            this.$nextTick(() => {  
            // 滚动到聊天区域的底部  
                const chatMessages = this.$el.querySelector('.chat-messages');  
                chatMessages.scrollTop = chatMessages.scrollHeight;  
            });  
        }  
      },  
      async generateBotReply(message) {  
        // 这里模拟一个简单的机器人回复生成逻辑
        var req = {
            "content": message
        }
        var res = await HttpRequest.commonRequest('/askBotDemo', req)
        return 'Bot: ' + res.content;
      }
    },  
  };  
  </script>
    
<style scoped>  
    .chat-bot {  
      width: 100%;  
      max-width: 1200px;  
      margin: 0 auto;  
      display: flex;  
      flex-direction: column;  
      height: 80vh; /* 使聊天机器人容器占据整个视口高度 */  
    }  
      
    .chat-messages {  
      flex: 1; /* 占据剩余空间 */  
      border: none;
      padding: 10px;  
      overflow-y: auto;  
      display: flex;  
      flex-direction: column; /* 消息从底部开始显示 */  
    }  
      
    .message {  
      margin-bottom: 10px; /* 增加消息之间的间距 */  
      /*align-self: flex-end; /* 消息靠右对齐 */  
    }  
      
    .user-message {  
      color: blue;
      text-align: right; /* 用户消息右对齐 */  
    }  
      
    .bot-message {  
      color: green;  
      text-align: left; /* 机器人消息左对齐 */  
    }  
      
    .input-area {  
      flex-shrink: 0; /* 防止输入框被压缩 */  
      padding: 10px;  
      background-color: #f5f5f5; /* 添加背景色以区分消息区域 */  
      /*border-top: 1px solid #ccc; /* 顶部边框分隔 */  
      display: flex;  
    }  
      
    input[type="text"] {  
      flex: 1;  
      padding: 5px;  
      border: none; /* 移除输入框边框 */  
      outline: none; /* 移除聚焦时的轮廓 */  
    }  
      
    button {  
      flex: 0 0 80px;  
      padding: 5px;  
      border: none;  
      background-color: #4caf50;  
      color: white;  
      cursor: pointer;  
    }  
</style>