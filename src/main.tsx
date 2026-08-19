import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { AuthProvider } from '@zdy-oa/auth'
import App from './App'
import './index.css'

// 注意：这里不再包装 <StrictMode>。
// React 18+ 的 StrictMode 在开发模式下会故意执行「mount → unmount → mount」，
// 导致所有页面组件的 useEffect 触发两次（接口请求被重复发出），
// 而生产构建不受影响。为保持开发 / 生产行为一致，这里移除 StrictMode。
createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: '#1677ff',
        colorBgLayout: '#f5f6f8',
        colorBgContainer: '#ffffff',
        borderRadius: 8,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
      components: {
        Layout: {
          bodyBg: '#f5f6f8',
          headerBg: '#ffffff',
          siderBg: '#ffffff',
        },
        Menu: {
          itemBg: '#ffffff',
          subMenuItemBg: '#ffffff',
        },
      },
    }}
  >
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ConfigProvider>,
)
