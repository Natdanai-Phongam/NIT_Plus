import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import styles from '../ReferPage.module.css'

export default function DeleteConfirmModal({ open, onCancel, onConfirm }) {
  return (
    <Modal open={open} onCancel={onCancel} footer={null} width={420} centered destroyOnClose
      styles={{ mask: { background: 'rgba(0, 0, 0, 0.65)' } }}
    >
      <div className={styles.deleteModalBody}>
        <ExclamationCircleOutlined className={styles.deleteModalIcon} />
        <p className={styles.deleteModalText}>คุณต้องการที่จะลบข้อมูลชุดนี้ใช่หรือไม่ ?</p>
        <div className={styles.deleteModalFooter}>
          <Button onClick={onCancel}>ปิด</Button>
          <Button type="primary" onClick={onConfirm}>ตกลง</Button>
        </div>
      </div>
    </Modal>
  )
}
