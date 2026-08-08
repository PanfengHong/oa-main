import { useState } from 'react'
import { Layout, Menu, Typography, Avatar, Space, Dropdown, Button, Divider } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSideMenuItems, moduleMenuGroups, userMenuNavItems } from './menuConfig'
import { useAuth } from '@zdy-oa/auth'
import { ChatWidget } from '@zdy-oa/chat'
import './AppShell.css'

const { Header, Sider, Content } = Layout

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [collapsed, setCollapsed] = useState(false)

  const selectedKeys = [location.pathname]
  const sideItems = useSideMenuItems()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  // 用户下拉菜单中的导航项（如组织架构），按权限过滤后渲染
  const permissions = user?.permissions ?? []
  const hasPermission = (perm?: string) => !perm || permissions.includes(perm)
  const navItems = userMenuNavItems
    .filter((item) => hasPermission(item.permission))
    .map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: () => navigate(item.path!),
    }))

  const userMenuItems = {
    items: [
      ...navItems,
      ...(navItems.length > 0 ? [{ type: 'divider' as const }] : []),
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: '个人中心',
        disabled: true,
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: '账户设置',
        disabled: true,
      },
      { type: 'divider' as const },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: handleLogout,
      },
    ],
  }

  const defaultOpenKeys = moduleMenuGroups.map((g) => g.key)

  return (
    <Layout className="oa-shell">
      <Sider
        width={240}
        collapsedWidth={64}
        collapsed={collapsed}
        className="oa-shell__sider"
        theme="light"
        trigger={null}
      >
        <div className="oa-shell__brand">
          <span className="oa-shell__logo">OA</span>
          {!collapsed && (
            <Typography.Text strong className="oa-shell__brand-text">
              Zdy OA
            </Typography.Text>
          )}
        </div>

        <div className="oa-shell__menu-wrap">
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            items={sideItems}
            onClick={({ key }) => {
              if (key.startsWith('/')) navigate(key)
            }}
          />
        </div>

        <div className="oa-shell__sider-footer">
          <Divider style={{ margin: 0 }} />
          <Dropdown
            menu={userMenuItems}
            trigger={['click']}
            placement={collapsed ? 'topRight' : 'topCenter'}
          >
            <div className="oa-shell__user-block">
              <Avatar
                size={collapsed ? 32 : 40}
                style={{ background: '#1677ff', flexShrink: 0 }}
                icon={<UserOutlined />}
              >
                {user?.displayName?.[0] ?? 'U'}
              </Avatar>
              {!collapsed && (
                <div className="oa-shell__user-info">
                  <div className="oa-shell__user-name">
                    {user?.displayName ?? '用户'}
                  </div>
                  <div className="oa-shell__user-role">
                    {user?.roles?.[0] ?? '未分配角色'}
                  </div>
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </Sider>

      <Layout className="oa-shell__main">
        <Header className="oa-shell__header">
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16 }}
            />
            <Typography.Title level={5} style={{ margin: 0 }}>
              企业办公自动化
            </Typography.Title>
          </Space>
        </Header>
        <Content className="oa-shell__content">
          <Outlet />
        </Content>
      </Layout>
      <ChatWidget />
    </Layout>
  )
}