<template>
  <div class="mock-container">
    <!-- <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>模拟测试</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->

    <div class="section-title">
      <h2>模拟测试</h2>
      <p>为您提供全面的信息技术能力测评</p>
    </div>
    
    <div class="exam-grid">
      <!-- 第一行 -->
      <div class="exam-item" @click="goToDetail('ceit')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/ceit.png" alt="CEIT">
        </div>
        <div class="exam-info">
          <h3>电子学会青少年等级考试</h3>
          <p class="exam-code">CEIT</p>
          <p class="exam-org">中国电子学会</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('gesp')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/gesp.png" alt="GESP">
        </div>
        <div class="exam-info">
          <h3>CCF编程能力等级认证</h3>
          <p class="exam-code">GESP</p>
          <p class="exam-org">中国计算机学会</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('ycl')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/ycl.png" alt="YCL/YAI">
        </div>
        <div class="exam-info">
          <h3>青少年人工智能水平测试</h3>
          <p class="exam-code">YCL/YAI</p>
          <p class="exam-org">工业和信息化部</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('nct')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/nct.png" alt="NCT">
        </div>
        <div class="exam-info">
          <h3>青少年编程能力等级测试</h3>
          <p class="exam-code">NCT</p>
          <p class="exam-org">中国软件行业协会</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('csp')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/csp.png" alt="CSP-J/S">
        </div>
        <div class="exam-info">
          <h3>CCF CSP软件能力认证</h3>
          <p class="exam-code">CSP-J/S</p>
          <p class="exam-org">中国计算机学会</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('noc')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/noc.png" alt="NOC">
        </div>
        <div class="exam-info">
          <h3>信息技术创新与实践大赛</h3>
          <p class="exam-code">NOC</p>
          <p class="exam-org">中国人工智能学会</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('ceic')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/ceic.png" alt="CEIC">
        </div>
        <div class="exam-info">
          <h3>全国青少年信息素养大赛</h3>
          <p class="exam-code">CEIC</p>
          <p class="exam-org">中国电子学会</p>
        </div>
      </div>
      
      <div class="exam-item" @click="goToDetail('lanqiao')">
        <div class="exam-logo">
          <img src="@/assets/images/mock/lanqiao.png" alt="LANQIAO">
        </div>
        <div class="exam-info">
          <h3>蓝桥杯大赛青少组</h3>
          <p class="exam-code">LANQIAO</p>
          <p class="exam-org">工业和信息化部</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDetail = (type) => {
  router.push(`/mock/${type}`)
}
</script>

<style lang="scss" scoped>
.mock-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.breadcrumb {
  margin-bottom: 24px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.section-title {
  text-align: center;
  
  h2 {
    font-size: 36px;
    font-weight: 600;
    background: linear-gradient(45deg, #409eff, #66b1ff);
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 16px;
    color: #666;
    letter-spacing: 1px;
  }
}

.exam-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.exam-item {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 30px rgba(64, 158, 255, 0.15);
    
    .exam-logo img {
      transform: scale(1.08);
    }
  }
}

.exam-logo {
  width: 100%;
  aspect-ratio: 4/3;
  background: rgba(64, 158, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  
  img {
    width: 194px;
    height: auto;
    object-fit: contain;
    transition: transform 0.4s ease;
  }
}

.exam-info {
  padding: 20px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
    line-height: 1.4;
  }
  
  .exam-code {
    display: inline-block;
    font-size: 13px;
    color: #409eff;
    background: rgba(64, 158, 255, 0.1);
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 6px;
  }
  
  .exam-org {
    font-size: 13px;
    color: #666;
  }
}

@media (max-width: 1200px) {
  .exam-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .exam-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .mock-container {
    max-width: 400px;
  }
  
  .exam-grid {
    grid-template-columns: 1fr;
  }
}
</style>
