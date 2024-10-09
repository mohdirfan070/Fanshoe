import React, { useState, useContext } from "react";
import "./Form.css";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../App";

const handleSignup = async (data, updateLogin) => {
  // console.log(data)
  let res = await axios.post("https://fanshoebackend.onrender.com/apiv1/signup", data);
  //, {withCredentials:true} The withCredentials property is set to true to send cookies with a request to the server. Without this setting, cookies aren't sent automatically, and the server won't receive the data needed for session management or cookie-based authentication.

  //Reference  https://www.dhiwise.com/post/managing-secure-cookies-via-axios-interceptors
  updateLogin(Math.random());
  return res;
};

export default function Signup() {
  const { updateLogin } = useContext(userData);
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [inpData, setInpData] = useState({
    username: false,
    mobileNumber: false,
    name: false,
    pasword: false,
    address: false,
    age: false,
    gender: false,
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
    let res = await handleSignup(data, updateLogin);
    res.data.status
      ? (notify("Sign Up Successfull", "success", "light", 3000),
        setTimeout(() => navigate("/"), 3000))
      : (notify(res.data.msg, "error", "light", 3000), setIsSubmit(false));
    setIsSubmit(false);
  };

  return (
    <>
      <div className=" bg-red-100 min-h-screen w-full flex justify-center items-start flex-nowrap min-w-[320px]">
        <div
          id="left-signup"
          className=" min-h-screen w-full flex-col flex justify-start items-center p-4"
        >
          <img
            className="min-h-96  "
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
            alt=""
          />
        </div>
        <div
          id="right-signup"
          className="min-h-screen w-full flex-col flex justify-start items-center p-4"
        >
          <h2 className="text-[1.7rem] m-3 font-semibold text-center font3">
            Welcome To{" "}
            <span className="text-3xl font1 text-red-600">Fanshy</span> <br />{" "}
            Let's Change the <em> LifeStyle</em>{" "}
          </h2>

          <span className="text-blue-700 font-medium text-lg m-4 underline">
            {" "}
            <Link to={"/login"}>Already a User?</Link>{" "}
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 justify-center items-center min-w-[320px] max-w-[800px]"
          >
            <label htmlFor="name" className="text-start">
              {errors.name ? (
                <span className="text-red-600 ">Name is Required!</span>
              ) : (
                "Name"
              )}
            </label>

            <input
              id="name"
              type="text"
              label="Name"
              {...register("name", { required: true })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <label htmlFor="username" className="text-start">
              {errors.username ? (
                <span className="text-red-600 ">Invalid Email</span>
              ) : (
                "Email"
              )}
            </label>

            <input
              id="username"
              label="Email"
              placeholder="xyz123@gmail.com"
              {...register("username", {
                required: true,
                pattern: /[a-z\d]+@gmail.com/i,
              })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <label htmlFor="mobileNumber" className="text-start">
              {errors.mobileNumber ? (
                <span className="text-red-600 ">Invalid Mobile</span>
              ) : (
                "Mobile"
              )}
            </label>

            <input
              id="mobileNumber"
              label="Mobile"
              {...register("mobileNumber", {
                required: true,
                maxLength: 10,
              })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <label htmlFor="age" className="text-start">
              {errors.age ? (
                <span className="text-red-600 ">Inavlid Age</span>
              ) : (
                "Age"
              )}
            </label>

            <input
              id="age"
              label="Age"
              type="number"
              {...register("age", { required: true, min: 10, max: 100 })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <select
              id="gender"
              className=" bg-slate-100 w-[30%] rounded-md p-4 border-2 outline-none active:outline-2"
              defaultValue={"Male"}
              {...register("gender", { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="password" className="text-start">
              {errors.password ? (
                <span className="text-red-600 ">
                  Invalid Password Minimum 6 Characters
                </span>
              ) : (
                "Password"
              )}
            </label>

            <input
              id="password"
              label="Password"
              type="password1"
              {...register("password", {
                required: true,
                pattern: /[A-za-z\d]/i,
                minLength: 6,
              })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <label htmlFor="pincode" className="text-start">
              {errors.pincode ? (
                <span className="text-red-600 ">Invalid PIN Code</span>
              ) : (
                "PIN Code"
              )}
            </label>

            <input
              id="pincode"
              label="pincode"
              {...register("pincode", {
                required: true,
              })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <label htmlFor="address" className="text-start">
              {errors.address ? (
                <span className="text-red-600 ">Invalid Address</span>
              ) : (
                "Address"
              )}
            </label>

            <input
              id="address"
              label="Address"
              multiline="true"
              {...register("address", {
                required: true,
              })}
              className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
            />

            <div className="btn-div">
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
