import { NextResponse } from "next/server";
import { connectDB } from '../../../utils/mongoose';
import User from '../../models/user';

export async function GET(request) {
  connectDB();
  const usersList = await User.find();
  return NextResponse.json({ usersList });
}
