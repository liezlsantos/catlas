import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { SearchContextProvider } from "context/SearchContext";
import HomePage from "pages/HomePage/HomePage";
import CatDetailPage from "pages/CatDetailPage/CatDetailPage";
import Layout from "layout/Layout";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage";
import "./App.scss";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cats/:id" element={<CatDetailPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Route>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );
  return (
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  );
};

export default App;
