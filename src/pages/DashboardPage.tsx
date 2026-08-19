import { Card, List, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { getDashboardOverview } from '../api'
import { message } from 'antd'

const todos = [
  { title: '审批：张三年假申请', tag: '待办' },
  { title: '今日 14:00 产品评审会', tag: '会议' },
  { title: '提交本周考勤说明', tag: '考勤' },
]

interface OverviewType {
  approval?: { pending: number};
  task?: { todo: number};
}

export function DashboardPage() {
  const [overview, setOverview] = useState<OverviewType>({});
  const { approval, task } = overview;

  useEffect(() => {
    getDashboardOverview()
      .then((res) => {
        if (res.code === 200) {
          setOverview(res.data || {});
        } else {
          message.error(res.message || '加载工作台统计失败');
        }
      })
      .catch((err) => {
        console.error('getDashboardOverview error:', err?.code, err?.message, err);
        message.error(err?.message || '加载工作台统计失败');
      });
  }, []);

   return (
    <div className="oa-page">
      <h1 className="oa-page__title">工作台</h1>
      <div className="oa-stat-grid">
        <article className="oa-stat-card">
          <span>待我审批</span>
          <strong>{approval?.pending || 0}</strong>
        </article>
        <article className="oa-stat-card">
          <span>今日会议</span>
          <strong>2</strong>
        </article>
        <article className="oa-stat-card">
          <span>进行中的任务</span>
          <strong>{task?.todo || 0}</strong>
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
