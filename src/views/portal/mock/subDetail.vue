<template>
  <div class="mock-subdetail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mock' }">模拟测试</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/mock/${route.params.type}` }">{{ parentTitle }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentExam.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="section-title">
      <h2>{{ currentExam.title }}</h2>
      <p>{{ currentExam.description }}</p>
    </div>
    
    <div class="content-grid">
      <div class="content-item">
        <h3>考试说明</h3>
        <p>本考试旨在全面评估考生在该领域的专业技能和实践能力，包含理论知识和实践操作两个部分。</p>
      </div>
      
      <div class="content-item">
        <h3>考试大纲</h3>
        <ul>
          <li>基础知识（30%）</li>
          <li>核心技能（40%）</li>
          <li>实践应用（30%）</li>
        </ul>
      </div>
      
      <div class="content-item">
        <h3>考试形式</h3>
        <p>线上考试 + 实操考核，总时长180分钟</p>
      </div>
      
      <div class="content-item">
        <h3>证书级别</h3>
        <p>初级、中级、高级三个等级</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const parentTitle = ref('')
const currentExam = ref({})

const examData = {
  ceit: {
    title: '电子学会青少年等级考试（CEIT）',
    items: {
      robot: { title: '机器人技术等级考试', description: '全面测评机器人设计、编程和控制能力' },
      graphic: { title: '图形化软件编程等级考试', description: '考察图形化编程基础知识和应用能力' },
      python: { title: 'Python软件编程等级考试', description: 'Python语言基础及其应用开发能力认证' },
      c: { title: 'C语言软件编程等级考试', description: 'C语言程序设计与算法实现能力测评' },
      drone: { title: '无人机技术等级考试', description: '无人机操控与应用开发技术认证' }
    }
  },
  // ... 其他考试类型的数据
}

onMounted(() => {
  const { type, subtype } = route.params
  if (examData[type]) {
    parentTitle.value = examData[type].title
    currentExam.value = examData[type].items[subtype] || {}
  }
})
</script>

<style lang="scss" scoped>
.mock-subdetail {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px;
}

.breadcrumb {
  margin-bottom: 24px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.content-item {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      font-size: 15px;
      color: #666;
      line-height: 1.8;
      padding-left: 20px;
      position: relative;
      
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 10px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #409eff;
      }
    }
  }
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title h2 {
    font-size: 28px;
  }
}
</style>
