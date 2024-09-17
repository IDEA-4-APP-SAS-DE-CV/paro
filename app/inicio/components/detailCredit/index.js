 'use client';
import styles from './index.module.css';
import Simulator from '../simulator';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency, formatDateToLocal } from '../../../lib/utils';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


export default function DetailCredit({ user, creditLine, loans}) {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // const loans = await fetchLoansByUser(params.user);
    const { 
        avilablebalance,
        id,
        maxamount,
        status,
        user_id,
    } = creditLine[0]

    const handleRedirectChanllenges = () => {
        router.push(`/inicio/${user[0].id}/challenges`)
    }

    const formatStatus = (status) => {
        switch (status) {
            case 'approved':
                    
                break;
        
            default:
                return status;
                break;
        }
    }

    return (
        <div className={styles.detailCredit}>
            {
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Balance disponible {formatCurrency(avilablebalance)}</ModalHeader>
                        <ModalBody>
                            <p> 
                                Por el momento no podemos otrogarte otro <b>Paro</b> ya que has agotado el limite disponible de tu linea de crédito
                                <br />pero podemos intentar incrementar tu línea de crédito cumpliendo con algunos retos. 
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                            Cerrar
                            </Button>
                            <Button color="primary" onPress={handleRedirectChanllenges}>
                                Ver retos
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            }
            <table className={styles.detaillistLoans}>
            <thead>
                <tr>
                    <th className={styles.label}>Fecha</th>
                    <th className={styles.label}>Concepto</th>
                    <th className={styles.label}>Estatus</th>
                    <th className={styles.label}>Amount</th>
                </tr>
            </thead>
                <tbody>
            {
                loans.map((loan, key) => {
                    const { amount, createdat, status} = loan;
                    return <tr key={key}>
                        <td className={styles.value}>{formatDateToLocal(createdat)}</td>
                        <td className={styles.value}>Deposito a cuenta **** xxxx</td>
                        <td className={styles.value}>{status}</td>
                        <td className={styles.value}>{formatCurrency(amount)}</td>
                    </tr>
                })
            }
                </tbody>
            </table>
            <br />
            {
                creditLine[0].avilablebalance <= 1 && <Button onPress={onOpen}>Solicitar un Paro</Button> || <Simulator user={user} creditLine={creditLine} loans={loans} />
            }
        </div>
    )
}