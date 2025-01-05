<template>
  <div class="news-list">
    <div class="news-container">
      <h2 class="section-title">新闻动态</h2>
      <div class="news-grid">
        <el-card v-for="news in newsList" :key="news.id" class="news-card" shadow="hover">
          <div class="news-image" :style="{ background: news.gradient }"></div>
          <div class="news-content">
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-summary">{{ news.summary }}</p>
            <div class="news-footer">
              <span class="news-date">{{ news.date }}</span>
              <router-link :to="'/news/' + news.id" class="read-more">
                阅读更多
              </router-link>
            </div>
          </div>
        </el-card>
      </div>
      
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[8, 12, 24, 36]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(8)
const total = ref(100)

const newsList = ref([
  {
    id: 1,
    title: '公司荣获2024年度创新企业奖',
    summary: '在近日举行的2024年度创新企业评选中，我公司凭借突出的技术创新能力和优秀的企业文化，从众多参选企业中脱颖而出...',
    date: '2024-01-05',
    gradient: 'linear-gradient(120deg, #409EFF, #2c3e50)'
  },
  {
    id: 2,
    title: '新产品发布会圆满成功',
    summary: '我公司最新研发的产品在北京举行了盛大的发布会，获得了业界广泛关注...',
    date: '2024-01-03',
    gradient: 'linear-gradient(120deg, #67C23A, #2c3e50)'
  },
  {
    id: 3,
    title: '战略合作协议签署仪式',
    summary: '我公司与多家知名企业签署战略合作协议，共同推进行业发展...',
    date: '2024-01-01',
    gradient: 'linear-gradient(120deg, #E6A23C, #2c3e50)'
  },
  // 更多新闻...
])

const handleSizeChange = (val) => {
  console.log('size change:', val)
}

const handleCurrentChange = (val) => {
  console.log('page change:', val)
}
</script>

<style scoped>
.news-list {
  padding: 2rem 0;
  background: #f5f7fa;
  min-height: calc(100vh - 64px - 300px);
}

.news-container {
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.news-card {
  height: 100%;
  transition: transform 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-image {
  height: 160px;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.news-content {
  padding: 0 0.5rem;
}

.news-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-summary {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.news-date {
  color: #999;
  font-size: 0.9rem;
}

.read-more {
  color: #409EFF;
  text-decoration: none;
}

.read-more:hover {
  color: #66b1ff;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
