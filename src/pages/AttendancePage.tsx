import { useState, useEffect } from 'react'
import { getAttendanceRecords } from '../api'
import { Calendar, Tag } from 'antd'
import dayjs from 'dayjs'

const records = [
  { date: '2026-08-01', status: '正常', checkIn: '09:02', checkOut: '18:15' },
  { date: '2026-07-31', status: '正常', checkIn: '08:55', checkOut: '18:30' },
  { date: '2026-07-30', status: '迟到', checkIn: '09:18', checkOut: '18:05' },
]

export function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState([])


  useEffect(() => {
    getAttendanceRecords().then(res => {
      console.log("attendance", res)
      if(res.code === 200) {
        setAttendanceRecords(res.data)
      }
    })
  }, [])


  return (
    <div className="oa-page">
      <h1 className="oa-page__title">考勤</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16 }}>
        <Calendar fullscreen={false} defaultValue={dayjs('2026-08-03')} />
        <div style={{ background: '#fff', border: '1px solid #eef0f3', borderRadius: 12, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>近期打卡</h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {records.map((r) => (
              <li
                key={r.date}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid #f5f5f5',
                }}
              >
                <span>{r.date}</span>
                <span>
                  {r.checkIn} - {r.checkOut}
                </span>
                <Tag color={r.status === '正常' ? 'green' : 'orange'}>{r.status}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
