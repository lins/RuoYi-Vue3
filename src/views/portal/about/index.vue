<template>
  <div class="about-page">
    <div class="about-container">
      <h2 class="section-title">关于我们</h2>
      
      <div class="company-intro">
        <div class="intro-content">
          <h3>公司简介</h3>
          <p>我们是一家专注于企业数字化转型的科技公司，致力于为企业提供智能化、数字化的解决方案。通过持续创新和技术积累，我们帮助客户实现业务升级和效率提升。</p>
        </div>
      </div>

      <div class="values-section">
        <h3>企业文化</h3>
        <div class="values-grid">
          <el-card v-for="value in values" :key="value.title" class="value-card">
            <el-icon :size="40" :color="value.color">
              <component :is="value.icon" />
            </el-icon>
            <h4>{{ value.title }}</h4>
            <p>{{ value.description }}</p>
          </el-card>
        </div>
      </div>

      <div class="team-section">
        <h3>我们的团队</h3>
        <p class="team-intro">我们拥有一支富有激情和创造力的专业团队，他们来自不同的技术领域，共同致力于为客户创造价值。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Star, Aim, Setting, Share } from '@element-plus/icons-vue'

const values = ref([
  {
    title: '创新驱动',
    description: '持续创新是我们的核心价值观，我们始终保持对新技术的探索和研究。',
    icon: Star,
    color: '#409EFF'
  },
  {
    title: '客户至上',
    description: '以客户需求为导向，提供专业的服务和解决方案。',
    icon: Aim,
    color: '#67C23A'
  },
  {
    title: '追求卓越',
    description: '追求卓越品质，打造精品服务，持续提升客户满意度。',
    icon: Setting,
    color: '#E6A23C'
  },
  {
    title: '合作共赢',
    description: '与合作伙伴建立长期稳定的合作关系，实现互利共赢。',
    icon: Share,
    color: '#F56C6C'
  }
])
</script>

<style scoped>
.about-page {
  padding: 2rem 0;
  background: #f5f7fa;
  min-height: calc(100vh - 64px - 300px);
}

.about-container {
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

.company-intro {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.intro-content h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.intro-content p {
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
}

.values-section {
  margin-bottom: 3rem;
}

.values-section h3 {
  text-align: center;
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-card {
  text-align: center;
  padding: 2rem;
}

.value-card h4 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 1rem 0;
}

.value-card p {
  color: #666;
  line-height: 1.6;
}

.team-section {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.team-section h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.team-intro {
  color: #666;
  line-height: 1.8;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }

  .company-intro,
  .team-section {
    padding: 2rem 1rem;
  }
}
</style>
