import type { Metadata } from 'next';
import { getRobotsNoIndex } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Admin Agreement & Verification',
  robots: getRobotsNoIndex(),
};

export default function AdminAgreementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
