import { useState, useEffect } from 'react'
import {
  Modal, Collapse, Form, Input, Select, DatePicker,
  TimePicker, Radio, Button, Upload, Tabs, Table, Tooltip,
} from 'antd'
import {
  PlusOutlined, FileTextOutlined, InboxOutlined,
  DeleteOutlined, EditOutlined, QuestionCircleOutlined, LockOutlined, InfoCircleOutlined,
} from '@ant-design/icons'
import styles from './ReferFormModal.module.css'
import {
  ICD9CM_DATA, ANESTHESIA_OPTIONS,
  ICD10_DATA, DIAGNOSIS_PRIORITY_OPTIONS,
  ALLERGY_DIAGNOSIS_OPTIONS, ALLERGY_SEVERITY_OPTIONS,
  ALLERGY_SYMPTOM_OPTIONS, ALLERGY_ENCOUNTER_OPTIONS, ALLERGY_SERVICE_UNIT_OPTIONS,
} from './mockData'
import DeleteConfirmModal from './shared/DeleteConfirmModal'
import { formatNationalId } from './shared/utils'
import { MOCK_PATIENTS } from './mockPatients'

const { TextArea } = Input
const { Dragger } = Upload

const requiredMarkAfter = (labelNode, { required }) => (
  <>{labelNode}{required && <span style={{ color: 'var(--color-error)', marginLeft: 4 }}>*</span>}</>
)

const LOCK_ICON = <LockOutlined style={{ fontSize: 12, color: 'var(--color-text-disabled)' }} />

const labelWithTip = (label, tip) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
    {label}
    <Tooltip title={tip}>
      <QuestionCircleOutlined style={{ fontSize: 12, color: 'var(--color-text-secondary)', cursor: 'help' }} />
    </Tooltip>
  </span>
)

/* ══════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ══════════════════════════════════════════════════════════ */

function SectionPersonal() {
  return (
    <div className={styles.sectionBody}>
      <p className={styles.subSectionLabel}>ข้อมูลผู้ป่วย</p>

      {/* Row 1: ทุก field read-only จาก patient registry */}
      <div className={styles.row4}>
        <Form.Item
          label="หมายเลขบัตรประชาชน"
          name="nationalId"
          getValueProps={(v) => ({ value: formatNationalId(v) })}
        >
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
        <Form.Item label="คำนำหน้า" name="prefix">
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
        <Form.Item label="ชื่อ" name="firstName">
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
        <Form.Item label="สกุล" name="lastName">
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
      </div>

      {/* Row 2: เพศ[RO] | ว/ด/ป เกิด[RO] | รหัสผู้ป่วย (HN) | เบอร์โทรศัพท์ */}
      <div className={styles.row4}>
        <Form.Item label="เพศ" name="gender">
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
        <Form.Item label="ว/ด/ป เกิด" name="dateOfBirth">
          <DatePicker
            disabled
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
            className={styles.readOnlyDatePicker}
            suffixIcon={LOCK_ICON}
          />
        </Form.Item>
        <Form.Item label="รหัสผู้ป่วย (HN)" name="hn">
          <Input placeholder="รหัสผู้ป่วย (HN)" />
        </Form.Item>
        <Form.Item label="เบอร์โทรศัพท์ผู้ป่วย" name="phone">
          <Input placeholder="เบอร์โทรศัพท์ผู้ป่วย" />
        </Form.Item>
      </div>

      {/* Row 3: ประเภทผู้ป่วย [Select] | แผนกผู้ป่วย [Radio] */}
      <div className={styles.row2}>
        <Form.Item label="ประเภทผู้ป่วย" name="patientCategory" rules={[{ required: true, message: '' }]}>
          <Select placeholder="กรุณาเลือก" options={[
            { value: 'new',       label: 'ผู้ป่วยใหม่'    },
            { value: 'old',       label: 'ผู้ป่วยเก่า'    },
            { value: 'emergency', label: 'ผู้ป่วยฉุกเฉิน' },
          ]} />
        </Form.Item>
        <Form.Item label="แผนกผู้ป่วย" name="patientType" rules={[{ required: true, message: '' }]}>
          <Radio.Group>
            <Radio value="OPD">ผู้ป่วยนอก (OPD)</Radio>
            <Radio value="IPD">ผู้ป่วยใน (IPD)</Radio>
          </Radio.Group>
        </Form.Item>
      </div>

      {/* Address sub-section */}
      <p className={styles.subSectionLabel}>ข้อมูลที่อยู่อาศัย</p>

      <div className={styles.row3}>
        <Form.Item label="บ้านเลขที่" name="houseNo">
          <Input placeholder="บ้านเลขที่" />
        </Form.Item>
        <Form.Item label="หมู่ที่" name="moo">
          <Input placeholder="หมู่ที่" />
        </Form.Item>
        <Form.Item label="ถนน" name="road">
          <Input placeholder="ถนน" />
        </Form.Item>
      </div>

      <div className={styles.row3}>
        <Form.Item label="ตำบล / แขวง" name="subDistrict">
          <Input placeholder="ตำบล / แขวง" />
        </Form.Item>
        <Form.Item label="อำเภอ / เขต" name="district">
          <Input placeholder="อำเภอ / เขต" />
        </Form.Item>
        <Form.Item label="จังหวัด" name="province">
          <Input placeholder="จังหวัด" />
        </Form.Item>
      </div>

      <Form.Item label="สถานที่ใกล้เคียง" name="nearbyLocation" extra="หากไม่มีให้ใส่เครื่องหมาย -">
        <Input placeholder="สถานที่ใกล้เคียง" />
      </Form.Item>
    </div>
  )
}

