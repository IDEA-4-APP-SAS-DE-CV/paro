 'use client';
import { fetchLoansByUser } from '../../../lib/data';
import styles from './index.module.css';

export default function DetailCredit({ user, creditLine, loans}) {
    
    // const loans = await fetchLoansByUser(params.user);
    const { 
        avilablebalance,
        id,
        maxamount,
        status,
        user_id,
    } = creditLine[0]

    return (
        <div className={styles.detailCredit}>
            <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Amount</th>
                </tr>
            </thead>
                <tbody>
            {
                loans.map((loan, key) => {
                    const { amount, createdat} = loan;
                    return <tr key={key}>
                        <td>{createdat}</td>
                        <td>Transferencia por préstamo a la
                        cuenta *******5528</td>
                        <td>{amount}</td>
                    </tr>
                })
            }
                </tbody>
            </table>
        </div>
    )
}