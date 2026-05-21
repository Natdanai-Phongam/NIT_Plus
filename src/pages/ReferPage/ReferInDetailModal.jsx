import { useState } from 'react'
import { Modal, Button, Tag, Tabs, Tooltip, Descriptions } from 'antd'
import { FileTextOutlined, DownloadOutlined, HistoryOutlined } from '@ant-design/icons'
import StatusBadge from './shared/StatusBadge'
import RejectConfirmModal from './shared/RejectConfirmModal'
import { MOCK_IN_PATIENTS } from './mockInPatients'
import styles from './ReferInDetailModal.module.css'

/* ══════════════════════════════════════════════════════════
   SHARED DISPLAY PRIMITIVES
   ══════════════════════════════════════════════════════════ */

function Field({ label, value }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value ?? '-'}</span>
    </div>
  )
}

function SectionBlock({ title, tag, children }) {
  return (
    <div className={styles.sectionBlock}>
      <div className={`${styles.sectionTitle} ${tag ? styles.sectionTitleInline : ''}`}>
        <span>{title}</span>
        {tag && <Tag color={tag.color}>{tag.label}</Tag>}
      </div>
      {children}
    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <FileTextOutlined style={{ fontSize: 32 }} />
      <span>ไม่มีข้อมูล</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 1 — ข้อมูลส่วนตัว
   ══════════════════════════════════════════════════════════ */
const DESC_PROPS = {
  column:    3,
  layout:    'horizontal',
  size:      'small',
  colon:     true,
  className: styles.descField,
}

function TabPersonal({ data }) {
  return (
    <>
      <SectionBlock title="ข้อมูลผู้ป่วย">
        <Descriptions
          {...DESC_PROPS}
          items={[
            { key: 'nationalId', label: 'เลขประจำตัวประชาชน',   children: data.nationalId ?? '-' },
            { key: 'name',       label: 'ชื่อ - สกุล',           children: `${data.prefix}${data.firstName} ${data.lastName}` },
            { key: 'gender',     label: 'เพศ',                   children: data.gender ?? '-' },
            { key: 'dob',        label: 'วัน/เดือน/ปี เกิด',     children: data.dateOfBirth ?? '-' },
            { key: 'hn',         label: 'รหัสผู้ป่วย (HN)',       children: data.hn ?? '-' },
            { key: 'phone',      label: 'เบอร์โทรศัพท์ผู้ป่วย',  children: data.phone ?? '-' },
            { key: 'category',   label: 'ประเภทผู้ป่วย',          children: data.patientCategory ?? '-' },
            { key: 'type',       label: 'ผู้ป่วย OPD หรือ IPD',   children: data.patientType ?? '-' },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="ข้อมูลที่อยู่">
        <Descriptions
          {...DESC_PROPS}
          items={[
            { key: 'houseNo',        label: 'บ้านเลขที่',         children: data.houseNo ?? '-' },
            { key: 'moo',            label: 'หมู่ที่',              children: data.moo ?? '-' },
            { key: 'road',           label: 'ถนน',                 children: data.road ?? '-' },
            { key: 'subDistrict',    label: 'ตำบล/แขวง',           children: data.subDistrict ?? '-' },
            { key: 'district',       label: 'อำเภอ/เขต',           children: data.district ?? '-' },
            { key: 'province',       label: 'จังหวัด',              children: data.province ?? '-' },
            { key: 'postalCode',     label: 'รหัสไปรษณีย์',         children: data.postalCode ?? '-' },
            { key: 'nearbyLocation', label: 'สถานที่ใกล้เคียง',    children: data.nearbyLocation ?? '-' },
          ]}
        />
      </SectionBlock>
    </>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 2 — ข้อมูลการส่งรักษา
   ══════════════════════════════════════════════════════════ */
function TabTreatment({ data }) {
  return (
    <>
      <SectionBlock title="ข้อมูลการส่งตัวผู้ป่วย">
        <Descriptions
          {...DESC_PROPS}
          column={2}
          items={[
            { key: 'referralDocNo',       label: 'เลขที่ใบส่งตัวโรงพยาบาลต้นทาง',        children: data.referralDocNo ?? '-' },
            { key: 'admissionDateTime',   label: 'วัน / เดือน / ปี (ที่นำส่งตัวผู้ป่วย)', children: data.admissionDateTime ?? '-' },
            { key: 'sourceHospitalName',  label: 'สถานพยาบาลต้นทาง',                      children: data.sourceHospitalName ?? '-' },
            { key: 'sourceHospitalPhone', label: 'เบอร์ติดต่อสถานพยาบาลต้นทาง',           children: data.sourceHospitalPhone ?? '-' },
            { key: 'destHospitalName',    label: 'สถานพยาบาลปลายทาง',                     children: data.destHospitalName ?? '-' },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="อายุใบส่งตัว" tag={data.referralValidity} />

      <SectionBlock title="สิทธิการรักษา">
        <Descriptions
          {...DESC_PROPS}
          items={[
            { key: 'treatmentRight', label: 'สิทธิการรักษา',   children: data.treatmentRight ?? '-' },
            { key: 'rightNumber',    label: 'เลขที่สิทธิ',      children: data.rightNumber ?? '-' },
            { key: 'billTo',         label: 'เรียกเก็บเงินที่', children: data.billTo ?? '-' },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="ประเภทการส่งต่อ" tag={data.referralType} />

      <SectionBlock title="ข้อมูลการส่งรักษา">
        <div className={styles.numberedList}>
          {[
            { no: '1.', label: 'ระดับความเร่งด่วน 5 ระดับ',                         value: data.emergencyLevel   },
            { no: '2.', label: 'ประวัติป่วยในอดีตและประวัติครอบครัว',                value: data.historyFamily    },
            { no: '3.', label: 'ประวัติการป่วยปัจจุบัน',                             value: data.currentHistory   },
            { no: '4.', label: 'ผลการตรวจขั้นสูตรทางห้องทดสอบที่สำคัญ',             value: data.labResults       },
            { no: '5.', label: 'การวินิจฉัยโรคเบื้องต้น',                            value: data.initialDiagnosis },
            { no: '6.', label: 'การรักษาที่ได้ให้ไว้แล้ว',                           value: data.treatmentGiven   },
            { no: '7.', label: 'สาเหตุที่ส่ง',                                       value: data.referralReason   },
            { no: '8.', label: 'รายละเอียดอื่นๆ',                                    value: data.otherDetails     },
          ].map(({ no, label, value }) => (
            <div key={no} className={styles.numberedItem}>
              <span className={styles.numberedLabel}>{no} {label}</span>
              <span className={styles.numberedValue}>{value ?? '-'}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="การแจ้งความโรคติดต่อ (กรณีมีโรคติดต่อ)" tag={data.infectiousStatus} />
    </>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 3 — สัญญาณชีพ
   ══════════════════════════════════════════════════════════ */
function TabVitalSigns({ data }) {
  return (
    <>
      <div className={styles.vitalHeader}>
        <Descriptions
          {...DESC_PROPS}
          column={1}
          items={[
            { key: 'vsDateTime', label: 'วัน - เวลาที่วัดสัญญาณชีพ', children: data.vsDateTime ?? '-' },
          ]}
        />
      </div>
      <Descriptions
        {...DESC_PROPS}
        column={2}
        items={[
          { key: 'painScore',       label: 'คะแนนความเจ็บปวด',                     children: data.painScore ?? '-' },
          { key: 'temperature',     label: 'อุณหภูมิร่างกาย',                       children: data.temperature ?? '-' },
          { key: 'systolicBP',      label: 'ความดันโลหิต (ตัวบน)',                  children: data.systolicBP ?? '-' },
          { key: 'diastolicBP',     label: 'ความดันโลหิต (ตัวล่าง)',                children: data.diastolicBP ?? '-' },
          { key: 'pulseRate',       label: 'ชีพจร (PR)',                             children: data.pulseRate ?? '-' },
          { key: 'respiratoryRate', label: 'อัตราการหายใจ (RR)',                     children: data.respiratoryRate ?? '-' },
          { key: 'o2Saturation',    label: 'ความเข้มข้นของออกซิเจนในเลือด (O2Sat)', children: data.o2Saturation ?? '-' },
        ]}
      />
    </>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 4 — บันทึกหัตถการ (ICD9)
   ══════════════════════════════════════════════════════════ */
function TabICD9({ icd9List }) {
  if (!icd9List.length) return <EmptyState />
  return (
    <div className={styles.icd9List}>
      {icd9List.map((item) => (
        <div key={item.id} className={styles.icd9Card}>
          <div className={styles.grid2}>
            <Field label="ICD9CM"      value={item.code} />
            <Field label="ชื่อ ICD9CM" value={item.name} />
          </div>
          <div className={styles.grid3}>
            <Field label="วันที่ทำการผ่าตัด"       value={item.surgeryDate} />
            <Field label="วิธีการระงับความรู้สึก"  value={item.anesthesia} />
            <Field label="วิธีการอื่นๆ"             value={item.otherMethod ?? '-'} />
          </div>
          <div className={styles.grid2}>
            <Field label="รายละเอียดการผ่าตัด/วิธีการ" value={item.details} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 5 — ข้อวินิจฉัยโรค (ICD10)
   ══════════════════════════════════════════════════════════ */
function TabICD10({ icd10List }) {
  if (!icd10List.length) return <EmptyState />
  return (
    <div className={styles.icd10List}>
      {icd10List.map((item) => (
        <div key={item.id} className={styles.icd10Card}>
          <Field label="ลำดับความสำคัญของโรค" value={item.priority} />
          <div className={styles.grid2}>
            <Field label="รหัส ICD10" value={item.code} />
            <Field label="ชื่อ ICD10"  value={item.name} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 6 — ประวัติการแพ้ยา
   ══════════════════════════════════════════════════════════ */
function TabAllergy({ allergyList }) {
  if (!allergyList.length) return <EmptyState />
  return (
    <div className={styles.dataTable}>
      <div className={`${styles.tableHeader} ${styles.allergyGrid}`}>
        <span>วันที่รายงาน</span>
        <span>รหัสยา</span>
        <span>ชื่อยาที่แพ้</span>
        <span>การวินิจฉัยการแพ้ยา</span>
        <span>ความร้ายแรง</span>
      </div>
      {allergyList.map((item) => (
        <div key={item.id} className={`${styles.tableRow} ${styles.allergyGrid}`}>
          <span>{item.reportDate}</span>
          <span>{item.drugCode}</span>
          <span>{item.drugName}</span>
          <span>{item.allergyDiagnosis}</span>
          <span>{item.severity}</span>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 7 — ประวัติการให้ยา
   ══════════════════════════════════════════════════════════ */
function TabTxHistory({ txHistoryList }) {
  if (!txHistoryList.length) return <EmptyState />
  return (
    <div className={styles.dataTable}>
      <div className={`${styles.tableHeader} ${styles.txGrid}`}>
        <span>รหัสยา</span>
        <span>ชื่อยา</span>
        <span>วันเวลาที่เริ่มการให้ยา</span>
        <span>วันเวลาที่สิ้นสุดการให้ยา</span>
      </div>
      {txHistoryList.map((item) => (
        <div key={item.id} className={`${styles.tableRow} ${styles.txGrid}`}>
          <span>{item.drugCode}</span>
          <span>{item.drugName}</span>
          <span>{item.startDate}</span>
          <span>{item.endDate}</span>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   TAB 8 — เอกสารเพิ่มเติม
   ══════════════════════════════════════════════════════════ */
const DOC_SUB_TABS = [
  { key: 'lab',   label: 'ผล LAB'          },
  { key: 'ekg',   label: 'ผล EKG'          },
  { key: 'xray',  label: 'ผลเอกซเรย์'      },
  { key: 'mri',   label: 'ผลตรวจ MRI'      },
  { key: 'ct',    label: 'ผลตรวจ CT SCAN'  },
  { key: 'other', label: 'อื่นๆ'           },
]

function TabDocuments({ documents }) {
  const [activeDoc, setActiveDoc] = useState('lab')
  const files = documents[activeDoc] ?? []

  return (
    <>
      <div className={styles.docSubTabBar}>
        {DOC_SUB_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`${styles.docSubTabBtn} ${activeDoc === key ? styles.docSubTabBtnActive : ''}`}
            onClick={() => setActiveDoc(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {files.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.docGrid}>
          {files.map((file) => (
            <div key={file.id} className={styles.docCard}>
              <span className={styles.docFileName}>{file.name}</span>
              <Button size="small" icon={<DownloadOutlined />}>
                Download
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN MODAL
   ══════════════════════════════════════════════════════════ */
export default function ReferInDetailModal({ open, onClose, referId }) {
  const [rejectOpen, setRejectOpen] = useState(false)

  const data = MOCK_IN_PATIENTS[referId] ?? Object.values(MOCK_IN_PATIENTS)[0]

  const tabItems = [
    { key: 'personal',  label: 'ข้อมูลส่วนตัว',           children: <TabPersonal   data={data} /> },
    { key: 'treatment', label: 'ข้อมูลการส่งรักษา',       children: <TabTreatment  data={data} /> },
    { key: 'vitals',    label: 'สัญญาณชีพ',               children: <TabVitalSigns data={data} /> },
    { key: 'icd9',      label: 'บันทึกหัตถการ (ICD9)',     children: <TabICD9       icd9List={data.icd9List} /> },
    { key: 'icd10',     label: 'ข้อวินิจฉัยโรค (ICD10)',  children: <TabICD10      icd10List={data.icd10List} /> },
    { key: 'allergy',   label: 'ประวัติการแพ้ยา',          children: <TabAllergy    allergyList={data.allergyList} /> },
    { key: 'txHistory', label: 'ประวัติการให้ยา',           children: <TabTxHistory  txHistoryList={data.txHistoryList} /> },
    { key: 'documents', label: 'เอกสารเพิ่มเติม',          children: <TabDocuments  documents={data.documents} /> },
  ]

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        width="min(90vw, 960px)"
        footer={null}
        centered
        destroyOnClose
        title={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            ข้อมูลผู้ป่วย
            <StatusBadge statusKey={data.status} />
          </span>
        }
        styles={{
          body: {
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 120px)',
            overflow: 'hidden',
          },
        }}
      >
        {/* ── Patient reference strip ── */}
        <div className={styles.infoBar}>
          <div className={styles.infoLeft}>
            <span className={styles.referId}>Refer ID : {data.referId}</span>
            <div className={styles.infoMeta}>
              <span>เลขประจำตัวประชาชน : <strong>{data.nationalId}</strong></span>
              <span>ชื่อ - นามสกุล : <strong>{data.fullName}</strong></span>
            </div>
          </div>
          <div className={styles.infoActions}>
            <Tooltip title="ดูประวัติการรักษา">
              <Button icon={<HistoryOutlined />} onClick={() => {}}>
                ประวัติการรักษา
              </Button>
            </Tooltip>
            <Tooltip title="ดูใบส่งตัวผู้ป่วย">
              <Button type="primary" icon={<FileTextOutlined />} onClick={() => {}}>
                ใบส่งตัวผู้ป่วย
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* ── Tab content ── */}
        <Tabs
          items={tabItems}
          className={styles.detailTabs}
          size="small"
        />

        {/* ── Action bar ── */}
        <div className={styles.actionBar}>
          <Button danger onClick={() => setRejectOpen(true)}>
            ปฏิเสธผู้ป่วย
          </Button>
          <div className={styles.actionRight}>
            <Button type="primary" onClick={onClose}>
              รับผู้ป่วย
            </Button>
          </div>
        </div>
      </Modal>

      <RejectConfirmModal
        open={rejectOpen}
        onCancel={() => setRejectOpen(false)}
        onConfirm={() => {
          /* TODO: call reject API with reason */
          setRejectOpen(false)
          onClose()
        }}
      />
    </>
  )
}
