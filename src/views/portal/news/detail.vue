<template>
  <div class="news-detail">
    <div class="detail-container">
      <h1 class="news-title">{{ news.title }}</h1>
      <div class="news-meta">
        <span class="date">发布时间：{{ news.date }}</span>
        <span class="author">作者：{{ news.author }}</span>
        <span class="views">浏览量：{{ news.views }}</span>
      </div>
      <div class="news-content" v-html="news.content"></div>
      
      <div class="news-navigation">
        <div v-if="news.prev" class="prev">
          <router-link :to="'/portal/news/' + news.prev.id">
            上一篇：{{ news.prev.title }}
          </router-link>
        </div>
        <div v-if="news.next" class="next">
          <router-link :to="'/portal/news/' + news.next.id">
            下一篇：{{ news.next.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const news = ref({
  id: 1,
  title: '公司荣获2024年度创新企业奖',
  date: '2024-01-05',
  author: '管理员',
  views: 1234,
  content: '<p>在近日举行的2024年度创新企业评选中，我公司凭借突出的技术创新能力和优秀的企业文化，从众多参选企业中脱颖而出，荣获"2024年度创新企业奖"。</p>' +
    '<p>这是对公司多年来坚持创新发展战略的充分肯定，也是对全体员工辛勤付出的最好褒奖。公司将继续秉持"创新引领未来"的理念，不断提升技术研发能力，为客户提供更优质的产品和服务。</p>' +
    '<h3>创新成果展示</h3>' +
    '<p>过去一年，公司在技术创新方面取得了显著成果：</p>' +
    '<ul>' +
    '<li>获得发明专利20项</li>' +
    '<li>研发新产品15款</li>' +
    '<li>技术创新投入达到营收的15%</li>' +
    '</ul>' +
    '<p>未来，公司将继续加大创新投入，引领行业发展。</p>',
  prev: {
    id: 1,
    title: '上一篇新闻标题'
  },
  next: {
    id: 2,
    title: '下一篇新闻标题'
  }
})

onMounted(() => {
  // 这里可以根据route.params.id获取新闻详情
  console.log('News ID:', route.params.id)
})
</script>

<style scoped>
.news-detail {
  padding: 2rem 0;
}

.detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.news-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.news-meta {
  color: #666;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.news-meta span {
  margin-right: 2rem;
}

.news-content {
  line-height: 1.8;
  color: #2c3e50;
}

.news-content h3 {
  margin: 2rem 0 1rem;
  color: #2c3e50;
}

.news-content p {
  margin-bottom: 1rem;
}

.news-content ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.news-navigation {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.news-navigation a {
  color: #409EFF;
  text-decoration: none;
}

.news-navigation a:hover {
  color: #66b1ff;
}
</style>
