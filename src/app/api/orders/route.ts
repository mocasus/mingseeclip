import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/store.json');

export async function POST(request: Request) {
  try {
    const { tiktokAccount } = await request.json();

    // Read current data
    const fileContent = await fs.readFile(DATA_PATH, 'utf8');
    const data = JSON.parse(fileContent);

    // Update stats
    data.stats = {
      orderCount: (data.stats?.orderCount || 0) + 1,
      lastOrderTikTok: tiktokAccount || '@anonymous'
    };

    // Save back
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order API Error:', error);
    return NextResponse.json({ error: 'Failed to record order' }, { status: 500 });
  }
}
