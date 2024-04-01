import { useState } from 'react';
import styles from './styles.module.css';

export default function Calculator({applyLoan}){
  const [amount, setAmount] = useState(0);
  const [over, setOver] = useState(false);
  const [next, setNext] = useState(false);
  const [options, setOptions] = useState(0);
  const maxAllowAmount = 1500;
  const installments = [3, 6, 9, 12];
  const amountWithInteres = amount * 1.10;

  const handleAmount = (value) => {
    setAmount(value)
    if(parseInt(value) > maxAllowAmount || value < 100){
      setOver(true);
    } else {
      setOver(false);
      setNext(false);
    }
  }
  
  const handleOptions = () => {
    setNext(true)
    if(next && options) {
      const optionInstallments = new Array(options).fill('');
      const installment = optionInstallments.map((val, key) => {
        return {
          id: key+1,
          amount: (amountWithInteres / options).toFixed(2),
          tna: 10,
        }
      });
      
        applyLoan({
          amount,
          loanList: installment,
        });
        
    }
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.containerButtons}>
        <div className={styles.top}>
          <h3 className={styles.title}>Solicitar `Paro</h3>
          <div className={styles.amount}>
            <span className={styles.sign}>$</span>
            <div className={styles.inputAmount}>
              <input 
                type="text" 
                className={styles.boxAmount} 
                value={amount} 
                onChange={(e) => handleAmount(e.target.value)}
                maxLength={7}
                pattern="[0-9]{7}"
              />
            </div>
          </div>
          <div className={over && `${styles.over} ${styles.maxAmount}` || styles.maxAmount}>
            <span>Ingresa un monto entre $1 y $1,500.00</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.options}>
            {
              !over && next && installments.map((val, key) => {
                return <div key={key} className={styles.option} onClick={() => setOptions(val)}>
                  <div className={styles.switches}>
                     <input className={styles.optionButton} name="option" type='radio' />
                     <span>{val} pago de</span>
                  </div>
                  <div>
                    <span>$ {(amountWithInteres / val).toFixed(2)}</span>
                  </div>
                </div>
              })
            }
          </div>
          <div className={styles.containerButon}>
            {
              over && <button disabled>Siguiente</button>
              || <button onClick={handleOptions}>Siguiente</button>
            }
            
          </div>
        </div>

      </div>
    </div>
  )
}
