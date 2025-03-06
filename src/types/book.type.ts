
export type Book = {
    id?:string,
    title:string,
    author:string,
    category:Category | null,
    isbn:string,
    isActive:boolean
    createdAt:string,
    editedAt:string | null
}

export enum Category {
    FICTION = "Fiction",
    NONFICTION = "Non-fiction",
    MYSTERY = "Mystery",
    SCIENCE = "Science",
    PSYCHOLOGY = "Psychology"
}