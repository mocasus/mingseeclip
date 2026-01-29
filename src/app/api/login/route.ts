import { NextResponse } from 'next/server';
import { ADMIN_PASSWORD } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
