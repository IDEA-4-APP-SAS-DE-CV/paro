import { NextResponse } from "next/server";
import { connectDB } from '../../../utils/mongoose';
import CreditLine from '../../models/creditLine';
// import jwt from 'jsonwebtoken';

export async function POST(request) {
  connectDB();
  const body = await request.json();
  const { creditLine, userId, loans } = body;

    const newCreditLine = new CreditLine({
      creditLine: creditLine,
      totalAmount: 1500,
      status: 'pending',
      loans,
      userId,
      availableBalance: 1500,
      renewable: false,
      riskAnalysis: 'C',
      tna: 10,
    });

    await newCreditLine.save();

    const newCreditLineDone = {
      creditLine: newCreditLine.creditLine,
      totalAmount: newCreditLine.totalAmount,
      status: newCreditLine.status,
      loans: newCreditLine.loans,
      userId: newCreditLine.userId,
      availableBalance: newCreditLine.availableBalance,
      renewable: newCreditLine.renewable,
      riskAnalysis: newCreditLine.riskAnalysis,
      tna: newCreditLine.tna
    }
    /*
    const CLToken = jwt.sign(newCreditLineDone, process.env.JWT_SECRET, {
      expiresIn: "24h",
      algorithm: "HS512",
    });
    */
  
  
  return NextResponse.json({ newCreditLineDone, message: 'Solicitud de credito Creada'})
}

export async function GET(request) {
  connectDB();
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId');
  const creditLine = searchParams.get('creditLine');
  const cl = await CreditLine.findOne({ 'userId': userId, 'creditLine': creditLine });

  if(!cl || cl.length === 0){
    return NextResponse.json({ message: 'No hay Linea de credito registrada con esos datos'},{
      status: 400,
    });
  }

  const newCreditLineDone = {
    creditLine: cl.creditLine,
    totalAmount: cl.totalAmount,
    status: cl.status,
    loans: cl.loans,
    userId: cl.userId,
    availableBalance: cl.availableBalance,
    renewable: cl.renewable,
    riskAnalysis: cl.riskAnalysis,
    tna: cl.tna,
  }

  return NextResponse.json({ newCreditLineDone, message: 'Solicitud de credito Solicitada'})

}
