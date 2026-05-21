import { useState } from 'react'
import { Modal, Button, Input } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from '../ReferPage.module.css'

const { TextArea } = Input

export default function RejectConfirmModal({ open, onCancel, onConfirm }) {
  const [reason, setReason] = useState('')

  const handleConfirm = () => {
    onConfirm(reason)
    setReason('')
  }

  const handleCancel = () => {
    setReason('')
    onCancel()
  }

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={480}
      centered
      destroyOnClose
      styles={{ mask: { background: 'rgba(0, 0, 0, 0.65)' } }}
    >
      <div className={styles.deleteModalBody}>
        <ExclamationCircleOutlined className={styles.deleteModalIcon} />
        <p className={styles.deleteModalText}>
          คุณต้องการปฏิเสธการรับผู้ป่วยรายนี้ใช่หรือไม่ ?
        </p>
        <TextArea
          placeholder="ระบุเหตุผลในการปฏิเสธ..."
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ width: '100%' }}
        />
        <div className={styles.deleteModalFooter}>
          <Button onClick={handleCancel}>ปิด</Button>
          <Button type="primary" danger onClick={handleConfirm}>
            ยืนยันการปฏิเสธ
          </Button>
        </div>
      </div>
    </Modal>
  )
}
