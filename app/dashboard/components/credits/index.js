import styles from './styles.module.css';
import currency from '../../../../utils/currency';

export default function Credits({ creditInfo }){
  const { newCreditLineDone } = creditInfo;
  const { creditLine, loans, status, availableBalance } = newCreditLineDone;
  const amount = loans[0].amount;
  const interes = amount * 0.10; 
  const totalAmount = parseFloat(amount) + parseFloat(interes);
  console.log({ totalAmount });
  return (
    <div className={styles.credits}>
      {
        status === 'pending' && <div className={styles.preApproved}>
            <h3>Tu linea de crédito <span className='labels'>{creditLine}</span> ha sido creada</h3>
            <p>y esta pendiente de aprobación</p>
          </div> || 
        <div className={styles.creditDetail}>
          <h3 className={styles.title}>Tu paro al dia de hoy es de <span className='labels'>{currency(availableBalance)}</span></h3>
          <table className={styles.table}>
            <tr className={styles.headerTable}>
              <td className={styles.headtd}>Fecha</td>
              <td className={styles.headtd}>Concepto</td>
              <td className={styles.headtd}>Monto</td>
              <td className={styles.headtd}>Cuenta</td>
            </tr>
            <tr className={styles.cols}>
              <td className={styles.headValues}>Fecha</td>
              <td className={styles.headValues}>Interes por prestamo</td>
              <td className={styles.headValues}>{currency(interes)}</td>
              <td className={styles.headValues}>{currency(totalAmount)}</td>
            </tr>
            <tr className={styles.cols}>
              <td className={styles.headValues}>Fecha</td>
              <td className={styles.headValues}>Transferencia por prestamo a la cuenta **********2344</td>
              <td className={styles.headValues}>{currency(amount)}</td>
              <td className={styles.headValues}>Cuenta</td>
            </tr>
          </table>
          <div className={styles.actions}>
            <div className={styles.containerButton}>
              <button>Solicitar otro `Paro</button>
            </div>
            <div className={styles.containerButton}>
              <button>Enviar comprobante de pago</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
