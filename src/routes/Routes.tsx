import BookPage from "../pages/Book";
import Dashboard from "../pages/Dashboard";

export const routes =  [
    {
        route:'/',
        element:<Dashboard/>
    },
    {
        route:'/addbook',
        element:<BookPage/>
    },
    {
        route:'/editbook/:id',
        element:<BookPage/>
    },
]