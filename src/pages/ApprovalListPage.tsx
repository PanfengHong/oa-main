import { useState } from 'react'
import { Drawer } from 'antd'
import { ApprovalList, ApprovalDetail, mockApprovals } from '@zdy-oa/flow'
import type { ApprovalItem } from '@zdy-oa/flow'
import { FormRenderer, sampleLeaveFormSchema } from '@zdy-oa/form'

export function ApprovalListPage() {
  const [selected, setSelected] = useState<ApprovalItem | null>(null)

  return (
    <>
      <ApprovalList items={mockApprovals} basePath="/approval" onSelect={setSelected} />
      <Drawer
        title="审批详情"
        placement="right"
        closable={{ placement: 'end' }}
        width="min(820px, 90vw)"
        open={!!selected}
        onClose={() => setSelected(null)}
        destroyOnHidden
      >
        {selected && (
          <ApprovalDetail
            key={selected.id}
            item={selected}
            formSlot={
              <FormRenderer
                schema={sampleLeaveFormSchema}
                readOnly
                initialValues={{ type: 'annual', days: 3 }}
              />
            }
          />
        )}
      </Drawer>
    </>
  )
}
