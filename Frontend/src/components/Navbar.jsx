import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import profileIcon from "../assets/profileIcon.png";
import searchIcon from "../assets/searchIcon.png";
import cartIcon from "../assets/cartIcon.png";
import favoriteIcon from "../assets/notFavoriteIcon.png";

import "./Navbar.css";
import { userData } from "../App";

export default function Navbar() {
  const { user , cart } = useContext(userData);
  const [isUser, setisUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setisUser(user);
  });

  return (
    <div className="w-full sticky  top-0 z-[9999] " > 
    <div
      id="navbar"
      className="relative flex justify-between items-center h-[15vh] w-full bg-slate-100  min-w-[320px]"
    >
      <div
        id="left-nav"
        className="left-nav p-1 flex justify-end items-center w-max"
      >
        <Link to={isUser ? "/profile" : "/login"}>
          <img
            className="min-h-6 max-h-6 mx-2"
            src={profileIcon}
            alt="ProfileIcon"
          />
        </Link>
        <p className="font2 font-semibold text-[3.1vh] ">
          <Link to={isUser && isUser.name ? "/profile " : "/login"}>
            {isUser && isUser.name ? isUser.name : (
              <span>Login</span>
            )}
          </Link>
        </p>
      </div>
      <Link to={"/"}>
        <h1
          id="logo"
          className="absolute top-[8%] left-[40%] text-[8vh] font-bold  text-red-600 font1 "
        >
          Fanshoe
        </h1>
      </Link>

      <div className="right-nav flex justify-end items-center w-max ">
        {isOpen ? (
          <input
            id="searchInp"
            placeholder="Search Item"
            name="searchInp"
            type="search"
            className="max-[770px]:hidden min-h-[4vh] max-h-[8vh] min-w-[16vw] max-w-[16vw] p-2 rounded-md outline-none"
          />
        ) : (
          ""
        )}
        <label
          className="max-[770px]:hidden"
          onClick={() => setIsOpen(!isOpen)}
          htmlFor="searchInp"
        >
          <img
            className="min-h-6 max-h-6 mx-2"
            src={searchIcon}
            alt="SearchIcon"
          />
        </label>
        <Link
         className="relative"
          id="favoriteIcon"
          to={isUser && isUser.name ? "/favorite" : "/login"}
        > 
                <span className="absolute text-[2vh]  -top-[40%] left-[2%] text-white bg-red-500 max-w-max rounded-[2.2vh] px-[1.1vh]">{isUser &&  isUser.name && isUser.favorite.length ?  isUser.favorite.length : 0 }</span>
          <img
            className="min-h-6 max-h-6 mx-2 bg-blend-multiply"
            src={favoriteIcon}
            alt="FavoriteIcon"
          />

        </Link>{" "}
     
        <Link
          className="relative"
          id="cartIcon"
          to={isUser && isUser.name  ? "/cart" : "/login"}
        >
          <span className="absolute text-[2vh]  -top-[40%] left-[22%] text-white bg-red-500 max-w-max rounded-[2.2vh] px-[1.1vh]">
            {/* { cart.current ? cart.current : 0} */}
          </span>

          <img
            className="min-h-6 max-h-6 mx-2"
            src={cartIcon}
            alt="CartIcon"
          />
        </Link>
       
      </div>
    </div>
    </div>
  );
}
