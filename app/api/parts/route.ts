import { NextResponse } from 'next/server';
import parts from '@/data/parts.json';

export async function GET() {
  return NextResponse.json(parts);
}
