import { Table, Tag } from 'antd'

const data = [
  { key: '1', name: '研发中心', leader: '赵主管', count: 42 },
  { key: '2', name: '市场部', leader: '钱经理', count: 18 },
  { key: '3', name: '人力资源', leader: '孙 HR', count: 8 },
  { key: '4', name: '运营部', leader: '李总监', count: 15 },
]

export function OrgPage() {
  return (
    <div className="oa-page">
      <h1 className="oa-page__title">组织架构</h1>
      <Table
        pagination={false}
        dataSource={data}
        columns={[
          { title: '部门', dataIndex: 'name' },
          { title: '负责人', dataIndex: 'leader' },
          {
            title: '人数',
            dataIndex: 'count',
            render: (n: number) => <Tag>{n} 人</Tag>,
          },
        ]}
        style={{ background: '#fff', borderRadius: 12, border: '1px solid #eef0f3' }}
      />
    </div>
  )
}
