import moment from "moment";
import { Book } from "../types/book.type";
import httpService from "./http.service";

class BookService{
    
    public async getAllBooks():Promise<Book[]>{
        const books = await httpService.get<Book[]>("/");
        return books;
    }

    public async getBookById(id:string):Promise<Book>{
        const book = await httpService.get<Book>(`/${id}`);
        return book;
    }

    public async editBook(id:string, data:Book):Promise<Book>{
        const currentDate = moment().format("DD MMMM YYYY, h:mmA");
        const newData = {...data, editedAt:currentDate}
        const newBook = await httpService.put<Book>(`/${id}`, newData);
        return newBook;
    }

    public async deleteBook(id:string):Promise<void>{
        await httpService.delete(`/${id}`);
    }

    public async addBook(data:Book):Promise<void>{
        await httpService.post(`/`, data);
    }
}

const bookService = new BookService();

export default bookService;