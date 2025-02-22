<template>
  <div class="exam-preview">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mock' }">真题测试</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/mock/${route.params.type}` }">{{ examType }}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/mock/${route.params.type}/${route.params.subtype}` }">{{ examSubType }}</el-breadcrumb-item>
        <el-breadcrumb-item>试卷预览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="exam-header">
      <h2>{{ paperInfo.name }}</h2>
      <div class="exam-info">
        <span>总分：{{ paperInfo.totalScore }}分</span>
        <span>时长：{{ paperInfo.duration }}分钟</span>
        <span>难度：{{ getDifficulty(paperInfo.difficulty) }}</span>
      </div>
    </div>

    <div class="exam-content">
      <!-- 单选题 -->
      <div v-if="singleChoiceQuestions.length > 0" class="question-section">
        <h3>{{ getQuestionTypeIndex(1) }}、单选题（每题{{ singleChoiceQuestions[0].questionScore }}分，共{{ singleChoiceQuestions.length }}题）</h3>
        <div v-for="(question, index) in singleChoiceQuestions" :key="question.id" class="question-item">
          <div class="question-title">
            {{ index + 1 }}. {{ question.questionText }}
          </div>
          <div class="options">
            <div class="option-item">
              <span class="option-label">A.</span>
              <span class="option-content">{{ question.optionA }}</span>
            </div>
            <div class="option-item">
              <span class="option-label">B.</span>
              <span class="option-content">{{ question.optionB }}</span>
            </div>
            <div class="option-item">
              <span class="option-label">C.</span>
              <span class="option-content">{{ question.optionC }}</span>
            </div>
            <div class="option-item">
              <span class="option-label">D.</span>
              <span class="option-content">{{ question.optionD }}</span>
            </div>
          </div>
          <div class="answer-analysis">
            <p><strong>正确答案：</strong>{{ question.correctAnswer }}</p>
            <p><strong>解析：</strong>{{ question.analysis }}</p>
          </div>
        </div>
      </div>

      <!-- 多选题 -->
      <div v-if="multiChoiceQuestions.length > 0" class="question-section">
        <h3>{{ getQuestionTypeIndex(2) }}、多选题（每题{{ multiChoiceQuestions[0].questionScore }}分，共{{ multiChoiceQuestions.length }}题）</h3>
        <div v-for="(question, index) in multiChoiceQuestions" :key="question.id" class="question-item">
          <div class="question-title">
            {{ index + 1 }}. {{ question.questionText }}
          </div>
          <div class="options">
            <div class="option-item">
              <span class="option-label">A.</span>
              <span class="option-content">{{ question.optionA }}</span>
            </div>
            <div class="option-item">
              <span class="option-label">B.</span>
              <span class="option-content">{{ question.optionB }}</span>
            </div>
            <div class="option-item">
              <span class="option-label">C.</span>
              <span class="option-content">{{ question.optionC }}</span>
            </div>
            <div class="option-item">
              <span class="option-label">D.</span>
              <span class="option-content">{{ question.optionD }}</span>
            </div>
          </div>
          <div class="answer-analysis">
            <p><strong>正确答案：</strong>{{ question.correctAnswer }}</p>
            <p><strong>解析：</strong>{{ question.analysis }}</p>
          </div>
        </div>
      </div>

      <!-- 判断题 -->
      <div v-if="judgmentQuestions.length > 0" class="question-section">
        <h3>{{ getQuestionTypeIndex(3) }}、判断题（每题{{ judgmentQuestions[0].questionScore }}分，共{{ judgmentQuestions.length }}题）</h3>
        <div v-for="(question, index) in judgmentQuestions" :key="question.id" class="question-item">
          <div class="question-title">
            {{ index + 1 }}. {{ question.questionText }}
          </div>
          <div class="options">
            <div class="option-item">
              <span class="option-label">A.</span>
              <span class="option-content">正确</span>
            </div>
            <div class="option-item">
              <span class="option-label">B.</span>
              <span class="option-content">错误</span>
            </div>
          </div>
          <div class="answer-analysis">
            <p><strong>正确答案：</strong>{{ question.correctAnswer === '1' ? '正确' : '错误' }}</p>
            <p><strong>解析：</strong>{{ question.analysis }}</p>
          </div>
        </div>
      </div>

      <!-- 编程题 -->
      <div v-if="programmingQuestions.length > 0" class="question-section">
        <h3>{{ getQuestionTypeIndex(4) }}、编程题（共{{ programmingQuestions.length }}题）</h3>
        <div v-for="(question, index) in programmingQuestions" :key="question.id" class="question-item">
          <div class="question-title">
            {{ index + 1 }}. {{ question.questionText }}（{{ question.questionScore }}分）
          </div>
          <div class="answer-analysis">
            <p><strong>参考答案：</strong></p>
            <pre><code>{{ question.correctAnswer }}</code></pre>
            <p><strong>解析：</strong>{{ question.analysis }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="exam-actions">
      <el-button type="primary" size="large" @click="startExam">开始考试</el-button>
      <el-button size="large" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExamPaper, listExamQuestions } from '@/api/exam/paper'

const route = useRoute()
const router = useRouter()

const paperInfo = ref({})
const questions = ref([])

