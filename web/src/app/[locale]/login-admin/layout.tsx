import type { Metadata } from 'next';
import { getRobotsNoIndex } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Admin Access',
  robots: getRobotsNoIndex(),
};

export default function LoginAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
