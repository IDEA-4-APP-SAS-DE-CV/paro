'use client';
import { Button, Input } from "@nextui-org/react";
import styles from './simulador.module.css';
import { useState } from "react";
import { useFilePicker } from 'use-file-picker';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '../../../lib/utils';

import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
  } from 'use-file-picker/validators';

export default function Simulator ({ user, creditLine }) {
    
    const router = useRouter();
    const { inelink, id: userId } = user[0];
    console.log({ user });
    const [viewSimulator, setViewSimulator] = useState(false);
    const [amount, setAmount] = useState(0);
    const [step, setStep] = useState(false);

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        validators: [
          new FileAmountLimitValidator({ max: 1 }),
          new FileTypeValidator(['jpg', 'png', 'webp']),
          new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
          new ImageDimensionsValidator({
            maxHeight: 2000, // in pixels
            maxWidth: 2500,
            minHeight: 600,
            minWidth: 768,
          }),
        ],
      });

    const handleSimulate = () => {
        setViewSimulator(!viewSimulator);
    }

    const handleCreditLine = () => {
        setStep(true); 
    }
    
    const handleParo = async () => {
        console.log({ amount, creditLine });
        if(creditLine.length) {
            // crea prestamo
            try {
                const responseLoan = await fetch('/api/loans', {
                    method: 'POST',
                    header: {
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount,
                        creditLineId: creditLine[0].id,
                        availableBalance: creditLine[0].avilablebalance - amount,
                    })
                });

                if(!responseLoan.ok){
                    console.log('No pudimos crear tu registro');
                } else {
                    const { data } = await responseLoan.json();
                    console.log({ data });
                    window.location.reload();
                } 
            } catch (err) {
                console.log(`Error: ${err}`);
            }
           
        } else {

            try {
                const response = await fetch("/api/creditline", {
                method: "POST",
                headers: {
                  "content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user[0]?.id,
                    amount,
                })
              });

                if(!response.ok){
                    console.log('No pudimos crear tu registro');
                 } else{
                    const { data } = await response.json();
                 }

            } catch (error) {
                console.log({ error });
            }
            // crea linea de credito y prestamo
            
        }
    }

    return <div className={styles.simulator}>
        
        <Button color="primary" onClick={handleSimulate}>Solicitar un Paro</Button>  
        {
            viewSimulator && <div className={styles.popSimulator}>
                    <div onClick={handleSimulate} className={styles.closer}>Cerrar</div>
                    <div className={styles.container}>
                        {
                            !inelink && !step &&
                            <div className={styles.ineLink}>
                                <h2><b>Para continuar necesitamos un documento</b></h2>
                                <br />
                                Necesitamos que nos compartas tu <b>INE</b> para poder continuar con el tramite y crear un alinea de crédito<br />
                                <span className={styles.disclaimer}>
                                    <b>Tamaño Maximo</b> 50mb, Ancho Max.: 2500px, Alto Max.: 2000px, Ancho Min.: 678px, Alto Min.: 600px, Formato .jpg
                                </span>
                                <div className={styles.containerIne}>
                                    <div className={styles.wrapper}>
                                    {
                                        filesContent.map((file, index) => {
                                           return  <div key={index}>
                                              <img alt={file.name} src={file.content} width={400}></img>
                                              <br />
                                            </div>
                                          })
                                    }
                                    </div>
                                    <br />
                                    {
                                        filesContent && filesContent.length && <Button onClick={handleCreditLine} color="primary" >Aceptar</Button> ||
                                        <Button color="primary" onClick={() => openFilePicker()}>Seleccionar archivo</Button>
                                    }
                                </div>
                            </div> ||
                            <div className={styles.wraperSimulate}> 
                                {
                                    //TODO: validar cuando la INE este cargada para mostrar este paso
                                    filesContent && filesContent.length && step &&
                                    <div className={styles.simulate}>
                                        <h2 className={styles.title}>Simula tu Paro</h2>
                                        <input
                                            type="text"
                                            placeholder="$0"
                                            onChange={(e) => setAmount(e.target.value)}
                                            className={`${styles.inputAmount} "border-0 outline-none" `}

                                        />
                                        <p>Ingresa un monto entre $10 y {formatCurrency(creditLine[0].avilablebalance)}</p>
                                        <Button 
                                            onClick={handleParo}
                                            color="primary" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Solicitar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </Button>
                                    </div>
                                }    
                             </div>
                        }
                    </div>
            </div>
        }
    </div>
}