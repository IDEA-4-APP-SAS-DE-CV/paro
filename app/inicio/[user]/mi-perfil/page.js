import styles from './profile.module.css';
import { fetchUserById } from '../../../lib/data';

export default async function ProfilePage ({ params }) {
    const user = await fetchUserById(params.user);
    console.log({ user });
    
    return <div className={styles.profile}></div>
}