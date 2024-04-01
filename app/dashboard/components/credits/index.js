import styles from './styles.module.css';

export default function Credits({ creditInfo }){
  console.log({ creditInfo });
  return (
    <div className={styles.credis}>
      <h1>Credits</h1>
    </div>
  )
}
