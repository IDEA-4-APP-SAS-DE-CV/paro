"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import EmptyState from "./components/emptyState";
import Credits from './components/credits'
import Calculator from './components/calculator'
import { delete_cookie, get_cookie } from '../../utils/cookies';
import currency from '../../utils/currency';
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [creditInfo , setcreditInfo] = useState(null);
  const [activeCal, setActiveCal] = useState(false);
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const data = get_cookie('token');
    const userInfo = jwtDecode(data);
    setUser(userInfo);
    getLoan(userInfo);
  }, [])

  const getLoan = async (userInfo) => {
    try{
      const response = await fetch(`/api/credit-line?userId=${userInfo.id}&creditLine=${userInfo.creditLine}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok){
        setError("Se produjo un error al tratar de obtener la linea de credito.")
        setLoader(false);
      } else {
        const res = await response.json();
        setLoader(false);
        setcreditInfo(res);
      }
    } catch(err){
      console.log(`${err}`)
    }
  }

  const buildLoan = () => {
    setActiveCal(true);
    // Al terminar de configurar Loan con un maximo de 1500 de credito disponible
    //Invocar applyLoan para registrarlo
  }



  const applyLoan = async (loans) => {
    setActiveCal(false);
    const body = {
      userId: user.id,
      creditLine: user.creditLine,
      loans,
    }
    
    try {
      const response = await fetch("/api/credit-line", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok){
        setError("Se Produjo un error al tratar de crear la linea de credito.")
      } else {
        const res = await response.json();
        setLoader(false);
        setcreditInfo(res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log({ user });
  const firstLetter = user?.name.slice(0, 1);

  return <div className={styles.dashboard}>
    {
      activeCal && <Calculator applyLoan={applyLoan} />
    }
    <div className={styles.left}>
      <div className={styles.user}>
        <div className={styles.photo}>
          <div className={styles.circle}>{firstLetter}</div>
        </div>
        <div className={styles.data}>
          <div className={styles.name}>{user?.name} {user?.lastname}</div>
          <div className={styles.mail}>{user?.mail}</div>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.topControls}>
          <ul className={styles.listControls}>
            <li className={styles.item}>
              <span className="material-symbols-outlined">edit</span>
              <span className={styles.label}>Actualizar datos</span>
            </li>
            <li className={styles.item}>
            <span className="material-symbols-outlined">receipt_long</span>
              <span className={styles.label}>Estado de cuenta</span>
            </li>
          </ul>
        </div>
        <div className={styles.bottomControls}>
          <p className={styles.bottomDisclaimer}>
            Recuerda que debes realizar tus pagos a <br />
            Banco: <span className={styles.labels}><b>SPT</b></span> <br />
            cuenta: <span className={styles.labels}><b>1234567892345674</b></span> <br />
            Nombre: <span className={styles.labels}><b>Paro SA de CV</b></span>
          </p>
          <button onClick={() => {
            delete_cookie('token');
            window.location.href = '/login';
          }}>Salir</button>
        </div>
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/images/logo_paro.png"
            width={160}
            height={50}
            alt="Picture of the author"
          />
        </div>
        <div className={styles.info}>
        Tu <span className={styles.labels}>‘paro</span> al día de hoy puede ser de hasta: <span className={styles.labels}>{
          currency(creditInfo?.newCreditLineDone?.availableBalance)
        }</span>
        </div>
      </div>
      <main className={styles.mainContent}>
        {
          creditInfo && <Credits creditInfo={creditInfo} /> ||
            loader && <span className={styles.loader}></span> || <EmptyState buildLoan={buildLoan} setLoader={setLoader} />
        }  
      </main>
    </div>
  </div>
}

export default Dashboard;