function SectionTreatment() {
  const [referralValidity, setReferralValidity] = useState(null)

  return (
    <div className={styles.sectionBody}>

      {/* Row 1: [เลขที่ใบส่งต่อ + วัน/เวลา] (8) | เบอร์โทร (4) */}
      <div className={styles.row_8_4}>
        <div className={styles.row2}>
          <Form.Item label="เลขที่ใบส่งต่อโรงพยาบาลต้นทาง" name="referralDocNo">
            <Input placeholder="เลขที่ใบส่งต่อ" />
          </Form.Item>
          <div className={styles.dateTimeGroup}>
            <p className={styles.dateTimeLabel}>
              วัน / เดือน / ปี (ที่นำส่งตัวผู้ป่วย)
              <span style={{ color: 'var(--color-error)', marginLeft: 4 }}>*</span>
            </p>
            <div className={styles.dateTimeInputRow}>
              <Form.Item name="admissionDate" rules={[{ required: true, message: '' }]} style={{ flex: 1, minWidth: 0, marginBottom: 0 }}>
                <DatePicker disabled format="DD/MM/YYYY" style={{ width: '100%' }} className={styles.readOnlyDatePicker} suffixIcon={LOCK_ICON} />
              </Form.Item>
              <Form.Item name="admissionTime" style={{ flex: 1, minWidth: 0, marginBottom: 0 }}>
                <TimePicker disabled format="HH:mm:ss" style={{ width: '100%' }} className={styles.readOnlyDatePicker} suffixIcon={LOCK_ICON} />
              </Form.Item>
            </div>
          </div>
        </div>
        <Form.Item label="เบอร์โทรศัพท์สถานพยาบาลต้นทาง" name="hospitalPhone">
          <Input placeholder="เบอร์โทรศัพท์" />
        </Form.Item>
      </div>

      {/* Row 2: สถานพยาบาลต้นทาง [RO] (8) | HCODE ต้นทาง [RO] (4) */}
      <div className={styles.row_8_4}>
        <Form.Item label="สถานพยาบาลต้นทาง" name="sourceHospitalName" rules={[{ required: true, message: '' }]}>
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
        <Form.Item label={labelWithTip('รหัสสถานพยาบาล (HCODE) ต้นทาง', 'Hospital Code — รหัสสถานพยาบาล 5 หลักตามมาตรฐานกระทรวงสาธารณสุข')} name="sourceHospitalCode">
          <Input disabled className={styles.readOnlyInput} suffix={LOCK_ICON} />
        </Form.Item>
      </div>

      {/* Row 3: สถานพยาบาลปลายทาง (8) | HCODE ปลายทาง (4) */}
      <div className={styles.row_8_4}>
        <Form.Item label="สถานพยาบาลปลายทาง" name="destHospitalName" rules={[{ required: true, message: '' }]}>
          <Select placeholder="เลือกสถานพยาบาล" options={[]} />
        </Form.Item>
        <Form.Item label={labelWithTip('รหัสสถานพยาบาล (HCODE) ปลายทาง', 'Hospital Code — รหัสสถานพยาบาล 5 หลักตามมาตรฐานกระทรวงสาธารณสุข')} name="destHospitalCode">
          <Input placeholder="รหัส HCODE ปลายทาง" />
        </Form.Item>
      </div>

      {/* SubSection: อายุใบส่งต่อ */}
      <p className={styles.subSectionLabel}>อายุใบส่งต่อ</p>

      <Form.Item name="referralValidity">
        <Radio.Group onChange={(e) => setReferralValidity(e.target.value)}>
          <div className={styles.radioStack}>
            <Radio value="this_time">สำหรับการรักษาครั้งนี้เท่านั้น</Radio>
            <Radio value="until_doctor">จนกระทั่งแพทย์มีความเห็นว่าสามารถกลับมารักษาที่สถานพยาบาลต้นทางได้</Radio>
            <Radio value="until_date">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                ใช้ได้จนถึงวันที่
                <Form.Item name="validUntilDate" noStyle>
                  <DatePicker
                    placeholder="เลือกวันที่"
                    format="DD/MM/YYYY"
                    disabled={referralValidity !== 'until_date'}
                  />
                </Form.Item>
              </span>
            </Radio>
          </div>
        </Radio.Group>
      </Form.Item>

      {/* SubSection: สิทธิการรักษา */}
      <p className={styles.subSectionLabel}>สิทธิการรักษา</p>

      <div className={styles.row2}>
        <Form.Item label="สิทธิการรักษา" name="treatmentRight" rules={[{ required: true, message: '' }]}>
          <Select placeholder="กรุณาเลือกสิทธิ" options={[]} />
        </Form.Item>
        <Form.Item label="เลขที่สิทธิ" name="rightNumber" rules={[{ required: true, message: '' }]}>
          <Input placeholder="เลขที่สิทธิ" />
        </Form.Item>
      </div>

      <Form.Item label="เรียกเก็บเงินไปที่" name="billTo">
        <Select placeholder="กรุณาเลือก" options={[]} />
      </Form.Item>

      {/* SubSection: ประเภทการส่งต่อ */}
      <p className={styles.subSectionLabel}>ประเภทการส่งต่อ</p>

      <Form.Item name="referralType" rules={[{ required: true, message: '' }]}>
        <Radio.Group>
          <div className={styles.radioStack}>
            <Radio value="diagnose_treat">เพื่อการวินิจฉัยและรักษา</Radio>
            <Radio value="diagnose">เพื่อการวินิจฉัย</Radio>
            <Radio value="treat_rehab">เพื่อการรักษาและฟื้นฟูต่อเนื่อง</Radio>
            <Radio value="near_home">เพื่อการดูแลต่อใกล้บ้าน</Radio>
            <Radio value="patient_request">ตามความต้องการของผู้ป่วย</Radio>
          </div>
        </Radio.Group>
      </Form.Item>

      {/* SubSection: ข้อมูลการส่งรักษา */}
      <p className={styles.subSectionLabel}>ข้อมูลการส่งรักษา</p>

      <Form.Item label="1. ระดับความเร่งด่วน 5 ระดับ" name="emergencyLevel" rules={[{ required: true, message: '' }]}>
        <Radio.Group>
          <Radio value="life_threatening">Life-Threatening</Radio>
          <Radio value="emergency">Emergency</Radio>
          <Radio value="urgent">Urgent</Radio>
          <Radio value="acute">Acute</Radio>
          <Radio value="non_acute">Non-acute</Radio>
        </Radio.Group>
      </Form.Item>

      {[
        { name: 'historyFamily',    label: '2. ประวัติป่วยในอดีตและประวัติครอบครัว',          required: false },
        { name: 'currentHistory',   label: '3. ประวัติการป่วยปัจจุบัน',                       required: false },
        { name: 'labResults',       label: '4. ผลการตรวจขั้นสูตรทางห้องทดสอบที่สำคัญ',       required: false },
        { name: 'initialDiagnosis', label: '5. การวินิจฉัยโรคเบื้องต้น',                      required: true  },
        { name: 'treatmentGiven',   label: '6. การรักษาที่ได้ให้ไว้แล้ว',                     required: false },
        { name: 'referralReason',   label: '7. สาเหตุที่ส่ง',                                 required: true  },
        { name: 'otherDetails',     label: '8. รายละเอียดอื่นๆ',                              required: false },
      ].map(({ name, label, required }) => (
        <Form.Item key={name} label={label} name={name} rules={required ? [{ required: true, message: '' }] : []}>
          <TextArea rows={3} placeholder="กรอกรายละเอียด..." />
        </Form.Item>
      ))}

      {/* SubSection: การแจ้งความโรคติดต่อ */}
      <p className={styles.subSectionLabel}>การแจ้งความโรคติดต่อ (กรณีมีโรคติดต่อ)</p>

      <Form.Item name="infectiousStatus">
        <Radio.Group>
          <div className={styles.radioStack}>
            <Radio value="non_infective">ไม่ได้เป็นโรคติดต่อ ( Non-Infective )</Radio>
            <Radio value="infective_reported">เป็นโรคติดต่อ และมีการแจ้งความแล้ว ( Reported )</Radio>
            <Radio value="infective_non_reported">เป็นโรคติดต่อ และยังไม่ได้แจ้งความ ( Not-Reported )</Radio>
          </div>
        </Radio.Group>
      </Form.Item>

    </div>
  )
}

