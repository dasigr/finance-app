import { Metadata } from 'next';
import '@/app/ui/global.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Finance',
    default: 'Finance'
  },
  description: 'Manage your budget with personal finance',
  metadataBase: new URL('https://www.a5project.com'),
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
