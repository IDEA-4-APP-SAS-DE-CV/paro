import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import currency from '..//../../../utils/currency';
import DataTable, { createTheme }  from 'react-data-table-component';
import { format } from "@formkit/tempo"

export default function CreditLineList({selected}){
  const [cl, setCl] = useState(null);
  const [statusSelected, setStatusSelected] = useState('');

  const handleStatusLoan = (value) => {
    setStatusSelected(value);
  }

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



  const getColorStatus = (status) => {
    const color = status === 'pending' ? '#ea7321' : '#18e122';
    return color;
  }

  const columns = [
    {
      name: 'id',
      selector: row => row.id,
    },  
    {
      name: 'Monto',
      selector: row => row.amount,
    },
    {
      name: 'TNA',
      selector: row => row.tna,
    },
    {
      name: 'Estatus',
      selector: row => <select  
        onChange={(e) => setStatusSelected(e.target.value)}
        value={row.status}
        style={{ 
          background: getColorStatus(row.status)
        }}
        className={styles.select}
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>,
    }
  ]

  const getLoans = async () => {
    try{
      const response = await fetch(`/api/credit-line?userId=${selected._id}&creditLine=${selected.creditLine}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok){
        // setError("Se produjo un error al tratar de obtener la linea de credito.")
        // setLoader(false);
      } else {
        const res = await response.json();
        //setcreditInfo(res);
        setCl(res.newCreditLineDone);
      }
    } catch(err){
      console.log(`${err}`)
    }
  }

  useEffect(() => {
    getLoans();
  }, [selected.creditLine])

  console.log({ cl });
 return <div className={styles.creditLinesList}>
  <div className={styles.head}>
    <div className={styles.field}>
      <p className={styles.pLine}>
        <span className="material-symbols-outlined">manage_accounts</span>
        {selected.name} {selected.lastname}</p>
      <p className={styles.sLine}>
        <span class="material-symbols-outlined">alternate_email</span>
        {selected.mail}
      </p>
    </div>
    <div className={styles.field}>
      <p className={styles.pLine}>
        <span class="material-symbols-outlined">account_balance_wallet</span>
        {selected.creditLine}
      </p>
      <p className={styles.sLine}>
        <span class="material-symbols-outlined">phone_iphone</span>
        {selected.phone}
      </p>
    </div>
    <div className={styles.field}>
      <p className={styles.pLine}>Monto Disponible</p>
      <p className={styles.sLine}>{currency(cl?.availableBalance)}</p>
    </div>
  </div>
  <div className={styles.contentList}>
    {
      cl?.loans?.map((loans, key) => {
        return (
          <div className={styles.wrapList} key={key}>
            <div className={styles.amountLoan}>
              <p>{`Paro Solicitado: ${currency(loans.amount)}`}</p>
              <p className={styles.date}>
                Fecha: {format(loans.createdAt, "full", "es")} 
              </p>
            </div>
            <>
              <DataTable
                columns={columns}
                data={loans.loanList}
                theme="solarized"
                customStyles={customStyles} 
              />
            </>
          </div>
        )
      })
      
    }
   
  </div>
 </div>
}
