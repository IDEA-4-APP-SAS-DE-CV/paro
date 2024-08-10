'use client';
import { Suspense, useEffect, useState } from 'react';
import styles from './styles.module.css';
import LoanListUser from './loanListUser';
import { RevenueChartSkeleton } from '../../ui/skeletons';

export default function PopOver({ isVisiblePop, userId }) {
const [loans, setLoans] = useState(null);

const fetchLoans = async (e) => {
    try {
        const response = await fetch("/api/loans", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            userId
        })
        });

        console.log({ response });

        if(!response.ok){
            setError("Errro al obtener los prestamos");
        } else{
        const { rows } = await response.json();
        setLoans(rows)
            
        setError("");
        }
    } catch(err){
        console.log(`Error: ${err}`);
    }
    };

    useEffect(() => {
        fetchLoans();
    }, [])

    console.log({ loans });

  return (
    <div className={styles.pop}>
        <div className={styles.closer} onClick={isVisiblePop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
        <div className=''>
            <Suspense fallback={<RevenueChartSkeleton />}>
                {
                    loans && <LoanListUser loans={loans} /> || <div>El ususario no cuenta con Perstamos activos</div>
                }
            </Suspense>
        </div>
    </div>
  );
}
