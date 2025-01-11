<template>
  <div class="exam-test">
    <div class="exam-header">
      <h2>{{ paperInfo.name }}</h2>
      <div class="exam-info">
        <div class="time-info">
          <el-icon><Timer /></el-icon>
          <span>剩余时间：{{ formatTime(remainingTime) }}</span>
        </div>
        <div class="progress-info">
          <span>已答：{{ answeredCount }}/{{ questions.length }}</span>
        </div>
      </div>
    </div>

    <div class="exam-content">
      <div class="question-panel">
        <!-- 单选题 -->
        <div v-if="currentQuestion.questionType === '1'" class="question-content">
          <div class="question-title">
            <span class="question-type">单选题</span>
            <span class="question-score">（{{ currentQuestion.questionScore }}分）</span>
          </div>
          <div class="question-text">
            {{ questionIndex + 1 }}. {{ currentQuestion.questionText }}
          </div>
          <div class="options">
            <el-radio-group v-model="userAnswers[currentQuestion.id]">
              <el-radio label="A">{{ currentQuestion.optionA }}</el-radio>
              <el-radio label="B">{{ currentQuestion.optionB }}</el-radio>
              <el-radio label="C">{{ currentQuestion.optionC }}</el-radio>
              <el-radio label="D">{{ currentQuestion.optionD }}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <!-- 多选题 -->
        <div v-if="currentQuestion.questionType === '2'" class="question-content">
          <div class="question-title">
            <span class="question-type">多选题</span>
            <span class="question-score">（{{ currentQuestion.questionScore }}分）</span>
          </div>
          <div class="question-text">
            {{ questionIndex + 1 }}. {{ currentQuestion.questionText }}
          </div>
          <div class="options">
            <el-checkbox-group v-model="userAnswers[currentQuestion.id]">
              <el-checkbox label="A">{{ currentQuestion.optionA }}</el-checkbox>
              <el-checkbox label="B">{{ currentQuestion.optionB }}</el-checkbox>
              <el-checkbox label="C">{{ currentQuestion.optionC }}</el-checkbox>
              <el-checkbox label="D">{{ currentQuestion.optionD }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>

        <!-- 判断题 -->
        <div v-if="currentQuestion.questionType === '3'" class="question-content">
          <div class="question-title">
            <span class="question-type">判断题</span>
            <span class="question-score">（{{ currentQuestion.questionScore }}分）</span>
          </div>
          <div class="question-text">
            {{ questionIndex + 1 }}. {{ currentQuestion.questionText }}
          </div>
          <div class="options">
            <el-radio-group v-model="userAnswers[currentQuestion.id]">
              <el-radio label="1">正确</el-radio>
              <el-radio label="0">错误</el-radio>
            </el-radio-group>
          </div>
        </div>

        <!-- 编程题 -->
        <div v-if="currentQuestion.questionType === '5'" class="question-content">
          <div class="question-title">
            <span class="question-type">编程题</span>
            <span class="question-score">（{{ currentQuestion.questionScore }}分）</span>
          </div>
          <div class="question-text">
            {{ questionIndex + 1 }}. {{ currentQuestion.questionText }}
          </div>
          <div class="code-editor">
            <el-input
              v-model="userAnswers[currentQuestion.id]"
              type="textarea"
              :rows="10"
              placeholder="请在此输入代码..."
            />
          </div>
        </div>
      </div>

      <div class="question-navigator">
        <div class="navigator-title">题目导航</div>
        <div class="navigator-content">
          <el-button
            v-for="(q, index) in questions"
            :key="q.id"
            :class="{
              'is-active': index === questionIndex,
              'is-answered': userAnswers[q.id]
            }"
            size="small"
            @click="questionIndex = index"
          >
            {{ index + 1 }}
          </el-button>
        </div>
        <div class="navigator-legend">
          <div class="legend-item">
            <span class="legend-color current"></span>
            <span class="legend-text">当前题目</span>
          </div>
          <div class="legend-item">
            <span class="legend-color answered"></span>
            <span class="legend-text">已答题目</span>
          </div>
          <div class="legend-item">
            <span class="legend-color unanswered"></span>
            <span class="legend-text">未答题目</span>
          </div>
        </div>
      </div>
    </div>

    <div class="exam-actions">
      <el-button @click="prevQuestion" :disabled="questionIndex === 0">上一题</el-button>
      <el-button @click="nextQuestion" :disabled="questionIndex === questions.length - 1">下一题</el-button>
      <el-button type="warning" @click="showSubmitConfirm">交卷</el-button>
    </div>

    <!-- 交卷确认对话框 -->
    <el-dialog
      v-model="submitDialogVisible"
      title="确认交卷"
      width="400px"
    >
      <template #default>
        <div class="submit-confirm">
          <p>您还有 {{ questions.length - answeredCount }} 道题目未作答，确定要交卷吗？</p>
        </div>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitExam">确定交卷</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { getExamPaper, listExamQuestions } from '@/api/exam/paper'
