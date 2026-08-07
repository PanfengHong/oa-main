import { meetingModule } from '@my-oa/meeting'
import { projectModule } from '@my-oa/project'
import { taskModule } from '@my-oa/task'
import { authModule } from '@my-oa/auth'

export const businessModules = [meetingModule, taskModule, projectModule, authModule]

export type { OaModuleDefinition } from '@my-oa/meeting'