<template>
  <div class="mock-subdetail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mock' }">真题测试</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/mock/${route.params.type}` }">{{ parentTitle }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentExam.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="section-title">
      <h2>{{ currentExam.title }}</h2>
      <p>{{ currentExam.description }}</p>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-group">
        <div class="filter-label">年份：</div>
        <div class="filter-options">
          <span 
            class="filter-item"
            :class="{ active: !filterForm.year }"
            @click="filterForm.year = ''"
          >
            全部
          </span>
          <span 
            v-for="year in years" 
            :key="year" 
            :class="['filter-item', { active: filterForm.year === year }]"
            @click="filterForm.year = filterForm.year === year ? '' : year"
          >
            {{ year }}年
          </span>
        </div>
      </div>
      <div class="filter-group">
        <div class="filter-label">月份：</div>
        <div class="filter-options">
          <span 
            class="filter-item"
            :class="{ active: !filterForm.month }"
            @click="filterForm.month = ''"
          >
            全部
          </span>
          <span 
            v-for="month in months" 
            :key="month" 
            :class="['filter-item', { active: filterForm.month === month }]"
            @click="filterForm.month = filterForm.month === month ? '' : month"
          >
            {{ month }}月
          </span>
        </div>
      </div>
      <div class="filter-group">
        <div class="filter-label">级别：</div>
        <div class="filter-options">
          <span 
            class="filter-item"
            :class="{ active: !filterForm.level }"
            @click="filterForm.level = ''"
          >
            全部
          </span>
          <span 
            v-for="level in levels" 
            :key="level.value" 
            :class="['filter-item', { active: filterForm.level === level.value }]"
            @click="filterForm.level = filterForm.level === level.value ? '' : level.value"
          >
            {{ level.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- 试卷列表 -->
    <div class="exam-list">
      <el-table 
        :data="filteredExams" 
        style="width: 100%"
        :max-height="null"
        :scrollbar-always-on="false"
      >
        <el-table-column prop="name" label="试卷名称" min-width="300">
          <template #default="{ row }">
            <span class="exam-name">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="考试时间" width="180">
          <template #default="{ row }">
            {{ row.year }}年{{ row.month }}月真题
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="考试时长" width="120">
          <template #default="{ row }">
            {{ row.duration }}分钟
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="previewExam(row)">浏览试题</el-button>
            <el-button type="success" link @click="handleStartExam(row)">真题测试</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const parentTitle = ref('')
const currentExam = ref({})

// 筛选表单
const filterForm = ref({
  year: '',
  month: '',
  level: ''
})

// 筛选选项
const years = [2025, 2024, 2023, 2022]
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const levels = [
  { value: 1, label: '一级' },
  { value: 2, label: '二级' },
  { value: 3, label: '三级' },
  { value: 4, label: '四级' }
]

// 试卷列表
const examList = ref([
  {
    id: 1,
    name: '图形化软件编程等级考试一级',
    year: 2024,
    month: 12,
    level: 1,
    duration: 60
  },
  {
    id: 2,
    name: '图形化软件编程等级考试一级',
    year: 2024,
    month: 11,
    level: 1,
    duration: 60
  },
  {
    id: 3,
    name: '图形化软件编程等级考试二级',
    year: 2024,
    month: 12,
    level: 2,
    duration: 90
  },
  {
    id: 4,
    name: '图形化软件编程等级考试二级',
    year: 2024,
    month: 10,
    level: 2,
    duration: 90
  },
  {
    id: 5,
    name: '图形化软件编程等级考试三级',
    year: 2023,
    month: 12,
    level: 3,
    duration: 120
  },
  {
    id: 6,
    name: '图形化软件编程等级考试三级',
    year: 2023,
    month: 11,
    level: 3,
    duration: 120
  },
  {
    id: 7,
    name: '图形化软件编程等级考试一级',
    year: 2023,
    month: 10,
    level: 1,
    duration: 60
  },
  {
    id: 8,
    name: '图形化软件编程等级考试二级',
    year: 2023,
    month: 9,
    level: 2,
    duration: 90
  },
  {
    id: 9,
    name: '图形化软件编程等级考试三级',
    year: 2023,
    month: 8,
    level: 3,
    duration: 120
  },
  {
    id: 10,
    name: '图形化软件编程等级考试一级',
    year: 2023,
    month: 7,
    level: 1,
    duration: 60
  },
  {
    id: 11,
    name: '图形化软件编程等级考试二级',
    year: 2023,
    month: 6,
    level: 2,
    duration: 90
  },
  {
    id: 12,
    name: '图形化软件编程等级考试三级',
    year: 2023,
    month: 5,
    level: 3,
    duration: 120
  },
  {
    id: 13,
    name: '图形化软件编程等级考试一级',
    year: 2023,
    month: 4,
    level: 1,
    duration: 60
  },
  {
    id: 14,
    name: '图形化软件编程等级考试二级',
    year: 2023,
    month: 3,
    level: 2,
    duration: 90
  },
  {
    id: 15,
    name: '图形化软件编程等级考试三级',
    year: 2023,
    month: 2,
    level: 3,
    duration: 120
  },
  {
    id: 16,
    name: '图形化软件编程等级考试一级',
    year: 2023,
    month: 1,
    level: 1,
    duration: 60
  },
  {
    id: 17,
    name: '图形化软件编程等级考试二级',
    year: 2022,
    month: 12,
    level: 2,
    duration: 90
  },
  {
    id: 18,
    name: '图形化软件编程等级考试三级',
    year: 2022,
    month: 11,
    level: 3,
    duration: 120
  }
])

// 筛选后的试卷列表
const filteredExams = computed(() => {
  return examList.value.filter(exam => {
    const yearMatch = !filterForm.value.year || exam.year === filterForm.value.year
    const monthMatch = !filterForm.value.month || exam.month === filterForm.value.month
    const levelMatch = !filterForm.value.level || exam.level === filterForm.value.level
    return yearMatch && monthMatch && levelMatch
  })
})

// 筛选方法
const handleFilter = () => {
  // 筛选逻辑已通过计算属性实现
}

// 重置筛选
const resetFilter = () => {
  filterForm.value = {
    year: '',
    month: '',
    level: ''
  }
}

// 浏览试题
const previewExam = (exam) => {
  router.push({
    path: `/mock/${route.params.type}/${route.params.subtype}/preview/${exam.id}`
  })
}

// 开始考试
const startExam = (exam) => {
  router.push({
    path: `/mock/${route.params.type}/${route.params.subtype}/test/${exam.id}`
  })
}

// 获取考试基本信息
const examData = {
  ceit: {
    title: '电子学会青少年等级考试（CEIT）',
    items: {
      robot: { title: '机器人技术等级考试', description: '全面测评机器人设计、编程和控制能力' },
      scratch: { title: '图形化软件编程等级考试', description: '考察图形化编程基础知识和应用能力' },
      python: { title: 'Python软件编程等级考试', description: 'Python语言基础及其应用开发能力认证' },
      c: { title: 'C语言软件编程等级考试', description: 'C语言程序设计与算法实现能力测评' },
      uav: { title: '无人机技术等级考试', description: '无人机操控与应用开发技术认证' }
    }
  },
  gesp: {
    title: 'CCF编程能力等级认证（GESP）',
    items: {
      scratch: { title: '图形化编程等级认证', description: '图形化编程基础知识与实践能力认证' },
      python: { title: 'Python编程等级认证', description: 'Python编程技能与应用开发能力认证' },
      cpp: { title: 'C++编程等级认证', description: 'C++语言程序设计与算法实现能力认证' }
    }
  },
  ycl: {
    title: '青少年人工智能水平测试（YCL/YAI）',
    items: {
      scratch: { title: '图形化编程水平测试', description: '图形化方式实现人工智能应用的能力测试' },
      python: { title: 'Python编程水平测试', description: '使用Python开发人工智能应用的能力认证' },
      cpp: { title: '智能算法应用挑战赛', description: '人工智能算法设计与应用实践竞赛' },
      yai: { title: '人工智能技术水平测试', description: '人工智能基础理论与实践应用能力认证' }
    }
  },
  nct: {
    title: '青少年编程能力等级测试（NCT）',
    items: {
      scratch: { title: 'Scratch编程能力等级测试', description: 'Scratch创意编程与项目开发能力认证' },
      python: { title: 'Python编程能力等级测试', description: 'Python程序设计与应用开发能力测试' },
      cpp: { title: 'C++编程能力等级测试', description: 'C++编程基础与算法应用能力认证' },
      kitten: { title: 'Kitten编程能力等级测试', description: 'Kitten青少年编程入门与进阶能力测试' }
    }
  },
  csp: {
    title: 'CCF CSP软件能力认证（CSP-J/S）',
    items: {
      s_cpp: { title: '入门级 C++软件能力认证', description: 'C++编程基础知识与入门级应用开发' },
      j_cpp: { title: '提高级 C++软件能力认证', description: '进阶级C++编程与算法设计能力认证' },
      'bcsp-x': { title: '北京中小学信息学能力测评', description: '面向北京地区的信息学专项能力测评' }
    }
  },
  noc: {
    title: '全国中小学信息技术创新与实践大赛（NOC）',
    items: {
      scratch: { title: 'NOC Scratch编程', description: 'Scratch创意作品设计与开发竞赛' },
      python: { title: 'NOC Python编程', description: 'Python程序设计与应用开发竞赛' },
      cpp: { title: 'NOC C++编程', description: 'C++算法设计与程序实现竞赛' },
      kitten: { title: 'NOC Kitten编程', description: 'Kitten青少年编程创新应用竞赛' }
    }
  },
  ceic: {
    title: '全国青少年信息素养大赛（CEIC）',
    items: {
      scratch: { title: '图形化编程挑战赛', description: '图形化编程创意与应用能力竞赛' },
      python: { title: 'Python编程挑战赛', description: 'Python程序设计与创新应用竞赛' },
      cpp: { title: '智能算法应用挑战赛', description: '人工智能算法设计与应用实践竞赛' }
    }
  },
  lanqiao: {
    title: '蓝桥杯大赛青少组（LANQIAO）',
    items: {
      scratch: { title: 'Scratch 创意编程', description: 'Scratch图形化编程创意设计竞赛' },
      python: { title: 'Python 创意编程', description: 'Python程序设计与创新应用竞赛' },
      cpp: { title: 'C++ 创意编程', description: 'C++算法设计与创新开发竞赛' }
    }
  }
}

// 处理开始考试
const handleStartExam = (exam) => {
  if (!userStore.token) {
    userStore.showLogin()
  } else {
    startExam(exam)
  }
}

// 获取当前考试信息
const initExamInfo = () => {
  const { type, subtype } = route.params
  if (examData[type]) {
    parentTitle.value = examData[type].title
    if (examData[type].items[subtype]) {
      currentExam.value = {
        title: examData[type].items[subtype].title,
        description: examData[type].items[subtype].description,
        ...examData[type].items[subtype]
      }
    }
  }
}

onMounted(() => {
  initExamInfo()
})

// 监听路由参数变化
watch(
  () => route.params,
  () => {
    initExamInfo()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.mock-subdetail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  .breadcrumb {
    margin-bottom: 20px;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 30px;
    
    h2 {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    p {
      color: #666;
      font-size: 16px;
    }
  }
  
  .filter-section {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .filter-label {
      width: 60px;
      color: #606266;
      font-size: 14px;
    }
    
    .filter-options {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .filter-item {
      padding: 5px 15px;
      border-radius: 4px;
      font-size: 14px;
      color: #606266;
      background: #f5f7fa;
      cursor: pointer;
      transition: all 0.3s;
      user-select: none;
      
      &:hover {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
      }
      
      &.active {
        color: #fff;
        background: var(--el-color-primary);
      }
    }
  }
  
  .exam-list {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    
    :deep(.el-table) {
      --el-table-header-bg-color: #f5f7fa;
      
      // 移除表格的内部滚动条
      .el-table__body-wrapper {
        overflow-y: visible;
      }
      
      th {
        font-weight: 600;
        color: #333;
      }
    }
    
    .exam-name {
      color: #333;
      font-weight: 500;
    }
    
    .el-button {
      padding: 4px 0;
      font-size: 14px;
      
      & + .el-button {
        margin-left: 12px;
      }
    }
  }
}
</style>
