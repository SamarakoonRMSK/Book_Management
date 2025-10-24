'use client';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import BookForm from '@/components/BookForm';
import { CREATE_BOOK } from '@/graphql/mutations';
import { GET_BOOKS } from '@/graphql/queries';
import { Container, Typography, Alert } from '@mui/material';

export default function NewBookPage() {
  const router = useRouter();
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () => {
      router.push('/books');
    },
    update: (cache, { data }: any) => {
      if (data?.createBook) {
        const existingBooks = cache.readQuery({
          query: GET_BOOKS,
          variables: { filter: '', limit: 6, offset: 0 }
        }) as any;
        
        if (existingBooks?.books) {
          cache.writeQuery({
            query: GET_BOOKS,
            variables: { filter: '', limit: 6, offset: 0 },
            data: {
              books: {
                ...existingBooks.books,
                books: [data.createBook, ...existingBooks.books.books],
                totalCount: existingBooks.books.totalCount + 1
              }
            }
          });
        }
      }
    },
  });

  const handleSubmit = (formData: any) => {
    createBook({ variables: { input: formData } });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Add a New Book
      </Typography>
      {error && <Alert severity="error">{error.message}</Alert>}
      <BookForm onSubmit={handleSubmit} isLoading={loading} />
    </Container>
  );
}
