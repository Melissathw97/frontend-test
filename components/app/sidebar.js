import React from 'react'
import Link from 'next/link'
import Icon from '../reusable/icon'
import { useRouter } from 'next/router'
import { routes } from '../../constants/routes'
import styles from '../../styles/layout.module.scss'

const AppSidebar = ({ showSidebar }) => {
  const router = useRouter();

  return (
    <div>
      <div className={`${showSidebar && styles.expand} ${styles.sidebar_sm}`}>
        <div>
          <Link href="#">
            <div className={`${/\/overview/.test(router.pathname) && styles.active} ${styles.nav_icon} text-2xl w-full flex justify-center mb-1`}>
              <Icon name="overview" />
            </div>
          </Link>
          <Link href={routes.dashboard.index}>
            <div className={`${/\/dashboard/.test(router.pathname) && styles.active} ${styles.nav_icon} text-2xl w-full flex justify-center`}>
              <Icon name="workspace" />
            </div>
          </Link>
        </div>
        <div>
          <div className="text-2xl w-full flex justify-center mb-1">
            <Link href="#">
              <div className={`${/\/settings/.test(router.pathname) && styles.active} ${styles.nav_icon} text-2xl w-full flex justify-center`}>
                <Icon name="teamManagement" />
              </div>
            </Link>
          </div>
          <div className="text-2xl w-full flex justify-center">
            <Link href="#">
              <div className={`${/\/settings/.test(router.pathname) && styles.active} ${styles.nav_icon} text-2xl w-full flex justify-center`}>
                <Icon name="settings" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className={`${showSidebar && styles.expand} ${styles.sidebar_lg}`}>
        <p className="pb-10">
          Book Management
        </p>

        <Link href={routes.dashboard.index}>
          <a className={router.pathname === routes.dashboard.index && styles.active}>
            <Icon name="list" />
            Book List
          </a>
        </Link>
        <Link href={routes.dashboard.genre}>
          <a>
            <Icon name="genre" />
            Genre
          </a>
        </Link>
        <Link href={routes.dashboard.author}>
          <a>
            <Icon name="author" />
            Author
          </a>
        </Link>
      </div>
    </div>
  )
}

export default AppSidebar;