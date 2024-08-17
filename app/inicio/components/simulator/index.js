'use client';
import { Button, Image } from "@nextui-org/react";
import styles from './simulador.module.css';
import { useState } from "react";
import { useFilePicker } from 'use-file-picker';
import {
    FileAmountLimitValidator,
    FileTypeValidator,
    FileSizeValidator,
    ImageDimensionsValidator,
  } from 'use-file-picker/validators';

export default function Simulator ({ user }) {
    const { inelink } = user;
    const [viewSimulator, setViewSimulator] = useState(false);
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
    console.log({ loading, filesContent });
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
                            <div> 
                                {
                                    //TODO: validar cuando la INE este cargada para mostrar este paso
                                    filesContent && filesContent.length && step &&
                                    <div>simulador</div>
                                }    
                             </div>
                        }
                    </div>
            </div>
        }
    </div>
}