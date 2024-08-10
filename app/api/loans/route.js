import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request) {
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
  const { loan } = body;
  console.log({ loan });
  console.log(`update loans set status = 'approved' where id = ${loan}`);
  const { rows } = await sql`update loans set status = 'approved' where id = ${loan}`;

  if(rows || rows.length === 0){
    return NextResponse.json({ message: 'Prestamo actualizado'},{
      status: 200,
    });
  }
  
}
