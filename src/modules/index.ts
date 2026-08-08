import { meetingModule } from '@zdy-oa/meeting'
import { projectModule } from '@zdy-oa/project'
import { taskModule } from '@zdy-oa/task'
import { authModule } from '@zdy-oa/auth'

export const businessModules = [meetingModule, taskModule, projectModule, authModule]

export type { OaModuleDefinition } from '@zdy-oa/meeting'