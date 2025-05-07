// app/[slug]/page.tsx
import { redirect, notFound } from 'next/navigation';
import { connectToDB } from '@/lib/db';
import Url from '@/models/Url';

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  await connectToDB();
  const url = await Url.findOne({ shortId: params.slug });

  if (!url) return notFound();

  url.clicks += 1;
  await url.save();

  redirect(url.originalUrl); // Server redirect
}
