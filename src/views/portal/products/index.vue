<template>
  <div class="products-list">
    <div class="products-container">
      <h2 class="section-title">产品展示</h2>
      <div class="products-grid">
        <el-card v-for="product in products" :key="product.id" class="product-card" shadow="hover">
          <div class="product-image" :style="{ background: product.gradient }"></div>
          <div class="product-content">
            <h3 class="product-title">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-features">
              <el-tag v-for="feature in product.features" :key="feature" size="small">
                {{ feature }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: '智能办公系统',
    description: '提供全方位的企业级办公解决方案，包含文档管理、任务协作、工作流程等功能。',
    features: ['文档管理', '任务协作', '工作流'],
    gradient: 'linear-gradient(120deg, #409EFF, #2c3e50)'
  },
  {
    id: 2,
    name: '数据分析平台',
    description: '强大的数据分析工具，帮助企业深入理解业务数据，做出明智决策。',
    features: ['数据可视化', '实时分析', 'AI预测'],
    gradient: 'linear-gradient(120deg, #67C23A, #2c3e50)'
  },
  {
    id: 3,
    name: '安全管理系统',
    description: '全面的安全管理解决方案，保护企业数据安全，防止信息泄露。',
    features: ['访问控制', '数据加密', '安全审计'],
    gradient: 'linear-gradient(120deg, #E6A23C, #2c3e50)'
  }
])
</script>

<style scoped>
.products-list {
  padding: 2rem 0;
  background: #f5f7fa;
  min-height: calc(100vh - 64px - 300px);
}

.products-container {
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  height: 100%;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.product-content {
  padding: 0 0.5rem;
}

.product-title {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.product-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
