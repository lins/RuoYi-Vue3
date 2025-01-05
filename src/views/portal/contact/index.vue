<template>
  <div class="contact-page">
    <div class="contact-container">
      <h2 class="section-title">联系我们</h2>
      
      <div class="contact-content">
        <div class="contact-info">
          <h3>联系方式</h3>
          <ul class="info-list">
            <li>
              <el-icon><Location /></el-icon>
              <span>地址：北京市朝阳区xxx大厦</span>
            </li>
            <li>
              <el-icon><Phone /></el-icon>
              <span>电话：010-xxxxx</span>
            </li>
            <li>
              <el-icon><Message /></el-icon>
              <span>邮箱：contact@xxx.com</span>
            </li>
          </ul>
        </div>

        <div class="contact-form">
          <h3>在线留言</h3>
          <el-form :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="请输入您的姓名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="请输入您的邮箱" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" placeholder="请输入您的联系电话" />
            </el-form-item>
            <el-form-item label="留言内容">
              <el-input
                v-model="form.message"
                type="textarea"
                rows="4"
                placeholder="请输入您的留言内容"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交留言</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Location, Phone, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  // 这里添加表单提交逻辑
  ElMessage({
    message: '留言已提交，我们会尽快与您联系！',
    type: 'success'
  })
}
</script>

<style scoped>
.contact-page {
  padding: 2rem 0;
  background: #f5f7fa;
  min-height: calc(100vh - 64px - 300px);
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.contact-info {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.contact-info h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #666;
}

.info-list li .el-icon {
  margin-right: 1rem;
  color: #409EFF;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.contact-form h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
