import { redirect } from 'next/navigation';

export default async function ContributorsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  redirect(`/${locale}/our-contributors`);
}