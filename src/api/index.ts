import { request } from '@zdy-oa/utils'

export const getFormDetail = (id: string) => {
    return request.request({
        url: `/api/form/detail/${id}`,
        method: 'GET'
    });
};

export const getMyApprovals = () => {
    return request.request({
        url: '/api/workflow/my',
        method: 'GET'
    });
}

export const getAttendanceRecords = () => {
    return request.request({
        url: '/api/attend/all',
        method: 'GET'
    });
}
