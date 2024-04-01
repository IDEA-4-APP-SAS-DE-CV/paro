import { NextResponse } from "next/server";
import { connectDB } from '../../../utils/mongoose';
import User from '../../models/user';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  connectDB();
  const body = await request.json();
  const { name,
    lastname,
    motherLastname,
    birth,
    mail,
    phone,
    clabe,
    password,
    accountStatusURL,
    addressFileURL,
    ineURL,
   } = body;
  const user = await User.findOne({mail: mail});

  if(user){
    return NextResponse.json({ message: 'El usuario ya existe'},{
      status: 400,
    });
  }else{
    const newUser = new User({
      name, 
      lastname,
      motherLastname,
      birth,
      mail,
      phone,
      clabe,
      password,
      accountStatusURL,
      addressFileURL,
      ineURL,
      role: 'user',
      creditLine: Number(new Date()),
    });

    await newUser.save();

    const newUserRegistered = {
      id: newUser._id,
      name: newUser.name,
      lastname: newUser.lastname,
      motherLastname: newUser.motherLastname,
      birth: newUser.birth,
      clabe: newUser.clabe,
      mail: newUser.mail,
      phone: newUser.phone,
      role: newUser.role,
      creditLine: newUser.creditLine,
      ineURL: newUser.ineURL,
      addressFileURL: newUser.addressFileURL,
      accountStatusURL: newUser.accountStatusURL,
    }

    const token = jwt.sign(newUserRegistered, process.env.JWT_SECRET, {
      expiresIn: "24h",
      algorithm: "HS512",
    });

    return NextResponse.json({ token, message: "Registro completado"});
  }

  
  

  return NextResponse.json({ token, message: 'Usuario Logeado'})
}
