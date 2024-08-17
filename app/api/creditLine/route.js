import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const body = await request.json();
  const { userId } = body;
  const uid = uuidv4();

  const { rows } = await sql`insert into creditlines (
    id, user_id, maxamount, avilablebalance, status,createdat ) 
  values (${uid}, )`;


  if(!rows || rows.length === 0){
    return NextResponse.json({ message: 'No Autorizado'},{
      status: 400,
    });
  }
  
  return NextResponse.json({ rows, message: 'Linea de credito creada'})
}