function SectionVitalSigns() {
  return (
    <div className={styles.sectionBody}>

      {/* Row 1: วันที่วัด [RO] | เวลาที่วัด [RO] | คะแนนความเจ็บปวด */}
      <div className={styles.row3}>
        <Form.Item label="วันที่วัดสัญญาณชีพ" name="vsDate">
          <DatePicker disabled format="DD/MM/YYYY" style={{ width: '100%' }} className={styles.readOnlyDatePicker} suffixIcon={LOCK_ICON} />
        </Form.Item>
        <Form.Item label="เวลาที่วัดสัญญาณชีพ" name="vsTime">
          <TimePicker disabled format="HH:mm:ss" style={{ width: '100%' }} className={styles.readOnlyDatePicker} suffixIcon={LOCK_ICON} />
        </Form.Item>
        <Form.Item label="คะแนนความเจ็บปวด" name="painScore">
          <Select placeholder="กรุณาเลือก" options={Array.from({ length: 11 }, (_, i) => ({ value: i, label: String(i) }))} />
        </Form.Item>
      </div>

      {/* Row 2: BP บน | BP ล่าง | อุณหภูมิ */}
      <div className={styles.row3}>
        <Form.Item label="ความดันโลหิต (ตัวบน)" name="systolicBP" rules={[{ required: true, message: '' }]}>
          <Input placeholder="มม.ปรอท" type="number" />
        </Form.Item>
        <Form.Item label="ความดันโลหิต (ตัวล่าง)" name="diastolicBP" rules={[{ required: true, message: '' }]}>
          <Input placeholder="มม.ปรอท" type="number" />
        </Form.Item>
        <Form.Item label="อุณหภูมิ" name="temperature" rules={[{ required: true, message: '' }]}>
          <Input placeholder="เซลเซียส (°C)" type="number" />
        </Form.Item>
      </div>

      {/* Row 3: ชีพจร | O2Sat | อัตราการหายใจ */}
      <div className={styles.row3}>
        <Form.Item label={labelWithTip('ชีพจร (PR)', 'Pulse Rate — อัตราการเต้นของหัวใจ (ครั้ง/นาที)')} name="pulseRate" rules={[{ required: true, message: '' }]}>
          <Input placeholder="ครั้ง / นาที" type="number" />
        </Form.Item>
        <Form.Item label={labelWithTip('ความเข้มข้นของออกซิเจนในเลือด (O2Sat)', 'Oxygen Saturation — ความเข้มข้นของออกซิเจนในเลือด (%)')} name="o2Saturation" rules={[{ required: true, message: '' }]}>
          <Input placeholder="เปอร์เซนต์ (%)" type="number" />
        </Form.Item>
        <Form.Item label={labelWithTip('อัตราการหายใจ (RR)', 'Respiratory Rate — จำนวนครั้งการหายใจ (ครั้ง/นาที)')} name="respiratoryRate" rules={[{ required: true, message: '' }]}>
          <Input placeholder="ครั้ง / นาที" type="number" />
        </Form.Item>
      </div>

    </div>
  )
}

