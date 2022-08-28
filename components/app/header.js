import React from 'react'
import { useAuth } from '../auth'
import Icon from '../reusable/icon'
import styles from '../../styles/layout.module.scss'

const AppHeader = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <nav className={`${styles.header} w-full fixed top-0 left-0 shadow-lg bg-secondary flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg z-10`}>
      <div className="w-full px-4 flex flex-wrap items-center justify-between text-white">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4">
            <Icon name="bentoMenu" />
          </button>
          <h4>Library</h4>
        </div>
        <div className={styles.header_user}>
          <div className={styles.header_icon}>{user.name.split(' ').map(i => i.charAt(0))}</div>
          <h4 className="mr-3">{user.name}</h4>
          <Icon name="arrowDown" />
        </div>
      </div>
    </nav>
  )
}

export default AppHeader;