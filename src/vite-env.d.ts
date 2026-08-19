/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 是否启用 mock 数据（统一开关）。为 "true" 时 request 走 mock 拦截，oa-auth 走本地 mock */
  readonly VITE_USE_MOCK?: string
  /** 真实接口 baseURL（mock 关闭时生效） */
  readonly VITE_API_BASE_URL?: string
  /** GitHub Pages 子路径，如仓库名为 zdy-oa 时为 /zdy-oa/ */
  readonly VITE_BASE_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