/* ── ICD9CM search table columns ── */
const ICD9_COLUMNS = [
  { title: 'ICD9CM',      dataIndex: 'code', width: 110 },
  { title: 'ชื่อ ICD9CM', dataIndex: 'name' },
]

function Icd9Card({ item, onUpdate, onRemove }) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const isOthers = item.anesthesia === 'others'
  return (
    <div className={styles.icd9Card}>
      <div className={styles.row3}>
        <Form.Item label="ICD9CM">
          <Input value={item.code} disabled className={styles.readOnlyInput} />
        </Form.Item>
        <Form.Item label="ชื่อ ICD9CM" className={styles.colSpan2}>
          <Input value={item.name} disabled className={styles.readOnlyInput} />
        </Form.Item>
      </div>

      <div className={styles.row3}>
        <Form.Item label="วันที่ทำการผ่าตัด" rules={[{ required: true, message: '' }]}>
          <DatePicker
            value={item.surgeryDate}
            onChange={(v) => onUpdate(item.id, 'surgeryDate', v)}
            format="DD/MM/YYYY"
            placeholder="เลือกวันที่"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="วิธีการระงับความรู้สึก">
          <Select
            value={item.anesthesia ?? undefined}
            onChange={(v) => onUpdate(item.id, 'anesthesia', v)}
            placeholder="เลือกวิธีการ"
            options={ANESTHESIA_OPTIONS}
          />
        </Form.Item>
        <Form.Item label="วิธีการอื่นๆ">
          <Input
            value={item.otherMethod}
            onChange={(e) => onUpdate(item.id, 'otherMethod', e.target.value)}
            placeholder="ระบุวิธีการอื่นๆ"
            disabled={!isOthers}
          />
        </Form.Item>
      </div>

      <Form.Item label="รายละเอียดการผ่าตัด/วิธีการ">
        <TextArea
          value={item.details}
          onChange={(e) => onUpdate(item.id, 'details', e.target.value)}
          rows={3}
          placeholder="กรอกรายละเอียด..."
        />
      </Form.Item>

      <div className={styles.icd9CardFooter}>
        <Button danger onClick={() => setConfirmOpen(true)}>ลบ</Button>
      </div>
      <DeleteConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); onRemove(item.id) }}
      />
    </div>
  )
}

function SectionICD9() {
  const [modalOpen,   setModalOpen]   = useState(false)
  const [searchText,  setSearchText]  = useState('')
  const [pendingKeys, setPendingKeys] = useState([])
  const [items,       setItems]       = useState([])

  const filtered = ICD9CM_DATA.filter(
    ({ code, name }) =>
      !searchText ||
      code.includes(searchText) ||
      name.toLowerCase().includes(searchText.toLowerCase())
  )

  const updateItem = (id, field, value) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)))

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id))

  const handleConfirm = () => {
    const existing = new Set(items.map((it) => it.code))
    const newItems = pendingKeys
      .filter((code) => !existing.has(code))
      .map((code) => {
        const found = ICD9CM_DATA.find((r) => r.code === code)
        return { id: `${code}-${Date.now()}`, ...found, surgeryDate: null, anesthesia: null, otherMethod: '', details: '' }
      })
    setItems((prev) => [...prev, ...newItems])
    closeModal()
  }

  const closeModal = () => {
    setModalOpen(false)
    setPendingKeys([])
    setSearchText('')
  }

  return (
    <div className={styles.sectionBody}>
      <div className={styles.listHeader}>
        <Button icon={<PlusOutlined />} size="small" onClick={() => setModalOpen(true)}>
          เพิ่ม
        </Button>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyList}>
          <FileTextOutlined style={{ fontSize: 32 }} />
          <p>ยังไม่มีการระบุข้อมูล</p>
          <p className={styles.emptyHint}>กด "เพิ่ม" เพื่อเพิ่มข้อมูล</p>
        </div>
      ) : (
        <div className={styles.icd9List}>
          {items.map((item) => (
            <Icd9Card key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} />
          ))}
        </div>
      )}

      <Modal
        title="ค้นหา ICD9CM"
        open={modalOpen}
        onCancel={closeModal}
        width={680}
        centered
        destroyOnClose
        footer={[
          <Button key="close" onClick={closeModal}>ปิด</Button>,
          <Button key="ok" type="primary" disabled={pendingKeys.length === 0} onClick={handleConfirm}>
            ตกลง
          </Button>,
        ]}
      >
        <div className={styles.icd9SearchRow}>
          <span className={styles.icd9SearchLabel}>ICD9CM</span>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button type="primary">ค้นหา</Button>
        </div>
        <Table
          size="small"
          columns={ICD9_COLUMNS}
          dataSource={filtered}
          rowKey="code"
          pagination={false}
          scroll={{ y: 300 }}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: pendingKeys,
            onChange: (keys) => setPendingKeys(keys),
            getCheckboxProps: (record) => ({
              disabled: items.some((it) => it.code === record.code),
            }),
          }}
        />
      </Modal>
    </div>
  )
}

/* ── ICD10 search table columns ── */
const nowrap = { onHeaderCell: () => ({ style: { whiteSpace: 'nowrap' } }) }
const ICD10_COLUMNS = [
  { title: 'รหัสโรค',        dataIndex: 'code',         width: 90,  ...nowrap },
  { title: 'Related',        dataIndex: 'related',      width: 70,  align: 'center', ...nowrap },
  { title: 'ผลการวินิจฉัย',  dataIndex: 'diagnosis',    width: 190, ellipsis: true, ...nowrap },
  { title: 'การวินิจฉัย',    dataIndex: 'detail',       width: 200, ellipsis: true, ...nowrap },
  { title: 'คำอธิบาย',       dataIndex: 'description',  width: 140, ellipsis: true, ...nowrap },
  { title: 'การเรียกโดยย่อ', dataIndex: 'abbreviation', width: 130, ...nowrap },
]

