'use client'
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { uploadFile } from "../../../../utils/firebase";
import styles from './documents.module.css';

export default function Documents({ sendRegister }) {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDocuments = () => {
        let f1 = '';
        let f2 = '';
        let f3 = '';
        files.map((file, key) => {
            uploadFile(file, 'documents/').then(data => {
               if(key === 0) {
                    console.log({ data, key})
                    f1 = data;
               }
               if(key === 1) {
                    console.log({ data, key})
                    f2 = data;
                }
               if(key === 2) {
                    console.log({ data, key})
                    f3 = data;
                }
            })
        })
        setLoading(true);
         setTimeout(() => {
            sendRegister(f1, f2, f3)
         }, 4000)
         
    }

    const processFiles = (e) => {
        const selectedFiles = e.target.files;
        const fileArray = Array.from(selectedFiles);
        setFiles([]);
        setImagePreviews([]);
        setFiles(fileArray);
        fileArray.length < 3 && setError(true);
        // Usar FileReader para leer las imágenes
        const previews = fileArray.map(file => {
            const reader = new FileReader();
            // Leer el archivo como URL de datos
            reader.onloadend = () => {
                setImagePreviews(prevPreviews => [...prevPreviews, reader.result]);
            };
            reader.readAsDataURL(file); // Lee el archivo como URL de datos
            return file; // Retorna el archivo en caso de necesitarlo más adelante
        });
    }


    const emptyFiles = [{ name: 'INE' }, { name: 'Comprobante de domicilio' }, { name: 'Estado de cuenta' }];

    return <div className={styles.documents}>
        {
            loading && <div className={styles.container}>Loading...</div> || <div className={styles.container}>
            <h2 className={styles.title}>Antes de continuar necesitamos algunos documentos</h2>
            <h2 className={styles.title2}><b>1:</b> INE, <b>2:</b> Comprobante de domicilio y  <b>3:</b> Estado de cuenta</h2>
            <span className={styles.disclaimer}>
                <b>Tamaño Maximo</b> 50mb, Ancho Max.: 3000px, Alto Max.: 3000px, Ancho Min.: 300px, Alto Min.: 300px, Formato .jpg
            </span>
            <p></p>
            <br />
            <input type="file" id="myfile" name="myfile" multiple onChange={processFiles}></input>
            <div className={styles.containDocs}>
                {
                    !imagePreviews.length && emptyFiles.map(({ name }, key) => {
                        return <div key={key} className={styles.doc}>{name}</div>
                    }) || imagePreviews.map((image, key) => {
                        return <div key={key} className={styles.doc}><img src={image} /></div>
                    })
                }
            </div>
            {
                imagePreviews && imagePreviews.length !== 3 && <Button isDisabled color="success" className={styles.successButton}>Enviar Documentos</Button>
                || <Button color="success" onClick={handleDocuments} className={styles.successButton}>Enviar Documentos</Button>
            }

            {
                error && imagePreviews.length != 3 &&
                <div className={styles.errors}>Error al cargar alguno de los archivos no cumplen con las especificaciones. o no tiene el formato correcto</div>
            }

        </div>
        }
        
    </div>
}