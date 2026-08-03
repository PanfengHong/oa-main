import {
  CalendarOutlined,
  CheckSquareOutlined,
  ClusterOutlined,
  DashboardOutlined,
  TeamOutlined,
  AuditOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

export type AppMenuItem = Required<MenuProps>['items'][number] & {
  path?: string
}

export const coreMenuItems: AppMenuItem[] = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: '工作台', path: '/dashboard' },
  { key: '/approval', icon: <AuditOutlined />, label: '审批中心', path: '/approval' },
  { key: '/org', icon: <TeamOutlined />, label: '组织架构', path: '/org' },
  { key: '/attendance', icon: <ClockCircleOutlined />, label: '考勤', path: '/attendance' },
]

export const moduleMenuGroups: { key: string; label: string; icon: React.ReactNode; items: AppMenuItem[] }[] = [
  {
    key: 'meeting',
    label: '会议',
    icon: <CalendarOutlined />,
    items: [
      { key: '/meeting', label: '会议列表', path: '/meeting' },
      { key: '/meeting/rooms', label: '会议室', path: '/meeting/rooms' },
    ],
  },
  {
    key: 'task',
    label: '任务',
    icon: <CheckSquareOutlined />,
    items: [
      { key: '/task', label: '任务看板', path: '/task' },
      { key: '/task/mine', label: '我的任务', path: '/task/mine' },
    ],
  },
  {
    key: 'project',
    label: '项目',
    icon: <ClusterOutlined />,
    items: [
      { key: '/project', label: '项目列表', path: '/project' },
    ],
  },
]
