import { v4 as uuidv4 } from "uuid";

let books = [];

const getAllBooks = ({ filter, limit = 10, offset = 0 }) => {
  let filteredBooks = books;

  if (filter) {
    const loweCase = filter.toLowerCase();
    filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(loweCase) ||
        book.author.toLowerCase().includes(loweCase) ||
        book.genre.toLowerCase().includes(loweCase)
    );
  }
  const totalCount = filteredBooks.length;

  const paginatedBooks = filteredBooks.slice(offset, offset + limit);

  return { books: paginatedBooks, totalCount };
};

const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

const createBook = (data) => {
  const newBook = {
    id: uuidv4(),
    ...data,
  };
  books.push(newBook);
  return newBook;
};

const updateBook = (id, data) => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return null;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...data,
  };

  return books[bookIndex];
};

const deleteBook = (id) => {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return null;
  }
  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);
  return deletedBook;
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
