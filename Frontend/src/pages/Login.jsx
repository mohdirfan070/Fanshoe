import React, { useState, useContext } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userData } from "../App";
import baseurl from "../url";
const handleLogin = async (data, updateLogin) => {
  let res = await axios.post( baseurl+"/login", data , { withCredentials: true });
  updateLogin(Math.random());
    return res;
};

export default function Login() {
  const navigate = useNavigate();
  const { updateLogin } = useContext(userData);
  const [isSubmit, setIsSubmit] = useState(false);
  const [inpData, setInpData] = useState({
    username: false,
    pasword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notify = (msg, type, theme, autoClose) => {
    toast(msg, { type, theme, autoClose });
  };

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      let res = await handleLogin(data, updateLogin);
      if (!res.data.status) throw res;
      notify(res.data.msg, "success", "light", 3000);
      navigate("/");
      localStorage.setItem("isLogin",true);
      // setIsSubmit(false);
      // ? (notify(res.data.msg, "success", "light", 3000),
      // setTimeout(() => navigate("/"), 3000))
      // : (notify(res.data.msg, "error", "light", 3000), setIsSubmit(false));
    } catch (res) {
      notify(res.data.msg, "error", "light", 3000);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen w-full flex justify-center items-start flex-nowrap min-w-[320px]">
        <div
          id="left-signup"
          className=" min-h-screen w-full flex-col flex justify-start items-center bg-red-100 p-4"
        >
          <img
            className="min-h-96  "
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.svg"
            alt=""
          />
        </div>
        <div
          id="right-signup"
          className="min-h-screen w-full flex-col flex justify-start items-center bg-red-100 p-4"
        >
          <h2 className="text-[1.7rem] m-3 font-semibold text-center font3">
            Welcome To{" "}
            <span className="text-3xl font1 text-red-600">Fanshy</span> <br />{" "}
            Let's Change the <em> LifeStyle</em>{" "}
          </h2>

          <span className="text-blue-700 font-medium text-lg m-4 underline">
            {" "}
            <Link to={"/signup"}>New User?</Link>{" "}
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 justify-start items-start min-w-[320px] max-w-[800px]"
          >
            <label htmlFor="password" className="text-start">
              {errors.username ? (
                <span className="text-red-600 ">{errors.username.message}</span>
              ) : (
                "Username"
              )}
            </label>

            {/* {errors.username && notify("Invalid Email", "error", "light", 3500)} */}
            <input
              label="Email"
              type="text"
           
              placeholder="xyz123@gmail.com"
              {...register("username", {
                required: "Email Required",
                pattern:{value: /[a-zA-Z0-9]+@gmail.com/i,message:"Invalid Email" },
              })}
              className={`emailInp py-3 outline-none hover:outline-slate-300  rounded px-3 bg-slate-100 w-[90%] ${ errors.username?"outline-2 outline-red-600":"focus:outline-blue-400 "}`}
            />
         

            <label htmlFor="password" className="text-start">
              {errors.password ? (
                <span className="text-red-600 ">
                  {errors.password.message}{" "}
                </span>
              ) : (
                "Password"
              )}
            </label>

            <input
              label="Password"
              type="password"
              id="password"
              placeholder="password"
              {...register("password", {
                required: "Password Required",
                pattern: /[A-za-z\d]/i,
                minLength: {value:6,message:"Minimum 6 Characters"},
              })}
              className={`emailInp py-3 outline-none hover:outline-slate-300  rounded px-3 bg-slate-100 w-[90%] ${ errors.password?"outline-2 outline-red-600":"focus:outline-blue-400 "}`}
            />

            <div className="btn-div flex flex-col justify-start items-center  ">
              {isSubmit ? (
                <button
                  className="py-3 px-4 w-max  bg-red-500 max-w-36 rounded-md text-white font-medium text-xl font2"
                  onClick={(e) => e.preventDefault()}
                >
                  Please Wait
                  <CircularProgress
                    color="white"
                    size={20}
                    thickness={5}
                  />{" "}
                </button>
              ) : (
                <button
                  className="py-3 px-4  bg-red-500 max-w-36 rounded-md text-white font-medium text-xl font2"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
