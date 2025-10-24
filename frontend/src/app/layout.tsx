import type { Metadata } from 'next';
import ApolloWrapper from '@/components/ApolloWrapper';
import ThemeRegistry from '@/theme/ThemeRegistry';
import NavBar from '@/components/NavBar';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Book Management System',
  description: 'A project for managing books',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ThemeRegistry>
            <AuthProvider>
              <NavBar />
              {children}
            </AuthProvider>
          </ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
