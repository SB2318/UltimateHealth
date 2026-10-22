import type { Metadata } from 'next';
import { getRobotsNoIndex } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Create an Account',
  robots: getRobotsNoIndex(),
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
