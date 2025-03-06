import {useState } from 'react';
import { Book } from '../types/book.type'
import Toggle from './Toggle';
import { useBooks } from '../context/book.context';
import { useNavigate } from 'react-router-dom';

type ItemProps = {
  book: Book
}

function MobileItem({ book }: ItemProps) {
    const [isActive, setIsActive] = useState(book.isActive);
    const {updateBook, deleteBook, fetchBooks} = useBooks();
    const navigate = useNavigate();
    const handleToggle = async () => {
        const newBook = {...book, isActive:!isActive};
        try{
            await updateBook(book.id!, newBook);
            await fetchBooks();
        }catch{
            console.log("error")
        }
        setIsActive(!isActive);
    };

    const deleteItem = async () =>{
        await deleteBook(book.id!);
        await fetchBooks();
    }

    return (
        <div className='flex flex-col max-w-full bg-[#F1F1F1] p-4 rounded-lg shadow-md m-2'>
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <span className='font-bold text-xl'>{book.title}</span>
                    <span className='text-[#3B3B3B] text-md'>{book.author}</span>
                </div>
            </div>
            <div className="flex flex">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                        <span className='text-[#3B3B3B] text-md'>{book.category}</span>
                        <span className='text-[#3B3B3B] text-md'>{book.isbn}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className='text-[#3B3B3B] text-xs'>Created At {book.createdAt}</span>
                        <span className='text-[#3B3B3B] text-xs'>Edited At {book.editedAt ? book.editedAt : "--"}</span>
                    </div>
                </div>
                <div className="flex flex-col h-full gap-4 justify-end ml-10 mt-auto flex-grow">
                    <div className='flex justify-center items-center rounded-lg bg-blue-600 
                        px-4 py-2 text-white cursor-pointer hover:bg-blue-700 max-w-32'
                        onClick={()=>navigate(`editbook/${book.id!}`)}>
                        <span>Edit</span>
                    </div>
                    <div className='flex justify-center items-center rounded-lg bg-red-600 
                        px-4 py-2 text-white cursor-pointer hover:bg-red-700 max-w-32'
                        onClick={()=>deleteItem()}>
                        <span>Delete</span>
                    </div>
                    <Toggle isActive={isActive} handleToggle={handleToggle}/>
                </div>
            </div>
        </div>
  )
}

export default MobileItem