function Icd10Item({ item, onUpdate, onRemove, hasPrincipal }) {
  const options = DIAGNOSIS_PRIORITY_OPTIONS.map((opt) => ({
    ...opt,
    disabled: opt.value === 'principal' && hasPrincipal && item.priority !== 'principal',
  }))

  return (
    <div className={styles.icd10Row}>
      <Select
        value={item.priority ?? undefined}
        onChange={(v) => onUpdate(item.id, 'priority', v)}
        placeholder="เลือกลำดับ"
        options={options}
        style={{ width: '100%' }}
        size="small"
      />
      <span className={styles.icd10Code}>{item.code}</span>
      <span className={styles.icd10Name}>{item.name}</span>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        size="small"
        onClick={() => onRemove(item.id)}
      />
    </div>
  )
}

function SectionICD10() {
  const [modalOpen,   setModalOpen]   = useState(false)
  const [searchText,  setSearchText]  = useState('')
  const [pendingKeys, setPendingKeys] = useState([])
  const [items,       setItems]       = useState([])

  const hasPrincipal = items.some((it) => it.priority === 'principal')

  const filtered = ICD10_DATA.filter(({ code, name }) =>
    searchText.length < 2 ||
    code.toLowerCase().includes(searchText.toLowerCase()) ||
    name.toLowerCase().includes(searchText.toLowerCase())
  )

  const updateItem = (id, field, value) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)))

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id))

  const handleConfirm = () => {
    const existing = new Set(items.map((it) => it.code))
    const newItems = pendingKeys
      .filter((code) => !existing.has(code))
      .map((code) => {
        const found = ICD10_DATA.find((r) => r.code === code)
        return { id: `${code}-${Date.now()}`, ...found, priority: null }
      })
    setItems((prev) => [...prev, ...newItems])
    closeModal()
  }

  const closeModal = () => {
    setModalOpen(false)
    setPendingKeys([])
    setSearchText('')
  }

  return (
    <div className={styles.sectionBody}>
      <div className={styles.listHeader}>
        <Button icon={<PlusOutlined />} size="small" onClick={() => setModalOpen(true)}>
          เพิ่ม
        </Button>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyList}>
          <FileTextOutlined style={{ fontSize: 32 }} />
          <p>ยังไม่มีการระบุข้อมูล</p>
          <p className={styles.emptyHint}>กด "เพิ่ม" เพื่อเพิ่มข้อมูล</p>
        </div>
      ) : (
        <>
          {hasPrincipal && (
            <div className={styles.principalBanner}>
              <InfoCircleOutlined />
              กำหนด Principal Diagnosis แล้ว — รายการใหม่จะถูกกำหนดเป็น Comorbidity หรือ Complication เท่านั้น
            </div>
          )}
          <div className={styles.icd10List}>
          <div className={styles.icd10Header}>
            <span>ลำดับความสำคัญของโรค</span>
            <span>รหัส ICD10</span>
            <span>ชื่อ ICD10</span>
            <span />
          </div>
          {items.map((item) => (
            <Icd10Item
              key={item.id}
              item={item}
              onUpdate={updateItem}
              onRemove={removeItem}
              hasPrincipal={hasPrincipal}
            />
          ))}
        </div>
        </>
      )}

      <Modal
        title="ค้นหา ICD10"
        open={modalOpen}
        onCancel={closeModal}
        width={860}
        centered
        destroyOnClose
        footer={[
          <Button key="close" onClick={closeModal}>ปิด</Button>,
          <Button key="ok" type="primary" disabled={pendingKeys.length === 0} onClick={handleConfirm}>
            ตกลง
          </Button>,
        ]}
      >
        <div className={styles.icd9SearchRow}>
          <span className={styles.icd9SearchLabel}>ICD10</span>
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="กรุณาป้อนข้อมูลค้นหาอย่างน้อย 2 ตัวอักษร"
            allowClear
          />
          <Button type="primary">ค้นหา</Button>
        </div>
        <Table
          size="small"
          columns={ICD10_COLUMNS}
          dataSource={filtered}
          rowKey="code"
          pagination={false}
          scroll={{ x: 860, y: 280 }}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: pendingKeys,
            onChange: (keys) => setPendingKeys(keys),
            getCheckboxProps: (record) => ({
              disabled: items.some((it) => it.code === record.code),
            }),
          }}
        />
      </Modal>
    </div>
  )
}

/* ── helper: get label from options array ── */
const getLabel = (options, value) => options.find((o) => o.value === value)?.label ?? '—'

