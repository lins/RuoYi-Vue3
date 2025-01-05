<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="考试类型" prop="typeCode">
        <el-cascader
          v-model="queryParams.typeCode"
          :options="typeTreeOptions"
          :props="{
            value: 'typeCode',
            label: 'title',
            children: 'children',
            checkStrictly: true,
            emitPath: false
          }"
          placeholder="请选择考试类型"
          clearable
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="试卷名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入试卷名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-select v-model="queryParams.difficulty" placeholder="请选择难度" clearable style="width: 200px">
          <el-option
            v-for="dict in exam_paper_difficulty"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="试卷状态" clearable style="width: 200px">
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="level">
        <el-select v-model="queryParams.level" placeholder="请选择级别" clearable style="width: 200px">
          <el-option
            v-for="dict in exam_paper_level"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['exam:paper:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['exam:paper:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['exam:paper:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['exam:paper:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="paperList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="试卷编号" align="center" prop="id" />
      <el-table-column label="考试类型" align="center" prop="typeCode">
        <template #default="scope">
          <span>{{ getTypeFullPath(scope.row.typeCode) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="试卷名称" align="center" prop="name" />
      <el-table-column label="年份" align="center" prop="year" />
      <el-table-column label="月份" align="center" prop="month" />
      <el-table-column label="难度" align="center" prop="difficulty">
        <template #default="scope">
          <dict-tag :options="exam_paper_difficulty" :value="scope.row.difficulty"/>
        </template>
      </el-table-column>
      <el-table-column label="考试时长" align="center" prop="duration">
        <template #default="scope">
          <span>{{ scope.row.duration }} 分钟</span>
        </template>
      </el-table-column>
      <el-table-column label="总分" align="center" prop="totalScore" />
      <el-table-column label="及格分数" align="center" prop="passScore" />
      <el-table-column label="题目数量" align="center" prop="questionCount" />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="级别" align="center" prop="level">
        <template #default="scope">
          <dict-tag :options="exam_paper_level" :value="scope.row.level"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['exam:paper:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['exam:paper:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改试卷对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="paperRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="考试类型" prop="typeCode">
          <el-cascader
            v-model="form.typeCode"
            :options="typeTreeOptions"
            :props="{
              value: 'typeCode',
              label: 'title',
              children: 'children',
              checkStrictly: true,
              emitPath: false
            }"
            placeholder="请选择考试类型"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="试卷名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入试卷名称" />
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input v-model="form.year" placeholder="请输入年份" />
        </el-form-item>
        <el-form-item label="月份" prop="month">
          <el-input v-model="form.month" placeholder="请输入月份" />
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-select v-model="form.difficulty" placeholder="请选择难度">
            <el-option
              v-for="dict in exam_paper_difficulty"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="考试时长" prop="duration">
          <el-input-number v-model="form.duration" controls-position="right" :min="1" placeholder="请输入考试时长（分钟）" />
        </el-form-item>
        <el-form-item label="总分" prop="totalScore">
          <el-input-number v-model="form.totalScore" controls-position="right" :min="0" placeholder="请输入总分" />
        </el-form-item>
        <el-form-item label="及格分数" prop="passScore">
          <el-input-number v-model="form.passScore" controls-position="right" :min="0" placeholder="请输入及格分数" />
        </el-form-item>
        <el-form-item label="题目数量" prop="questionCount">
          <el-input-number v-model="form.questionCount" controls-position="right" :min="1" placeholder="请输入题目数量" />
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-select v-model="form.level" placeholder="请选择级别">
            <el-option
              v-for="dict in exam_paper_level"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :value="dict.value"
            >{{ dict.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="ExamPaper">
import { listExamPaper, getExamPaper, delExamPaper, addExamPaper, updateExamPaper } from "@/api/exam/paper";
import { listExamType } from "@/api/exam/type";

const { proxy } = getCurrentInstance();
const { sys_normal_disable, exam_paper_difficulty, exam_paper_level } = proxy.useDict("sys_normal_disable", "exam_paper_difficulty", "exam_paper_level");

const paperList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const typeOptions = ref([]); // 考试类型选项
const typeTreeOptions = ref([]); // 考试类型树形选项

/** 转换考试类型数据为树形结构 */
function convertToTree(list) {
  const treeData = [];
  const map = new Map();

  // 首先创建所有节点的映射
  list.forEach(item => {
    map.set(item.typeCode, {
      typeCode: item.typeCode,
      title: item.title,
      children: [],
      parentCode: item.parentCode
    });
  });

  // 构建树形结构
  list.forEach(item => {
    const node = map.get(item.typeCode);
    if (item.parentCode && map.has(item.parentCode)) {
      const parent = map.get(item.parentCode);
      parent.children.push(node);
    } else {
      treeData.push(node);
    }
  });

  // 清理空的children数组
  const cleanEmptyChildren = (nodes) => {
    nodes.forEach(node => {
      if (node.children.length === 0) {
        delete node.children;
      } else {
        cleanEmptyChildren(node.children);
      }
    });
  };
  cleanEmptyChildren(treeData);

  return treeData;
}

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    typeCode: undefined,
    name: undefined,
    year: undefined,
    month: undefined,
    difficulty: undefined,
    status: undefined,
    level: undefined
  },
  rules: {
    typeCode: [{ required: true, message: "考试类型不能为空", trigger: "change" }],
    name: [{ required: true, message: "试卷名称不能为空", trigger: "blur" }],
    year: [{ required: true, message: "年份不能为空", trigger: "blur" }],
    month: [{ required: true, message: "月份不能为空", trigger: "blur" }],
    difficulty: [{ required: true, message: "难度不能为空", trigger: "change" }],
    level: [{ required: true, message: "级别不能为空", trigger: "change" }],
    duration: [{ required: true, message: "考试时长不能为空", trigger: "blur" }],
    totalScore: [{ required: true, message: "总分不能为空", trigger: "blur" }],
    passScore: [{ required: true, message: "及格分数不能为空", trigger: "blur" }],
    questionCount: [{ required: true, message: "题目数量不能为空", trigger: "blur" }]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询试卷列表 */
function getList() {
  loading.value = true;
  listExamPaper(queryParams.value).then(response => {
    paperList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

/** 表单重置 */
function reset() {
  form.value = {
    id: undefined,
    typeCode: undefined,
    name: undefined,
    year: undefined,
    month: undefined,
    difficulty: undefined,
    level: undefined,
    duration: undefined,
    totalScore: undefined,
    passScore: undefined,
    questionCount: undefined,
    status: "0",
    remark: undefined
  };
  proxy.resetForm("paperRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 多选框选中数据 */
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加试卷";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value[0];
  getExamPaper(id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改试卷";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["paperRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateExamPaper(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addExamPaper(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const examIds = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除试卷编号为"' + examIds + '"的数据项？').then(function() {
    return delExamPaper(examIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('exam/paper/export', {
    ...queryParams.value
  }, `exam_paper_${new Date().getTime()}.xlsx`);
}

/** 查询考试类型列表 */
function getTypeList() {
  listExamType().then(response => {
    typeOptions.value = response.rows;
    typeTreeOptions.value = convertToTree(response.rows);
  });
}

/** 获取类型的完整路径 */
function getTypeFullPath(typeCode) {
  const path = [];
  let currentCode = typeCode;
  
  while (currentCode) {
    const currentType = typeOptions.value.find(t => t.typeCode === currentCode);
    if (currentType) {
      path.unshift(currentType.title);
      currentCode = currentType.parentCode;
    } else {
      break;
    }
  }
  
  return path.length > 0 ? path.join(' / ') : typeCode;
}

getTypeList();
getList();
</script>
