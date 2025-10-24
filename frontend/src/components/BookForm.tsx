'use client';
import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  CircularProgress, 
  Paper, 
  Typography, 
  Fade, 
  Zoom,
  Alert,
  Snackbar,
} from '@mui/material';
import { Save as SaveIcon, Book as BookIcon } from '@mui/icons-material';

interface BookFormProps {
  initialData?: {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
  };
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

export default function BookForm({ initialData, onSubmit, isLoading }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedYear: new Date().getFullYear(),
    genre: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Author must be at least 2 characters';
    }
    
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }
    
    if (formData.publishedYear < 1000 || formData.publishedYear > new Date().getFullYear() + 1) {
      newErrors.publishedYear = 'Please enter a valid year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'publishedYear' ? parseInt(value) || 0 : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setShowSuccess(true);
    }
  };

  const isFormValid = formData.title.trim() && formData.author.trim() && formData.genre.trim() && 
                     formData.publishedYear >= 1000 && formData.publishedYear <= new Date().getFullYear() + 1;

  return (
    <Zoom in={true} timeout={500}>
      <Paper 
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: 600,
          margin: 'auto',
          mt: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <BookIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            {initialData ? 'Edit Book' : 'Add New Book'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {initialData ? 'Update the book information' : 'Fill in the details to add a new book'}
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Book Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="publishedYear"
            label="Published Year"
            name="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={handleChange}
            error={!!errors.publishedYear}
            helperText={errors.publishedYear}
            inputProps={{
              min: 1000,
              max: new Date().getFullYear() + 1,
            }}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="genre"
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            error={!!errors.genre}
            helperText={errors.genre}
            sx={{ mb: 3 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              background: isFormValid 
                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                : 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
              '&:hover': {
                background: isFormValid 
                  ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
              }
            }}
            disabled={isLoading || !isFormValid}
          >
            {isLoading 
              ? (initialData ? 'Updating...' : 'Adding...') 
              : (initialData ? 'Update Book' : 'Add Book')
            }
          </Button>
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Fade in={showSuccess}>
            <Alert 
              onClose={() => setShowSuccess(false)} 
              severity="success" 
              sx={{ borderRadius: 2 }}
            >
              {initialData ? 'Book updated successfully!' : 'Book added successfully!'}
            </Alert>
          </Fade>
        </Snackbar>
      </Paper>
    </Zoom>
  );
}
