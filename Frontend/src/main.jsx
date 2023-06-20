import App from './App.jsx'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Regis from './pages/register.jsx'
import Home from './pages/home.jsx'
import Navbar from './components/navbar/navbar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "register",
    element: <Regis/>,
  },
  {
    path: "home",
    element: <Home/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{marginTop:30}}>
  
    <RouterProvider router={router}  />
    </div>

  </React.StrictMode>
);