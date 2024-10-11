import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { createContext, useEffect, useRef, useState } from "react";
import Favorite from "./pages/Favorite";


const userData = createContext();
// const cartData = createContext();
const fetchUser = async () => {

  const res = await axios.get("/apiv1/getuser",{withCredentials:true});
  // console.log(res)
    return res.data.data;
};

function App() {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(0);
  const [products, setProducts] = useState(0);
  const cart = useRef(0);
  const updateLogin = (status) => {
    setIsLogin(status);
  };

  const updateproducts = (status) => {
    setProducts(status);
  };

  useEffect(() => {
    fetchUser().then((data) => {
      setUser({ ...data });
      data && data.name ? console.log(`Hello ${data.name}`) : "";
    });
  }, [isLogin, products ]);

  return (
    <>
      <BrowserRouter>
        <userData.Provider value={{ user, updateLogin, updateproducts , cart }}>
          <Navbar />
          <ToastContainer stacked />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/favorite"} element={<Favorite />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/profile"} element={<Profile />} />
          </Routes>
        </userData.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { userData };
