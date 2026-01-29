import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ADMIN_PASSWORD } from '@/lib/constants';

const DATA_PATH = path.join(process.cwd(), 'src/data/store.json');

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = request.headers.get('x-admin-password');
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newData = await request.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
