/**
 * oa-main 自身接口的 mock 规则
 *
 * 命中接口：
 *   GET /api/workflow/my   我的审批列表（复用 oa-flow 的 mockApprovals）
 *   GET /api/attend/all    考勤打卡记录
 *
 * 注意：/api/form/detail/:id 已由 oa-form 的 registerFormMocks 覆盖，这里不重复注册。
 */
import { registerMocks, type ResponseData } from '@zdy-oa/utils'
import { mockApprovals } from '@zdy-oa/flow'

function ok<T>(data: T, message = ''): ResponseData<T> {
  return { code: 200, data, message }
}

const attendanceRecords = [
  { date: '2026-08-01', status: '正常', checkIn: '09:02', checkOut: '18:15' },
  { date: '2026-07-31', status: '正常', checkIn: '08:55', checkOut: '18:30' },
  { date: '2026-07-30', status: '迟到', checkIn: '09:18', checkOut: '18:05' },
  { date: '2026-07-29', status: '正常', checkIn: '08:58', checkOut: '18:20' },
  { date: '2026-07-28', status: '早退', checkIn: '09:00', checkOut: '17:40' },
]

export function registerMainMocks(): void {
  registerMocks([
    {
      method: 'GET',
      pattern: '/api/workflow/my',
      handler: () => ok(mockApprovals),
    },
    {
      method: 'GET',
      pattern: '/api/attend/all',
      handler: () => ok(attendanceRecords),
    },
  ])
}
