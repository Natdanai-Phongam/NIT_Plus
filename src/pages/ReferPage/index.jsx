import { useState } from 'react'
import { Button, Input, DatePicker, Select, Table, Tooltip, Modal } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PrinterOutlined,
  DownloadOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import PageLayout from '../../components/Layout/PageLayout'
import ReferFormModal from './ReferFormModal'
import StatusBadge from './shared/StatusBadge'
import DeleteConfirmModal from './shared/DeleteConfirmModal'
import { formatNationalId } from './shared/utils'
import CardReaderNotice from './shared/CardReaderNotice'
import styles from './ReferPage.module.css'

const { RangePicker } = DatePicker

/* ══════════════════════════════════════════════════════════
   MOCK DATA — 10 fictional patient records
   ══════════════════════════════════════════════════════════ */
const MOCK_DATA = [
  { key: '1',  no: 1,  referId: '10200-256805-1', patientName: 'นายสมชาย        มีสุข',      patientId: '3-1001-00214-56-1', datetime: '02/05/2568 - 08:30', hospital: 'โรงพยาบาลศิริราช',                          status: 'sent'          },
  { key: '2',  no: 2,  referId: '10200-256805-2', patientName: 'นางสาวพิมพ์ใจ   รักดี',      patientId: '1-4502-05817-31-7', datetime: '03/05/2568 - 10:00', hospital: 'โรงพยาบาลรามาธิบดี',                        status: 'received'      },
  { key: '3',  no: 3,  referId: '10200-256805-3', patientName: 'นางวิภาวดี      สุขสม',      patientId: '2-7803-12043-44-5', datetime: '04/05/2568 - 09:15', hospital: 'โรงพยาบาลจุฬาลงกรณ์',                      status: 'waitDoctor'    },
  { key: '4',  no: 4,  referId: '10200-256805-4', patientName: 'นายกิตติศักดิ์  แก้วมณี',    patientId: '5-2204-33761-08-3', datetime: '05/05/2568 - 11:45', hospital: 'โรงพยาบาลพระมงกุฎเกล้า',                   status: 'done'          },
  { key: '5',  no: 5,  referId: '10200-256805-5', patientName: 'นางสาวนภาพร     ทองใส',      patientId: '1-3305-24589-72-6', datetime: '06/05/2568 - 13:20', hospital: 'โรงพยาบาลนพรัตนราชธานี',                   status: 'returnOk'      },
  { key: '6',  no: 6,  referId: '10200-256805-6', patientName: 'นายวีระพงษ์     ดีงาม',      patientId: '3-5607-41023-19-2', datetime: '07/05/2568 - 14:00', hospital: 'โรงพยาบาลเลิดสิน',                         status: 'draft'         },
  { key: '7',  no: 7,  referId: '10200-256805-7', patientName: 'นางมาลี         จันทร์แจ่ม', patientId: '2-6108-55347-63-9', datetime: '08/05/2568 - 07:50', hospital: 'โรงพยาบาลสมเด็จพระปิ่นเกล้า',               status: 'returnRejected'},
  { key: '8',  no: 8,  referId: '10200-256805-8', patientName: 'นายอนุชา        ศรีสุวรรณ',  patientId: '1-8409-67812-27-4', datetime: '09/05/2568 - 16:30', hospital: 'โรงพยาบาลตำรวจ',                           status: 'returned'      },
  { key: '9',  no: 9,  referId: '10200-256805-9', patientName: 'นางสาวสุภาพร    ใจเย็น',     patientId: '5-9210-78934-15-8', datetime: '10/05/2568 - 09:00', hospital: 'โรงพยาบาลมหาราชนครราชสีมา',                status: 'cancelledSrc'  },
  { key: '10', no: 10, referId: '10200-256805-10',patientName: 'นายประยุทธ์     มั่นคง',     patientId: '3-0711-82456-40-1', datetime: '11/05/2568 - 15:10', hospital: 'โรงพยาบาลมหาวิทยาลัยนเรศวร',              status: 'cancelledDest' },
  { key: '11', no: 11, referId: '10200-256805-11',patientName: 'นางจินตนา       ปลอดภัย',    patientId: '1-1512-93217-66-0', datetime: '12/05/2568 - 18:45', hospital: 'โรงพยาบาลขอนแก่น',                         status: 'deceased'      },
]

