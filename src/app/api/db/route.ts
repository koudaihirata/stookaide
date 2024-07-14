import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello from API route" });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return NextResponse.json({ message: "Data received", data });
}
