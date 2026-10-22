import type { Metadata } from 'next';
import { getRobotsNoIndex } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Goodbye',
  robots: getRobotsNoIndex(),
};

export default function GoodbyeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
