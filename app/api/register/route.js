import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'

export async function POST(request) {
    var newUser;
    try {
        // Extraer el cuerpo de la solicitud
        const body = await request.json();
        const userId = uuidv4();

        // Desestructurar los campos necesarios del cuerpo
        const {
            name,
            lastname,
            date,
            mail,
            password
        } = body;

        // Consulta SQL usando parámetros para evitar inyección SQL
        const result = await sql`
            INSERT INTO users (
                id, name, lastname, birth, clabe, password, mail, phone, role, inelink, addressfilelink, accountstatuslink
            ) VALUES (
                ${userId}, ${name}, ${lastname}, ${date}, '', ${password}, ${mail}, '', 'user', '', '', ''
            )
            ON CONFLICT (id) DO NOTHING
        `;

        if (result?.rowCount) {
            const { rows } = await sql`SELECT * from users where mail=${mail}`;
            const user = rows[0];
             newUser = {
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
        }
        cookies().set({
            name: 'user',
            value: JSON.stringify(newUser),
            httpOnly: true,
            path: '/inicio',
          })
        
        if (!result?.rowCount) {
            return NextResponse.json({ message: 'Record not inserted' }, { status: 400 });
        }


        return NextResponse.json({ newUser, message: 'Record inserted successfully' }, { status: 201 });

    } catch (error) {
        console.error('Error inserting record:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}