// 按题型分类的试题
const singleChoiceQuestions = computed(() => questions.value.filter(q => q.questionType === '1'))
const multiChoiceQuestions = computed(() => questions.value.filter(q => q.questionType === '2'))
const judgmentQuestions = computed(() => questions.value.filter(q => q.questionType === '3'))
const programmingQuestions = computed(() => questions.value.filter(q => q.questionType === '5'))

// 考试类型映射
const typeMap = {
  'ceit': '电子学会青少年等级考试',
  'gesp': 'CCF编程能力等级认证',
  'ycl': '青少年人工智能水平测试',
  'nct': '全国计算机等级考试'
}

const subTypeMap = {
  'robot': '机器人技术等级考试',
  'scratch': '图形化软件编程等级考试',
  'python': 'Python软件编程等级考试',
  'c': 'C语言软件编程等级考试',
  'uav': '无人机技术等级考试'
}

// 根据路由参数获取考试类型和子类型
const examType = computed(() => typeMap[route.params.type] || route.params.type)
const examSubType = computed(() => subTypeMap[route.params.subtype] || route.params.subtype)

const getDifficulty = (difficulty) => {
  const map = {
    '1': '简单',
    '2': '中等',
    '3': '困难'
  }
  return map[difficulty] || '未知'
}

const startExam = () => {
  router.push(`/mock/${route.params.type}/${route.params.subtype}/test/${route.params.id}`)
}

const goBack = () => {
  router.go(-1)
}

// 获取题型序号（将阿拉伯数字转换为中文数字）
const numberToChinese = (num) => {
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  return chineseNumbers[num]
}

// 计算题型的序号
const getQuestionTypeIndex = (currentType) => {
  let index = 1
  
  // 检查当前题型前面存在的题型数量
  if (currentType > 1 && singleChoiceQuestions.value.length > 0) index++
  if (currentType > 2 && multiChoiceQuestions.value.length > 0) index++
  if (currentType > 3 && judgmentQuestions.value.length > 0) index++
  
  return numberToChinese(index)
}

onMounted(async () => {
  try {
    // 获取试卷信息
    const paperRes = await getExamPaper(route.params.id)
    paperInfo.value = paperRes.data

    // 获取试题列表
    const questionsRes = await listExamQuestions(route.params.id)
    questions.value = questionsRes.data.sort((a, b) => {
      // 先按题型排序，再按题号排序
      if (a.questionType !== b.questionType) {
        return a.questionType - b.questionType
      }
      return a.sortOrder - b.sortOrder
    })
  } catch (error) {
    console.error('获取试卷信息失败：', error)
  }
})
</script>

<style lang="scss" scoped>
.exam-preview {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  
  .breadcrumb {
    margin-bottom: 30px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .exam-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    
    h2 {
      font-size: 28px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    
    .exam-info {
      display: flex;
      justify-content: center;
      gap: 40px;
      color: #666;
      
      span {
        display: inline-flex;
        align-items: center;
        font-size: 15px;
        
        &::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #409eff;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
    }
  }
  
  .exam-content {
    background: #fff;
    border-radius: 12px;
    padding: 40px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  }
  
  .question-section {
    margin-bottom: 40px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 24px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eee;
    }
  }
  
  .question-item {
    margin-bottom: 30px;
    padding-bottom: 24px;
    border-bottom: 1px dashed #eee;
    
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
  
  .question-title {
    font-size: 16px;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 16px;
    font-weight: 500;
  }
  
  .options {
    margin-bottom: 20px;
  }
  
  .option-item {
    display: flex;
    margin-bottom: 12px;
    line-height: 1.6;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .option-label {
      flex-shrink: 0;
      width: 30px;
      color: #409eff;
      font-weight: 500;
    }
    
    .option-content {
      color: #606266;
    }
  }
  
  .answer-analysis {
    background: #f8f9fa;
    padding: 16px 20px;
    border-radius: 8px;
    margin-top: 20px;
    
    p {
      color: #606266;
      line-height: 1.6;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      strong {
        color: #2c3e50;
        font-weight: 500;
        margin-right: 4px;
      }
    }
    
    pre {
      margin: 12px 0;
      padding: 16px;
      background: #fff;
      border-radius: 6px;
      border: 1px solid #eee;
      
      code {
        font-family: Monaco, Menlo, Consolas, monospace;
        font-size: 14px;
        line-height: 1.6;
        color: #333;
        white-space: pre-wrap;
      }
    }
  }
  
  .exam-actions {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 20px;
    
    .el-button {
      min-width: 120px;
      
      &.el-button--primary {
        background: linear-gradient(45deg, #409eff, #66b1ff);
        border: none;
        
        &:hover {
          background: linear-gradient(45deg, #66b1ff, #409eff);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .exam-preview {
    padding: 20px 15px;
    
    .exam-header {
      padding: 24px 20px;
      margin-bottom: 30px;
      
      h2 {
        font-size: 24px;
        margin-bottom: 16px;
      }
      
      .exam-info {
        flex-direction: column;
        gap: 12px;
        
        span {
          justify-content: center;
        }
      }
    }
    
    .exam-content {
      padding: 24px 20px;
    }
    
    .question-section {
      margin-bottom: 30px;
      
      h3 {
        font-size: 16px;
        margin-bottom: 20px;
      }
    }
    
    .question-item {
      margin-bottom: 24px;
      padding-bottom: 20px;
    }
    
    .answer-analysis {
      padding: 12px 16px;
      
      pre {
        padding: 12px;
        margin: 10px 0;
      }
    }
  }
}
</style>
