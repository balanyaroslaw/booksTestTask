import { useNavigate, useParams } from "react-router-dom";
import Select from "../components/Select";
import { useEffect, useState } from "react";
import { Category } from "../types/book.type";
import { Book } from "../types/book.type";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import bookService from "../services/books.service";
import Toggle from "../components/Toggle";
import ActionMessage from "../components/ActionMessage";
import { useBooks } from "../context/book.context";
function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book>({
        id: '',
        title: '',
        author: '',
        category: null,
        isbn: '',
        isActive: false,
        createdAt: moment().format("DD MMMM YYYY, h:mmA"),
        editedAt: null
    });

    const [errors, setErrors] = useState<{ title?: string; author?: string; isbn?: string; category?: string }>({});

    const [category, setCategory] = useState<Category>(book.category! || Category.FICTION);
    const [title, setTitle] = useState<string>(book.title || '');
    const [author, setAuthor] = useState<string>(book.author||'');
    const [isbn, setISBN] = useState<string>(book.isbn||'');
    const [isActive, setIsActive] = useState<boolean>(book.isActive);

    const [showMessage, setShowMessage] = useState<boolean>(false);

    const {fetchBooks, updateBook} = useBooks();

    const navigate = useNavigate();

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!title.trim()) {
            newErrors.title = "Title is required";
        } else if (title.length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }

        if (!author.trim()) {
            newErrors.author = "Author is required";
        } else if (author.length < 3) {
            newErrors.author = "Author must be at least 3 characters";
        }

        if (!isbn.trim()) {
            newErrors.isbn = "ISBN is required";
        } else if (!/^\d{10,13}$/.test(isbn)) {
            newErrors.isbn = "ISBN must be a 10-13 digit number";
        }

        if (!category) {
            newErrors.category = "Category is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addNewBook = async () =>{
        await bookService.addBook({
            id:uuidv4(),
            title:title,
            author:author,
            category:category,
            isbn:isbn,
            isActive:isActive,
            createdAt: moment().format("DD MMMM YYYY, h:mmA"),
            editedAt: null
        });
    }

    const editBook = async () =>{
        await updateBook(book.id!,{
            id:book.id,
            title:title,
            author:author,
            category:category,
            isbn:isbn,
            isActive:isActive,
            createdAt: book.createdAt,
            editedAt: null
        });
    }

    useEffect(()=>{
        const getBook = async() =>{
            const data = await bookService.getBookById(id!);
            setAuthor(data.author);
            setCategory(data.category!);
            setISBN(data.isbn),
            setTitle(data.title);
            setBook(data);
        }

        if(id){
            getBook();
        }
    },[])

    const onSubmit = async () =>{
        if (validate()) {
            if(!id){
                 await addNewBook();
            }
            else {
                await editBook();
            }

            await fetchBooks();
            setShowMessage(true);
        }
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 items-center">
            <div className="flex justify-center items-center mt-15">
                {showMessage && (
                    <ActionMessage text={!id?"Book added successfully!":"Book edited successfully!"} onClose={() =>{
                        setShowMessage(false); 
                    }}/>
                )}
            </div>
            <div className="mb-4 ml-6 rounded-md max-w-35 bg-gray-300 items-center p-1">
                <button 
                    className="text-blue-600 font-bold" 
                    onClick={() => navigate('/')}
                >
                    Go to Dashboard
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {id ? 'Edit Book' : 'Add Book'}
                </h2>

                <div className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        className="p-2 border rounded-md w-full"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    <input 
                        type="text" 
                        placeholder="Author" 
                        className="p-2 border rounded-md w-full"
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                    />
                    {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <Select options={Object.values(Category)} optiontext={category||"Select category"} onSelect={setCategory}/>
                    {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                    <input 
                        type="text" 
                        placeholder="ISBN" 
                        className="p-2 border rounded-md w-full"
                        value={isbn}
                        onChange={(e)=>setISBN(e.target.value)}
                    />
                    <Toggle isActive={isActive} handleToggle={()=>setIsActive(!isActive)}/>
                    {errors.isbn && <span className="text-red-500 text-sm">{errors.isbn}</span>}
                </div>
                
                <div className="mt-6">
                    <button 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        onClick={()=>onSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookPage;