<template>
  <div class="mock-detail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mock' }">真题测试</el-breadcrumb-item>
        <el-breadcrumb-item>{{ examInfo.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="section-title">
      <h2>{{ examInfo.title }}</h2>
      <p>{{ examInfo.description }}</p>
    </div>
    
    <div class="image-grid">
      <div v-for="(item, index) in examInfo.items" :key="index" 
           class="image-item"
           @click="goToSubDetail(item.type)">
        <div class="item-image">
          <img :src="getImageUrl(item.type)" :alt="item.title">
        </div>
        <div class="item-content">
          <p class="image-title">{{ item.title }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const examInfo = ref({
  ceit: {
    title: '电子学会青少年等级考试（CEIT）',
    description: '由中国电子学会主办的青少年信息技术等级考试',
    items: [
      { title: '机器人技术等级考试', description: '全面测评机器人设计、编程和控制能力', type: 'robot' },
      { title: '图形化软件编程等级考试', description: '考察图形化编程基础知识和应用能力', type: 'scratch' },
      { title: 'Python软件编程等级考试', description: 'Python语言基础及其应用开发能力认证', type: 'python' },
      { title: 'C语言软件编程等级考试', description: 'C语言程序设计与算法实现能力测评', type: 'c' },
      { title: '无人机技术等级考试', description: '无人机操控与应用开发技术认证', type: 'uav' }
    ]
  },
  gesp: {
    title: 'CCF编程能力等级认证（GESP）',
    description: '中国计算机学会青少年编程能力等级认证',
    items: [
      { title: '图形化编程等级认证', description: '图形化编程基础知识与实践能力认证', type: 'scratch' },
      { title: 'Python编程等级认证', description: 'Python编程技能与应用开发能力认证', type: 'python' },
      { title: 'C++编程等级认证', description: 'C++语言程序设计与算法实现能力认证', type: 'cpp' }
    ]
  },
  ycl: {
    title: '青少年人工智能水平测试（YCL/YAI）',
    description: '工业和信息化部举办的青少年人工智能能力认证',
    items: [
      { title: '图形化编程水平测试', description: '图形化方式实现人工智能应用的能力测试', type: 'scratch' },
      { title: 'Python编程水平测试', description: '使用Python开发人工智能应用的能力认证', type: 'python' },
      { title: 'C++编程水平测试', description: 'C++在人工智能领域的应用开发能力测试', type: 'cpp' },
      { title: '人工智能技术水平测试', description: '人工智能基础理论与实践应用能力认证', type: 'yai' }
    ]
  },
  nct: {
    title: '青少年编程能力等级测试（NCT）',
    description: '中国软件行业协会举办的青少年编程能力认证',
    items: [
      { title: 'Scratch编程能力等级测试', description: 'Scratch创意编程与项目开发能力认证', type: 'scratch' },
      { title: 'Python编程能力等级测试', description: 'Python程序设计与应用开发能力测试', type: 'python' },
      { title: 'C++编程能力等级测试', description: 'C++编程基础与算法应用能力认证', type: 'cpp' },
      { title: 'Kitten编程能力等级测试', description: 'Kitten青少年编程入门与进阶能力测试', type: 'kitten' }
    ]
  },
  csp: {
    title: 'CCF CSP软件能力认证（CSP-J/S）',
    description: '中国计算机学会软件能力等级认证',
    items: [
      { title: '入门级 C++软件能力认证', description: 'C++编程基础知识与入门级应用开发', type: 's_cpp' },
      { title: '提高级 C++软件能力认证', description: '进阶级C++编程与算法设计能力认证', type: 'j_cpp' },
      { title: '北京中小学信息学能力测评', description: '面向北京地区的信息学专项能力测评', type: 'bcsp-x' }
    ]
  },
  noc: {
    title: '全国中小学信息技术创新与实践大赛（NOC）',
    description: '中国人工智能学会举办的青少年信息技术竞赛',
    items: [
      { title: 'NOC Scratch编程', description: 'Scratch创意作品设计与开发竞赛', type: 'scratch' },
      { title: 'NOC Python编程', description: 'Python程序设计与应用开发竞赛', type: 'python' },
      { title: 'NOC C++编程', description: 'C++算法设计与程序实现竞赛', type: 'cpp' },
      { title: 'NOC Kitten编程', description: 'Kitten青少年编程创新应用竞赛', type: 'kitten' }
    ]
  },
  ceic: {
    title: '全国青少年信息素养大赛（CEIC）',
    description: '中国电子学会举办的青少年信息素养竞赛',
    items: [
      { title: '图形化编程挑战赛', description: '图形化编程创意与应用能力竞赛', type: 'scratch' },
      { title: 'Python编程挑战赛', description: 'Python程序设计与创新应用竞赛', type: 'python' },
      { title: '智能算法应用挑战赛', description: '人工智能算法设计与应用实践竞赛', type: 'cpp' }
    ]
  },
  lanqiao: {
    title: '蓝桥杯大赛青少组（LANQIAO）',
    description: '工业和信息化部举办的青少年编程能力竞赛',
    items: [
      { title: 'Scratch 创意编程', description: 'Scratch图形化编程创意设计竞赛', type: 'scratch' },
      { title: 'Python 创意编程', description: 'Python程序设计与创新应用竞赛', type: 'python' },
      { title: 'C++ 创意编程', description: 'C++算法设计与创新开发竞赛', type: 'cpp' }
    ]
  }
})

function getImageUrl(type) {
  return new URL(`../../../assets/images/mock/detail/${type}.png`, import.meta.url).href
}

function goToSubDetail(subtype) {
  router.push(`/mock/${route.params.type}/${subtype}`)
}

onMounted(() => {
  const type = route.params.type
  if (examInfo.value[type]) {
    examInfo.value = examInfo.value[type]
  }
})
</script>

<style lang="scss" scoped>
.mock-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px;
}

.breadcrumb {
  // margin-bottom: 24px;
  // padding: 8px 0;
  // border-bottom: 1px solid #eee;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  
  h2 {
    font-size: 32px;
    font-weight: 600;
    background: linear-gradient(45deg, #409eff, #36d1dc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 12px;
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0 20px;
}

.image-item {
  background: #fff;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid #eee;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 40px rgba(64, 158, 255, 0.15);
    
    .item-image {
      padding: 0;
      
      img {
        transform: scale(1.05);
      }
    }
    
    .item-content {
      .image-title {
        color: #409eff;
      }
    }
  }
  
  .item-image {
    width: 100%;
    height: 180px;
    overflow: hidden;
    position: relative;
    padding: 12px;
    transition: padding 0.3s ease;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      background: #f5f7fa;
    }
  }
  
  .item-content {
    padding: 20px;
    background: #fff;
    transition: all 0.3s ease;
    
    .image-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
      transition: color 0.3s ease;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }
    
    p {
      font-size: 14px;
      color: #666;
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      opacity: 0.9;
    }
  }
}

@media (max-width: 1200px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 0;
  }
}

@media (max-width: 768px) {
  .mock-detail {
    padding: 20px 16px;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-title {
    margin-bottom: 30px;
    
    h2 {
      font-size: 28px;
    }
  }
  
  .image-item {
    .item-image {
      height: 160px;
    }
    
    .item-content {
      padding: 16px;
    }
  }
}
</style>
