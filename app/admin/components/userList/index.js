import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import DataTable, { createTheme }  from 'react-data-table-component';
import Link from 'next/link';

export default function UserList({setViewLoans, setSelected}){
  const [users, setUsers] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getUsers()
  }, [1])

  const customStyles = {
    rows: {
      style: {
        minHeight: '50px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        fontWeight: '700',
        fontSize: '16px',
        color: '#000'
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };

  createTheme('solarized', {
    text: {
      primary: '#000',
      secondary: '#000',
    },
    background: {
      default: '#fff',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#9c9c9c',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name + ' ' + row.lastname,
    },
    {
      name: 'Telefono',
      selector: row => row.phone,
    },
    {
      name: 'Mail',
      selector: row => row.mail, 
    },
    {
      name: 'INE',
      selector: row => <Link target="_blank" href={`${row.ineURL}`}><span className="material-symbols-outlined">
      id_card</span></Link>
    },
    {
      name: 'Cuenta',
      selector: row => <Link target="_blank" href={`${row.accountStatusURL}`}><span className="material-symbols-outlined">
      account_balance</span></Link>
    },
    {
      name: 'Domicilio',
      selector: row => <Link target="_blank" href={`${row.addressFileURL}`}><span className="material-symbols-outlined">
      home</span></Link>
    },
    {
      name: 'Creditos',
      selector: row => <p onClick={() => { 
          setViewLoans(true);
          setSelected(row);
        }
      } ><span className="material-symbols-outlined">
      credit_card_gear</span></p>
    }
  ]

  const getUsers = async (userInfo) => {
    try{
      const response = await fetch('/api/users', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok){
        setLoader(false);
      } else {
        const res = await response.json();
        setLoader(false);
        setUsers(res);
      }
    } catch(err){ console.log(`${err}`)}
  }

  const getCreditUser = async (userId) => {
    console.log('Abre panel de listado de creditos por usuario');
  }

 return <div className={styles.userList}>
  <div className={styles.head}>Controles</div>
  <div className={styles.list}>
    {
      loader && <div className={styles.load}>
        <div className={styles.loader}></div>
        <p>Cargando listado de usuarios</p>
      </div>
    }
    {
      users && users.usersList && <DataTable
			columns={columns}
			data={users.usersList}
      theme="solarized"
      customStyles={customStyles} 
		/>
    }
    
  </div>
 </div>
}
