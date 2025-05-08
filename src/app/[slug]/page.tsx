// src/app/[slug]/page.tsx
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
type Props = {
  params: {
    slug: string;
  };
};



export default function RedirectPage({ params }: Props) {
  redirect(`/api/redirect/${params.slug}`);
}
