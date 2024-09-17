import styles from './challenges.module.css';
import { fetchUserById } from '../../../lib/data';

export default async function Challenges ({ params }) {
    const user = await fetchUserById(params.user);
    
    return <div className={styles.challenges}>Retos para incrementa la linea de credito</div>
}