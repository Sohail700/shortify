import { redirect } from 'next/navigation';


export const dynamic = 'force-dynamic'; 


export default async function RedirectPage({ params }) {
  redirect(`/api/redirect/${params.slug}`);
}
