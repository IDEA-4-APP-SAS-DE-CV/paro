"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import SimpleLayout from "../components/SimpleLayout";
import styles from './login.module.css';
import { get_cookie } from '../../utils/cookies';
import { Input, Button } from "@nextui-org/react";
import { stringify } from "querystring";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: email,
          password: pass,
        })
      });

      if(!response.ok){
        setError("El usuario o la contraseña son incorrectos");
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
  };

  useEffect(() => {
    const userData = get_cookie('user');
    console.log({ userData });
  }, [user])

  console.log({email, pass});

  return (
    <SimpleLayout>
      <div className={styles.login}>
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
                <h1 className={styles.title}>Login</h1>
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
                <Button onClick={handleLogin} color="primary">Iniciar Sesión</Button>  
                <br />
                <br /> 
                <p className={`${styles.textRegister} font-medium`}>Si no tienes una cuenta, registrate <Link className={`${styles.link} font-bold text-blue-500`} href="/registro">aquí</Link></p>
                <br /> 
                <div className={styles.error}>{error}</div>
            </div>
        </div>
      </div>
    </SimpleLayout>
  );
}
