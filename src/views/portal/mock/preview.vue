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
        <h3>一、单选题（每题{{ singleChoiceQuestions[0].questionScore }}分，共{{ singleChoiceQuestions.length }}题）</h3>
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
        <h3>二、多选题（每题{{ multiChoiceQuestions[0].questionScore }}分，共{{ multiChoiceQuestions.length }}题）</h3>
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
        <h3>三、判断题（每题{{ judgmentQuestions[0].questionScore }}分，共{{ judgmentQuestions.length }}题）</h3>
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
        <h3>四、编程题（共{{ programmingQuestions.length }}题）</h3>
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
  padding: 20px;

  .exam-header {
    margin: 20px 0;
    text-align: center;

    h2 {
      margin-bottom: 10px;
      font-size: 24px;
    }

    .exam-info {
      color: #666;
      span {
        margin: 0 15px;
      }
    }
  }

  .exam-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .question-section {
      margin-bottom: 30px;

      h3 {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
    }

    .question-item {
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #eee;

      &:last-child {
        border-bottom: none;
      }

      .question-title {
        margin-bottom: 15px;
        font-weight: 500;
        line-height: 1.6;
      }

      .options {
        margin-bottom: 15px;

        .option-item {
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;

          .option-label {
            flex: none;
            margin-right: 10px;
            font-weight: 500;
          }

          .option-content {
            flex: 1;
          }
        }
      }

      .answer-analysis {
        margin-top: 15px;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 4px;

        p {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }

        pre {
          margin: 10px 0;
          padding: 15px;
          background: #f1f1f1;
          border-radius: 4px;
          overflow-x: auto;

          code {
            font-family: monospace;
            white-space: pre;
          }
        }
      }
    }
  }

  .exam-actions {
    margin-top: 30px;
    text-align: center;

    .el-button {
      margin: 0 10px;
      min-width: 120px;
    }
  }
}

@media (max-width: 768px) {
  .exam-preview {
    padding: 10px;

    .exam-header {
      h2 {
        font-size: 20px;
      }

      .exam-info {
        span {
          display: block;
          margin: 5px 0;
        }
      }
    }

    .exam-content {
      padding: 15px;
    }
  }
}
</style>
