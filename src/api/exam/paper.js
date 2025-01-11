import request from '@/utils/request'

// 查询试卷列表
export function listExamPaper(query) {
  return request({
    url: '/exam/paper/list',
    method: 'get',
    params: query
  })
}

// 查询试卷详细
export function getExamPaper(id) {
  return request({
    url: '/exam/paper/' + id,
    method: 'get'
  })
}

// 新增试卷
export function addExamPaper(data) {
  return request({
    url: '/exam/paper',
    method: 'post',
    data: data
  })
}

// 修改试卷
export function updateExamPaper(data) {
  return request({
    url: '/exam/paper',
    method: 'put',
    data: data
  })
}

// 删除试卷
export function delExamPaper(id) {
  return request({
    url: '/exam/paper/' + id,
    method: 'delete'
  })
}

// 查询试卷的试题列表
export function listExamQuestions(paperId) {
  return request({
    url: '/exam/question/paper/' + paperId,
    method: 'get'
  })
}