import { submitExamRecord } from '@/api/exam/record'

const route = useRoute()
const router = useRouter()

const paperInfo = ref({})
const questions = ref([])
const questionIndex = ref(0)
const userAnswers = ref({})
const remainingTime = ref(0)
const submitDialogVisible = ref(false)
let timer = null

// 当前题目
const currentQuestion = computed(() => questions.value[questionIndex.value] || {})

// 已答题数量
const answeredCount = computed(() => {
  return Object.keys(userAnswers.value).length
})

// 格式化剩余时间
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 上一题
const prevQuestion = () => {
  if (questionIndex.value > 0) {
    questionIndex.value--
  }
}

// 下一题
const nextQuestion = () => {
  if (questionIndex.value < questions.value.length - 1) {
    questionIndex.value++
  }
}

// 显示交卷确认
const showSubmitConfirm = () => {
  if (answeredCount.value < questions.value.length) {
    submitDialogVisible.value = true
  } else {
    submitExam()
  }
}

// 提交考试
const submitExam = async () => {
  try {
    const answers = []
    questions.value.forEach(question => {
      answers.push({
        questionId: question.id,
        userAnswer: userAnswers.value[question.id] || ''
      })
    })

    await submitExamRecord({
      paperId: route.params.id,
      answers: answers,
      duration: paperInfo.value.duration * 60 - remainingTime.value
    })

    ElMessage.success('提交成功')
    router.push(`/mock/${route.params.type}/${route.params.subtype}`)
  } catch (error) {
    console.error('提交失败：', error)
    ElMessage.error('提交失败，请重试')
  }
}

// 自动保存答案
const autoSave = () => {
  localStorage.setItem(`exam_${route.params.id}_answers`, JSON.stringify(userAnswers.value))
}

// 倒计时
const startTimer = () => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
      autoSave()
    } else {
      clearInterval(timer)
      ElMessageBox.alert('考试时间已到，系统将自动提交', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          submitExam()
        }
      })
    }
  }, 1000)
}

// 加载试卷和试题
const loadExam = async () => {
  try {
    // 获取试卷信息
    const paperRes = await getExamPaper(route.params.id)
    paperInfo.value = paperRes.data
    remainingTime.value = paperRes.data.duration * 60

    // 获取试题列表
    const questionsRes = await listExamQuestions(route.params.id)
    questions.value = questionsRes.data.sort((a, b) => {
      if (a.questionType !== b.questionType) {
        return a.questionType - b.questionType
      }
      return a.sortOrder - b.sortOrder
    })

    // 恢复上次保存的答案
    const savedAnswers = localStorage.getItem(`exam_${route.params.id}_answers`)
    if (savedAnswers) {
      userAnswers.value = JSON.parse(savedAnswers)
    }

    startTimer()
  } catch (error) {
    console.error('加载试卷失败：', error)
    ElMessage.error('加载试卷失败，请重试')
  }
}

onMounted(() => {
  loadExam()

  // 页面关闭提醒
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    e.returnValue = ''
  })
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style lang="scss" scoped>
.exam-test {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;

  .exam-header {
    padding: 15px 20px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin: 0 0 10px;
      font-size: 20px;
    }

    .exam-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;

      .time-info {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .exam-content {
    flex: 1;
    display: flex;
    padding: 20px;
    gap: 20px;
    overflow: hidden;

    .question-panel {
      flex: 1;
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      overflow-y: auto;

      .question-content {
        .question-title {
          margin-bottom: 15px;

          .question-type {
            font-weight: bold;
            color: #409eff;
          }

          .question-score {
            color: #666;
            margin-left: 10px;
          }
        }

        .question-text {
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .options {
          .el-radio-group,
          .el-checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
        }

        .code-editor {
          margin-top: 20px;
        }
      }
    }

    .question-navigator {
      width: 200px;
      background: #fff;
      border-radius: 8px;
      padding: 15px;

      .navigator-title {
        font-weight: bold;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      .navigator-content {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-bottom: 20px;

        .el-button {
          padding: 8px;
          
          &.is-active {
            background-color: #409eff;
            color: #fff;
          }

          &.is-answered {
            background-color: #67c23a;
            color: #fff;
          }
        }
      }

      .navigator-legend {
        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          .legend-color {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            border-radius: 4px;

            &.current {
              background-color: #409eff;
            }

            &.answered {
              background-color: #67c23a;
            }

            &.unanswered {
              background-color: #dcdfe6;
            }
          }

          .legend-text {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }

  .exam-actions {
    padding: 15px 20px;
    background: #fff;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    gap: 15px;
  }
}

.submit-confirm {
  text-align: center;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .exam-test {
    .exam-content {
      flex-direction: column;

      .question-navigator {
        width: 100%;
      }
    }
  }
}
</style>
