import { Link, Button } from "@nextui-org/react";
import { fetchCreditLine, fetchUserById, fetchLoansByUser } from '../../lib/data';
import styles from './user.module.css';
import { Progress } from "@nextui-org/react";
import { 
    ArrowLeftEndOnRectangleIcon
 } from '@heroicons/react/24/outline';
import EmptyState from '../../icons/EmptyState';
import { formatCurrency, formatDateToLocal } from '../../lib/utils';
import DetailCredit from '../components/detailCredit';
import Simulator from "../components/simulator";
import CloseSession from '../components/closeSession';
  
export default async function UserPage({ params }){
    const user = await fetchUserById(params.user);
    const creditLine = await fetchCreditLine(params.user);
    const loans = await fetchLoansByUser(params.user);
    let status = null;
    let availableBalance = 0;
    let maxAmount = 0;
    if(creditLine && creditLine.length) {
        const {
            id,
            user_id,
            maxamount,
            createdat,
          } = creditLine[0];
          status = creditLine[0].status;
          availableBalance = creditLine[0].avilablebalance
          maxAmount = maxamount;
    }  

    const userId = user[0]?.id;


    console.log({ maxAmount, availableBalance })

    return<div className={styles.creditLines}>
        <div className={styles.nav}>
            <div>
                <div className={styles.logo}>Paro</div>
                <div className={styles.menu}>
                    <Link className={styles.link} href={`/inicio/${userId}/mi-perfil`} color="primary">
                        Mi Perfil
                    </Link>
                    <Link className={styles.link} href={`/inicio/${userId}/mis-pagos`} color="primary">
                        Mis Pagos
                    </Link>
                </div>
            </div>
            <div className={styles.profile}>
                <CloseSession />
            </div>
        </div>
        <div className={styles.content}>
            {
                creditLine && creditLine.length && 
                <div className={styles.contentCredit}>
                    <div className={styles.head}>
                        <Progress
                            label="Monto Disponible"
                            size="md"
                            value={availableBalance}
                            maxValue={maxAmount}
                            color="primary"
                            formatOptions={{style: "currency", currency: "MXN"}}
                            showValueLabel={true}
                            className="max-w-md"
                        />
                        <div>
                        de <b>{formatCurrency(maxAmount)}</b>
                        </div>
                    </div>
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
                            </div> || <DetailCredit user={user} creditLine={creditLine} loans={loans} />
                    }
                </div> ||
                <div className={styles.empty}>
                <br />
                <br />
                <h1 className={styles.title}>Sin línea de crédito</h1>
                <p>Aun no tenemos una línea de credito para ti..., ¿deseas solicitar un Paro?</p>
                <p>Crear tu cuenta y tu linea de crédito inicial puede ser de hasta <b>$3,000</b></p>
                <br /><br />
                <Simulator user={user} creditLine={creditLine} />
                <EmptyState />  
            </div>
            }
        </div>
    </div>
}