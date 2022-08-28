import React, { useState } from 'react'
import { useAuth } from '../auth'
import Icon from '../reusable/icon'
import { useRouter } from 'next/router'
import { userLogout } from '../../api/auth'
import { routes } from '../../constants/routes'
import styles from '../../styles/layout.module.scss'

const AppHeader = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const userLogoutHandler = () => {
    userLogout().then(() => {
      router.push(routes.home)
    })
  }

  return (
    <nav className={`${styles.header} w-full fixed top-0 left-0 shadow-lg bg-secondary flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg z-10`}>
      <div className="w-full px-4 flex flex-wrap items-center justify-between text-white">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4">
            <Icon name="bentoMenu" />
          </button>
          <h4>Library</h4>
        </div>
        <div>
          <div className={`select-none ${styles.header_user}`} onClick={toggleDropdown}>
            <div className={styles.header_icon}>{user.name.split(' ').map(i => i.charAt(0))}</div>
            <h4 className="mr-3">{user.name}</h4>
            <Icon name="arrowDown" />
          </div>

          <div className={`origin-top-right absolute right-4 top-14 mt-2 w-44 bg-white rounded-md shadow-lg transition ease-${showDropdown ? 'out' : 'in'} duration-${showDropdown ? '100' : '75'} transform opacity-${showDropdown ? '100' : '0'} scale-${showDropdown ? '100' : '95'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
              <a
                href="#"
                className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                My Profile
              </a>
              <button
                type="submit"
                className="text-gray-700 block w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
                onClick={userLogoutHandler}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppHeader;