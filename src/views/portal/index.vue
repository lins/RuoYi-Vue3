<template>
  <div class="portal-container">
    <!-- 轮播图 -->
    <el-carousel height="500px" class="banner">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-item" :style="{ background: item.gradient }">
          <div class="banner-content">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 功能卡片 -->
    <section class="section features-section">
      <div class="section-content">
        <div class="features-grid">
          <el-card v-for="feature in features" :key="feature.id" class="feature-card">
            <div class="feature-icon">
              <el-icon :size="40" :color="'#409EFF'">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </el-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Monitor, Setting, Operation, Promotion } from '@element-plus/icons-vue'

const banners = ref([
  {
    id: 1,
    title: '智能办公解决方案',
    description: '提供全方位的企业级应用服务',
    gradient: 'linear-gradient(120deg, #409EFF, #2c3e50)'
  },
  {
    id: 2,
    title: '数字化转型专家',
    description: '助力企业实现数字化升级',
    gradient: 'linear-gradient(120deg, #67C23A, #2c3e50)'
  },
  {
    id: 3,
    title: '安全可靠',
    description: '保障企业数据安全',
    gradient: 'linear-gradient(120deg, #E6A23C, #2c3e50)'
  }
])

const features = ref([
  {
    id: 1,
    title: '系统监控',
    description: '实时监控系统运行状态，确保系统稳定运行',
    icon: Monitor
  },
  {
    id: 2,
    title: '系统管理',
    description: '提供完善的系统管理功能，方便管理员操作',
    icon: Setting
  },
  {
    id: 3,
    title: '运维管理',
    description: '提供系统运维工具，降低运维成本',
    icon: Operation
  },
  {
    id: 4,
    title: '业务管理',
    description: '灵活的业务功能配置，满足不同需求',
    icon: Promotion
  }
])
</script>

<style scoped>
.portal-container {
  width: 100%;
}

.banner {
  width: 100%;
}

.banner-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.banner-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%);
  z-index: 1;
}

.banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
}

.banner-content h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.banner-content p {
  font-size: 1.4rem;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.section {
  padding: 4rem 0;
  background: #f5f7fa;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .banner-content {
    padding: 1rem;
    max-width: 90%;
  }

  .banner-content h2 {
    font-size: 1.8rem;
  }

  .banner-content p {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