/* ══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════ */

function ActionIcons({ onDelete }) {
  return (
    <div className={styles.actions}>
      <Tooltip title="แก้ไข">
        <button className={`${styles.actionBtn} ${styles.actionBtnEdit}`} type="button">
          <EditOutlined style={{ fontSize: 14 }} />
        </button>
      </Tooltip>
      <Tooltip title="ลบ">
        <button
          className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
          type="button"
          onClick={onDelete}
        >
          <DeleteOutlined style={{ fontSize: 14 }} />
        </button>
      </Tooltip>
      <Tooltip title="พิมพ์">
        <button className={styles.actionBtn} type="button">
          <PrinterOutlined style={{ fontSize: 14 }} />
        </button>
      </Tooltip>
      <Tooltip title="ดาวน์โหลด">
        <button className={styles.actionBtn} type="button">
          <DownloadOutlined style={{ fontSize: 14 }} />
        </button>
      </Tooltip>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════ */
export default function ReferPage() {
  const [nationalId, setNationalId]   = useState('')
  const [dateRange,  setDateRange]    = useState([dayjs(), dayjs()])
  const [pageSize,   setPageSize]     = useState(50)
  const [modalOpen,     setModalOpen]     = useState(false)
  const [searchId,      setSearchId]      = useState('')
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [formPatientId, setFormPatientId] = useState('')
  const [deleteTarget,  setDeleteTarget]  = useState({ open: false, record: null })

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
      title: 'วัน - เวลาที่ส่งผู้ป่วย',
      dataIndex: 'datetime',
      width: 170,
    },
    {
      title: 'สถานพยาบาลปลายทาง',
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
      width: 120,
      align: 'center',
      render: (_, row) => (
        <ActionIcons onDelete={() => setDeleteTarget({ open: true, record: row })} />
      ),
    },
  ]

  return (
    <PageLayout
      title="ระบบ Refer ผู้ป่วย"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'ระบบ Refer ผู้ป่วย' },
      ]}
    >
      <div className={styles.card}>

        {/* ── Card header: title + create button ── */}
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            ระบบส่งต่อผู้ป่วย (ผู้ป่วยขาออก)
          </h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="middle"
            onClick={() => setModalOpen(true)}
          >
            สร้างแบบฟอร์มส่งต่อผู้ป่วย
          </Button>
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

          <Button
            type="primary"
            icon={<SearchOutlined />}
          >
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
            dataSource={MOCK_DATA}
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

      {/* ── Create Refer Form Modal ── */}
      <Modal
        title="สร้างแบบฟอร์มส่งต่อผู้ป่วย"
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setSearchId('') }}
        footer={null}
        width={540}
        centered
        destroyOnClose
        styles={{ mask: { background: 'rgba(0, 0, 0, 0.65)' } }}
      >
        <div className={styles.modalInfoRow}>
          <CardReaderNotice />
        </div>

        <div className={styles.modalSearchRow}>
          <label className={styles.modalFieldLabel}>เลขประจำตัวประชาชน</label>
          <div className={styles.modalInputGroup}>
            <Input
              placeholder="x-xxxx-xxxxx-xx-x"
              value={formatNationalId(searchId)}
              onChange={(e) => setSearchId(e.target.value.replace(/\D/g, '').slice(0, 13))}
              maxLength={17}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              disabled={searchId.length !== 13}
              onClick={() => {
                setFormPatientId(searchId)
                setModalOpen(false)
                setSearchId('')
                setFormModalOpen(true)
              }}
            >
              ค้นหา
            </Button>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button onClick={() => { setModalOpen(false); setSearchId('') }}>
            ปิด
          </Button>
        </div>
      </Modal>

      <ReferFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        patientId={formPatientId}
      />

      <DeleteConfirmModal
        open={deleteTarget.open}
        onCancel={() => setDeleteTarget({ open: false, record: null })}
        onConfirm={() => {
          /* TODO: call delete API with deleteTarget.record */
          setDeleteTarget({ open: false, record: null })
        }}
      />

    </PageLayout>
  )
}
