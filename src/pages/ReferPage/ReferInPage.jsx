import { useState } from 'react'
import { Button, Input, DatePicker, Select, Table, Tooltip } from 'antd'
import {
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import PageLayout from '../../components/Layout/PageLayout'
import StatusBadge from './shared/StatusBadge'
import ReferInDetailModal from './ReferInDetailModal'
import CardReaderNotice from './shared/CardReaderNotice'
import styles from './ReferPage.module.css'

const { RangePicker } = DatePicker

/* ══════════════════════════════════════════════════════════
   MOCK DATA — ขาเข้า: 11 fictional incoming patient records
   ══════════════════════════════════════════════════════════ */
const MOCK_IN_DATA = [
  { key: '1',  no: 1,  referId: '20300-256805-1',  patientName: 'นายสมพงษ์       วิชาดี',    patientId: '1-2201-33412-17-6', datetime: '02/05/2568 - 09:00', hospital: 'โรงพยาบาลพระนครศรีอยุธยา',    status: 'received'       },
  { key: '2',  no: 2,  referId: '20300-256805-2',  patientName: 'นางสาวรัตนา     ดวงดี',     patientId: '3-4503-22617-85-1', datetime: '03/05/2568 - 11:30', hospital: 'โรงพยาบาลเชียงใหม่',          status: 'done'           },
  { key: '3',  no: 3,  referId: '20300-256805-3',  patientName: 'นายชัยวัฒน์     สุขสบาย',   patientId: '2-6704-41023-33-8', datetime: '04/05/2568 - 08:45', hospital: 'โรงพยาบาลสงขลานครินทร์',     status: 'returnOk'       },
  { key: '4',  no: 4,  referId: '20300-256805-4',  patientName: 'นางวรรณา        เพ็ชรงาม',  patientId: '5-8805-54231-60-3', datetime: '05/05/2568 - 14:15', hospital: 'โรงพยาบาลขอนแก่น',           status: 'returned'       },
  { key: '5',  no: 5,  referId: '20300-256805-5',  patientName: 'นายธนกฤต        อารีรัก',   patientId: '1-3306-67894-28-5', datetime: '06/05/2568 - 10:00', hospital: 'โรงพยาบาลมหาราชนครราชสีมา',  status: 'sent'           },
  { key: '6',  no: 6,  referId: '20300-256805-6',  patientName: 'นางสาวจิรา      มีมงคล',    patientId: '3-7107-78345-41-2', datetime: '07/05/2568 - 13:00', hospital: 'โรงพยาบาลพระปกเกล้า',        status: 'waitDoctor'     },
  { key: '7',  no: 7,  referId: '20300-256805-7',  patientName: 'นายเกษม         รุ่งเรือง',  patientId: '2-0208-89012-55-7', datetime: '08/05/2568 - 09:30', hospital: 'โรงพยาบาลหาดใหญ่',          status: 'draft'          },
  { key: '8',  no: 8,  referId: '20300-256805-8',  patientName: 'นางสุดา         ลำเจียก',   patientId: '1-5609-90123-74-4', datetime: '09/05/2568 - 15:45', hospital: 'โรงพยาบาลอุดรธานี',         status: 'returnRejected' },
  { key: '9',  no: 9,  referId: '20300-256805-9',  patientName: 'นายวิชัย        ประเสริฐ',  patientId: '5-9910-01234-89-9', datetime: '10/05/2568 - 08:15', hospital: 'โรงพยาบาลนครปฐม',           status: 'cancelledSrc'   },
  { key: '10', no: 10, referId: '20300-256805-10', patientName: 'นางสาวนันทนา    สว่างใจ',   patientId: '3-1211-12345-96-6', datetime: '11/05/2568 - 16:00', hospital: 'โรงพยาบาลสระบุรี',          status: 'cancelledDest'  },
  { key: '11', no: 11, referId: '20300-256805-11', patientName: 'นายอภิชาติ      กิตติวงศ์', patientId: '1-4312-23456-03-0', datetime: '12/05/2568 - 07:45', hospital: 'โรงพยาบาลระยอง',            status: 'deceased'       },
]

/* ══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════ */

function ActionIcon({ onClick }) {
  return (
    <div className={styles.actions}>
      <Tooltip title="ดูรายละเอียด">
        <button
          className={`${styles.actionBtn} ${styles.actionBtnEdit}`}
          type="button"
          onClick={onClick}
        >
          <EyeOutlined style={{ fontSize: 14 }} />
        </button>
      </Tooltip>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export default function ReferInPage() {
  const [nationalId,   setNationalId]   = useState('')
  const [dateRange,    setDateRange]    = useState([dayjs(), dayjs()])
  const [pageSize,     setPageSize]     = useState(50)
  const [detailOpen,   setDetailOpen]   = useState(false)
  const [selectedReferId, setSelectedReferId] = useState(null)

  const openDetail = (referId) => {
    setSelectedReferId(referId)
    setDetailOpen(true)
  }

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'no',
      width: 64,
      align: 'center',
    },
    {
      title: 'Refer-ID',
      dataIndex: 'referId',
      width: 140,
    },
    {
      title: 'ชื่อ - นามสกุล',
      key: 'patient',
      width: 200,
      render: (_, row) => (
        <div>
          <div className={styles.patientName}>{row.patientName}</div>
          <div className={styles.patientId}>{row.patientId}</div>
        </div>
      ),
    },
    {
      title: 'วัน - เวลาที่รับผู้ป่วย',
      dataIndex: 'datetime',
      width: 170,
    },
    {
      title: 'สถานพยาบาลต้นทาง',
      dataIndex: 'hospital',
    },
    {
      title: 'สถานะการส่งต่อ',
      dataIndex: 'status',
      width: 170,
      align: 'center',
      render: (val) => <StatusBadge statusKey={val} />,
    },
    {
      title: 'แก้ไข',
      key: 'actions',
      width: 64,
      align: 'center',
      render: (_, row) => <ActionIcon onClick={() => openDetail(row.referId)} />,
    },
  ]

  return (
    <>
    <PageLayout
      title="ระบบ Refer ผู้ป่วย"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'ระบบ Refer ผู้ป่วย' },
      ]}
    >
      <div className={styles.card}>

        {/* ── Card header: title only (no create button for ขาเข้า) ── */}
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            ระบบส่งต่อผู้ป่วย (ผู้ป่วยขาเข้า)
          </h2>
        </div>

        {/* ── Filter row ── */}
        <div className={styles.filterRow}>
          <span className={styles.filterLabel}>เลขประจำตัวประชาชน</span>
          <Input
            placeholder="กรอกเลขประจำตัวประชาชน"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            style={{ width: 220 }}
            maxLength={13}
          />

          <span className={styles.filterLabel}>วันเริ่มนำส่งผู้ป่วย</span>
          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            format="DD/MM/YYYY"
            separator="ถึง"
            style={{ width: 280 }}
          />

          <Button type="primary" icon={<SearchOutlined />}>
            ค้นหา
          </Button>
        </div>

        {/* ── Info / download bar ── */}
        <div className={styles.infoBar}>
          <CardReaderNotice />
        </div>

        {/* ── Data table ── */}
        <div className={styles.tableWrap}>
          <Table
            columns={columns}
            dataSource={MOCK_IN_DATA}
            pagination={false}
            size="middle"
            rowKey="key"
            scroll={{ x: 900 }}
          />
        </div>

        {/* ── Pagination row ── */}
        <div className={styles.paginationRow}>
          <div className={styles.pageSizeLabel}>
            แสดงข้อมูล
            <Select
              value={pageSize}
              onChange={setPageSize}
              size="small"
              style={{ width: 70 }}
              options={[
                { value: 25,  label: '25'  },
                { value: 50,  label: '50'  },
                { value: 100, label: '100' },
              ]}
            />
            ต่อหน้า
          </div>
          <div className={styles.paginationBtns}>
            <Button size="small">กลับ</Button>
            <Button size="small">ถัดไป</Button>
          </div>
        </div>

      </div>
    </PageLayout>

      <ReferInDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        referId={selectedReferId}
      />
    </>
  )
}
