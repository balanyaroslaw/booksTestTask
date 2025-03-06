
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './Routes'

function Router() {
  return (
    <>
    <BrowserRouter>
        <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={`${index}`}
                        path={route.route}
                        element={route.element}
                    />
                ))}
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router