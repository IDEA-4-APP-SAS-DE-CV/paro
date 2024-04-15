"use client";
import { useState, useEffect } from 'react';
import { get_cookie } from '../../utils/cookies';
import { jwtDecode } from "jwt-decode";
import Image from 'next/image';
import Logo from '/public/images/logo_paro.png';
import { useRouter } from 'next/navigation';
import UserList from './components/userList';
import Metrics from './components/metrics';
import CreditLineList from './components/creditlineList';
import LayoutPage from './components/Layout';

import styles from './styles.module.css';

function Admin() {
  const [admin, setAdmin] = useState(null);
  const [viewUsers, setViewUsers] = useState(false);
  const [viewLoans, setViewLoans] = useState(false);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = get_cookie('token');
    const adminInfo = jwtDecode(data);
    if(adminInfo?.role !== 'admin'){
      router.push("/dashboard");
    }
    setAdmin(adminInfo);
  }, [])

  
  return <div className={styles.admin}>
  {
    !admin && <div className={styles.load}>
      <div className={styles.loader}></div>
      <div>Cargando...</div>
    </div>
  }

    <div className={styles.Admin}></div>
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src={
          Logo
        } width="110" height="36" alt="Paro" />
      </div>
      <div className={styles.nav}>
        <ul className={styles.navigator}>
          <li className={styles.optionNav} onClick={() => setViewUsers(true)}>
            Usuarios <span className="material-symbols-outlined">group</span>
            </li>
          <li className={styles.optionNav}>
            Cerrar sesión <span className="material-symbols-outlined">power_settings_new</span>
          </li>
        </ul>
      </div>
    </div>
    <div className={styles.main}>
      <div className={styles.nav}>controles</div>
      <div className={styles.content}>
          <Metrics />
          {
            viewUsers && <LayoutPage 
              viewUsers={viewUsers}
              setViewUsers={setViewUsers} 
              viewLoans={viewLoans}
              setViewLoans={setViewLoans}
            >
              <UserList setViewLoans={setViewLoans} setSelected={setSelected} />
            </LayoutPage>
          }
          {
            viewLoans && <LayoutPage
              viewUsers={viewUsers}
              setViewUsers={setViewUsers} 
              viewLoans={viewLoans}
              setViewLoans={setViewLoans}
            >
              <CreditLineList selected={selected} />
            </LayoutPage>
          }
          
          
      </div>
    </div>
  </div>
}

export default Admin;
