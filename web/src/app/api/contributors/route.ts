import { NextResponse } from 'next/server';
import { getDynamicContributors } from '@/lib/github';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const data = await getDynamicContributors();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: any) {
    console.error('Failed to retrieve contributors via GitHub API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal error' },
      { status: 500 }
    );
  }
}
