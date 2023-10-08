import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/route";
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from "./pages/Header";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <NavigationBar />
      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