function AllergyFormModal({ open, onClose, onSave, initialValues }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (open) form.setFieldsValue(initialValues ?? {})
    else form.resetFields()
  }, [open, initialValues, form])

  const handleSave = async () => {
    const values = await form.validateFields()
    onSave(values)
  }

  return (
    <Modal
      title={initialValues ? 'แก้ไขข้อมูลประวัติการแพ้ยา' : 'เพิ่มข้อมูลประวัติการแพ้ยา'}
      open={open}
      onCancel={onClose}
      width="min(90vw, 860px)"
      centered
      destroyOnClose
      footer={[
        <Button key="close" onClick={onClose}>ปิด</Button>,
        <Button key="save" type="primary" onClick={handleSave}>บันทึก</Button>,
      ]}
    >
      <Form form={form} layout="vertical" requiredMark={requiredMarkAfter}>

        {/* Row 1: วันที่รายงาน | รหัสยา | รหัสมาตรฐานยา | การวินิจฉัยการแพ้ยา */}
        <div className={styles.row4}>
          <Form.Item label="วันที่รายงาน" name="reportDate">
            <DatePicker format="DD/MM/YYYY" placeholder="เลือกวันที่" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="รหัสยา" name="drugCode">
            <Input placeholder="ระบุรหัสยา" />
          </Form.Item>
          <Form.Item label="รหัสมาตรฐานยา" name="drugStandardCode">
            <Input placeholder="ระบุรหัสมาตรฐานยา" />
          </Form.Item>
          <Form.Item label="การวินิจฉัยการแพ้ยา" name="allergyDiagnosis">
            <Select placeholder="เลือกการวินิจฉัย" options={ALLERGY_DIAGNOSIS_OPTIONS} />
          </Form.Item>
        </div>

        {/* Row 2: ยาที่แพ้ (span 2) | ความร้ายแรง | วันที่เริ่มแพ้ */}
        <div className={styles.row4}>
          <Form.Item label="ยาที่แพ้" name="drugName" className={styles.colSpan2}>
            <Input placeholder="ระบุชื่อยา" />
          </Form.Item>
          <Form.Item label="ความร้ายแรง" name="severity">
            <Select placeholder="เลือกความร้ายแรง" options={ALLERGY_SEVERITY_OPTIONS} />
          </Form.Item>
          <Form.Item label="วันที่เริ่มแพ้" name="allergyStartDate">
            <DatePicker format="DD/MM/YYYY" placeholder="เลือกวันที่" style={{ width: '100%' }} />
          </Form.Item>
        </div>

        {/* Row 3: ลักษณะอาการ */}
        <Form.Item label="ลักษณะอาการของการแพ้ยา" name="allergySymptom">
          <Select placeholder="เลือกลักษณะอาการของการแพ้ยา" options={ALLERGY_SYMPTOM_OPTIONS} />
        </Form.Item>

        {/* Row 4: รายละเอียดเพิ่มเติม */}
        <Form.Item label="รายละเอียดเพิ่มเติม" name="allergyDetails">
          <TextArea rows={3} placeholder="ระบุรายละเอียดเพิ่มเติม" />
        </Form.Item>

        {/* Row 5: ประเภทการพบ | หน่วยบริการ */}
        <div className={styles.row2}>
          <Form.Item label="ประเภทการพบการแพ้ยา" name="allergyEncounterType">
            <Select placeholder="เลือกประเภทการพบการแพ้ยา" options={ALLERGY_ENCOUNTER_OPTIONS} />
          </Form.Item>
          <Form.Item label="หน่วยบริการผู้ให้ข้อมูลประวัติการแพ้ยา" name="serviceUnit">
            <Select placeholder="เลือกหน่วยบริการ" options={ALLERGY_SERVICE_UNIT_OPTIONS} />
          </Form.Item>
        </div>

      </Form>
    </Modal>
  )
}

function SectionAllergy() {
  const [items,       setItems]       = useState([])
  const [modalState,  setModalState]  = useState({ open: false, editingId: null })
  const [deleteId,    setDeleteId]    = useState(null)

  const editingItem = modalState.editingId
    ? items.find((it) => it.id === modalState.editingId) ?? null
    : null

  const openAdd  = () => setModalState({ open: true,  editingId: null })
  const openEdit = (id) => setModalState({ open: true,  editingId: id  })
  const closeModal = () => setModalState({ open: false, editingId: null })

  const handleSave = (values) => {
    if (modalState.editingId) {
      setItems((prev) => prev.map((it) => (it.id === modalState.editingId ? { ...it, ...values } : it)))
    } else {
      setItems((prev) => [...prev, { id: `allergy-${Date.now()}`, ...values }])
    }
    closeModal()
  }

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id))

  return (
    <div className={styles.sectionBody}>
      <div className={styles.listHeader}>
        <Button icon={<PlusOutlined />} size="small" onClick={openAdd}>เพิ่ม</Button>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyList}>
          <FileTextOutlined style={{ fontSize: 32 }} />
          <p>ยังไม่มีการระบุข้อมูล</p>
          <p className={styles.emptyHint}>กด "เพิ่ม" เพื่อเพิ่มข้อมูล</p>
        </div>
      ) : (
        <div className={styles.allergyList}>
          <div className={styles.allergyHeader}>
            <span>วันที่รายงาน</span>
            <span>รหัสยา</span>
            <span>ชื่อยาที่แพ้</span>
            <span>การวินิจฉัยการแพ้ยา</span>
            <span>ความร้ายแรง</span>
            <span />
          </div>
          {items.map((item) => (
            <div key={item.id} className={styles.allergyRow}>
              <span>{item.reportDate ? item.reportDate.format('DD/MM/YYYY') : '—'}</span>
              <span>{item.drugCode || '—'}</span>
              <span>{item.drugName || '—'}</span>
              <span>{getLabel(ALLERGY_DIAGNOSIS_OPTIONS, item.allergyDiagnosis)}</span>
              <span>{getLabel(ALLERGY_SEVERITY_OPTIONS,   item.severity)}</span>
              <span className={styles.allergyActions}>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  size="small"
                  className={styles.actionEdit}
                  onClick={() => openEdit(item.id)}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => setDeleteId(item.id)}
                />
              </span>
            </div>
          ))}
        </div>
      )}

      <AllergyFormModal
        open={modalState.open}
        onClose={closeModal}
        onSave={handleSave}
        initialValues={editingItem}
      />
      <DeleteConfirmModal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => { removeItem(deleteId); setDeleteId(null) }}
      />
    </div>
  )
}

