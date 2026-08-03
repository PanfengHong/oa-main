import { meetingModule } from '@my-oa/meeting'
import { projectModule } from '@my-oa/project'
import { taskModule } from '@my-oa/task'

export const businessModules = [meetingModule, taskModule, projectModule]

export type { OaModuleDefinition } from '@my-oa/meeting'
