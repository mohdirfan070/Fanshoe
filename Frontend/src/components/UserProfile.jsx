import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { userData } from "../App";
const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

export default function UserProfile(prop) {
  const { user , updateLogin } = useContext(userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isUserUpdate , setIsUserUpadte ] = useState(false);
  const [inpData , setInpData ] = useState({
    name:user.name,
    username:user.username,
    mobileNumber :user.mobileNumber,
    gender : user.gender,
    age : user.age,
    address: user.address,
    pincode:user.pincode
  })

  const handleChange = (e)=>{
    setInpData({...inpData,[e.target.name]:e.target.value});
  }

  const Submit = async (data) => {
      try { 
        const res =await axios.patch('/apiv1/updateuser' , inpData , { withCredentials: true });
        if(!res.data.status) throw res;
          // console.log(res.data);
          updateLogin(Math.random());
          notify(res.data.msg,"success","light",3000);
          setIsUserUpadte(!isUserUpdate);
      } catch (res) {
        notify(res.data.msg,"error","light",3000);
        // console.log(res);
      }

  };

  return (
    <>
      {

          isUserUpdate ?  
           <section className="right-div min-h-[795px] max-h-[600px] overflow-y-auto  flex-auto rounded-lg min-w-[320px] max-w-[900px] bg-slate-100">
          <div className="p-4  border-b-2 drop-shadow-sm flex w-full justify-between sticky top-0   bg-slate-100  ">
            <p className=" text-xl font-medium font3">Personal Information</p>
            <section>

            <button onClick={handleSubmit(Submit)} className="bg-blue-600 py-2 px-4 rounded-md text-white mx-1">
              Update {" "}
            
            </button>

            <button onClick={()=>setIsUserUpadte(false)} className="bg-red-600 py-2 px-4 rounded-md text-white mx-1">
              Cancel
            
            </button>
            </section>
          </div>
             <form
               onSubmit={e=>e.preventDefault()}
               className="flex flex-col gap-2 justify-start items-start min-w-[320px] max-w-[800px]"
             >
       
          <section  >
          <div className="name-div hidden p-3 h-full w-full ">
            <label
              className="text-sm font3 font-medium select-none hover:opacity-70"
              htmlFor="image1"
            >Profile Image <img
            className="inline-block"
            src="./src/assets/uploadIcon.svg"
            alt="uploadIcon"
          />          
            </label>{" "}
            <br />
            <input
              className="p-4 hidden rounded-lg text-lg font2 font-semibold  "
              type="file"
              accept="image/png,image/jpeg"
              name="image1"
              id="image1"
              placeholder="Image 1"
            />
          </div>
  
  
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
             {errors.name ? <span className="text-red-600 ">Invalid Name</span> : ("Name")}
              </label>{" "}
              <br />
              <input
               {...register("name", { required: true })}
                autoFocus
                className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                type="text"
                onChange={handleChange}
                value={inpData.name}
                name="name"
                id="name"
              />
            </div>
            {/* <div className="name-div p-3 ">
              <label
                className="text-sm   font3 font-medium select-none"
                htmlFor="username"
              >
                {errors.username ? <span className="text-red-600 ">Invalid Username</span> : ("Username")}
              </label>{" "}
              <br />
              <input
               {...register("username", {
                required: true,
                pattern: /[a-zA-Z0-9]+@gmail.com/i,
              })}
                className="p-4 min-w-full rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                type="text"
                onChange={handleChange}
                value={inpData.username}
                name="username"
                id="username"
              />
            </div> */}
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="mobileNumber"
              >
               {errors.mobileNumber ? <span className="text-red-600 ">Invalid Mobile</span> : ("Mobile")}
              </label>{" "}
              <br />
              <input
                {...register("mobileNumber", {
                  required: true,
                  maxLength: 10,
                })}
                className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                type="text"
                onChange={handleChange}
                value={inpData.mobileNumber}
                name="mobileNumber"
                id="mobileNumber"
              />


            </div>
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="gender"
              >
                Gender
              </label>{" "}
              <br />

              {/* <input
               
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none"
                type=""
                onChange={handleChange}
                value={inpData.gender}
                name="gender"
                id="gender"
              /> */}

            <select value={inpData.gender}  onChange={(e)=>setInpData({...inpData,[e.target.name]:e.target.value})}  className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400" name="gender" id="gender">
                
                

                <option value={inpData.gender=="male"?"male":"female"}>{inpData.gender=="male"?"male":"female"}</option>
                <option value={inpData.gender=="male"?"female":"male"}>{inpData.gender=="male"?"female":"male"}</option>

            </select>

            </div>

            <div className="flex flex-wrap justify-start items-baseline" >
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="age"
              >
                 {errors.age ? <span className="text-red-600 ">Invalid Age</span> : ("Age")}
              </label>{" "}
              <br />
              <input
                   {...register("age", { required: true, min: 10, max: 100 })}
                className="p-4 rounded-lg text-lg font2 font-semibold  w-[37%]  outline-none hover:outline-slate-300 focus:outline-blue-400"
                type="text"
                onChange={handleChange}
                value={inpData.age}
                name="age"
                id="age"
              />
            </div>
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="pincode"
              >
                 {errors.pincode ? <span className="text-red-600 ">Invalid PIN CODE</span> : ("PIN CODE")}
              </label>{" "}
              <br />
              <input
                   {...register("pincode", {
                    required: true,
                  })}
                className="p-4 rounded-lg text-lg font2 font-semibold  w-[47%]  outline-none hover:outline-slate-300 focus:outline-blue-400"
                type="text"
                onChange={handleChange}
                value={inpData.pincode}
                name="pincode"
                id="pincode"
              />
            </div>
            </div>


            <div className="name-div p-3 ">

         
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="address"
              >
               {errors.address ? <span className="text-red-600 ">Invalid Address</span> : ("Address")}
              </label>{" "}
              <br />
              <textarea
              {...register("address", {
                required: true,
              })}
                cols={35}
                rows={3}
                aria-disabled
                 className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                type="text"
                onChange={handleChange}
                value={inpData.address}
                name="address"
                id="address"
              />
            </div>
          </section>
            </form>
          
         
        </section> :  
           <section className="right-div min-h-[795px] max-h-[600px] overflow-y-auto  flex-auto rounded-lg min-w-[320px] max-w-[900px] bg-slate-100">
          <div className="p-4  border-b-2 drop-shadow-sm flex w-full justify-between sticky top-0   bg-slate-100  ">
            <p className=" text-xl font-medium font3">Personal Information</p>
            <button onClick={()=>setIsUserUpadte(!isUserUpdate)} className="text-blue-600 hover:underline">
              Change Information{" "}
              <img
                className="inline-block"
                src="./src/assets/editIcon.svg"
                alt="EditIcon"
              />{" "}
            </button>
          </div>
       
          <section  >
  
          <div className="name-div hidden p-3 h-full w-full ">
            <label
              className="text-sm font3 font-medium select-none hover:opacity-70"
              htmlFor="image1"
            >Profile Image <img
            className="inline-block"
            src="./src/assets/uploadIcon.svg"
            alt="uploadIcon"
          />          
            </label>{" "}
            <br />
            <input
              className="p-4 hidden rounded-lg text-lg font2 font-semibold  "
              type="file"
              accept="image/png,image/jpeg"
              name="image1"
              id="image1"
              placeholder="Image 1"
            />
          </div>
  
  
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
                Name
              </label>{" "}
              <br />
              <input
                readOnly
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none"
                type="text"
                value={user.name}
                name="name"
                id="name"
              />
            </div>
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
                Email
              </label>{" "}
              <br />
              <input
                readOnly
                className="p-4 min-w-[70%] rounded-lg text-lg font2 font-semibold  outline-none"
                type="text"
                value={user.username}
                name="name"
                id="name"
              />
            </div>


            <div className="flex flex-wrap justify-start items-baseline" >
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
                Mobile
              </label>{" "}
              <br />
              <input
                readOnly
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none"
                type="text"
                value={user.mobileNumber}
                name="name"
                id="name"
              />
            </div>
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
                Gender
              </label>{" "}
              <br />
              <input
                readOnly
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none"
                type="text"
                value={user.gender}
                name="name"
                id="name"
              />
            </div>
            </div>


            <div className="flex justify-start items-baseline flex-wrap" >

           
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
                Age
              </label>{" "}
              <br />
              <input
                readOnly
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none"
                type="text"
                value={user.age}
                name="name"
                id="name"
              />
             
            </div>  <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="pincode"
              >
                PIN CODE
              </label>{" "}
              <br />
              <input
                  readOnly
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none "
                type="text"
                value={user.pincode}
                name="pincode"
                id="pincode"
              />
            </div>
            </div>
            <div className="name-div p-3 ">
              <label
                className="text-sm font3 font-medium select-none"
                htmlFor="name"
              >
                Address
              </label>{" "}
              <br />
              <textarea
                readOnly
                cols={35}
                rows={3}
                aria-disabled
                className="p-4 rounded-lg text-lg font2 font-semibold  outline-none "
                type="text"
                value={user.address}
                name="name"
                id="name"
              />
            </div>
          </section>
  
         
         
        </section>
  


      }
    
    </>
  );
}
