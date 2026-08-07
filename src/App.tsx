import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { OrgPage } from './pages/OrgPage'
import { AttendancePage } from './pages/AttendancePage'
import { ApprovalListPage } from './pages/ApprovalListPage'
import { ApprovalDetailPage } from './pages/ApprovalDetailPage'
import { businessModules } from './modules'
import {
  AuthGuard,
  PermissionGuard,
  authPublicRoutes,
  authProtectedRoutes,
} from '@my-oa/auth'

export default function App() {
  return (
    <Routes>
      {/* ═══════════════════════════════════════
          第一层：公开页面（无需登录）
          ═══════════════════════════════════════ */}
      {authPublicRoutes.map((route) =>
        route.index ? (
          <Route key="pub-index" index element={route.element} />
        ) : (
          <Route key={`pub-${route.path}`} path={route.path} element={route.element} />
        ),
      )}

      {/* ═══════════════════════════════════════
          第二层：受保护区域（需要登录）
          ═══════════════════════════════════════ */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppShell />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* —— 所有已登录用户可访问 —— */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* —— 需要特定权限 —— */}
        <Route
          path="approval"
          element={
            <PermissionGuard permission="approval:view" fallbackPath="/403">
              <ApprovalListPage />
            </PermissionGuard>
          }
        />
        <Route
          path="approval/:approvalId"
          element={
            <PermissionGuard permission="approval:view" fallbackPath="/403">
              <ApprovalDetailPage />
            </PermissionGuard>
          }
        />
        <Route
          path="org"
          element={
            <PermissionGuard permission="org:view" fallbackPath="/403">
              <OrgPage />
            </PermissionGuard>
          }
        />
        <Route
          path="attendance"
          element={
            <PermissionGuard permission="attendance:view" fallbackPath="/403">
              <AttendancePage />
            </PermissionGuard>
          }
        />

        {/* —— 业务模块路由（由各子包注册，内部自带权限守卫） —— */}
        {businessModules.map((mod) => (
          <Route key={mod.id} path={mod.basePath.replace(/^\//, '')}>
            {mod.routes.map((route, idx) =>
              route.index ? (
                <Route key={`${mod.id}-index`} index element={route.element} />
              ) : (
                <Route key={route.path ?? idx} path={route.path} element={route.element} />
              ),
            )}
          </Route>
        ))}

        {/* —— auth 模块的受保护路由（用户管理等，内部已带 PermissionGuard） —— */}
        {authProtectedRoutes.map((route) =>
          route.index ? (
            <Route key="protected-index" index element={route.element} />
          ) : (
            <Route
              key={`protected-${route.path}`}
              path={route.path}
              element={route.element}
            />
          ),
        )}

        {/* —— 通配回首页 —— */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}