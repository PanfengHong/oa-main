/**
 * 统一 Mock 开关入口
 *
 * 在 main.tsx 渲染应用前调用 setupMock()：
 * - 读取 VITE_USE_MOCK 环境变量，为真时开启全局 mock
 * - 调 setMockEnabled(true) 打开 request.ts 中的 mock 拦截
 * - 调 configureAuth({ mode: 'mock' }) 让 oa-auth 走本地 mockAuthApi
 * - 注册各业务子包的 mock 规则
 *
 * 关闭时（VITE_USE_MOCK=false 或未设置）：
 * - request 走真实 axios 请求（ baseURL 来自 VITE_API_BASE_URL）
 * - oa-auth 走真实接口
 *
 * GitHub Pages 部署时，.env / workflow 里设置 VITE_USE_MOCK=true，
 * 整站即使用模拟数据，无需后端。
 */

import { setMockEnabled } from '@zdy-oa/utils'
import { configureAuth } from '@zdy-oa/auth'
import { registerFormMocks } from '@zdy-oa/form'
import { registerMeetingMocks } from '@zdy-oa/meeting'
import { registerTaskMocks } from '@zdy-oa/task'
import { registerProjectMocks } from '@zdy-oa/project'
import { registerMainMocks } from '../api/mock'

/**
 * 读取 VITE_USE_MOCK 环境变量，返回是否启用 mock。
 *
 * 判断规则：
 *   - 显式为 "true"：启用 mock（.env.production 设置，或 .env.local 里手动开启）
 *   - 显式为 "false"：关闭 mock
 *   - 未设置：默认关闭（走真实后端）
 *
 * 因此：
 *   - 本地 dev：默认走真实后端（如需 mock，在 .env.local 写 VITE_USE_MOCK=true）
 *   - 生产构建（vite build → GitHub Pages 部署）：.env.production 设置 VITE_USE_MOCK=true，自动用 mock
 */
function shouldUseMock(): boolean {
  const flag = import.meta.env.VITE_USE_MOCK
  if (typeof flag === 'string' && flag.trim() !== '') {
    return flag.trim().toLowerCase() === 'true'
  }
  // 未显式设置：默认关闭，走真实后端
  return false
}

export function setupMock(): void {
  if (!shouldUseMock()) {
    // 不启用 mock：保留真实接口模式
    return
  }

  // 1. 打开 request 拦截
  setMockEnabled(true)

  // 2. oa-auth 走本地 mock
  configureAuth({ mode: 'mock' })

  // 3. 注册各业务模块 mock 规则
  registerFormMocks()
  registerMeetingMocks()
  registerTaskMocks()
  registerProjectMocks()
  registerMainMocks()

  // eslint-disable-next-line no-console
  console.info('[mock] 已启用模拟数据模式（VITE_USE_MOCK）')
}
