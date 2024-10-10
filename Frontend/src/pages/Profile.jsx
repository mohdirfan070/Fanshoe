import React, { useContext, useState } from "react";
import { userData } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import UserProfile from "../components/UserProfile";
import UserCart from "../components/UserCart";
import UserMyOrders from "../components/UserMyOrders";
import UserWishlist from "../components/UserWishlist";
import UserContact from "../components/UserContact";
import UserReturn from "../components/UserReturn";
import Admin from "../components/Admin";
import AddProduct from "../components/AddProduct";
import menuIcon from "../assets/menuIcon.svg";
import closeIcon from "../assets/closeIcon.svg";
import ChangeProduct from "../components/ChangeProduct";

export default function Profile() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState("personalinfo");
  const [adminSubMenu, setAdminSubMenu] = useState("");
  const { user, updateLogin } = useContext(userData);
  const logout = () => {
    try {
      document.getElementById("modal").classList.add("hidden");
      document.getElementById("profileDiv").style.opacity = 1;
      document.cookie = `token=;`;
      updateLogin(Math.random());
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };
  const handleLogout = () => {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("profileDiv").style.opacity = 0.45;
  };

  return (
    <>
      {user?.name ? (
        <>
          <div
            id="modal"
            className="modal hidden bg-transparent z-[9999]  fixed top-0 h-[100vh] w-full flex fle justify-center items-center"
          >
            <div className="w-[40%] min-w-[320px] max-w-[320px] min-h-[200px] max-h-[200px] bg-slate-300 rounded-xl  flex flex-row justify-center items-end flex-wrap relative p-3">
              <p className="absolute font3 w-[85%] text-center text-xl font-semibold  top-[15%] text-slate-800 text-wrap">
                Are your sure you want to logout?
              </p>
              <button
                onClick={logout}
                className="absolute bottom-3 left-[3%] text-white font-medium text-lg p-3 rounded-lg  active:bg-red-700 hover:bg-red-600 font3 bg-red-500 w-[45%]  "
              >
                Logout
              </button>
              <button
                onClick={() => {
                  document.getElementById("modal").classList.add("hidden");
                  document.getElementById("profileDiv").style.opacity = 1;
                }}
                className="absolute bottom-3 right-[3%] font3 hover:text-slate-500 hover:bg-slate-200 font-medium text-lg p-3 rounded-lg bg-slate-100 w-[45%]  "
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            id="profileDiv"
            className="min-h-screen w-full flex flex-col justify-start items-start flex-wrap relative"
          >
            <div id="subNavbar" className="flex justify-between items-center w-full sticky top-[13vh] " >

            <h2 className=" py-4 px-6 font3 text-center  font-semibold text-xl ">
              Profile
              {"/" +
                menu +
                (adminSubMenu && menu == "admin" ? "/" + adminSubMenu : "")}
            </h2>


             <button
          id="menuIcon"
          className="hidden max-h-max outline-none border-none"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          >
          {isOpen ? (
            <img
            src={closeIcon}
            className="min-h-[4vh] max-h-[4vh] min-w-[6vw] m-4"
            alt="menuIcon"
            />
          ) : (
            <img
            src={menuIcon}
            className="min-h-[4vh] max-h-[4vh] min-w-[6vw] m-4"
            alt="menuIcon"
            />
          )}
        </button>
          </div>
            
            <main
              id="mainProfile"
              className=" w-full h-full flex justify-center items-start flex-wrap gap-x-4 gap-y-2 px-4"
            >
              <section
                id="left-div"
                className="left-div sticky top-[24.5vh] overflow-hidden min-h-[475px] flex flex-col justify-center items-center max-h-max  flex-1  min-w-[320px]  max-w-[300px] bg-slate-100 rounded-xl z-0"
              >
                <div className="profile-img-text-div relative p-[2vh] flex  border-slate-500">
                  <img
                    className="h-20 rounded-full"
                    src={
                      user.gender && user.gender == "male"
                        ? "https://static.vecteezy.com/system/resources/previews/000/662/702/original/vector-man-face-cartoon.jpg"
                        : "https://static.vecteezy.com/system/resources/previews/000/654/883/large_2x/woman-face-cartoon-vector.jpg"
                    }
                    alt=""
                  />
                  <p className="p-2">
                    <span className="font3 font-medium  text-sm">Hello</span>{" "}
                    <br />
                    <span className="font-semibold text-lg font2 text-slate-600">
                      {user && user.name.split(" ")[2]
                        ? user.name.split(" ")[1] +
                          " " +
                          user.name.split(" ")[2]
                        : user && user.name.split(" ")[1]
                        ? user.name.split(" ")[0] +
                          " " +
                          user.name.split(" ")[1]
                        : user && user.name.split(" ")[0]
                        ? user.name.split(" ")[0]
                        : "User"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setMenu("personalinfo")}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setMenu("cart")}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  Cart
                </button>{" "}
                <button
                  onClick={() => setMenu("myorders")}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  My Orders
                </button>{" "}
                <button
                  onClick={() => setMenu("wishlist")}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  My wishlist
                </button>
                <button
                  onClick={() => {
                    setMenu("returnandcancel");
                  }}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  Return and Cancel
                </button>
                <button
                  onClick={() => {
                    setAdminSubMenu(""), setMenu("admin");
                  }}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  Admin{" "}
                  {menu == "admin" ? (
                    <img
                      className="inline-block scale-105 h-6"
                      src="./src/assets/arrowDropUp.svg"
                      alt="DrowUp"
                    />
                  ) : (
                    <img
                      className="inline-block scale-105 h-6"
                      src="./src/assets/arrowDropDown.svg"
                      alt="DropDwon"
                    />
                  )}
                </button>
                {menu == "admin" ? (
                  <>
                    <button
                      onClick={() => {
                        setAdminSubMenu("products"), setMenu("admin");
                      }}
                      className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                    >
                     Manage Products
                    </button>

                    
                  </>
                ) : (
                  " "
                )}
                <button
                  onClick={() => setMenu("contact")}
                  className=" w-full p-3 flex-auto border-b-2 bg-slate-100 text-black active:bg-slate-300 active:text-slate-500 hover:bg-slate-300 font-semibold font3"
                >
                  Contact Us
                </button>
                <button
                  onClick={handleLogout}
                  className=" w-full p-3 flex-auto  bg-red-500 active:bg-red-700 hover:bg-red-600 text-white font-semibold font3"
                >
                  Logout
                </button>
              </section>
              {menu == "personalinfo" ? (
                <UserProfile user={user} handleLogout={handleLogout} />
              ) : menu == "cart" ? (
                <UserCart />
              ) : menu == "myorders" ? (
                <UserMyOrders />
              ) : menu == "wishlist" ? (
                <UserWishlist />
              ) : menu == "returnandcancel" ? (
                <UserReturn />
              ) : menu == "contact" ? (
                <UserContact />
              ) : menu == "admin" && adminSubMenu == "" ? (
                <Admin />
              ) : menu == "admin" && adminSubMenu == "products" ? (
                <AddProduct/>
              )  : (
                <UserProfile />
              )}
            </main>
          </div>
        </>
      ) : (
        "Please Login"
      )}
    </>
  );
}
