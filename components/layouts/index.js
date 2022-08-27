import Head from "next/head"
import { useState } from "react"
import AppHeader from "../app/header"
import AppSidebar from "../app/sidebar"
import styles from '../../styles/layout.module.scss'
import { AuthProvider, ProtectRoute } from '../auth/admin/auth'

export const Auth = ({ children }) => {
  return (
    <>
      <Head>
        <title>Account | Griter</title>
      </Head>
      <div className="bg-secondary min-h-screen flex-center px-5">
        {children}
      </div>
    </>
  )
}

export const App = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <AuthProvider>
      <ProtectRoute>
        <Head>
          <title>Griter</title>
        </Head>
        <div className={styles.container}>
          <AppHeader toggleSidebar={toggleSidebar} />
          <AppSidebar showSidebar={showSidebar} />
          <main className={`py-5 md:py-8 lg:py-10 min-h-screen w-full ${styles.main_bg}`}>
            {children}
          </main>
        </div>
      </ProtectRoute>
    </AuthProvider>
  )
}