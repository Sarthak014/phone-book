import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import PhoneBook from "../pages/PhoneBook.jsx";
import ErrorPage from "../pages/Errors/ErrorPage.jsx";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={ <PhoneBook /> } />
      <Route path="*" element={ <ErrorPage /> } />
    </>
  ),
  {
    // setting the base/start url
    baseURL: "/",
    future: { v7_normalizeFormMethod: true },
  }
);

export default AppRouter;

