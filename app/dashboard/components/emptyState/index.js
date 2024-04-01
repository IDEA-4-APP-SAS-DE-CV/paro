import Image from 'next/image';
import styles from './styles.module.css';

export default function EmptyState({ buildLoan, setLoader }){
  return (
    <div className={styles.emptyState}>
      <Image
        src="/images/emptyLoans.jpg"
        width={400}
        height={400}
        alt="Picture of the author"
      />
      <div className={styles.content}>
        <h3 className={styles.title}>Aun no solicitas ningun <span className={styles.labels}>`Paro</span></h3>
        <p className={styles.subTitle}>Pide un <span className={styles.labels}>`Paro</span> por hasta <b>$1,500.00</b></p>
        <button onClick={() => {
          setLoader(true);
          buildLoan();
        }}>Solicitar Prestamo</button>
      </div>
    </div>
  )
}
