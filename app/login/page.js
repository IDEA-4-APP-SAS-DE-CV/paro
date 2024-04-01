"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { create_cookie } from '../../utils/cookies';

function LoginPage(){
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  let token = Cookies.get("token");

  useEffect(() => {
    if(token){
      router.push("/dashboard");
      return;
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          password,
        })
      });

      if(!response.ok){
        setError("El usuario o la contraseña son incorrectos");
      } else{
        const { token } = await response.json();
        create_cookie('token', token);
        router.push("/dashboard");
        setError("");
      }
    } catch(err){
      console.log("error");
    }
  };

  return (
    <div className={styles.containerFull}>
      <form className={styles.container} onSubmit={handleLogin}>
        <div className={styles.left}>
          <Image
            src="/images/logo_paro.png"
            width={280}
            height={90}
            alt="Picture of the author"
          />
          <br /><br />
          <h3>Inicio de Sesión</h3>
        </div>
        <div className={styles.right}>
          <div className={styles.controls}>
            <h2 className={styles.title}>Bienvenido a Paro, la forma facil de obtener un préstamo</h2>
            <br />
            <br />
            <label className="labelsStrong">Email</label>
            <input
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder='correo@gmail.com'
              required
            />
            <br />
            <label className="labelsStrong">Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {
              error && <label>{error}</label>
            }
            <br />
            <br />
            <button type="submit">Iniciar sesión</button>
            <div className='separate'></div>
            <div className={styles.containerLink}>
              <Link className="link" href="/registro">Crear Cuenta</Link>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  )
}

export default LoginPage;
