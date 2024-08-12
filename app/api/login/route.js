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
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    birth: user.birth,
    clabe: user.clabe,
    mail: user.mail,
    phone: user.phone,
    role: user.role,
    inelink: user.inelink,
    addressfilelink: user.addressfilelink,
    accountstatuslink: user.accountstatuslink,
  }
  
  // const token = jwt.sign(newUser, process.env.JWT_SECRET);

  console.log({ newUser });

  cookies().set({
    name: 'user',
    value: JSON.stringify(newUser),
    httpOnly: true,
    path: '/inicio',
  })

  return NextResponse.json({ newUser, message: 'Usuario Logeado'})
}
