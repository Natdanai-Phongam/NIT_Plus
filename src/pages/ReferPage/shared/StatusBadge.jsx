import styles from '../ReferPage.module.css'
import { STATUS } from '../mockData'

export default function StatusBadge({ statusKey }) {
  const cfg = STATUS[statusKey] ?? STATUS.other
  return (
    <span className={`${styles.statusBadge} ${styles[cfg.cls]}`}>
      {cfg.label.split('\n').map((line, i) => (
        <span key={i} style={i > 0 ? { display: 'block' } : undefined}>{line}</span>
      ))}
    </span>
  )
}
