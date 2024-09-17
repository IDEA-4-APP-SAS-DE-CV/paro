"use client";
import styles from './registro.module.css';
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import SimpleLayout from "../components/SimpleLayout";
import { get_cookie } from '../../utils/cookies';
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import { Input, Button, DatePicker } from "@nextui-org/react";
import Documents from './components/Documents';

export default function RegisterPage () {
    const router = useRouter();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [date, setDate] = useState(parseDate("2000-01-01"));
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [viewDocuments, setViewDocuments] = useState(false);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);



    const handleRegister = (e) => {
        e.preventDefault();
        setViewDocuments(true);

        // sendRegister()
    };

    const sendRegister = async (f1, f2, f3) => {
      const body = {
        name,
        lastname,
        date: `${date.year}-${date.month}-${date.day}`,
        mail: email,
        password: pass,
        file1: f1,
        file2: f2,
        file3: f3,
    }
    
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });

      if(!response.ok){
        setError("No pudimos crear tu registro!");
      } else{
        const { newUser } = await response.json();
        if(newUser){
          router.push(`/inicio/${newUser.id}`);
        } 
        setError("");
      }
    } catch(err){
      console.log(`Error: ${err}`);
    }
    }


    return <SimpleLayout>
        {
          viewDocuments && <Documents sendRegister={sendRegister} />
        }
        <div className={styles.register}>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <div className={styles.logo}>
                        <div className={`${styles.circle} ${styles.pos1}`}></div>
                        <div className={`${styles.circle} ${styles.pos2}`}></div>
                        <div className={`${styles.circle} ${styles.pos3}`}></div>
                        <p className={styles.text}>Paro</p>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <span className={styles.topText}>Bienvenido a Paro,</span>
                    <span className="text-sky-400 font-medium">la forma facil de obtener un préstamo</span>
                </div>
                <div className={styles.circleButton}>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>Registro</h1>
                <br />
                <Input
                  type="text"
                  label="Nombre"
                  defaultValue=""
                  description="Ingresa tu nombre"
                  className="max-w-xs"
                  onChange={(e) => setName(e.target.value)}
                  style={{ border: 0, outline: 0, outline: 'transparent' }}
                  autocomplete="off"
                />
                <br />
                <Input
                  type="text"
                  label="Apellidos"
                  defaultValue=""
                  description="Ingresa tus apellidos"
                  className="max-w-xs"
                  onChange={(e) => setLastname(e.target.value)}
                  style={{ border: 0, outline: 0, outline: 'transparent' }}
                  autocomplete="off"
                />
                <br />
                <DatePicker 
                    label="Birth date" 
                    className="max-w-[284px]" 
                    onChange={setDate}
                    value={date}
                    showMonthAndYearPickers={true}
                />
                <br />
                <Input
                  type="email"
                  label="Email"
                  defaultValue=""
                  description="Ingresa tu correo electrónico"
                  className="max-w-xs"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ border: 0, outline: 0, outline: 'transparent' }}
                  autocomplete="off"
                />
                <br />
                <Input
                  type="password"
                  label="Contraseña"
                  defaultValue=""
                  description="Ingresa tu contraseña"
                  className="max-w-xs"
                  onChange={(e) => setPass(e.target.value)}
                  style={{ border: 0, outline: 0 }}
                />
                <br />
                <Button onClick={handleRegister} color="primary">Registrarse</Button>  
                <br />
                <br /> 
                <p className={`${styles.textRegister} font-medium`}>Si ya tienes una cuenta, Ingresa <Link className={`${styles.link} font-bold text-blue-500`} href="/login">aquí</Link></p>
                <br /> 
                <div className={styles.error}>{error}</div>
            </div>
        </div>
      </div>
    </SimpleLayout>
}