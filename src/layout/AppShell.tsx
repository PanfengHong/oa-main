import { Layout, Menu, Typography, Avatar, Space } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { coreMenuItems, moduleMenuGroups } from './menuConfig'
import './AppShell.css'

const { Header, Sider, Content } = Layout

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKeys = [location.pathname]

  const sideItems = [
    ...coreMenuItems,
    { type: 'divider' as const },
    ...moduleMenuGroups.map((group) => ({
      key: group.key,
      icon: group.icon,
      label: group.label,
      children: group.items.map((item) => ({
        key: item.key,
        label: item.label,
      })),
    })),
  ]

  return (
    <Layout className="oa-shell">
      <Sider width={240} className="oa-shell__sider" theme="light">
        <div className="oa-shell__brand">
          <span className="oa-shell__logo">OA</span>
          <Typography.Text strong>My OA</Typography.Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={moduleMenuGroups.map((g) => g.key)}
          items={sideItems}
          onClick={({ key }) => {
            if (key.startsWith('/')) navigate(key)
          }}
        />
      </Sider>
      <Layout>
        <Header className="oa-shell__header">
          <Typography.Title level={5} style={{ margin: 0 }}>
            企业办公自动化
          </Typography.Title>
          <Space>
            <Avatar size="small" style={{ background: '#1677ff' }}>
              前
            </Avatar>
            <span className="oa-shell__user">前端工程师</span>
          </Space>
        </Header>
        <Content className="oa-shell__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