function TxHistoryFormModal({ open, onClose, onSave, initialValues }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (open) form.setFieldsValue(initialValues ?? {})
    else form.resetFields()
  }, [open, initialValues, form])

  const handleSave = async () => {
    const values = await form.validateFields()
    onSave(values)
  }

  return (
    <Modal
      title={initialValues ? 'แก้ไขข้อมูลประวัติการให้ยา' : 'เพิ่มข้อมูลประวัติการให้ยา'}
      open={open}
      onCancel={onClose}
      width="min(90vw, 860px)"
      centered
      destroyOnClose
      footer={[
        <Button key="close" onClick={onClose}>ปิด</Button>,
        <Button key="save" type="primary" onClick={handleSave}>บันทึก</Button>,
      ]}
    >
      <Form form={form} layout="vertical" requiredMark={requiredMarkAfter}>
        <div className={styles.row4}>
          <Form.Item label="ชื่อยา" name="drugName">
            <Input placeholder="ระบุชื่อยา" />
          </Form.Item>
          <Form.Item label="รหัสยา" name="drugCode">
            <Input placeholder="ระบุรหัสยา" />
          </Form.Item>
          <Form.Item label={<span style={{ whiteSpace: 'nowrap' }}>วันเวลาที่เริ่มการให้ยา</span>} name="startDate">
            <DatePicker format="DD/MM/YYYY" placeholder="เลือกวันที่" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label={<span style={{ whiteSpace: 'nowrap' }}>วันเวลาที่สิ้นสุดการให้ยา</span>} name="endDate">
            <DatePicker format="DD/MM/YYYY" placeholder="เลือกวันที่" style={{ width: '100%' }} />
          </Form.Item>
        </div>
        <Form.Item label="ขนาดและวิธีการให้ยา" name="dosage">
          <TextArea rows={3} placeholder="ระบุขนาดและวิธีการให้ยา" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

function SectionTxHistory() {
  const [items,      setItems]      = useState([])
  const [modalState, setModalState] = useState({ open: false, editingId: null })
  const [deleteId,   setDeleteId]   = useState(null)

  const editingItem = modalState.editingId
    ? items.find((it) => it.id === modalState.editingId) ?? null
    : null

  const openAdd    = ()  => setModalState({ open: true,  editingId: null })
  const openEdit   = (id) => setModalState({ open: true,  editingId: id  })
  const closeModal = ()  => setModalState({ open: false, editingId: null })

  const handleSave = (values) => {
    if (modalState.editingId) {
      setItems((prev) => prev.map((it) => (it.id === modalState.editingId ? { ...it, ...values } : it)))
    } else {
      setItems((prev) => [...prev, { id: `tx-${Date.now()}`, ...values }])
    }
    closeModal()
  }

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id))
  const fmt = (d) => (d ? d.format('DD/MM/YYYY') : '—')

  return (
    <div className={styles.sectionBody}>
      <div className={styles.listHeader}>
        <Button icon={<PlusOutlined />} size="small" onClick={openAdd}>เพิ่ม</Button>
      </div>

      {items.length === 0 ? (
        <div className={styles.emptyList}>
          <FileTextOutlined style={{ fontSize: 32 }} />
          <p>ยังไม่มีการระบุข้อมูล</p>
          <p className={styles.emptyHint}>กด "เพิ่ม" เพื่อเพิ่มข้อมูล</p>
        </div>
      ) : (
        <div className={styles.txHistoryList}>
          <div className={styles.txHistoryHeader}>
            <span>รหัสยา</span>
            <span>ชื่อยา</span>
            <span>วันเวลาที่เริ่มการให้ยา</span>
            <span>วันเวลาที่สิ้นสุดการให้ยา</span>
            <span />
          </div>
          {items.map((item) => (
            <div key={item.id} className={styles.txHistoryRow}>
              <span>{item.drugCode || '—'}</span>
              <span>{item.drugName  || '—'}</span>
              <span>{fmt(item.startDate)}</span>
              <span>{fmt(item.endDate)}</span>
              <span className={styles.allergyActions}>
                <Button type="text" icon={<EditOutlined />}   size="small" className={styles.actionEdit} onClick={() => openEdit(item.id)} />
                <Button type="text" danger icon={<DeleteOutlined />} size="small" onClick={() => setDeleteId(item.id)} />
              </span>
            </div>
          ))}
        </div>
      )}

      <TxHistoryFormModal
        open={modalState.open}
        onClose={closeModal}
        onSave={handleSave}
        initialValues={editingItem}
      />
      <DeleteConfirmModal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => { removeItem(deleteId); setDeleteId(null) }}
      />
    </div>
  )
}

function SectionUpload() {
  return (
    <div className={styles.sectionBody}>
      <Form.Item
        name="uploadFile"
        valuePropName="fileList"
        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
      >
        <Dragger
          accept=".pdf,.jpg,.jpeg,.png"
          multiple={false}
          className={styles.dragger}
        >
          <p><InboxOutlined className={styles.draggerIcon} /></p>
          <p className={styles.draggerText}>คลิกหรือลากไฟล์เอกสารการส่งตัวมาวางที่นี่</p>
          <p className={styles.draggerHint}>PDF, JPG, JPEG, PNG</p>
        </Dragger>
      </Form.Item>
    </div>
  )
}

