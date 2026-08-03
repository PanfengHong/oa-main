import { Card, List, Tag } from 'antd'

const todos = [
  { title: '审批：张三年假申请', tag: '待办' },
  { title: '今日 14:00 产品评审会', tag: '会议' },
  { title: '提交本周考勤说明', tag: '考勤' },
]

export function DashboardPage() {
  return (
    <div className="oa-page">
      <h1 className="oa-page__title">工作台</h1>
      <div className="oa-stat-grid">
        <article className="oa-stat-card">
          <span>待我审批</span>
          <strong>3</strong>
        </article>
        <article className="oa-stat-card">
          <span>今日会议</span>
          <strong>2</strong>
        </article>
        <article className="oa-stat-card">
          <span>进行中的任务</span>
          <strong>5</strong>
        </article>
        <article className="oa-stat-card">
          <span>本月出勤率</span>
          <strong>98%</strong>
        </article>
      </div>
      <Card title="今日待办" bordered={false} style={{ border: '1px solid #eef0f3' }}>
        <List
          dataSource={todos}
          renderItem={(item) => (
            <List.Item>
              {item.title}
              <Tag color="blue">{item.tag}</Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
