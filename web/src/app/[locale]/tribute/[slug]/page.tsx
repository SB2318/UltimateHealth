import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function TributeProfileSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  redirect(`/${locale}/tribute?profile=${encodeURIComponent(slug)}`);
}
