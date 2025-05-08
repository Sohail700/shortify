import { connectToDB } from '@/lib/db';
import Url from '@/models/Url';
import { generateShortId, urlSchema } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await connectToDB();

  try {
    const body = await request.json();
    const { url } = urlSchema.parse(body);

    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return NextResponse.json({
        shortId: existingUrl.shortId,
        shortUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${existingUrl.shortId}`,
        originalUrl: existingUrl.originalUrl,
        existing: true,
      });
    }

    const shortId = generateShortId();
    const newUrl = await Url.create({
      shortId,
      originalUrl: url,
    });

    return NextResponse.json({
      shortId: newUrl.shortId,
      shortUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${shortId}`,
      originalUrl: url,
      existing: false,
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}