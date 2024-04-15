import styles from './styles.module.css';

export default function LayoutPage({ children, viewLoans, setViewLoans, viewUsers, setViewUsers}){

  const handlerClicks = (event, viewLoans, viewUsers) => {
    event.stopPropagation();  
    if(viewUsers && viewLoans) setViewLoans(false);
    if(viewUsers && !viewLoans) setViewUsers(false);
  }
  
  return <div className={styles.layout}>
    <div className={styles.return} onClick={(event) => handlerClicks(event, viewLoans, viewUsers)}>
      <span className="material-symbols-outlined" >arrow_back</span>
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
}
