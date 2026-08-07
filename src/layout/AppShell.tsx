import { Layout, Menu, Typography, Avatar, Space, Dropdown } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSideMenuItems, moduleMenuGroups } from './menuConfig'
import { useAuth } from '@my-oa/auth'
import './AppShell.css'

const { Header, Sider, Content } = Layout

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const selectedKeys = [location.pathname]

  const sideItems = useSideMenuItems()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const userMenuItems = {
    items: [
      {
        key: 'profile',
        label: '个人中心',
        disabled: true,
      },
      { type: 'divider' as const },
      {
        key: 'logout',
        label: '退出登录',
        onClick: handleLogout,
      },
    ],
  }

  const defaultOpenKeys = moduleMenuGroups
    .map((g) => g.key)

  return (
    <Layout className="oa-shell">
      <Sider width={240} className="oa-shell__sider" theme="light">
        <div className="oa-shell__brand">
          <span className="oa-shell__logo">OA</span>
          <Typography.Text strong>Zdy OA</Typography.Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
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
            <Dropdown menu={userMenuItems} placement="bottomRight">
              <Space style={{ cursor: 'pointer', padding: '0 12px' }}>
                <Avatar size="small" style={{ background: '#1677ff' }}>
                  {user?.displayName?.[0] ?? 'U'}
                </Avatar>
                <span className="oa-shell__user">{user?.displayName ?? '用户'}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content className="oa-shell__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}