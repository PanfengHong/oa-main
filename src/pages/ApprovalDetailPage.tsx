import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'antd'
import { ApprovalDetail, mockApprovals } from '@my-oa/flow'
import { FormRenderer, sampleLeaveFormSchema } from '@my-oa/form'

export function ApprovalDetailPage() {
  const { approvalId } = useParams()
  const navigate = useNavigate()

  const item = useMemo(
    () => mockApprovals.find((a) => a.id === approvalId),
    [approvalId],
  )

  if (!item) {
    return (
      <div className="oa-page">
        <p>未找到审批单</p>
        <Button onClick={() => navigate('/approval')}>返回列表</Button>
      </div>
    )
  }

  return (
    <div className="oa-page">
      <Button type="link" onClick={() => navigate('/approval')} style={{ padding: 0, width: 'fit-content' }}>
        ← 返回审批列表
      </Button>
      <ApprovalDetail
        item={item}
        formSlot={
          <FormRenderer schema={sampleLeaveFormSchema} readOnly initialValues={{ type: 'annual', days: 3 }} />
        }
      />
    </div>
  )
}
