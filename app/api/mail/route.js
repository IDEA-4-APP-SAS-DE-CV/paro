import { NextResponse } from "next/server";
import { Resend } from 'resend';

export async function POST(request) {
  const resend = new Resend('re_Kov2vZrg_B3RrxVBGxLDNNmmb6HQ3epRE');

  await resend.emails.send({
    from: 'IDEA <contacto@i4a.mx>',
    to: ['starla.frr@gmail.com'],
    subject: 'Envio de archivos adjuntos',
    text: 'it works!',
    attachments: [
      {
        filename: 'invoice.pdf',
        content: 'invoiceBuffer',
      },
    ],
    headers: {
      'Autorization': 'Bearer re_Kov2vZrg_B3RrxVBGxLDNNmmb6HQ3epRE',
      'Content-Type': 'application/json',
    },
    tags: [
      {
        name: 'category',
        value: 'confirm_email',
      },
    ],
  });  

  return NextResponse.json({ message: 'Email enviado'})
}
