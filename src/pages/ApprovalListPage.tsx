import { ApprovalList, mockApprovals } from '@my-oa/flow'

export function ApprovalListPage() {
  return <ApprovalList items={mockApprovals} basePath="/approval" />
}
