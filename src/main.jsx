import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import UsersPage from "./pages/users.jsx";
import BooksPage from "./pages/books.jsx";
import TodoApp from "./components/todo/todoApp.jsx";
import "./styles/global.css";
import ErrorPage from "./pages/error.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthWrapper>
);
