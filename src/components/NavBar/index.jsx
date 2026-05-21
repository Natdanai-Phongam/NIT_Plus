import { Dropdown } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import styles from './NavBar.module.css'
import logoSrc from '/assets/logo.png'

/* ── Dropdown menu items ── */
const newsBlogItems = {
  items: [
    { key: 'news', label: <Link to="/news">ข่าวสาร</Link> },
    { key: 'blog', label: <Link to="/blog">บทความ</Link>  },
  ],
}

const systemItems = {
  items: [
    { key: 'users',    label: <Link to="/system/users">จัดการผู้ใช้งาน</Link>   },
    { key: 'settings', label: <Link to="/system/settings">ตั้งค่าระบบ</Link>    },
    { key: 'roles',    label: <Link to="/system/roles">สิทธิ์การเข้าถึง</Link>  },
  ],
}

const referItems = {
  items: [
    { key: 'refer-out', label: <Link to="/refer/out">ระบบส่งต่อผู้ป่วย (ขาออก)</Link> },
    { key: 'refer-in',  label: <Link to="/refer/in">ระบบส่งต่อผู้ป่วย (ขาเข้า)</Link>  },
  ],
}

/* ── Logout icon ── */
function LogoutIcon() {
  return (
    <svg
      className={styles.logoutIcon}
      width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

/* ── NavBar ── */
export default function NavBar() {
  const { pathname } = useLocation()

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + '/')

  return (
    <nav className={styles.topnav}>

      {/* Brand block */}
      <Link className={styles.brand} to="/">
        <img className={styles.logo} src={logoSrc} alt="สถาบันประสาทวิทยา" />
        <span className={styles.brandLabel}>NIT</span>
      </Link>

      {/* Main menu */}
      <ul className={styles.menu}>

        <li>
          <Link
            to="/"
            className={`${styles.item} ${pathname === '/' ? styles.itemActive : ''}`}
          >
            Home
          </Link>
        </li>

        <Dropdown menu={newsBlogItems} placement="bottomLeft" trigger={['click']}>
          <li className={`${styles.item} ${isActive('/news') || isActive('/blog') ? styles.itemActive : ''}`}>
            News / Blog
            <span className={styles.caret} />
          </li>
        </Dropdown>

        <Dropdown menu={systemItems} placement="bottomLeft" trigger={['click']}>
          <li className={`${styles.item} ${isActive('/system') ? styles.itemActive : ''}`}>
            System
            <span className={styles.caret} />
          </li>
        </Dropdown>

        <Dropdown menu={referItems} placement="bottomLeft" trigger={['click']}>
          <li className={`${styles.item} ${isActive('/refer') ? styles.itemActive : ''}`}>
            ระบบ Refer ผู้ป่วย
            <span className={styles.caret} />
          </li>
        </Dropdown>

      </ul>

      {/* Right: Logout */}
      <div className={styles.right}>
        <button className={styles.logout} type="button">
          <LogoutIcon />
          Logout
        </button>
      </div>

    </nav>
  )
}
