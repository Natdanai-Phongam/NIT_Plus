import styles from './PageLayout.module.css'

/**
 * @param {object}   props
 * @param {string}   props.title        - Page title
 * @param {Array}    props.breadcrumb   - [{label, href?}]
 * @param {React.ReactNode} props.children
 */
export default function PageLayout({
  title = 'หน้าหลัก',
  breadcrumb = [{ label: 'Home', href: '/' }, { label: 'หน้าหลัก' }],
  children,
}) {
  return (
    <div className={styles.wrapper}>

      {/* Page header */}
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          {breadcrumb.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <span className={styles.breadcrumbSep}>/</span>}
              {crumb.href ? (
                <a className={styles.breadcrumbLink} href={crumb.href}>
                  {crumb.label}
                </a>
              ) : (
                <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Content card */}
      <div className={styles.card}>
        <div className={styles.cardBody}>
          {children ?? <EmptyState />}
        </div>
      </div>

    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect
          x="6" y="10" width="44" height="36" rx="3"
          stroke="#BFBFBF" strokeWidth="2.5"
        />
        <line x1="6"  y1="20" x2="50" y2="20" stroke="#BFBFBF" strokeWidth="2.5" />
        <line x1="18" y1="10" x2="18" y2="20" stroke="#BFBFBF" strokeWidth="2.5" />
        <line x1="38" y1="10" x2="38" y2="20" stroke="#BFBFBF" strokeWidth="2.5" />
      </svg>
      <p className={styles.emptyText}>พื้นที่สำหรับเนื้อหา</p>
    </div>
  )
}
