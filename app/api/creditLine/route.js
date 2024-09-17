import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const body = await request.json();
  const { userId, amount } = body;
  const uid = uuidv4();
  const loanUid = uuidv4();

  try{
    let date = new Date()
    const firstAvailableBalance = 3000 - amount;

    const rows  = await sql`insert into creditlines (
      id, user_id, maxamount, avilablebalance, status, createdAt) 
    values (${uid}, ${userId}, 3000, ${firstAvailableBalance}, 'pending', ${date})`;
  

    const rowLoan = await sql`insert into loans (id, creditline_id, amount, status, createdAt) 
      values (${loanUid}, ${uid}, ${amount}, 'pending', ${date})`


    if(!rows || rows.length === 0){
      return NextResponse.json({ message: 'No pudimos crear tu linea de crédito'},{
        status: 500,
      });
    }

    const data = {
      creditlineId: uid,
      loanId: loanUid,
    }
    
    return NextResponse.json({ data, message: 'Linea de credito creada'},{
      status: 201,
    });

  } catch (err) {
    console.error('Error inserting record:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
