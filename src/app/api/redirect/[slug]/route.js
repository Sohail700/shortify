import { connectToDB } from '@/lib/db';
import Url from '@/models/Url';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  await connectToDB();

  try {
    const { slug } = params;
    const url = await Url.findOne({ shortId: slug });  // Fixed: using slug to find the URL

    if (!url) {
      return NextResponse.json(
        { error: 'URL not found' },
        { status: 404 }
      );
    }

    // Update click count
    url.clicks += 1;
    await url.save();

    return NextResponse.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error fetching URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}