function SectionDocuments() {
  const tabItems = [
    { key: 'lab',      label: 'อ่าน LAB'           },
    { key: 'ekg',      label: 'อ่าน EKG'           },
    { key: 'physical', label: 'ผลการตรวจร่างกาย'    },
    { key: 'ct',       label: 'ผลการตรวจ CT SCAN'  },
    { key: 'other',    label: 'อื่นๆ'               },
  ].map((tab) => ({
    ...tab,
    children: (
      <Form.Item
        name={`docs_${tab.key}`}
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        style={{ marginBottom: 0 }}
      >
        <Dragger
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          maxCount={10}
          beforeUpload={() => false}
          className={styles.dragger}
        >
          <p><InboxOutlined className={styles.draggerIcon} /></p>
          <p className={styles.draggerText}>คลิกหรือลากไฟล์มาวางที่นี่ (สูงสุด 10 ไฟล์)</p>
          <p className={styles.draggerHint}>PDF, JPG, JPEG, PNG</p>
        </Dragger>
      </Form.Item>
    ),
  }))

  return (
    <div className={styles.sectionBody}>
      <Tabs items={tabItems} size="small" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   COLLAPSE SECTION DEFINITIONS
   ══════════════════════════════════════════════════════════ */
const UPLOAD_LABEL = (
  <span>
    เอกสารการส่งตัว
    <span style={{ color: 'var(--color-error)', fontWeight: 600, fontSize: 13, marginLeft: 6 }}>
      ( จำเป็น )
    </span>
  </span>
)

const SECTION_DEFS = [
  { key: 'upload',    label: UPLOAD_LABEL,                    children: <SectionUpload />    },
  { key: 'personal',  label: 'ข้อมูลส่วนตัว',                children: <SectionPersonal />  },
  { key: 'treatment', label: 'ข้อมูลการส่งรักษา',             children: <SectionTreatment /> },
  { key: 'vitals',    label: 'สัญญาณชีพ',                    children: <SectionVitalSigns /> },
  { key: 'icd9',      label: 'บันทึกแพทย์ (ICD9CM)',          children: <SectionICD9 /> },
  { key: 'icd10',     label: 'ข้อมูลรายการวินิจฉัย (ICD10)', children: <SectionICD10 /> },
  { key: 'allergy',   label: 'ประวัติการแพ้ยา',               children: <SectionAllergy /> },
  { key: 'txHistory', label: 'ประวัติการให้ยา',                children: <SectionTxHistory /> },
  { key: 'documents', label: 'เอกสารเพิ่มเติม',               children: <SectionDocuments /> },
]

/* ══════════════════════════════════════════════════════════
   MAIN MODAL
   ══════════════════════════════════════════════════════════ */
// Field-to-section map — used by handleSubmit to expand sections that contain errors
// const SECTION_FIELD_MAP = {
//   personal:  ['nationalId','prefix','firstName','lastName','gender','dateOfBirth','hn','phone','patientCategory','patientType','houseNo','moo','road','subDistrict','district','province','nearbyLocation'],
//   treatment: ['referralDocNo','admissionDate','admissionTime','hospitalPhone','sourceHospitalName','sourceHospitalCode','destHospitalName','destHospitalCode','referralValidity','validUntilDate','treatmentRight','rightNumber','billTo','referralType','emergencyLevel','historyFamily','currentHistory','labResults','initialDiagnosis','treatmentGiven','referralReason','otherDetails','infectiousStatus'],
//   vitals:    ['vsDate','vsTime','painScore','systolicBP','diastolicBP','temperature','pulseRate','o2Saturation','respiratoryRate'],
// }

export default function ReferFormModal({ open, onClose, patientId }) {
  const [form] = Form.useForm()
  const [activeKeys,  setActiveKeys]  = useState(['personal'])
  const [submitting,  setSubmitting]  = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)

    // TODO: enable validation when backend is ready
    // try {
    //   await form.validateFields()
    // } catch ({ errorFields = [] }) {
    //   const errorFieldNames = errorFields.map(({ name }) => name[0])
    //   const sectionsToExpand = Object.entries(SECTION_FIELD_MAP)
    //     .filter(([, fields]) => fields.some((f) => errorFieldNames.includes(f)))
    //     .map(([key]) => key)
    //   if (sectionsToExpand.length > 0) {
    //     setActiveKeys((prev) => [...new Set([...prev, ...sectionsToExpand])])
    //     setTimeout(() => {
    //       document.querySelector('.ant-form-item-has-error')
    //         ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    //     }, 150)
    //   }
    //   setSubmitting(false)
    //   return
    // }

    // Placeholder: simulate API call (remove when wired to backend)
    setTimeout(() => setSubmitting(false), 5000)
  }

  useEffect(() => {
    if (open) {
      const patient = patientId
        ? (MOCK_PATIENTS[patientId] ?? Object.values(MOCK_PATIENTS)[0])
        : null
      form.setFieldsValue(patient ?? {})
      setActiveKeys(['personal'])
    }
    if (!open) form.resetFields()
  }, [open, patientId, form])

  return (
    <Modal
      title="แบบฟอร์มส่งต่อผู้ป่วย"
      open={open}
      onCancel={onClose}
      width="min(90vw, 960px)"
      footer={null}
      centered
      destroyOnClose
      styles={{
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 120px)',
          overflow: 'hidden',
        },
      }}
    >
      {/* ── Scrollable form body ── */}
      <div className={styles.scrollContent}>
        <Form
          form={form}
          layout="vertical"
          requiredMark={requiredMarkAfter}
        >
          <Collapse
            items={SECTION_DEFS}
            activeKey={activeKeys}
            onChange={setActiveKeys}
            expandIconPosition="end"
            className={styles.formCollapse}
          />
        </Form>
      </div>

      {/* ── Sticky action bar ── */}
      <div className={styles.actionBar}>
        <Button onClick={onClose} disabled={submitting}>ยกเลิก</Button>
        <div className={styles.actionRight}>
          <Button type="primary" loading={submitting} onClick={handleSubmit}>ส่ง</Button>
        </div>
      </div>
    </Modal>
  )
}
