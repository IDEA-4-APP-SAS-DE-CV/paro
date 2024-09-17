import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request) {
  const body = await request.json();
  const { userId } = body;

  const { rows } = await sql`select name, avilableBalance, amount 
    from users 
    INNER JOIN 
        creditLines ON users.id = creditlines.user_id
    JOIN 
        loans ON creditlines.id = loans.creditline_id
    WHERE users.id = ${userId}
`;

  if(!rows || rows.length === 0){
    return NextResponse.json({ message: 'No Autorizado'},{
      status: 400,
    });
  }
  
  return NextResponse.json({ rows, message: 'Listado de loans'})
}

export async function PUT(request) {
  const body = await request.json();
  const { loan, creditLineId } = body;

  const { rows } = await sql`update loans set status = 'approved' where id = ${loan}`;
  const updateCL = await sql`update creditlines set status = 'approved' where id = ${creditLineId}`;

  if(rows || rows.length !== 0){
    return NextResponse.json({ message: 'Prestamo actualizado'},{
      status: 200,
    });
  }  
}

export async function POST(request) {
  const body = await request.json();
  const loanUid = uuidv4();
  const { amount, creditLineId, availableBalance } = body;
  const date = new Date();
  let rowLoan;
  console.log({ amount, creditLineId, availableBalance });

  
  try{  
    // inserta nuevo prestamo
    rowLoan = await sql`insert into loans (id, creditline_id, amount, status, createdAt) 
        values (${loanUid}, ${creditLineId}, ${amount}, 'pending', ${date})`
    // Actualiza la linea de credito... descontando el monto prestado 
    const updateCL = await sql`update creditlines set avilablebalance = ${availableBalance} where id = ${creditLineId}`;

  } catch (err) {
    console.log(`Error: ${err}`)
  }

  if(rowLoan || rowLoan.length !== 0){
    return NextResponse.json({ message: 'Prestamo creado'},{
      status: 200,
    });
  }  
}
