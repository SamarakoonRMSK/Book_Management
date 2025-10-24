'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client/react';
import BookForm from '@/components/BookForm';
import { GET_BOOK, GET_BOOKS } from '@/graphql/queries';
import { UPDATE_BOOK } from '@/graphql/mutations';
import { Container, Typography, Alert, CircularProgress, Box } from '@mui/material';

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, loading: queryLoading, error: queryError } = useQuery(GET_BOOK, {
    variables: { id },
    skip: !id,
  });

  const [updateBook, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_BOOK, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_BOOKS }],
    onCompleted: () => {
      router.push('/books');
    },
  });

  const handleSubmit = (formData: any) => {
    const { title, author, publishedYear, genre } = formData;
    updateBook({
      variables: {
        id,
        input: { title, author, publishedYear, genre },
      },
    });
  };

  if (queryLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }
  if (queryError) {
    return <Alert severity="error">{queryError.message}</Alert>;
  }
  if (!(data as any)?.book) {
    return <Alert severity="warning">Book not found.</Alert>;
  }

  const { __typename, id: bookId, ...initialData } = (data as any).book;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Edit Book
      </Typography>
      {mutationError && <Alert severity="error">{mutationError.message}</Alert>}
      <BookForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={mutationLoading}
      />
    </Container>
  );
}
