
import { useEffect, useState } from 'react'
import { Book } from '../types/book.type';
import useDevice from '../hooks/useDevice';
import { Device } from '../keys/device';
import MobileItem from '../components/MobileItem';
import Table from '../components/Table';
import Select from '../components/Select';
import { Filter } from '../keys/filter';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/book.context';

function Dashboard() {
    const { books } = useBooks();
    const [filter, setFilter] = useState<Filter>('All');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const {deviceType} = useDevice();
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = books.filter((book) => {
          if (filter === "Active") return book.isActive;
          if (filter === "Disactive") return !book.isActive;
          return true; 
        });
      
        setFilteredBooks(filtered);
      }, [books, filter]);

    return (
        <>
        <div className="max-w-full flex flex-col">
            <div className='max-w-full flex p-5 bg-[#efeeee] justify-around items-center'>
                <div className="flex gap-5 items-center">
                    <Select 
                        options={['All','Active', 'Disactive']} 
                        onSelect={setFilter} 
                    />
                    <span>Showing {filteredBooks.length} of {books.length}</span>
                </div>
                <div>
                    <div className="flex max-w-40 items-center ml-5
                        justify-center bg-green-400 border-solid 
                        border-green-300 rounded-lg p-3
                        hover:bg-green-500 hover:border-green-200"
                        onClick={()=>navigate('/addbook')}>
                        <span className='font-bold text-xs text-center md:text-lg'>Add New Book</span>
                    </div>
                </div>
            </div>
            {deviceType===Device.MOBILE?
                <div className="flex flex-col items-center justify-center gap-10 p-5">
                    {filteredBooks.map(book=>{
                        return <MobileItem key={book.id} book={book}/>
                    })}
                </div>
            :<Table books={filteredBooks}/>}
            <footer className={`${deviceType===Device.DESKTOP?'fixed':''} bottom-0 left-0 w-full bg-gray-800 text-white py-4`}>
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="https://github.com/balanyaroslaw/booksTestTask" className="hover:underline">My Github</a>
                    </div>
                </div>
            </footer>
        </div>

        </>
    )
}

export default Dashboard