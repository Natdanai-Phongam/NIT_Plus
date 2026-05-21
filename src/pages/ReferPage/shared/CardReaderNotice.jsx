import { DownloadOutlined } from '@ant-design/icons'
import styles from './CardReaderNotice.module.css'

export default function CardReaderNotice() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>
        หากท่านต้องการใช้งานฟีเจอร์อ่านข้อมูลจากบัตรประชาชน กรุณาติดตั้งโปรแกรมเสริม
        <button
          type="button"
          className={styles.link}
          onClick={() => { /* TODO: trigger download */ }}
        >
          <DownloadOutlined style={{ fontSize: 12 }} />
          ดาวน์โหลดที่นี่
        </button>
      </span>
    </div>
  )
}
