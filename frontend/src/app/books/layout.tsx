import ProtectedRoute from '@/components/ProtectedRoute';

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
