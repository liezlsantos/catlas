import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { SearchContextProvider } from "context/SearchContext";
import HomePage from "pages/HomePage";
import CatDetailPage from "pages/CatDetailPage";
import Layout from "components/Layout";
import PageNotFoundError from "components/PageNotFoundError";
import "styles/App.scss";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cats/:id" element={<CatDetailPage />} />
        <Route path="/404" element={<PageNotFoundError />} />
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
