'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_BOOKS } from '@/graphql/queries';
import { DELETE_BOOK } from '@/graphql/mutations';
import { useDebounce } from '@/hooks/useDebounce';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  TextField,
  Pagination,
  Skeleton,
  Fade,
  Zoom,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';

interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
}

const PAGE_SIZE = 6;

export default function BooksPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: {
      filter: debouncedSearchTerm,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const [deleteBook, { loading: deleteLoading }] = useMutation(DELETE_BOOK, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GET_BOOKS }], 
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook({ variables: { id } });
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageCount = (data as any)?.books?.totalCount
    ? Math.ceil((data as any).books.totalCount / PAGE_SIZE)
    : 0;

  const BookCardSkeleton = () => (
    <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
        </CardContent>
        <CardActions>
          <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: 1 }} />
        </CardActions>
      </Card>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={300}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BookIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              My Books
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/books/new"
            startIcon={<AddIcon />}
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              }
            }}
          >
            Add New Book
          </Button>
        </Box>
      </Fade>

      <Fade in={true} timeout={500}>
        <TextField
          fullWidth
          label="Search by title, author, or genre..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            mb: 4,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            ),
          }}
        />
      </Fade>

      {loading && !data && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </Box>
      )}
      
      {error && (
        <Fade in={true}>
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error.message}
          </Alert>
        </Fade>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {(data as any)?.books?.books.length === 0 && !loading && (
          <Fade in={true}>
            <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
              <BookIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No books found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first book'}
              </Typography>
            </Box>
          </Fade>
        )}
        
        {(data as any)?.books?.books.map((book: Book, index: number) => (
          <Zoom in={true} timeout={300 + index * 100} key={book.id}>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' } }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.2)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                    {book.title}
                  </Typography>
                  <Typography sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic' }}>
                    by {book.author}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip 
                      label={book.genre} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    <Chip 
                      label={book.publishedYear} 
                      size="small" 
                      color="secondary" 
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                  </Box>
                </CardContent>
                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                  <Tooltip title="Edit book">
                    <IconButton 
                      component={Link} 
                      href={`/books/edit/${book.id}`}
                      color="primary"
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete book">
                    <IconButton 
                      onClick={() => handleDelete(book.id)} 
                      disabled={deleteLoading}
                      color="error"
                      sx={{ 
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'error.main',
                          color: 'white',
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Box>
          </Zoom>
        ))}
      </Box>

      {pageCount > 1 && (
        <Fade in={true} timeout={800}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, py: 3 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </Fade>
      )}
    </Container>
  );
}
