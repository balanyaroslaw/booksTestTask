import { createContext, useContext, useEffect, useState } from "react";
import bookService from "../services/books.service";
import { Book } from "../types/book.type";

type BooksContextType = {
  books: Book[];
  fetchBooks: () => Promise<void>;
  updateBook: (id: string, updatedBook: Book) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;  
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {

  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const updateBook = async (id: string, updatedBook: Book) => {
    try {
      const book = await bookService.editBook(id, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === id ? { ...b, ...book } : b))
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id: string) => { 
    try {
      await bookService.deleteBook(id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, fetchBooks, updateBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
