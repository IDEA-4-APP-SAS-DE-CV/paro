"use client";
import { useState, useEffect,  useRef } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from './styles.module.css';
import { uploadFile } from '../../utils/firebase';
import { create_cookie } from '../../utils/cookies';

function RegisterPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [motherLastname, setMotherLastname] = useState("");
  const [birth, setBirth] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [clabe, setClabe] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [accountStatus, setAccountStatus] = useState('');
  const [addressFile, setAddressFile] = useState('');
  const [idFile, setIdFile] = useState('');
  const [popError, setPopError] = useState(true);
  const [send, setSend] = useState(false);
  const router = useRouter();
  let token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      router.push("/dashboard"); // If no token is found, redirect to login page
      return;
    }
  }, [router]);

  const handleRegister = async (e) => {
   
    let estadoDeCuentaURL = '';
    let comprobanteDeDomicilioURL = '';
    let ineURL = '';
    e.preventDefault(); // Prevent default form submission
    if(accountStatus && addressFile && idFile){
        setSend(true);

        try{
          estadoDeCuentaURL = await uploadFile(accountStatus, 'estados-de-cuenta');
          comprobanteDeDomicilioURL = await uploadFile(addressFile, 'comprobante-de-domicilio');
          ineURL = await uploadFile(idFile, 'ine');
        } catch (err){
          console.log(`Error: ${err}`);
        }

        const bod = {
          name,
          lastname,
          motherLastname,
          birth,
          mail,
          phone,
          clabe,
          password,
          accountStatusURL: estadoDeCuentaURL,
          addressFileURL: comprobanteDeDomicilioURL,
          ineURL,
        }
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bod),
        });
  
        if (!response.ok){
          setError("Ese correo ya está registrado, intenta usando uno diferente.")
          setPopError(true);
          setSend(false);
        } else {
          const { token } = await response.json();
          create_cookie('token', token);
          router.push("/dashboard");
          setError("")
        }
      } catch (error) {
        console.error(error);
      }
    }
    else {
      alert('Para poder crear un registro deberás primero cargar los archivos necesarios')
    } 
  };

  const reload = () => window.location.reload();

 function next(){
  if (step === 0){
    if(name && lastname && motherLastname && birth && mail){
      setStep(step+1) 
    }
  } else if (step === 1) {
    if (phone && clabe && password && confirmPassword){
      if(password === confirmPassword){
        setStep(step+1)
      } else{
        alert('La confirmación del password no coincide');
      }
    }
  }
 }

 function getStep(){
    if(step === 0){
      return ( <div className={styles.step}>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan"
            required
          />
        </div>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">A. Paterno:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Perez"
            required
          />
        </div>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">A. Materno:</label>
          <input
            type="text"
            value={motherLastname}
            onChange={(e) => setMotherLastname(e.target.value)}
            placeholder="Gonzalez"
            required
          />
        </div>
        <div className={styles.wrapControl}>
        <label className="labelsStrong">Fecha de nacimiento:</label>
          <input 
            type="date" 
            id="start" 
            name="trip-start" 
            value={birth} 
            min="1950-01-01" 
            max="2006-12-31" 
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </div>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Email:</label>
          <input
            type="text"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="juan.perez@gmail.com"
            required
          />
        </div>
      </div>)
    } else if (step === 1){
      return (<div className={styles.step}>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Telefono:</label>
          <input
            type="tel"
            maxLength="10"
            value={phone}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="5512345678"
            required
          />
        </div>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Clabe Interbancaria:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            autoComplete="cc-number"
            maxLength="19"
            placeholder="xxxx xxxx xxxx xxxx"
            value={clabe}
            onChange={(e) => setClabe(e.target.value)}
            required
          />
        </div>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Confirmar</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
      </div>)
    } else if (step === 2) {
      return (
        <div className={styles.step}>
          <h3>Necesitamos solicitarte algunos documentos para verificar tu identidad.</h3>
          <br /><br />
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Estado de cuenta</label>
          <br />
          <br />
          <input className={styles.fancyFile} onChange={(e) => setAccountStatus(e.target.files[0])} type="file" id="accountStatus" name="accountStatus" accept="image/png, image/jpeg, .pdf" />
          <label htmlFor="accountStatus">
              <span className={styles.fancyFileName}>
                <span>{accountStatus && accountStatus.name || 'Ningun Archivo Seleccionado Seleccionado'}</span>
              </span>
              <span className={styles.fancyFileButton}>Buscar Archivo</span>
          </label>
        </div>
        <br />
        <div className={styles.wrapControl}>
          <label className="labelsStrong">Comprobante de domicilio</label>
          <br />
          <br />
          <input className={styles.fancyFile} onChange={(e) => setAddressFile(e.target.files[0])} type="file" id="addressFile" name="addressFile" accept="image/png, image/jpeg, .pdf" />
          <label htmlFor="addressFile">
              <span className={styles.fancyFileName}>
                <span>{addressFile && addressFile.name || 'Ningun Archivo Seleccionado Seleccionado'}</span>
              </span>
              <span className={styles.fancyFileButton}>Buscar Archivo</span>
          </label>
        </div>
        <br />
        <div className={styles.wrapControl}>
          <label className="labelsStrong">INE</label>
          <br />
          <br />
          <input className={styles.fancyFile} onChange={(e) => setIdFile(e.target.files[0])} type="file" id="idFile" name="idFile" accept="image/png, image/jpeg, .pdf" />
          <label htmlFor="idFile">
              <span className={styles.fancyFileName}>
                <span>{idFile && idFile.name || 'Ningun Archivo Seleccionado Seleccionado'}</span>
              </span>
              <span className={styles.fancyFileButton}>Buscar Archivo</span>
          </label>
        </div>
      </div>
      )
    }
 }

 // API Key RESEND re_Kov2vZrg_B3RrxVBGxLDNNmmb6HQ3epRE

  return (
      <div className={styles.containerFull}>
        { error && popError && (
          <div className={styles.error} onClick={
            () => {
              setPopError(false)
              reload();
            }
          }>
            <div className={styles.containerError}>
              <h3>{ error }</h3>
            </div>
          </div> )
        }
        {
          send && (
            <div className={styles.progresContainer}>
              <div className={styles.spinner}></div>
            </div>
          )
        }
        <form className={styles.container} onSubmit={handleRegister}>
          <div className={styles.left}>
            <Image
              src="/images/logo_paro.png"
              width={280}
              height={90}
              alt="Picture of the author"
            />
            <br /><br />
            <div className={styles.containerTitle}>
              <h2 className={styles.title}>Bienvenido a `Paro<br /></h2>
              <p>Una plataforma de préstamos simples a corto y mediano plazo, fácil de obtener y fácil de pagar.</p>
            </div>  
          </div>
          <div className={styles.right}>
            <div className={styles.carrusel}>
              <div className={styles.steps}>
               {
                getStep()
               }
              </div>
              <div className={styles.controlSteps}>
                <div className={styles.bullets}>
                  {
                    [0, 1, 2].map((el, key) => (
                        <div key={key} onClick={() => setStep(key)} className={el === step && `${styles.bullet} ${styles.active}` || `${styles.bullet}`}></div>
                      ))
                  }
                </div>
                {
                  step === 2 &&
                  <button type="submit" >Registrarse</button> ||
                  <button onClick={next}>Siguiente</button>
                }
              </div>
            </div>
          </div>
       
      </form>
    </div>
  );
}

export default RegisterPage;
