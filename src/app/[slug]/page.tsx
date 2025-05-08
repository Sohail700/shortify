import { redirect } from 'next/navigation';

export default function RedirectPage({ params }: { params: { slug: string } }) {
  // Redirects to your API route which redirects to the original URL
  redirect(`/api/redirect/${params.slug}`);
}
