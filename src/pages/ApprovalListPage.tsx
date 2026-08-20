import { useState, useEffect } from 'react'
import { Drawer } from 'antd'
import { ApprovalList, ApprovalDetail, mockApprovals } from '@zdy-oa/flow'
import type { ApprovalItem } from '@zdy-oa/flow'
import { FormRenderer, type FormSchema } from '@zdy-oa/form'
import { getFormDetail, getMyApprovals } from '@/api'

export function ApprovalListPage() {
  const [selected, setSelected] = useState<ApprovalItem | null>(null)
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null)

  useEffect(() => {
    getMyApprovals().then(res => {
      console.log("my approvals", res)
      if(res.code === 200) {
        // setMyApprovals(res.data)
      }
    })
  }, [])

  useEffect(() => {
    if (!selected) {
      return
    }
    getFormDetail(selected.formSchemaId).then(res => {
      console.log("form detail", res)
      if(res.code === 200) {
        setFormSchema(res.data)
      }
    })
    console.log("selected", selected)
  }, [selected])

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
        {selected && formSchema && (
          <ApprovalDetail
            key={selected.id}
            item={selected}
            formSlot={
              <FormRenderer
                schema={formSchema}
              />
            }
          />
        )}
      </Drawer>
    </>
  )
}
