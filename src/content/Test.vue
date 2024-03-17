<template>  
    <div id="app">
      <el-button class="main-button" @click="showModal">查看待办</el-button>
      <div v-if="isModalShown" class="modal">
        
        <div class="modal-content">
          <span class="close" @click="cancelModal">&times;</span>
          <h2>待办事项</h2>  
          <div v-if="!isEditing" v-html=markdownHtml class="modal-html"></div>
          <div v-if="!isEditing" @click="editMarkdown" class="editor-controls"> 
            <el-button  class="editor-controls">编辑</el-button>
            <el-button @click="cancelModal">取消</el-button>
          </div> 
          <mavon-editor
            v-if="isEditing"
            v-model="markdownContent"
            @change="change"
            style="min-height: 600px"
            />
          <div v-if="isEditing" class="editor-controls">  
            <el-button @click="saveMarkdown">保存</el-button>  
            <el-button @click="cancelEdit">取消</el-button>  
          </div>
        </div>  
      </div>
      <TestBot />  
    </div>  
  </template>  
    
<script> 
import markdownIt from 'markdown-it'
import HttpRequest, { MarkdownRequest } from '../http/http_request'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import TestBot from './TestBot.vue'
    
  export default {
    components: {
        mavonEditor,
        TestBot
    },
    data() {  
      return {  
        isModalShown: false,  
        isEditing: false,
        isChange: false,
        markdownContent: '', // 这里是您的 Markdown 内容
        markdownCache: '',
        markdownHtml: '',
        md: markdownIt({  
          html: true,  
          linkify: true,  
          typographer: true,  
        }),  
        editorOption: {  
          theme: 'snow',  
          placeholder: '请输入Markdown内容...',  
          modules: { toolbar: true },  
        },  
      }  
    }, 
    methods: {
      renderedMarkdown() {
        this.markdownHtml = this.md.render(this.markdownContent)
      },
      showModal() {
        this.isModalShown = true
        this.isEditing = false;
        this.loadMarkdown()
      },
      cancelModal() {
        this.isModalShown = false
      },
      editMarkdown() {  
        this.isEditing = true;
        this.markdownCache = this.markdownContent 
      },  
      async saveMarkdown() {  
        // 这里是保存Markdown内容的逻辑
        if(this.isChange) {
            await MarkdownRequest.saveMarkdown( this.markdownContent )
        }
        this.isEditing = false; // 保存后退出编辑状态  
        this.isChange = false
      },  
      cancelEdit() {
        this.markdownContent = this.markdownCache
        this.isEditing = false; // 取消编辑，回到显示状态
        this.isChange = false
        this.renderedMarkdown()
      },  
      async loadMarkdown() {
        var res = await HttpRequest.commonGet('/getMarkdown')
        this.markdownContent = res.markdown_content
        this.renderedMarkdown()
      },
      change(value, render) {
        this.markdownHtml = render
        this.isChange = true
      }
    }  
  }  
  </script>
    
<style scoped>
.main-button {
    border: none;
    color: #41bae2;
    display: flex;
    justify-content: flex-start;
}

.modal {  
  display: block; /* Hidden by default */  
  position: fixed; /* Stay in place */  
  z-index: 1; /* Sit on top */  
  left: 0;  
  top: 0;  
  width: 100%; /* Full width */  
  height: 100%; /* Full height */  
  overflow: auto; /* Enable scroll if needed */  
  background-color: rgb(0,0,0); /* Fallback color */  
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */  
}  
  
.modal-content {  
  background-color: #fefefe;  
  margin: 7% auto; /* 15% from the top and centered */  
  padding: 20px;  
  border: 1px solid #888;  
  width: 70%; /* Could be more or less, depending on screen size */  
}

  .modal-html {
    display: flex;
    text-align: left;
    flex-direction: column;
  }
    
  .close {  
    color: #aaa;  
    float: right;  
    font-size: 28px;  
    font-weight: bold;  
  }  
    
  .close:hover,  
  .close:focus {  
    color: black;  
    text-decoration: none;  
    cursor: pointer;  
  }
  .editor-controls {  
    margin-top: 10px;
  }
  </style>