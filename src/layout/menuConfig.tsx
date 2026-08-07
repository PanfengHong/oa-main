import {
  CalendarOutlined,
  CheckSquareOutlined,
  ClusterOutlined,
  DashboardOutlined,
  TeamOutlined,
  AuditOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  FormOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAuth } from '@my-oa/auth'

export interface NavMenuItem {
  key: string
  label: string
  path?: string
  icon?: React.ReactNode
  permission?: string
}

export const coreMenuItems: NavMenuItem[] = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '工作台', path: '/dashboard', permission: 'dashboard:view' },
  { key: '/approval', icon: <AuditOutlined />, label: '审批中心', path: '/approval', permission: 'approval:view' },
  { key: '/org', icon: <TeamOutlined />, label: '组织架构', path: '/org', permission: 'org:view' },
  { key: '/attendance', icon: <ClockCircleOutlined />, label: '考勤', path: '/attendance', permission: 'attendance:view' },
]

export const moduleMenuGroups: {
  key: string
  label: string
  icon: React.ReactNode
  items: NavMenuItem[]
}[] = [
  {
    key: 'meeting',
    label: '会议',
    icon: <CalendarOutlined />,
    items: [
      { key: '/meeting', label: '会议列表', path: '/meeting', permission: 'meeting:view' },
      { key: '/meeting/rooms', label: '会议室', path: '/meeting/rooms', permission: 'meeting:rooms' },
    ],
  },
  {
    key: 'task',
    label: '任务',
    icon: <CheckSquareOutlined />,
    items: [
      { key: '/task', label: '任务看板', path: '/task', permission: 'task:view' },
      { key: '/task/mine', label: '我的任务', path: '/task/mine', permission: 'task:view' },
    ],
  },
  {
    key: 'project',
    label: '项目',
    icon: <ClusterOutlined />,
    items: [
      { key: '/project', label: '项目列表', path: '/project', permission: 'project:view' },
    ],
  },
  {
    key: 'designer',
    label: '表单管理',
    icon: <FormOutlined />,
    items: [
      { key: '/designer', label: '表单列表', path: '/designer', permission: 'designer:view' },
    ],
  },
  {
    key: 'system',
    label: '系统管理',
    icon: <SettingOutlined />,
    items: [
      { key: '/auth/users', label: '用户管理', path: '/auth/users', permission: 'user:manage' },
    ],
  },
]

export function useSideMenuItems(): MenuProps['items'] {
  const { user } = useAuth()
  const permissions = user?.permissions ?? []

  const hasPermission = (perm?: string) => {
    if (!perm) return true
    return permissions.includes(perm)
  }

  const filteredCore = coreMenuItems.filter((item) => hasPermission(item.permission))

  const filteredGroups = moduleMenuGroups
    .map((group) => ({
      key: group.key,
      icon: group.icon,
      label: group.label,
      children: group.items.filter((item) => hasPermission(item.permission)).map(({ key, label }) => ({ key, label })),
    }))
    .filter((group) => group.children.length > 0)

  return [
    ...filteredCore.map(({ key, label, icon }) => ({ key, label, icon })),
    { type: 'divider' as const },
    ...filteredGroups.map((group) => ({
      key: group.key,
      icon: group.icon,
      label: group.label,
      children: group.children,
    })),
  ]
}