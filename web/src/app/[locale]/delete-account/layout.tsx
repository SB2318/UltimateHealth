import type { Metadata } from 'next';
import { getRobotsNoIndex } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Delete Account',
  robots: getRobotsNoIndex(),
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
