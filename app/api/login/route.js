import { NextResponse } from "next/server";
import { connectDB } from '../../../utils/mongoose';
import User from '../../models/user';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  connectDB();
  const body = await request.json();
  const { mail, password } = body;
  const user = await User.find({mail: mail, password: password});

  if(!user || user.length === 0){
    return NextResponse.json({ message: 'No Autorizado'},{
      status: 400,
    });
  }

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

  return NextResponse.json({ token, message: 'Usuario Logeado'})
}
