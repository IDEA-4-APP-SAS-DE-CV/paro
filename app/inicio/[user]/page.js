import { Link, Button } from "@nextui-org/react";
import { fetchCreditLine } from '../../lib/data';
import styles from './user.module.css';
import { 
    ArrowLeftEndOnRectangleIcon
 } from '@heroicons/react/24/outline';
import EmptyState from '../../icons/EmptyState';
import { formatCurrency } from '../../lib/utils';
  
export default async function UserPage({ params }){

    const creditLine = await fetchCreditLine(params.user);
    let status = null;
    let availableBalance = 0;
    if(creditLine && creditLine.length) {
        const {
            id,
            user_id,
            maxamount,
            createdat,
          } = creditLine[0];
          status = creditLine[0].status;
          availableBalance = creditLine[0].avilablebalance
    } 


    return<div className={styles.creditLines}>
        <div className={styles.nav}>
            <div>
                <div className={styles.logo}>Paro</div>
                <div className={styles.menu}>
                    <Link className={styles.link} href="#" color="primary">
                        Mis prestamos
                    </Link>
                    <Link className={styles.link} href="#" color="primary">
                        Mi Perfil
                    </Link>
                </div>
            </div>
            <div className={styles.profile}>
                <Button color="danger" variant="bordered" startContent={<ArrowLeftEndOnRectangleIcon />}>
                    Cerrar sesión
                </Button>
            </div>
        </div>
        <div className={styles.content}>
            {
                creditLine && creditLine.length && 
                <div>
                    <div className={styles.head}>Header</div>
                    {
                        status === 'pending' &&  
                            <div className={styles.empty}>
                                <br />
                                <br />
                                <h1 className={styles.title}>Linea de credito Pendiente</h1>
                                <p>Tienes una linea de credito que esta pendiente de aprobar </p>

                                <p>Pero no te preocupes por que ya tienes un Paro de <b>{formatCurrency(availableBalance)}</b> </p>
                                <p>y te notificaremos cuando esten en tu cuenta.</p>
                                <EmptyState />  
                            </div> || <div>Usuario con informacion</div>
                    }
                </div> ||
                <div className={styles.empty}>
                <br />
                <br />
                <h1 className={styles.title}>Sin línea de crédito</h1>
                <p>Aun no tenemos una línea de credito para ti..., ¿deseas solicitar un Paro?</p>
                <br /><br />
                <Button color="primary">Solicitar un Paro</Button>  
                <EmptyState />  
            </div>
            }
        </div>
    </div>
}