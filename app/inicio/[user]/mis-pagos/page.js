import styles from './profile.module.css';
import { fetchUserById } from '../../../lib/data';

export default async function PaymentsPage ({ params }) {
    const user = await fetchUserById(params.user);
    
    return <div className={styles.profile}>Mis Pagos</div>
}