import { meetingModule } from '@my-oa/meeting'
import { projectModule } from '@my-oa/project'
import { taskModule } from '@my-oa/task'
import { chatModule } from '@my-oa/chat'
import { authModule } from '@my-oa/auth'

export const businessModules = [meetingModule, taskModule, projectModule, chatModule, authModule]

export type { OaModuleDefinition } from '@my-oa/meeting'