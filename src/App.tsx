import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { OrgPage } from './pages/OrgPage'
import { AttendancePage } from './pages/AttendancePage'
import { ApprovalListPage } from './pages/ApprovalListPage'
import { ApprovalDetailPage } from './pages/ApprovalDetailPage'
import { businessModules } from './modules'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="approval" element={<ApprovalListPage />} />
        <Route path="approval/:approvalId" element={<ApprovalDetailPage />} />
        <Route path="org" element={<OrgPage />} />
        <Route path="attendance" element={<AttendancePage />} />
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
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}
