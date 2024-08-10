import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'



export async function POST(request) {
  const cookieStore = cookies();
  const body = await request.json();
  const { mail, password } = body;

  const { rows } = await sql`SELECT * from users where mail=${mail} and password=${password}`;


  if(!rows || rows.length === 0){
    return NextResponse.json({ message: 'No Autorizado'},{
      status: 400,
    });
  }

  const user = rows[0];
  const newUser = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    motherLastname: user.motherLastname,
    birth: user.birth,
    clabe: user.clabe,
    mail: user.mail,
    phone: user.phone,
    role: user.role,
    creditLine: user.creditLine,
    ineURL: user.ineURL,
    addressFileURL: user.addressFileURL,
    accountStatusURL: user.accountStatusURL,
  }
  
  const token = jwt.sign(newUser, process.env.JWT_SECRET, {
    expiresIn: "24h",
    algorithm: "HS512",
  });

  cookies().set({
    name: 'user',
    value: token,
    httpOnly: true,
    path: '/',
  })

  return NextResponse.json({ token, message: 'Usuario Logeado'})
}
