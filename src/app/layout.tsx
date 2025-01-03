import { Metadata } from 'next';
import '@/app/ui/global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Finance',
    default: 'Finance'
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
