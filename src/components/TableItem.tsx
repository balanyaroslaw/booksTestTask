
import { useState } from 'react'
import { Book } from '../types/book.type'
import Toggle from './Toggle';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/book.context';

type TableItemProps = {
  book:Book
}
function TableItem({book}:TableItemProps) {
    const [isActive, setIsActive] = useState(book.isActive);
    const {updateBook, deleteBook,fetchBooks} = useBooks();
    const navigate = useNavigate();
    
    const handleToggle = async () => {
      const updatedStatus = !isActive;
      const updatedBook = { ...book, isActive: updatedStatus };
  
      try {
          await updateBook(book.id!, updatedBook);
          await fetchBooks();
          setIsActive(updatedStatus);
      } catch (error) {
          console.error("Error updating book status:", error);
      }
  };

    const deleteItem = async () =>{
        await deleteBook(book.id!);
        await fetchBooks();
    }
    return (
        <tr>
          <td className="px-4 py-2">{book.title}</td>
          <td className="px-4 py-2">{book.author}</td>
          <td className="px-4 py-2">{book.category}</td>
          <td className="px-4 py-2">{book.isbn}</td>
          <td className="px-4 py-2">{book.createdAt}</td>
          <td className="px-4 py-2">{book.editedAt?book.editedAt:'--'}</td>
          <td className="px-4 py-2 space-x-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={()=>navigate(`editbook/${book.id}`)}>Edit</button>
            <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>deleteItem()}>Delete</button>
            <Toggle isActive={isActive} handleToggle={handleToggle}/>
          </td>
        </tr>
      );
}

export default TableItem