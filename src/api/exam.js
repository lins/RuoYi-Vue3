import request from '@/utils/request'

// 获取试卷列表
export function getExamList(query) {
  return request({
    url: '/exam/paper/list',
    method: 'get',
    params: query
  })
}
